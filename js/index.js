var myBabyCount = 0;
var otherBabyCount = 0;
var momInfo = null;

// tabList is an array of objects including the following attributes:
// -tabId: it's the id of the tab
// -displayName: it's the name of the tab
// -type: 0-mom home; 1-my baby; 2-midwife home; 3-other baby   
// -babyId: index of the babyList array containing info on the baby (-1 if NA)
// -momId: Index of the momList array containing info on the mom (-1 if NA)

var tabList = new Array();
var momInnerTabList = new Array();

var tabVisible = 0;
var babyList = new Array();    //Midwife
var mybabyList = new Array();    //Mom


$(document).ready(function() {
/*
 * Request user to choose profile category in the option list:   0-mom; 1-mybaby; 2-midwife
 * Once profile is selected, left column updated as per profile
 */
    init();
    addProfileTab();
    addListener();

    $("#close").click(function() {
        $("#dialog-container").fadeOut();
    });


});


function init() {
    momInnerTabList[0] = {
        'tabId': 'momIT0',
        'displayName': 'Blood pressure'
    };
    momInnerTabList[1] = {
        'tabId': 'momIT1',
        'displayName': 'Blood sugar'
    };
    momInnerTabList[2] = {
        'tabId': 'momIT2',
        'displayName': 'Heartrate'
    };
}


/*  Hierarchy babyList table structure for mybabyList, babyList . e.g. 
 *  
 *   BabyList Table _
 *                   |    
 *                   |__baby1________________________
 *                   |           |                      |
 *                   |         |                     |
 *                   |     weight_table        temperature_table 
 *                   |  _______|_________     _______|______________
 *                   | |Weight|TimeStamp|     |Temperature|TimeStamp|
 *                   |    
 *                   |
 *                   |
 *                   |__baby2______________________ 
 *                   |......
 */ 
 

function acquireWeight(tabId) {
    //TODO This function should get the available local weight sensor and acquire
    //new data from it saving them in context db
    alert('acquire new weight for '+tabId);
}


function acquireTemp(tabId) {
    //TODO This function should get the available local temp sensor and acquire
    //new data from it saving them in context db
    alert('acquire new temp for '+tabId);
}


function heartRate(){

    alert("Reading heart Rate");
    //TODO: re-write following function
    
    var htmlMom = '';
    htmlMom += '<br><br>Heart Reading<br>';
    htmlMom += 'Name: <input type=\'text\' id=\'myBabyName\'><br>';
    //TODO the input type date is supported by Chrome but not by Firefox
    htmlMom += 'Birthdate: <input type=\'date\' id=\'myBabyDate\'><br>';
    //htmlMom += '<input type=\'button\' value=\'Save\' onclick=\'saveMyBaby()\'>';
    $('#heartRate').html(htmlMom);
}


function momWeight() {
    alert("Reading Mom Weight");
}


function momTemp() {
    alert("Reading Mom temperature");
}


function showWeight(tabId) {
    //TODO This function should connect to context api (local for my baby, remote
    //for other baby) and retrieve historical data for weight
    alert('show weight for '+tabId);
}


function showTemp(tabId) {
    //TODO This function should connect to context api (local for my baby, remote
    //for other baby) and retrieve historical data for temp
    alert('show temp for '+tabId);
}


//more on other sensors
//end of DB functions
 
  
function getMyBabies(cbk) {
    //mybabyList = queryMyBabyInfo();
    queryMyBabyInfo(cbk);
}


function getOtherBabies(cbk) {
    queryBabyInfo(cbk); 
//    babyList = queryBabyInfo(); 
//    
//    if(babyList.length > 0)
//    {
//        //console.log("babyList.length", babyList.length); 
//        for (var i = 0; i <  babyList.length; i++)
//        {
//            //console.log("baby name:", babyList[i].name);
//            addBabyTab(babyList[i].name, false, i);
//        }
//    }
}


function addMyBaby() {
    var htmlCode = '';
    htmlCode += '<br><br>Add my new baby<br>';
    htmlCode += 'Name: <input type=\'text\' id=\'myBabyName\'><br>';
    //TODO the input type date is supported by Chrome but not by Firefox
    htmlCode += 'Birthdate: <input type=\'date\' id=\'myBabyDate\'><br>';
    htmlCode += '<input type=\'button\' value=\'Save\' onclick=\'saveMyBaby()\'>';
    $('#dialog-content').html(htmlCode);
    $("#dialog-container").fadeIn(1000);
}


function saveMyBaby() {
    console.log("saveMyBaby");
    var babyName = $('#myBabyName').val();
    console.log("babyName", babyName );
    var babyDate = $('#myBabyDate').val();
    $('#addMyBaby').html('');
    var babyInfo = {};
    babyInfo.name = babyName;
    babyInfo.birthdate = new Date(babyDate);
    mybabyList.push(babyInfo);
    $("#dialog-container").fadeOut();
    addBabyTab(babyInfo.name, true, mybabyList.length-1);
    refreshTabLinks();
}

/*
function saveNewBaby() {
    var babyName = $('#newBabyName').val();
    var babyDate = $('#newBabyDate').val();
    $('#addNewBaby').html('');
    var babyInfo = {};
    babyInfo.name = babyName;
    babyInfo.birthdate = new Date(babyDate);
    babyList.push(babyInfo);
    console.log(babyInfo);
    addBabyTab(babyInfo.name, false, babyList.length-1);
    refreshTabLinks(2);
}
*/

function addBabyTab(tabName, isMine, babyId) {
    //alert('addBabyTab - name: '+tabName+', babyId: '+babyId);
    var tabId;
    if(isMine) {
        tabId = 'myBaby'+myBabyCount+'Tab';
        myBabyCount ++;
        console.log("myBabyCount:", myBabyCount);
    }
    else {
        tabId = 'otherBaby'+otherBabyCount+'Tab';
        otherBabyCount ++;
        console.log("otherBabyCount:", otherBabyCount);
        
    }
    var tabLinkName = tabId+'Link';
    //Prepare tab content
    var tabAWB = tabId+'AWB';
    var tabATB = tabId+'ATB';
    var tabSWB = tabId+'SWB';
    var tabSTB = tabId+'STB';
    var tabRB = tabId+'RB';
    var htmlCode = '';
    htmlCode += '<div id=\''+tabId+'\'>';
    htmlCode += '<br><br>';
    if(isMine) {
        //console.log("isMine:", mybabyList[babyId].name);
        htmlCode += 'Name: '+mybabyList[babyId].name+'<br>';
        
        htmlCode += 'Birthdate: '+mybabyList[babyId].birthdate.toDateString()+'<br>';
    }
    else
    {
        htmlCode += 'Name: '+babyList[babyId].name+'<br>';
        htmlCode += 'Birthdate: '+babyList[babyId].birthdate.toDateString()+'<br>';
    }    
    var today = new Date();
    if(isMine) {    
        var age_ms = today - mybabyList[babyId].birthdate;
    }
    else
        var age_ms = today - babyList[babyId].birthdate;
    var age_totdays = Math.floor(age_ms/(1000*3600*24));
    if(isMine) {
        var age_days = today.getDate() - mybabyList[babyId].birthdate.getDate();
        var age_months = today.getMonth() - mybabyList[babyId].birthdate.getMonth();
        var age_years = today.getFullYear() - mybabyList[babyId].birthdate.getFullYear();
    }
    else {
        var age_days = today.getDate() - babyList[babyId].birthdate.getDate();
        var age_months = today.getMonth() - babyList[babyId].birthdate.getMonth();
        var age_years = today.getFullYear() - babyList[babyId].birthdate.getFullYear();
    }    
    if(age_days<0) {
        age_months --;
    }
    if(age_months<0) {
        age_months += 12;
        age_years--;
    }
    htmlCode += 'Age (total days): '+age_totdays+'<br>';
    htmlCode += 'Age : '+age_years+' years, '+age_months+' months<br>';
    htmlCode += '<br><br>';
    if(isMine) {
        htmlCode += '<input type=\'button\' value=\'Acquire weight\' id=\''+tabAWB+'\'><br>';
        htmlCode += '<input type=\'button\' value=\'Acquire temperature\' id=\''+tabATB+'\'><br>';
        htmlCode += '<br><br>';
    }
    htmlCode += '<input type=\'button\' value=\'Show weight\' id=\''+tabSWB+'\'><br>';
    htmlCode += '<input type=\'button\' value=\'Show temperature\' id=\''+tabSTB+'\'><br>';
    htmlCode += '<br><br>';
    htmlCode += '<input type=\'button\' value=\'Remove\' id=\''+tabRB+'\'><br>';
    htmlCode += '</div>';
    //Add div to main div and hide it
    //alert('addBabyTab - 05');
    $('#target').append(htmlCode);
    //Add listeners for buttons
    if(isMine) {
        (function(ln, tn) {
            $('#'+ln).click(function() {acquireWeight(tn)});
        })(tabAWB, tabId);
        (function(ln, tn) {
            $('#'+ln).click(function() {acquireTemp(tn)});
        })(tabATB, tabId);
    }
    (function(ln, tn) {
        $('#'+ln).click(function() {showWeight(tn)});
    })(tabSWB, tabId);
    (function(ln, tn) {
        $('#'+ln).click(function() {showTemp(tn)});
    })(tabSTB, tabId);
    (function(ln, tn) {
        $('#'+ln).click(function() {removeTab(tn)});
    })(tabRB, tabId);
    $('#'+tabId).hide();
    //Add to tab list
    var tabElement = {};
    tabElement.tabId = tabId;
    tabElement.displayName = tabName;
    if(isMine) {
        tabElement.type = 1;
    }
    else {
        tabElement.type = 3;
    }
    
    //alert('addBabyTab - 05');
    if(isMine) {
        tabList.push(tabElement);
        refreshTabLinks();
    }
    else {
        // push before "about mom" tab
        tabList.splice(1, 0, tabElement);
        refreshTabLinks();
    } 
}


function refreshTabLinks() {
    //alert('refreshTabLinks - 01');
    $('#leftcolumn').html('');
    var prevType = tabList[0].type;
    for(var i=0; i<tabList.length; i++) {
        var tabId = tabList[i].tabId;
        var link = tabId+'Link';
        var htmlCode = '';
        if(prevType != tabList[i].type) {
            if(prevType == 0) {
                htmlCode += '<br>My babies<br>';
            }
            else if(prevType == 2) {
                htmlCode += '<br>Babies<br>';
            }
            else {
                htmlCode += '<br><br>';
            }
            prevType = tabList[i].type;
        }
        htmlCode += '<input type=\'button\' value=\''+tabList[i].displayName+'\' id=\''+link+'\'><br>';
        $('#leftcolumn').append(htmlCode);
        (function(ln, tn) {
            $('#'+ln).click(function() {displayTab(tn)});
        })(link, tabId);
    }
}


function displayTab(tabId) {
    //alert(tabId);
    for (i in tabList) {
        $('#'+tabList[i].tabId).hide();
    }
    $('#'+tabId).show();
}


function removeTab(tabId) {
    $('#'+tabId).remove();
    for(var i=0; i<tabList.length; i++) {
        if(tabList[i].tabId == tabId) {
            tabList.splice(i, 1);
        }
    }
    refreshTabLinks();
    displayTab(tabList[0].tabId);
}


function addProfileTab() {
    var htmlCode = '';
    htmlCode += '<table id=\'configuration_table\' border=0>';
    htmlCode += '<tr>'
    htmlCode += '<td>Profile</td>';
    htmlCode += '</tr>';
    htmlCode += '<tr>';
    htmlCode += '<td>';
    htmlCode += '<select id=\'profile\'>';
    htmlCode += '<option value=\'Profile\'>';
    htmlCode += 'Choose Your Profile';
    htmlCode += '</option>';
    htmlCode += '<option value=\'Mom\'>';
    htmlCode += 'Mom';
    htmlCode += '</option>';
    htmlCode += '<option value=\'Midwife\'>';
    htmlCode += 'Midwife';
    htmlCode += '</option>';
    htmlCode += '</select>';
    htmlCode += '</td>';
    htmlCode += '</tr>';
    
    //add enrol button - to enroll with health Hub
    $('#rightcolumn').append(htmlCode);
}


function addListener() {

    var profile = document.getElementById("profile");
    if (profile.addEventListener) {
        // DOM2 standard
        profile.addEventListener("change", changeHandler, false);
    }
    else if (profile.attachEvent) {
        // IE fallback
        profile.attachEvent("onchange", changeHandler);
    }
    else {
        // DOM0 fallback
        profile.onchange = changeHandler;
    } 
}


function changeHandler(event){
    launchPage();
}


function initMomInfo() {
    if(momInfo == null) {
        //momInfo = queryMomInfo();
        queryMomInfo(function(res) {
            momInfo = res;
            checkMomInfo();
        });
    }
    else {
        checkMomInfo();
    }
}


function checkMomInfo() {
    if(momInfo == null) {
        //If momInfo not stored, then ask for it...
        askMomInfo();
    }
    else {
        addMomTabs();
    }
    //refreshTabLinks();
    //displayTab(tabList[0].tabId);
}


function askMomInfo() {
    var htmlCode = '';
    htmlCode += 'Please, insert your informations<br><br>';
    htmlCode += 'Mother name: <input type=\'text\' id=\'momMotherName\'><br>';
    htmlCode += 'Mother birthdate: <input type=\'date\' id=\'momMotherDate\'><br>';
    htmlCode += '<input type=\'button\' value=\'Save\' onclick=\'saveMomInfo()\'>';
    $('#dialog-content').html(htmlCode);
    $("#dialog-container").fadeIn(1000);
}


function saveMomInfo() {
    //alert('saveMomInfo');
    momInfo = {};
    momInfo.name = $('#momMotherName').val();
    momInfo.birthdate = new Date($('#momMotherDate').val());
    //TODO check that input values are valid
    storeMomInfo(momInfo);
    $("#dialog-container").fadeOut();
    addMomTabs();
}


function addMomTabs() {
    //alert('addMomTabs - 01');
    //Retrieves tab list for mom: mom home tab and her babies
    tabList = new Array();

    $('#target').html('');

    var htmlCode = '';
    htmlCode += '<div id=\'momTab\'>';
    htmlCode += 'My name: '+momInfo.name+'<br>';
    htmlCode += 'My birthdate: '+momInfo.birthdate.toDateString()+'<br>';
    htmlCode += '<br><br>';
    htmlCode += '<div id=\'momInnerTabs\'>';
    htmlCode += '</div>';
    htmlCode += '<div id=\'momInnerGraphs\'>';
    htmlCode += '</div>';
    htmlCode += '<br><br>';
    htmlCode += '<input type=\'button\' value=\'Add my baby\' onclick=\'addMyBaby()\'>';
    htmlCode += '<div id=\'addMyBaby\'>';
    htmlCode += '</div>';
    htmlCode += '<br><br>';
    htmlCode += '<input type=\'button\' value=\'Change my info\' onclick=\'askMomInfo()\'>';
    htmlCode += '</div>';
    $('#target').append(htmlCode);

    //Mom page inner tabs
    htmlCode = '';
    htmlCode += '<table><tr>';
    $('#momInnerTabs').html(htmlCode);
    for(var i=0; i<momInnerTabList.length; i++) {
        var tabId = momInnerTabList[i].tabId;
        var link = tabId+'Link';
        htmlCode = '';
        htmlCode += '<td>';
        htmlCode += '<input type=\'button\' value=\''+momInnerTabList[i].displayName+'\' id=\''+link+'\'><br>';
        htmlCode += '</td>';
        $('#momInnerTabs').append(htmlCode);
        (function(ln, tn) {
            $('#'+ln).click(function() {displayMomInnerTab(tn)});
        })(link, tabId);
    }
    htmlCode = '</tr></table>';
    $('#momInnerTabs').append(htmlCode);

    var tabElement = {};
    tabElement.tabId = 'momTab';
    tabElement.displayName = 'About me';
    tabElement.type = 0;
    tabElement.babyId = -1;
    tabList.push(tabElement);

    for(var i=0; i<mybabyList.length; i++) {
        addBabyTab(mybabyList[i].name, true, i);
    }

    refreshTabLinks();
    displayTab(tabList[0].tabId);
}


function displayMomInnerTab(tn) {
    alert(tn);
}


function addMidwifeTabs() {
    //alert('addMidwifeTabs - 01');
    //Retrieves tab list for midwife: midwife home tab and her babies
    tabList = new Array();

    $('#target').html('');

    var htmlCode = '';
    htmlCode += '<div id=\'midwifeTab\'>';
    htmlCode += 'midwife info<br>';
    htmlCode += '<input type=\'button\' value=\'Connect new baby\' onclick=\'connectNewBaby()\'>';
    htmlCode += '<div id=\'connectNewBaby\'>';
    htmlCode += '</div>';
    htmlCode += '<br><br>';
    htmlCode += '</div>';
    $('#target').append(htmlCode);

    var tabElement = {};
    tabElement.tabId = 'midwifeTab';
    tabElement.displayName = 'Midwife home';
    tabElement.type = 2;
    tabElement.babyId = -1;
    tabList.push(tabElement);

    for(var i=0; i<babyList.length; i++) {
        addBabyTab(babyList[i].name, false, i);
    }
}


function launchPage(){
    var profileVal = $('#profile').val();
    //alert("profile is:"+ profileVal);
    $('#target').html('');
    $('#leftcolumn').html('');
    if(profileVal === "Mom") {
        //Retrieve my baby list
        getMyBabies(function(res) {
            mybabyList = res;
            //Constructs tabList for mom profile
            initMomInfo();
        });
    }
    else if (profileVal === "Midwife") {
        //Retrieve midwife's baby list
        getOtherBabies(function(res) {
            babyList = res;
            if(babyList.length > 0) {
                //console.log("babyList.length", babyList.length); 
                for (var i = 0; i <  babyList.length; i++) {
                    //console.log("baby name:", babyList[i].name);
                    addBabyTab(babyList[i].name, false, i);
                }
            }
            //Constructs tabList for midwife profile
            addMidwifeTabs();

            refreshTabLinks();
            displayTab(tabList[0].tabId);
        });
    }
    else if (profileVal === "Profile") {
        //$('#target').html('');
        //$('#leftcolumn').html('');
    }
}


function connectNewBaby() {
    //TODO This should connect to a remote db
    var htmlCode = '';
    htmlCode += '<br><br>Connect to a new baby<br>';
    htmlCode += 'Baby name: <input type=\'text\' id=\'midwifeBabyName\'><br>';
    htmlCode += 'Mother name: <input type=\'text\' id=\'midwifeMotherName\'><br>';
    htmlCode += '<input type=\'button\' value=\'Connect\' onclick=\'newBabyConnection()\'>';
    $('#connectNewBaby').html(htmlCode);
}


function newBabyConnection() {
    var babyName = $('#midwifeBabyName').val();
    var motherName = $('#midwifeMotherName').val();
    alert('New baby connection with baby '+babyName+' and mother '+motherName);
    connectToBaby(babyName, motherName);
}


