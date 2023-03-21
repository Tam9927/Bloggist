'use strict'
const js2xmlparser = require("js2xmlparser");
const json2html = require('json-to-html');

class ConstentNegotiation{
    constructor(res, status, data) {
        this.res = res;
        this.status = status;
        this.data = data;
    }

sendXMLResponse(){

    const xmlData = js2xmlparser.parse("data", this.data);
    return this.res.status(this.status).send(xmlData);

}

sendTextResponse(){

    
const textData = JSON.stringify(this.data);
return this.res.status(this.status).send(textData);

}



sendJSONResponse(){


    return this.res.status(this.status).send(this.data);


}


sendHTMLResponse (){
    return this.res.status(this.statuscode).send(json2html(this.data));
}



sendResponse(){








}






}
