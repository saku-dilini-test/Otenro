import { Injectable } from '@angular/core';
import {IframePostable} from "./iframe-postable";

var  postabelInstance;

@Injectable()
export class SMSService extends IframePostable{

  LOCALSTORAGE_KEYWORD_STRING = 'keyword';
  LOCALSTORAGE_PORT_STRING = 'port';
  SERVICE_REGISTRATION_STRING = 'start';
  SERVICE_UN_REGISTRATION_STRING = 'stop';

  constructor() {
    super();
    console.log("SMSService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    postabelInstance = this;
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
    this.addEventListnerReceiveMessageInIframe();

    this.setSuccessCallbackFunc(successCallback);
    this.setErrorCallbackFunc(errorCallback);

    //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
    let functionToBePost = "function(){"
      + "sms.send('" + number +  "'"
      + ", '" + message +  "'"
      + ", " + JSON.stringify(options)
      + ", " + this.getSuccessFunctionToBePost().toString()
      + ", " + this.getErrorFunctionToBePost().toString() + ");"
      + "}";

    this.parentPostMessage(functionToBePost);
  }

  /*
   This method will call from the parent window once post to the iFrame
   */
  receiveMessageInIframe(evt) {
    try {
      console.log("Exec receiveMessageInIframe + " + decodeURI(evt.data));
      eval('(' + decodeURI(evt.data) + ')();');
    } catch(e) {
      console.log("Error executing function: " + JSON.stringify(e,null,2));
    }finally{
      window.removeEventListener('message', this.receiveMessageInIframe, false);
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

    var keyword = localStorage.getItem(this.LOCALSTORAGE_KEYWORD_STRING);
    var port = localStorage.getItem(this.LOCALSTORAGE_PORT_STRING);
    var uuid = localStorage.getItem("UUID");

    var smsBody = serviceRegUnregString + " " + keyword + " UUID " + uuid;

    console.log("Send SMS=> body:" + smsBody + " port:" + port );
    this.send(port, smsBody, options, successCallback, errorCallback);
  }

  /*
   This SMS will send to Register the service
   */
  sendRegistrationSMS(successCallback: any, errorCallback: any){
    this.sendReg_UNREG_SMS(this.SERVICE_REGISTRATION_STRING, successCallback, errorCallback);
  }

  /*
   This SMS will send to Un-Register the service
   */
  sendUnRegistrationSMS(successCallback: any, errorCallback: any){
    this.sendReg_UNREG_SMS(this.SERVICE_UN_REGISTRATION_STRING, successCallback, errorCallback);
  }
}
