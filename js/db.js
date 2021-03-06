
var serviceList;
var sensorData = new Array();


function queryBabyInfo(cbk) {
    //TODO Retrieve midwife baby list from db
    var result = new Array();

    //TODO remove this part - it's temporary while baby list is not saved somewhere...
    var babyInfo = {};
    babyInfo.name = 'Gollum';
    babyInfo.surname = 'Gollum';
    babyInfo.birthdate = new Date(2013, 2, 12);
    babyInfo.motherName = 'Elizabeth';
    babyInfo.motherSurname = 'Fuller';
    babyInfo.motherBirthdate = new Date(1952, 3, 5);
    result.push(babyInfo);

    babyInfo = {};
    babyInfo.name = 'Sam';
    babyInfo.surname = 'Gamgee';
    babyInfo.birthdate = new Date(2012, 11, 7);
    babyInfo.motherName = 'Vilma';
    babyInfo.motherSurname = 'Truman';
    babyInfo.motherBirthdate = new Date(1973, 8, 26);
    result.push(babyInfo);

    babyInfo = {};
    babyInfo.name = 'Pippin';
    babyInfo.surname = 'Took';
    babyInfo.birthdate = new Date(2012, 4, 28);
    babyInfo.motherName = 'Ada';
    babyInfo.motherSurname = 'Berthod';
    babyInfo.motherBirthdate = new Date(1986, 1, 9);
    result.push(babyInfo);

    cbk(result);
    //return result;
}


function queryMyBabyInfo(cbk) {
        
    //TODO Retrieve my baby list from db
    var result = new Array();

    //TODO remove this part - it's temporary while baby list is not saved somewhere...
    var babyInfo = {};
    babyInfo.name = 'Frodo';
    babyInfo.surname = 'Baggins';
    babyInfo.birthdate = new Date(2013, 5, 20);
    result.push(babyInfo);

    cbk(result);
    //return result;
}


function queryMomInfo(cbk) {
    var result = null;
    serviceList = new Array();

/*
    try {
    webinos.discovery.findServices(
        //new ServiceType("http://webinos.org/api/*"),
        new ServiceType("*"),
        { onFound : function (ref) {
            //alert('service found: '+ref.api);
            serviceList.push(ref.api);
            var htmlCode = 'ServiceList: ';
            for(var i = 0; i<serviceList.length; i++) {
                htmlCode += serviceList[i]+' - ';
            }
            $('#footer').html(htmlCode);
        }
    });
    }
    catch(e) {
        alert('error in find services');
    }
*/

    result = {};
    result.name = 'Nicole';
    result.surname = 'Letterman';
    result.birthdate = new Date(77, 11, 19);

    cbk(result);
    //return result;
}


function storeMomInfo(mi) {
}


function storeData(index, type, timestamp, sensorValues) {
    //TODO Store acquired data in the correct db
    //alert('Storing data for baby '+index+' and sensor '+sensorType+': '+timestamp.toDateString()+' - '+sensorValues[0]);
    if(sensorData[index] == null) {
        sensorData[index] = new Array();
    }
    if(sensorData[index][type] == null) {
        sensorData[index][type] = generateRndData();
    }
    sensorData[index][type].timestamp.push(timestamp);
    sensorData[index][type].values.push(sensorValues[0]);
}


function retrieveData(index, type) {
    if(sensorData[index] == null) {
        sensorData[index] = new Array();
    }
    if(sensorData[index][type] == null) {
        // TODO Should retrieve data from db and not from rnd function
        sensorData[index][type] = generateRndData();
    }
    return sensorData[index][type];
}


function generateRndData() {
    var result = {};
    result.timestamp = new Array();
    result.values = new Array();

    //TODO Should query db to retrieve data
/* 
    //Generating some random values for test
    var rndYear = 2012-Math.floor(Math.random()*2);
    var rndMonth = Math.floor(Math.random()*12)+1;
    var rndDay = Math.floor(Math.random()*28)+1;
    var rndVal = Math.floor(Math.random()*20)+20;
    var incDay, incVal;
    for(var i=0; i<30; i++) {
        incDay = Math.floor(Math.random()*7)+1;
        incVal = Math.floor(Math.random()*5)-2;
        rndDay += incDay;
        if(rndDay > 28) {
            rndDay -= 28;
            rndMonth += 1;
            if(rndMonth > 12) {
                rndMonth -= 12;
                rndYear += 1;
            }
        }
        rndVal += incVal;
        result.timestamp.push(new Date(rndYear, rndMonth, rndDay));
        result.values.push(rndVal);
    }
*/
    //Generating some random values for test
    var now = new Date();
    var rndYear = now.getFullYear();
    var rndMonth = now.getMonth();
    var rndDay = now.getDate();
    var rndH = now.getHours();
    var rndm = now.getMinutes();
    //alert('start date: year '+rndYear+', month '+rndMonth+', day '+rndDay);
    var rndVal = Math.floor(Math.random()*20)+20;
    var incm, incVal;
    for(var i=0; i<80; i++) {
        incm = Math.floor(Math.random()*1000)+1;
        incVal = Math.floor(Math.random()*5)-2;
        rndm -= incm;
        while(rndm < 0) {
            rndm += 60;
            rndH--;
        }
        if(rndH < 0) {
            rndH += 24;
            rndDay--;
            if(rndDay < 1) {
                rndDay = 28;
                rndMonth -= 1;
                if(rndMonth < 0) {
                    rndMonth = 11;
                    rndYear -= 1;
                }
            }
        }
        rndVal += incVal;
        result.timestamp.unshift(new Date(rndYear, rndMonth, rndDay, rndH, rndm, 0));
        result.values.push(rndVal);
    }
    return result;
}


