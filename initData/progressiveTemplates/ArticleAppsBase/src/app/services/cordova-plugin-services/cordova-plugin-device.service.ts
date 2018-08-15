import { Injectable } from '@angular/core';

var  deviceServiceInstance;

@Injectable()
export class CordovaPluginDeviceService {
  successCallbackFunc: any;
  errorCallbackFunc: any;

  constructor() {
    console.log("CordovaPluginDeviceService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    deviceServiceInstance = this;
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
                          +  'deviceServiceInstance.successCallback(' + result +');'
                          +'}';

      var successFunc = encodeURI(msgSentSuccess.toString());

      var frame = document.getElementById('appframe');
      // frame.contentWindow.contentWindow.postMessage(successFunc, '*'); (this was changed to below code in performance fix)
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
        +  'deviceServiceInstance.errorCallback(' + error +');'
        +'}';

      var errorFunc = encodeURI(msgSentError.toString());

      var frame = document.getElementById('appframe');
     (<HTMLIFrameElement> frame).contentWindow.postMessage(errorFunc, '*');
    };

    return error;
  }

  getUUID(successCallback: any){
    this.addEventListnerReceiveMessageInIframe();

    this.successCallbackFunc = successCallback;


    //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
    let functionToBePost = "function(){"
      + "   var result = device.uuid;"
      + "   console.log(\"result=> \" + JSON.stringify(result, null, 2));"
      + "   if(result){"
      + "     result = JSON.stringify(result);"
      + "   }else{"
      + "     result = '';"
      + "   }"
      + ""
      + "   var msgSentSuccess = 'function(){ '"
      + "     +  'deviceServiceInstance.successCallback(' + result +');'"
      + "     +'}';"
      + ""
      + "   var successFunc = encodeURI(msgSentSuccess.toString());"
      + ""
      + "   var frame = document.getElementById('appframe');"
      + "   (<HTMLIFrameElement> frame).contentWindow.postMessage(successFunc, '*');"
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

  addEventListnerReceiveMessageInIframe(){
    console.log('call deviceServiceInstance.addEventListnerReceiveMessageInIframe');
    window.addEventListener('message', deviceServiceInstance.receiveMessageInIframe, false);
  }

  parentPostMessage(functionToBePost: any){
    console.log("call deviceServiceInstance.parentPostMessage");
    window.parent.postMessage(deviceServiceInstance.serializeFunction(functionToBePost), '*');
  }

  serializeFunction(f) {
    return encodeURI(f.toString());
  }

  errorCallback(error: any){
    if(!error){
      error = null;
    }
    this.errorCallbackFunc()(error);
  }

  successCallback(result: any){
    if(!result) {
      result = null;
    }
    this.successCallbackFunc(result);
  }

}
