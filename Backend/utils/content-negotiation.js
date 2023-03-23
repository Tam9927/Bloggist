<<<<<<< Updated upstream
"use strict";

=======
>>>>>>> Stashed changes
const json2xml = require('xml-js');
const json2html = require('json-to-html');
const json2plain = require('json-to-plain-text');
const { json } = require('body-parser');

<<<<<<< Updated upstream
function sendJsonResponse(req, res, status, data){
    const jsonData = { 'data' : data };
    this.sendFinalResponse(req, res, status, jsonData);
}

function sendXmlResponse (req, res, status, data){
    var options = {compact: true, ignoreComment: true, spaces: 4};
    var xmlData = json2xml.json2xml(JSON.stringify(data), options);
    this.sendFinalResponse(req, res, status, xmlData);
}

function sendPlainResponse(req, res, status, data){
    var plainData = json2plain.toPlainText(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(req, res, status, plainData);
}

function sendHtmlResponse(req, res, status, data){
    var htmlData = json2html(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(req, res, status, htmlData);
}

function sendFinalResponse(req, res, status, data){
    res.status(status).send(data);
}


function sendResponse(req, res, status, data){
    if(req.headers.accept ==='application/xml' || req.headers.accept === 'text/xml'){
        return this.sendXmlResponse(req, res, status, data);
    }
    if(req.headers.accept === 'text/html'){
        return this.sendHtmlResponse(req, res, status, data);
    }
    if(req.headers.accept === 'text/plain'){
=======
function sendJsonResponse(req, res, status, data) {
    const jsonData = { data };
    this.sendFinalResponse(req, res, status, jsonData);
}

function sendXmlResponse(req, res, status, data) {
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const xmlData = json2xml.json2xml(JSON.stringify(data), options);
    this.sendFinalResponse(req, res, status, xmlData);
}

function sendPlainResponse(req, res, status, data) {
    const plainData = json2plain.toPlainText(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(req, res, status, plainData);
}

function sendHtmlResponse(req, res, status, data) {
    const htmlData = json2html(JSON.parse(JSON.stringify(data)));
    this.sendFinalResponse(req, res, status, htmlData);
}

function sendFinalResponse(req, res, status, data) {
    res.status(status).send(data);
}

function sendResponse(req, res, status, data) {
    if (req.headers.accept === 'application/xml' || req.headers.accept === 'text/xml') {
        return this.sendXmlResponse(req, res, status, data);
    }
    if (req.headers.accept === 'text/html') {
        return this.sendHtmlResponse(req, res, status, data);
    }
    if (req.headers.accept === 'text/plain') {
>>>>>>> Stashed changes
        return this.sendPlainResponse(req, res, status, data);
    }
    return this.sendJsonResponse(req, res, status, data);
}

<<<<<<< Updated upstream




module.exports =  {

=======
module.exports = {
>>>>>>> Stashed changes
    sendXmlResponse,
    sendJsonResponse,
    sendHtmlResponse,
    sendResponse,
    sendPlainResponse,
<<<<<<< Updated upstream
    sendFinalResponse

}
=======
    sendFinalResponse,
};
>>>>>>> Stashed changes
