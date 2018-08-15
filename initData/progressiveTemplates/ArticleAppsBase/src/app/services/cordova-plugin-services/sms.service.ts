import { Injectable } from '@angular/core';

var  smsInstance;

@Injectable()
export class SMSService {
  successCallbackFunc: any;
  errorCallbackFunc: any;
  LOCALSTORAGE_KEYWORD_STRING = 'keyword';
  LOCALSTORAGE_PORT_STRING = 'port';
  SERVICE_REGISTRATION_STRING = 'start';
  SERVICE_UN_REGISTRATION_STRING = 'stop';

  constructor() {
    console.log("SMSService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    smsInstance = this;
  }

  getSuccessFunctionToBePost(){
    let success = function (result) {
      console.log("result=> " + JSON.stringify(result, null, 2));

      if(result){
        result = JSON.stringify(result);
      }else{
        result = '';
      }

      var msgSentSuccess = 'function(){ '
        +  'smsInstance.successCallback(' + result +');'
        +'}';

      var successFunc = encodeURI(msgSentSuccess.toString());

      var frame = document.getElementById('appframe');
      (<HTMLIFrameElement> frame).contentWindow.postMessage(successFunc, '*');
    };

    return success;
  }

  getErrorFunctionToBePost(){
    let error = function (error) {
      console.log("error=> " + JSON.stringify(error, null, 2));

      if(error){
        error = JSON.stringify(error);
      }else{
        error = '';
      }

      var msgSentError = 'function(){ '
        +  'smsInstance.errorCallback(' + error +');'
        +'}';

      var errorFunc = encodeURI(msgSentError.toString());

      var frame = document.getElementById('appframe');
      (<HTMLIFrameElement> frame).contentWindow.postMessage(errorFunc, '*');
    };

    return error;
  }

  /*
   -Options can be passed in below format

   var options = {
   replaceLineBreaks: false, // true to replace \n by a new line, false by default
   android: {
   intent: 'INTENT'
   }
   };
   */
  send(number: string, message: string, options: any, successCallback: any, errorCallback: any){
    smsInstance.addEventListnerReceiveMessageInIframe();

    this.successCallbackFunc = successCallback;
    this.errorCallbackFunc = errorCallback;

    //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
    let functionToBePost = "function(){"
      + "sms.send('" + number +  "'"
      + ", '" + message +  "'"
      + ", " + JSON.stringify(options)
      + ", " + smsInstance.getSuccessFunctionToBePost().toString()
      + ", " + smsInstance.getErrorFunctionToBePost().toString() + ");"
      + "}";

    smsInstance.parentPostMessage(functionToBePost);
  }

  /*
   This method will call from the parent window once post to the iFrame
   */
  receiveMessageInIframe(evt) {
    try {
      console.log("Exec receiveMessageInIframe method in sms service " + decodeURI(evt.data));
      eval('(' + decodeURI(evt.data) + ')();');
    } catch(e) {
      console.log("Error Exec receiveMessageInIframe method in sms service. Error: " + JSON.stringify(e,null,2));
    }finally{
      window.removeEventListener('message', smsInstance.receiveMessageInIframe, false);
    }
  }

  /*
    This SMS will send to Register/Un-Register the service
   */
  sendReg_UNREG_SMS(serviceRegUnregString: string,successCallback: any, errorCallback: any){
    var options = {
      replaceLineBreaks: false,
      android: {
        // intent: 'INTENT'
      }
    };

    var keyword = localStorage.getItem(smsInstance.LOCALSTORAGE_KEYWORD_STRING);
    var port = localStorage.getItem(smsInstance.LOCALSTORAGE_PORT_STRING);
    var uuid = localStorage.getItem("UUID");

    var smsBody = serviceRegUnregString + " " + keyword + " UUID " + uuid;

    console.log("Send SMS=> body:" + smsBody + " port:" + port );

    if(keyword && port && uuid) {
      smsInstance.send(port, smsBody, options, successCallback, errorCallback);
    }else{
      alert("Service not yet configured, please contact support.");
    }
  }

  /*
   This SMS will send to Register the service
   */
  sendRegistrationSMS(successCallback: any, errorCallback: any){
    smsInstance.sendReg_UNREG_SMS(smsInstance.SERVICE_REGISTRATION_STRING, successCallback, errorCallback);
  }

  /*
   This SMS will send to Un-Register the service
   */
  sendUnRegistrationSMS(successCallback: any, errorCallback: any){
    smsInstance.sendReg_UNREG_SMS(smsInstance.SERVICE_UN_REGISTRATION_STRING, successCallback, errorCallback);
  }

  addEventListnerReceiveMessageInIframe(){
    console.log('call smsInstance.addEventListnerReceiveMessageInIframe');
    window.addEventListener('message', smsInstance.receiveMessageInIframe, false);
  }

  parentPostMessage(functionToBePost: any){
    console.log("call smsInstance.parentPostMessage");
    window.parent.postMessage(smsInstance.serializeFunction(functionToBePost), '*');
  }

  serializeFunction(f) {
    return encodeURI(f.toString());
  }

  errorCallback(error: any){
    if(!error){
      error = null;
    }
    this.errorCallbackFunc(error);
  }

  successCallback(result: any){
    if(!result) {
      result = null;
    }
    this.successCallbackFunc(result);
  }

  isServiceConfigured(){
    var keyword = localStorage.getItem(smsInstance.LOCALSTORAGE_KEYWORD_STRING);
    var port = localStorage.getItem(smsInstance.LOCALSTORAGE_PORT_STRING);
    var uuid = localStorage.getItem("UUID");

    console.log('localStorage keys and values, keyword=' + keyword + ' port=' + port + ' uuid=' + uuid);

    return keyword && port && uuid;
  }
}
