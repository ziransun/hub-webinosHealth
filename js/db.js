
var serviceList;


function queryBabyInfo(cbk) {
    //TODO Retrieve midwife baby list from db
    var result = new Array();

    //TODO remove this part - it's temporary while baby list is not saved somewhere...
    var babyInfo = {};
    babyInfo.name = 'Gollum';
    babyInfo.birthdate = new Date(2013, 2, 12);
    result.push(babyInfo);

    babyInfo = {};
    babyInfo.name = 'Sam';
    babyInfo.birthdate = new Date(2012, 11, 7);
    result.push(babyInfo);

    babyInfo = {};
    babyInfo.name = 'Pipino';
    babyInfo.birthdate = new Date(2012, 4, 28);
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
    babyInfo.birthdate = new Date(2013, 5, 20);
    result.push(babyInfo);

    cbk(result);
    //return result;
}


function queryMomInfo(cbk) {
    var result = null;
    serviceList = new Array();

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

    result = {};
    result.name = 'Mommy name';
    result.birthdate = new Date(64, 1, 1);

    cbk(result);
    //return result;
}


function storeMomInfo(momInfo) {
}


function queryBabyWeight(baby_name) {
}


function queryBabyWeighthistory(baby_name, starting_time, end_time) {
}


function queryMyBabyWeight(baby_name) {
}


function queryMyBabyWeighthistory(baby_name, starting_time, end_time) {
}


function queryMomHR(mom_name) {
}


function queryMomHRHistory(mom_name, starting_time, end_time) {
}


