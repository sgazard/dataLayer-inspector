function showMeTheDataLayer(){
    var htmlformatting = {
        'pre':'<pre style="font-family:courier new !important;background-color:#EEEEEE;border:1px solid #777777;color:#000000 !important;line-height:1em;margin:3px 0 0 0;font-size:0.75em;">replace</pre>'
        ,'table':'<table id="replace_id">'
        ,'thead':'<thead style="background-color:#CCddCC;">'
        ,'tr':'<tr><td style="vertical-align:top">'
        // to get around injecting stylesheets
        ,'style':'<style type"text/css">tr:hover{background-color:;}<style>'
    };
    var stringInfo = `${htmlformatting.pre.replace('replace','dataLayer Inspector')}`;
    var ignoreStrings = [
        'gtm.js'
        ,'gtm.dom'
        ,'gtm.load'
        ,'gtm.scrollDepth'
    ];
    var elID = 'showMeTheDataLayer';
    var theID = document.getElementById(elID);
    if(!theID){
        var theID = document.createElement('div');
        theID.id=elID;
        theID.style='position:absolute;bottom:15px;left:15px;border:1px solid red;z-index:1000000000000;padding:4px;background-color:#ecddcc;max-width:95%';
        document.body.appendChild(theID);
    }

    // blank this out as needed
    theID.innerHTML = '';


    if(!window.dataLayer){
        stringInfo += `${htmlformatting.pre.replace('replace','no dataLayer found')}`;
    }else{
        // sure this could be done with creating a table but simpler for a bookmarklet to simply dump into HTML
        stringInfo += '<table id="">';
        stringInfo += `${htmlformatting.thead}<tr><td>Event</td><td>Value</td></tr></thead>`;
        var dl = window.dataLayer;
        var datalayerLen = dl.length;


        for( let i=0;i<datalayerLen;i++){
            console.log(`looking at ${i}`);
            if(!dl.hasOwnProperty(i) ||showMeTheDataLayerignorable(dl[i].event,ignoreStrings)){continue;}
            if(dl[i].event){
                stringInfo += `${htmlformatting.tr}${dl[i].event}</td><td>${htmlformatting.pre.replace('replace',JSON.stringify(dl[i],null,2))}</td></tr>`;
            }
            else{
                stringInfo += `${htmlformatting.tr}no event</td><td>${htmlformatting.pre.replace('replace',JSON.stringify(dl[i],null,2))}</td></tr>`;
            }
        }
        stringInfo +='</table>';
    }

    theID.innerHTML =stringInfo;


}
function showMeTheDataLayerignorable(index,ignoreList){
    if(ignoreList.length===0){return false;}
    for(var i=0;i<ignoreList.length;i++){
        if(index === ignoreList[i]){
            console.log(`ignoring ${index}`);
            return true;
        }
    }
}

showMeTheDataLayer();
