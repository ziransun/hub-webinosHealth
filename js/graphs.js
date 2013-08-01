
/* type is the type of data to be shown in graph:
   -0 = mom blood pressure
   -1 = mom blood sugar
   -2 = mom heartrate
   -10 = baby weight
   -11 = baby temperature
*/
 
function displayGraph(divName, type) {
    //alert('displayGraph - div is '+divName+', type is '+type);
    var htmlCode = '';
    if(type == 0) {
        htmlCode += '<br>Div for showing graph with mom blood pressure';
    }
    else if(type == 1) {
        htmlCode += '<br>Div for showing graph with mom blood sugar';
    }
    else if(type == 2) {
        htmlCode += '<br>Div for showing graph with mom heartrate';
    }
    else if(type == 10) {
        htmlCode += '<br>Div for showing graph with baby weight';
    }
    else if(type == 11) {
        htmlCode += '<br>Div for showing graph with baby temperature';
    }
    $('#'+divName).html(htmlCode);
}


