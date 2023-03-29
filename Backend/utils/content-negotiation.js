"use strict";

const json2xml = require("xml-js");
const json2html = require("json-to-html");
const json2plain = require("json-to-plain-text");
require("body-parser");

function sendJsonResponse(clientData) {
  var jsonData = { data: clientData };
  return jsonData; 
}

function sendXmlResponse(clientData) {
  var options = { compact: true, ignoreComment: true, spaces: 4 };
  return xmlData = json2xml.json2xml(JSON.stringify(clientData), options);
}

function sendPlainResponse(clientData) {
  return json2plain.toPlainText(JSON.parse(JSON.stringify(clientData)));
}

function sendHtmlResponse(clientData) {
  return json2html(JSON.parse(JSON.stringify(clientData)));
}

function sendFinalResponse(res, status, data) {
  res.status(status).send(data);
}

function sendResponse(req, res, status, clientData){
  switch(req.headers.accept){
    case 'application/xml':
      clientData = this.sendXmlResponse(clientData);
      break;
    case 'text/html':
      clientData = this.sendHtmlResponse(clientData);
      break;
    case 'text/plain':
      clientData = this.sendPlainResponse(clientData);
      break;
      case 'text/xml':
      clientData = this.sendXmlResponse(clientData);
      break;
     default:
      clientData = this.sendJsonResponse(clientData);
       break;
  }
  return this.sendFinalResponse(res, status, clientData); 
};
module.exports = {
  sendXmlResponse,
  sendJsonResponse,
  sendHtmlResponse,
  sendResponse,
  sendPlainResponse,
  sendFinalResponse,
};
