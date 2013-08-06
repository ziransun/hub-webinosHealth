

function graphHandler() {

    this.mainDiv = null;
    this.index;
    this.sensorType = -1;
    this.availableSensors = null;
    this.sensors4Choice = null;
    this.serviceUri = null;
    var ref = this;
    this.sensorSelected;
    this.description = null;
    this.historicData = null;

    /* type is the type of data to be shown in graph:
       -0 = mom blood pressure
       -1 = mom blood sugar
       -2 = mom heartrate
       -3 = mom temperature
       -10 = baby weight
       -11 = baby temperature
       index is the index of the baby in mybabyList array; -1 is for the mother
    */
 
    graphHandler.prototype.displayGraph = function (divName, type, index) {
        //alert('displayGraph - div is '+divName+', type is '+type+', index is '+index);

        this.mainDiv = divName;
        this.index = index;
        this.sensorType = type;
        this.availableSensors = new Array();
        var htmlCode = '';
        if(type == 0) {
            htmlCode += '<br>Div for showing graph with mom blood pressure';
            this.description = 'mom blood pressure';
        }
        else if(type == 1) {
            htmlCode += '<br>Div for showing graph with mom blood sugar';
            this.description = 'mom blood sugar';
        }
        else if(type == 2) {
            htmlCode += '<br>Div for showing graph with mom heartrate';
            this.description = 'mom heartrate';
            this.serviceUri = 'http://webinos.org/api/sensors.heartratemonitor';
        }
        else if(type == 3) {
            htmlCode += '<br>Div for showing graph with mom temperature';
            this.description = 'mom temperature';
            this.serviceUri = 'http://webinos.org/api/sensors.temperature';
        }
        else if(type == 10) {
            htmlCode += '<br>Div for showing graph with baby weight';
            this.description = 'baby weight';
        }
        else if(type == 11) {
            htmlCode += '<br>Div for showing graph with baby temperature';
            this.description = 'baby temperature';
            this.serviceUri = 'http://webinos.org/api/sensors.temperature';
        }
        htmlCode += '<br><br>';
        htmlCode += '<input type=\'button\' value=\'Show data\' class=\'buttonGeneric\' id=\''+this.mainDiv+'ShowButton\'>';
        htmlCode += '<br><br>';
        htmlCode += '<input type=\'button\' value=\'Acquire data\' class=\'buttonGeneric\' id=\''+this.mainDiv+'AcquireButton\'>';
        $('#'+this.mainDiv).html(htmlCode);
        (function(mDiv, rf) {
            $('#'+mDiv+'ShowButton').click(function() {
                rf.selectGraph();
            });
        })(this.mainDiv, this);
        (function(mDiv, rf) {
            $('#'+mDiv+'AcquireButton').click(function() {
                rf.selectSensor();
            });
        })(this.mainDiv, this);

        if(this.serviceUri) {
            //alert('findService for index '+index+' and uri '+this.serviceUri);
            webinos.discovery.findServices(
                new ServiceType(this.serviceUri),
                { onFound : function (serv) {
                    //alert('service found for index '+ref.index);
                    ref.availableSensors.push(serv);
                }
            });
        }
    }


    graphHandler.prototype.selectSensor = function () {
        //alert('selectSensor for index '+this.index+', type '+this.sensorType);
        var htmlCode = '';
        this.sensors4Choice = this.availableSensors;
        if(this.sensors4Choice.length == 0) {
            htmlCode += 'Sorry, no sensors available...';
            $('#dialog-content').html(htmlCode);
        }
        else {
            this.sensorSelected = -1;
            htmlCode += '<select id=\''+this.mainDiv+'Select\'>';
            htmlCode += '<option value=\'-1\'>Choose sensor</option>';
            for(var i=0; i<this.sensors4Choice.length; i++) {
                htmlCode += '<option value=\''+i+'\'>'+this.sensors4Choice[i].displayName+'</option>';
            }
            htmlCode += '</select>';
            $('#dialog-content').html(htmlCode);
            (function(mDiv, rf) {
                $('#'+mDiv+'Select').change(function() {
                    rf.sensorSelected = +($('#'+rf.mainDiv+'Select').val());
                    //alert('sensor selected: '+rf.sensors4Choice[rf.sensorSelected].description);
                    rf.sensors4Choice[rf.sensorSelected].bind({
                        onBind: function(){
                            //rf.getNewData();
                            getNewSensorData(rf);
                        }
                    });
                });
            })(this.mainDiv, this);
        }
        $('#dialog-container').fadeIn(1000);
    }


    graphHandler.prototype.saveData = function(event) {
        //alert('saveData - '+this.sensors4Choice[this.sensorSelected].description);
        var time=new Date(event.timestamp);
        var htmlCode = '';
        htmlCode += 'Timestamp: '+time.toDateString()+'<br>';
        for(var i=0; i<event.sensorValues.length; i++) {
            htmlCode += 'Value '+i+': '+event.sensorValues[i]+'<br>';
        }
        $('#dialog-content').html(htmlCode);
        storeData(this.index, this.sensorType, time, event.sensorValues);
    }


    graphHandler.prototype.selectGraph = function() {
        this.historicData = retrieveData(this.index, this.sensorType);
        //TODO At the moment a table is displayed; add more options for showing data
        // (ie type of graphs, time period selection, ...)
        var htmlCode = '';
        htmlCode += 'Showing data for '+this.description+'<br><br>';
        htmlCode += 'Start date: <input type=\'date\' id=\'graphStartDate\'><br>';
        htmlCode += 'End date: <input type=\'date\' id=\'graphEndDate\'><br>';
        htmlCode += 'View type: <select id=\'graphViewType\'>';
        htmlCode += '<option value=\'0\'>Table</option>';
        htmlCode += '<option value=\'1\'>Graph</option>';
        htmlCode += '</select><br>';
        htmlCode += '<div id=\'dialog-content-graph\'></div>';
        $('#dialog-content').html(htmlCode);
        $('#dialog-container').fadeIn(1000);
        this.showGraph();
        (function(rf) {
            $('#graphStartDate').change(function() {
                rf.showGraph();
            });
        })(this);
        (function(rf) {
            $('#graphEndDate').change(function() {
                rf.showGraph();
            });
        })(this);
        (function(rf) {
            $('#graphViewType').change(function() {
                rf.showGraph();
            });
        })(this);
    }


    graphHandler.prototype.showGraph = function() {
        var startDate = new Date($('#graphStartDate').val());
        var endDate = new Date($('#graphEndDate').val());
        var viewType = $('#graphViewType').val();
        var data = graphFilter(this.historicData, startDate, endDate);
        var htmlCode = '';
        if(viewType == 0) {
            htmlCode += '<table><tr><td>Date</td><td>Value</td></tr>';
            for(var i=0; i<data.timestamp.length; i++) {
                htmlCode += '<tr><td>'+data.timestamp[i].toDateString()+'</td><td>'+data.values[i]+'</td></tr>';
            }
            htmlCode += '</table>';
            $('#dialog-content-graph').html(htmlCode);
        }
        else if(viewType == 1) {
            var cdiv = $('#dialog-content-graph').get(0);
            var chart = new google.visualization.LineChart(cdiv);
            var go = {};
            var gd = new google.visualization.DataTable();
            gd.addColumn('date', 'Date');
            gd.addColumn('number', 'Value');
            for(var i=0; i<data.timestamp.length; i++) {
                gd.addRow([data.timestamp[i], data.values[i]]);
            }
            chart.draw(gd, go);
        }
        else {
            htmlCode += '<br>Sorry, not supported';
            $('#dialog-content-graph').html(htmlCode);
        }
    }

}


function graphFilter(data, startDate, endDate) {
    //alert('graphFilter');
    var sd = startDate;
    var ed = endDate;
    if(!isValidDate(startDate)) {
        sd = new Date(1000, 0, 1);
    }
    if(!isValidDate(endDate)) {
        ed = new Date(4000, 11, 31);
    }
    var result = {};
    result.timestamp = new Array();
    result.values = new Array();
    for(var i=0; i<data.timestamp.length; i++) {
        if(data.timestamp[i] >= sd && data.timestamp[i] <= ed) {
            result.timestamp.push(data.timestamp[i]);
            result.values.push(data.values[i]);
        }
    }
    return result;
}


function isValidDate(d) {
    if(Object.prototype.toString.call(d) !== '[object Date]') {
        return false;
    }
    return (!isNaN(d.getTime()));
}

