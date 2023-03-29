"use strict";

const json2xml = require("xml-js");
const json2html = require("json-to-html");
const json2plain = require("json-to-plain-text");
require("body-parser");

function sendJsonResponse(clientdata) {
  var jsonData = { data: clientdata };
  return jsonData; 
}

function sendXmlResponse(clientdata) {
  var options = { compact: true, ignoreComment: true, spaces: 4 };
  return xmlData = json2xml.json2xml(JSON.stringify(clientdata), options);
}

function sendPlainResponse(clientdata) {
  return json2plain.toPlainText(JSON.parse(JSON.stringify(clientdata)));
}

function sendHtmlResponse(clientdata) {
  return json2html(JSON.parse(JSON.stringify(clientdata)));
}

function sendFinalResponse(res, status, data) {
  res.status(status).send(data);
}

function sendResponse(req, res, status, clientdata){
  switch(req.headers.accept){
    case 'application/xml':
      clientdata = this.sendXmlResponse(clientdata);
      break;
    case 'text/html':
      clientdata = this.sendHtmlResponse(clientdata);
      break;
    case 'text/plain':
      clientdata = this.sendPlainResponse(clientdata);
      break;
      case 'text/xml':
      clientdata = this.sendXmlResponse(clientdata);
      break;
     default:
      clientdata = this.sendJsonResponse(clientdata);
       break;
  }
  return this.sendFinalResponse(res, status, clientdata); 
};
module.exports = {
  sendXmlResponse,
  sendJsonResponse,
  sendHtmlResponse,
  sendResponse,
  sendPlainResponse,
  sendFinalResponse,
};
