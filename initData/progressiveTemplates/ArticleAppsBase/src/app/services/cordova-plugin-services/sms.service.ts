import { Injectable } from '@angular/core';
import {IframePostable} from "./iframe-postable";

var  postabelInstance;

@Injectable()
export class SMSService extends IframePostable{

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
}
