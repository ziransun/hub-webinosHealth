
function connectToBaby(babyName, motherName) {
    //TODO Connect to the pzh of mother and ask service sharing of baby db
    // Likely this func is async and can take long time to end - how to handle this???
    //alert('Connect to baby '+babyName+' and mom '+motherName);

    webinos.dashboard
        .open({
                module: 'people'
            }, function(){
                //alert('done');
                }
        )
        .onAction(function (data) {
            alert('action done: '+JSON.stringify(data));
        });

}

