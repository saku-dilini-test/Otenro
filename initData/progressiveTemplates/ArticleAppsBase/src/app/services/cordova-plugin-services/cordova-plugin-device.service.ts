import { Injectable } from '@angular/core';
import {IframePostable} from "./iframe-postable";

var  postabelInstance;

@Injectable()
export class CordovaPluginDeviceService extends IframePostable {

  constructor() {
    super();
    console.log("CordovaPluginDeviceService construction...");
    //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
    // window.addEventListener('message', this.receiveMessageInIframe, false);

    postabelInstance = this;
  }

  getUUID(successCallback: any){
    this.addEventListnerReceiveMessageInIframe();

    this.setSuccessCallbackFunc(successCallback);


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
      + "     +  'postabelInstance.successCallback(' + result +');'"
      + "     +'}';"
      + ""
      + "   var successFunc = encodeURI(msgSentSuccess.toString());"
      + ""
      + "   var frame = document.getElementById('appframe');"
      + "   frame.contentWindow.postMessage(successFunc, '*');"
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
