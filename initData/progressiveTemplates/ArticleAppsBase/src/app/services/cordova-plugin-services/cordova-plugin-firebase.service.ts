import { Injectable } from '@angular/core';
import {IframePostable} from "./iframe-postable";

var  postabelInstance;

@Injectable()
export class CordovaPluginFirebaseService extends IframePostable{
  private static FB_FUNCTION_GET_TOKEN = 'getToken';
  private static FB_FUNCTION_ON_TOKEN_REFRESH = 'onTokenRefresh';
  private static FB_FUNCTION_ON_NOTIFICATION_OPEN = 'onNotificationOpen';


  constructor() {
    super();
    console.log("CordovaPluginFirebaseService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    postabelInstance = this;
  }


  private executeFBFunction(functionName: string, successCallback: any, errorCallback: any){
    this.addEventListnerReceiveMessageInIframe();

    this.setSuccessCallbackFunc(successCallback);
    this.setErrorCallbackFunc(errorCallback);

    //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
    let functionToBePost = "function(){"
      + "window.FirebasePlugin." + functionName + "("
      + this.getSuccessFunctionToBePost().toString()
      + ", " + this.getErrorFunctionToBePost().toString() + ");"
      + "}";

    this.parentPostMessage(functionToBePost);
  }

  getToken(successCallback: any, errorCallback: any){
    this.executeFBFunction(CordovaPluginFirebaseService.FB_FUNCTION_GET_TOKEN,
                          successCallback,
                          errorCallback);
  }

  onTokenRefresh(successCallback: any, errorCallback: any){
    this.executeFBFunction(CordovaPluginFirebaseService.FB_FUNCTION_ON_TOKEN_REFRESH,
      successCallback,
      errorCallback);
  }

  onNotificationOpen(successCallback: any, errorCallback: any){
    this.executeFBFunction(CordovaPluginFirebaseService.FB_FUNCTION_ON_NOTIFICATION_OPEN,
      successCallback,
      errorCallback);
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
