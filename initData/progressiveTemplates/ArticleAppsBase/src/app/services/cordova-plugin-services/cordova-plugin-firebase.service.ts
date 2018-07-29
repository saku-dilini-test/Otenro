import { Injectable } from '@angular/core';

var  firebaseInstance;

@Injectable()
export class CordovaPluginFirebaseService {
  successCallbackFunc: any;
  errorCallbackFunc: any;
  private static FB_FUNCTION_GET_TOKEN = 'getToken';
  private static FB_FUNCTION_ON_TOKEN_REFRESH = 'onTokenRefresh';
  private static FB_FUNCTION_ON_NOTIFICATION_OPEN = 'onNotificationOpen';


  constructor() {
    console.log("CordovaPluginFirebaseService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    firebaseInstance = this;
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
        +  'firebaseInstance.successCallback(' + result +');'
        +'}';

      var successFunc = encodeURI(msgSentSuccess.toString());

      var frame = document.getElementById('appframe');
      frame.contentWindow.postMessage(successFunc, '*');
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
        +  'firebaseInstance.errorCallback(' + error +');'
        +'}';

      var errorFunc = encodeURI(msgSentError.toString());

      var frame = document.getElementById('appframe');
      frame.contentWindow.postMessage(errorFunc, '*');
    };

    return error;
  }

  private executeFBFunction(functionName: string, successCallback: any, errorCallback: any){
    console.log("executeFBFunction");
    firebaseInstance.addEventListnerReceiveMessageInIframe();

    this.successCallbackFunc = successCallback;
    this.errorCallbackFunc = errorCallback;

    //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
    let functionToBePost = "function(){"
      + "window.FirebasePlugin." + functionName + "("
      + firebaseInstance.getSuccessFunctionToBePost().toString()
      + ", " + firebaseInstance.getErrorFunctionToBePost().toString() + ");"
      + "}";

    firebaseInstance.parentPostMessage(functionToBePost);
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
    console.log("onNotificationOpen");
    this.executeFBFunction(CordovaPluginFirebaseService.FB_FUNCTION_ON_NOTIFICATION_OPEN,
      successCallback,
      errorCallback);
  }

  /*
   This method will call from the parent window once post to the iFrame
   */
  receiveMessageInIframe(evt) {
    try {
      console.log("Exec receiveMessageInIframe method in firebase service " + decodeURI(evt.data));
      eval('(' + decodeURI(evt.data) + ')();');
    } catch(e) {
      console.log("Error Exec receiveMessageInIframe method in firebase service. Error: " + JSON.stringify(e,null,2));
    }
  }

  addEventListnerReceiveMessageInIframe(){
    console.log('call firebaseInstance.addEventListnerReceiveMessageInIframe');
    window.addEventListener('message', firebaseInstance.receiveMessageInIframe, false);
  }

  parentPostMessage(functionToBePost: any){
    console.log("call firebaseInstance.parentPostMessage");
    window.parent.postMessage(firebaseInstance.serializeFunction(functionToBePost), '*');
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
}
