
var myBabyCount = 0;
var otherBabyCount = 0;

// tabList is an array of objects including the following attributes:
// -tabCat: tab category. 0-mom; 1-mybaby; 2-midwidfe    
// -tabId: it's the id of the tab
// -displayName: it's the name of the tab
// -type: 0-home tab; 1-my baby; 2-other baby
// -babyId: index of the babyList array containing info on the baby (-1 if NA)
// -momId: Index of the momList array containing info on the mom (-1 if NA)

var tabList = new Array();

var tabVisible = 0;
var babyList = new Array();

$(document).ready(function() {

   /* addHomeTab();
    getMyBabies();
    getOtherBabies(); */
});


function getMyBabies() {
    //TODO Retrieve my babies from db and adds them to tabList array and to babyList
    //The following is only for test
    var babyInfo = {};
    babyInfo.name = 'Frodo';
    babyInfo.birthdate = new Date(2013, 5, 20);
    babyList.push(babyInfo);
    alert('babyList.length '+babyList.length);
    addBabyTab(babyInfo.name, true, babyList.length-1);
}


function getOtherBabies() {
    //TODO Retrieve other babies from db and add them to tabList array and to babyList
    //The following is only for test
    var babyInfo = {};
    babyInfo.name = 'Gollum';
    babyInfo.birthdate = new Date(2013, 3, 7);
    babyList.push(babyInfo);
    addBabyTab(babyInfo.name, false, babyList.length-1);
}


function addHomeTab() {

    var htmlCode = '';
    htmlCode += '<div id=\'homePageTab\' class=\'tabScreen\'>';
    htmlCode += '<input type=\'button\' value=\'Add my baby\' onclick=\'addMyBaby()\'>';
    htmlCode += '<div id=\'addMyBaby\'>';
    htmlCode += '</div>';
    htmlCode += '<br><br>';
    htmlCode += '<input type=\'button\' value=\'Add other baby (midwife)\' onclick=\'addOtherBaby()\'>';
    htmlCode += '<div id=\'addOtherBaby\'>';
    htmlCode += '</div>';
    htmlCode += '</div>';
    $('#target').append(htmlCode);
    var tabElement = {};
    tabElement.tabId = 'homePageTab';
    tabElement.displayName = 'Home Page';
    tabElement.type = 0;
    tabElement.babyId = -1;
    tabList.push(tabElement);
    //Add to tab list
    htmlCode = '<input type=\'button\' value=\'Home page\' id=\'homePageTabLink\'>';
    $('#leftcolumn').append(htmlCode);
    $('#homePageTabLink').click(function() {displayTab('homePageTab')});
}


function addNewMom() {
	
	//TODO This function should search for a remote context service exporting
    //data for a baby
    console.log("addNewMom is called");
    var htmlCode = '';
    htmlCode += '<br><br>Add new mom<br>';
    htmlCode += 'Name: <input type=\'text\' id=\'<MomName\'><br>';
    //TODO the input type date is supported by Chrome but not by Firefox
    htmlCode += 'Birthdate: <input type=\'date\' id=\'momBabyDate\'><br>';
    htmlCode += '<input type=\'button\' value=\'Save\' onclick=\'savemom()\'>';
    $('#addNewMom').html(htmlCode);
}



function addMyBaby() {
    var htmlCode = '';
    htmlCode += '<br><br>Add my new baby<br>';
    htmlCode += 'Name: <input type=\'text\' id=\'myBabyName\'><br>';
    //TODO the input type date is supported by Chrome but not by Firefox
    htmlCode += 'Birthdate: <input type=\'date\' id=\'myBabyDate\'><br>';
    htmlCode += '<input type=\'button\' value=\'Save\' onclick=\'saveMyBaby()\'>';
    $('#addMyBaby').html(htmlCode);
}


function addOtherBaby() {
    //TODO This function should search for a remote context service exporting
    //data for a baby
    console.log("addOtherBaby is called");
    var htmlCode = '';
    htmlCode += '<br><br>Add new baby<br>';
    htmlCode += 'Name: <input type=\'text\' id=\'otherBabyName\'><br>';
    //TODO the input type date is supported by Chrome but not by Firefox
    htmlCode += 'Birthdate: <input type=\'date\' id=\'otherBabyDate\'><br>';
    htmlCode += '<input type=\'button\' value=\'Save\' onclick=\'saveOtherBaby()\'>';
    $('#addOtherBaby').html(htmlCode);
}


function saveMyBaby() {
    var babyName = $('#myBabyName').val();
    var babyDate = $('#myBabyDate').val();
    $('#addMyBaby').html('');
    var babyInfo = {};
    babyInfo.name = babyName;
    babyInfo.birthdate = new Date(babyDate);
    babyList.push(babyInfo);
    addBabyTab(babyInfo.name, true, babyList.length-1);
}


function saveOtherBaby() {
    var babyName = $('#otherBabyName').val();
    var babyDate = $('#otherBabyDate').val();
    $('#addOtherBaby').html('');
    var babyInfo = {};
    babyInfo.name = babyName;
    babyInfo.birthdate = new Date(babyDate);
    babyList.push(babyInfo);
    addBabyTab(babyInfo.name, false, babyList.length-1);
}

function addBabyTab(tabName, isMine, babyId) {
    //alert('addBabyTab - name: '+tabName+', babyId: '+babyId);
    var tabId;
    if(isMine) {
        tabId = 'myBaby'+myBabyCount+'Tab';
        myBabyCount ++;
    }
    else {
        tabId = 'otherBaby'+otherBabyCount+'Tab';
        otherBabyCount ++;
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
    htmlCode += 'Name: '+babyList[babyId].name+'<br>';
    htmlCode += 'Birthdate: '+babyList[babyId].birthdate.toDateString()+'<br>';
    var today = new Date();
    var age_ms = today - babyList[babyId].birthdate;
    var age_totdays = Math.floor(age_ms/(1000*3600*24));
    var age_days = today.getDate() - babyList[babyId].birthdate.getDate();
    var age_months = today.getMonth() - babyList[babyId].birthdate.getMonth();
    var age_years = today.getFullYear() - babyList[babyId].birthdate.getFullYear();
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
        tabElement.type = 2;
    }
    //Insert my baby before other babies
    if(isMine) {
        var i=0;
        while(i<tabList.length && tabList[i].type != 2) {
            i++;
        }
        tabList.splice(i, 0, tabElement);
    }
    else {
        tabList.push(tabElement);
    }
    refreshTabLinks();
}


function refreshTabLinks() {
    $('#leftcolumn').html('');
    for(var i=0; i<tabList.length; i++) {
        var tabId = tabList[i].tabId;
        var link = tabId+'Link';
        var htmlCode = '<input type=\'button\' value=\''+tabList[i].displayName+'\' id=\''+link+'\'><br>';
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

function changeHandler(event){
    var index;
    index = this.selectedIndex;

    if (index >= 0 && this.options.length > index)
    {
      // Get the new value
      selected = this.options[index].value;
    }
    return selected;
}

if (profile.addEventListener) 
{
    // DOM2 standard
    profile.addEventListener("change", changeHandler, false);
}
else if (profile.attachEvent) 
{
    // IE fallback
    profile.attachEvent("onchange", changeHandler);
}
else 
{
    // DOM0 fallback
    profile.onchange = changeHandler;
}


function launchPage(){
	var profile = document.getElementById('profile').value;
	console.log("profile is:", profile);
	if(profile ==="Mom")
	{
		var htmlMom = '';
	    htmlMom += '<div id=\'momPageTab\' class=\'tabScreen\'>';
	    htmlMom += '<input type=\'button\' value=\'Heart Rate\' onclick=\'heartRate()\'>';
	    htmlMom += '<div id=\'heartRate\'>';
	    htmlMom += '</div>';
	    htmlMom += '<br><br>';
	    
	    htmlMom += '<input type=\'button\' value=\'Weight\' onclick=\'momWeight()\'>';
	    htmlMom += '<div id=\'momWeight\'>';
	    htmlMom += '</div>';
	    htmlMom += '<br><br>';
	    
	    htmlMom += '<input type=\'button\' value=\'Temperature\' onclick=\'momTemp()\'>';
	    htmlMom += '<div id=\'momTemp\'>';
	    htmlMom += '</div>';
	    htmlMom += '<br><br>';
	    
	    htmlMom += '</div>';
	    $('#target').html('');
	    $('#target').append(htmlMom);
	    var tabElement = {};
	    tabElement.tabId = 'momPageTab';
	    tabElement.displayName = 'My Health';
	    tabElement.type = 0;
	    tabElement.babyId = -1;
	    tabList.push(tabElement);
	    //Add to tab list
	    htmlMom = '<input type=\'button\' value=\'My Health\' id=\'momPageTabLink\'>';
	    $('#leftcolumn').html('');
	    $('#leftcolumn').append(htmlMom);  
	    $('#momPageTabLink').click(function() {displayTab('momPageTab')});
	   
	   //add history page
	    var htmlHistory = '';
		
	    htmlHistory += '<div id=\'historyPageTab\' class=\'tabScreen\'>';
	    
	    htmlHistory += '<input type=\'button\' value=\'Weight\' onclick=\'momWeight()\'>';
	    htmlHistory += '<div id=\'momWeight\'>';
	    htmlHistory += '</div>';
	    htmlHistory += '<br><br>';
	    
	    htmlHistory += '<input type=\'button\' value=\'Temperature\' onclick=\'momTemp()\'>';
	    htmlHistory += '<div id=\'momTemp\'>';
	    htmlHistory += '</div>';
	    htmlHistory += '<br><br>';
	    
	    htmlHistory += '</div>';
	    //$('#target').html('');
	    $('#target').append(htmlHistory);
	    var tabElement = {};
	    tabElement.tabId = 'historyPageTab';
	    tabElement.displayName = 'My History';
	    tabElement.type = 0;
	    tabElement.babyId = -1;
	    tabList.push(tabElement);
	    //Add to tab list
	    htmlHistory = '<br><input type=\'button\' value=\'My History\' id=\'historyPageTabLink\'></br>';
	    $('#historyPageTab').hide();
	    
	    $('#leftcolumn').append(htmlHistory);  
	    $('#historyPageTabLink').click(function() {displayTab('historyPageTab')});
	   //end history page
	    
	}
	else if (profile ==="My Baby")
	{
	  //loading Child page
		
		var htmlMybaby = '';
		
		htmlMybaby += '<div id=\'mybabyDetailsTab\' class=\'tabScreen\'>';
		
		htmlMybaby += '<input type=\'button\' value=\'Add my baby\' onclick=\'addMyBaby()\'>';
        htmlMybaby += '<div id=\'addMyBaby\'>';
        htmlMybaby += '</div>';
        htmlMybaby += '<br><br>';
        
        htmlMybaby += '<input type=\'button\' value=\'Get my baby\' onclick=\'getMyBaby()\'>';
        htmlMybaby += '<div id=\'getMyBaby\'>';
        htmlMybaby += '</div>';
        htmlMybaby += '<br><br>';
		
		htmlMybaby += '</div>';
		$('#target').html('');
	    $('#target').append(htmlMybaby);
	    var tabElement = {};
	    tabElement.tabId = 'mybabyDetailsTab';
	    tabElement.displayName = 'About my baby';
	    tabElement.type = 0;
	    tabElement.babyId = -1;
	    tabList.push(tabElement);
	    
	    //Add to tab list
	    htmlMybaby = '<input type=\'button\' value=\'About my baby\' id=\'mybabyDetailsTabLink\'>';
	    $('#leftcolumn').html('');
	    $('#leftcolumn').append(htmlMybaby);  
	    $('#mybabyDetailsTabLink').click(function() {displayTab('mybabyDetailsTab')});
		
		getMyBabies();
	}
	else if (profile === "Midwife")
	{
		//loading Midwife page
		
		var htmlnew = '';
	    htmlnew += '<div id=\'htmlNewTab\' class=\'tabScreen\'>';
	    //htmlnew += '<input type=\'button\' value=\'Baby\' onclick=\'newBaby()\'>';
	    htmlnew += '<input type=\'button\' value=\'Baby\' onclick=\'addOtherBaby()\'>';

	    //htmlnew += '<div id=\'newBaby\'>';
	    htmlnew += '<div id=\'addOtherBaby\'>';
	    
	    htmlnew += '</div>';
	    htmlnew += '<br><br>';
	    
	    htmlnew += '<input type=\'button\' value=\'Mom\' onclick=\'addNewMom()\'>';
	    htmlnew += '<div id=\'addNewMom\'>';
	    htmlnew += '</div>';
	    htmlnew += '<br><br>';
	    
	    htmlnew += '</div>';
	    $('#target').html('');
	    $('#target').append(htmlnew);
	    var tabElement = {};
	    tabElement.tabId = 'htmlNewTab';
	    tabElement.displayName = 'Add New';
	    tabElement.type = 0;
	    tabElement.babyId = -1;
	    tabList.push(tabElement);
	    htmlnew = '<input type=\'button\' value=\'Add New\' id=\'htmlNewTabLink\'>';
		
		$('#leftcolumn').html('');
		$('#leftcolumn').append(htmlnew);
		$('#htmlNewTabLink').click(function() {displayTab('htmlNewTab')}); 
		
		var htmlMidwife = '';
		htmlMidwife += '<br></br>';
		htmlMidwife += '<text>Baby List</text>';
		
		htmlMidwife += '<br> <select id=\'babyList\'>';
		htmlMidwife += '<option value=\'Choose baby\'>Choose baby</option>';
        htmlMidwife += '<option value=\'Adam\'>Adam</option>';
		htmlMidwife += '<option value=\'Bob\'>Bob</option>';
        htmlMidwife += '<option value=\'Carl\'>Carl</option>';
        htmlMidwife += '</select>';
        htmlMidwife +=  '</br>';
		
		htmlMidwife += '<br><text>Mom List</text>';		
		htmlMidwife += '<br> <select id=\'momList\'>';
		htmlMidwife += '<option value=\'Choose mom\'>Choose mom</option>';
        htmlMidwife += '<option value=\'Alice\'>Alice</option>';
		htmlMidwife += '<option value=\'Beck\'>Beck</option>';
        htmlMidwife += '<option value=\'Carol\'>Carol</option>';
        htmlMidwife += '</select>';
        htmlMidwife +=  '</br>';
		
	    $('#leftcolumn').append(htmlMidwife);  
		
		var htmlbabies = '';
	    htmlbabies += '<div id=\'homePageTab\' class=\'tabScreen\'>';
	    htmlbabies += '<input type=\'button\' value=\'Weight\' onclick=\'momWeight()\'>';
	    htmlbabies += '<div id=\'momWeight\'>';
	    htmlbabies += '</div>';
	    htmlbabies += '<br><br>';
	    
	    htmlbabies += '<input type=\'button\' value=\'Temperature\' onclick=\'momTemp()\'>';
	    htmlbabies += '<div id=\'momTemp\'>';
	    htmlbabies += '</div>';
	    htmlbabies += '<br><br>';
	    
	    htmlbabies += '</div>';
	    //$('#target').html('');
	    $('#target').append(htmlbabies);
	    var tabElement = {};
	    tabElement.tabId = 'homePageTab';
	    tabElement.displayName = 'Baby Health';
	    tabElement.type = 0;
	    tabElement.babyId = -1;
	    tabList.push(tabElement);
	    htmlbabies = '<input type=\'button\' value=\'Baby Health\' id=\'homePageTabLink\'>'; 
	    // hide tab
        $('#homePageTab').hide();
	    
	    htmlbabies += '<br> <input type=\'button\' value=\'History\' onclick=\'history()\'> </br>';
		htmlbabies += '<br> <input type=\'button\' value=\'Share\' onclick=\'share()\'> </br>';
	    
	    //Add to tab list
	    $('#leftcolumn').append(htmlbabies);
	    $('#homePageTabLink').click(function() {displayTab('homePageTab')});  
	}
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

function share(){

	alert("Share with others");
}