import { Injectable } from '@angular/core';
/**
 * This service is use to get the Toekn from the parent window which is cms.
 */
var  parentJWTInstance;

@Injectable()
export class ParentJWTService {
  successCallbackFunc: any;
  errorCallbackFunc: any;

  constructor() {
    console.log("ParentJWTService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    parentJWTInstance = this;
  }

  getSuccessFunctionToBePost(){
    let success = function (result) {
      console.log("ParentJWTService.result=> " + JSON.stringify(result, null, 2));

      if(result){
        result = JSON.stringify(result);
      }else{
        result = '';
      }

      var msgSentSuccess = 'function(){ '
        +  'parentJWTInstance.successCallback(' + result +');'
        +'}';

      var successFunc = encodeURI(msgSentSuccess.toString());

      var frame = document.getElementById('appframe');
      (<HTMLIFrameElement> frame).contentWindow.postMessage(successFunc, '*');
    };

    return success;
  }

/*
  Will call this to get the token from cms localstorage
*/
  getToken(successCallback: any){
    parentJWTInstance.addEventListnerReceiveMessageInIframe();

    parentJWTInstance.successCallbackFunc = successCallback;

    //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
    let functionToBePost = "function(){"
      + "   var result = localStorage.getItem('satellizer_token')?localStorage.getItem('satellizer_token'):'none';"
      + "   console.log(\"result=> \" + result);"
      + "   var msgSentSuccess = 'function(){ '"
      + "     +  'parentJWTInstance.successCallback(\"' + result +'\");'"
      + "     +'}';"
      + ""
      + "   var successFunc = encodeURI(msgSentSuccess.toString());"
      + ""
      + "   var frame = document.querySelector('#appView iframe');"
      + "   frame.contentWindow.postMessage(successFunc, '*');"
      + "}";

    parentJWTInstance.parentPostMessage(functionToBePost);
  }

  /*
   This method will call from the parent window once post to the iFrame
   */
  receiveMessageInIframe(evt) {
    try {
      console.log("Exec receiveMessageInIframe method in ParentJWTService " + decodeURI(evt.data));
      eval('(' + decodeURI(evt.data) + ')();');
    } catch(e) {
      console.log("Error Exec receiveMessageInIframe method in ParentJWTService. Error: " + JSON.stringify(e,null,2));
    }finally{
      window.removeEventListener('message', parentJWTInstance.receiveMessageInIframe, false);
    }
  }

  addEventListnerReceiveMessageInIframe(){
    console.log('call parentJWTInstance.addEventListnerReceiveMessageInIframe');
    window.addEventListener('message', parentJWTInstance.receiveMessageInIframe, false);
  }

  parentPostMessage(functionToBePost: any){
    console.log("call parentJWTInstance.parentPostMessage");
    window.parent.postMessage(parentJWTInstance.serializeFunction(functionToBePost), '*');
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
