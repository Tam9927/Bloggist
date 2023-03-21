"use strict";
const js2xmlparser = require("js2xmlparser");
const json2html = require("json-to-html");


function sendJsonResponse (res, status, data) {
    return res.status(status).json(data);
}

function sendXmlResponse (res, status, data) {
    //res.setHeader('Content-Type', 'application/xml');
    return res.status(status).send(js2xmlparser.parse(data));
}

function sendHtmlResponse ( res, status, data) {
    //res.setHeader('Content-Type', 'text/html');
    let template = {'<>':'div'};
    console.log(json2html.render(data));
    return res.status(status).send(json2html.render(data));
}

function sendTextResponse(res,status,data) {

const text = JSON.stringify(data);

return res.status(status).send(text);


}


function sendResponse (req,res, status, data) {
    if(req.headers.accept == 'application/xml'){
        this.sendXmlResponse(res, status, data);
    }
    else if(req.headers.accept == 'text/html'){
        this.sendHtmlResponse(res, status, data);
    }

    else if(req.headers.accept == 'text/text'){

        this.sendTextResponse(res,status,data);
    }

        this.sendJsonResponse(res, status, data);
    
 
}




module.exports =  {

    sendXmlResponse,
    sendJsonResponse,
    sendHtmlResponse,
    sendResponse,
    sendTextResponse

}