
var  postabelInstance;

export class IframePostable{
  successCallbackFunc: any;
  errorCallbackFunc: any;

  constructor() {
    console.log("IframePostable construction...");
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
                          +  'postabelInstance.successCallback(' + result +');'
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
        +  'postabelInstance.errorCallback(' + error +');'
        +'}';

      var errorFunc = encodeURI(msgSentError.toString());

      var frame = document.getElementById('appframe');
      frame.contentWindow.postMessage(errorFunc, '*');
    };

    return error;
  }

  errorCallback(error: any){
    if(!error){
      error = null;
    }
    this.getErrorCallbackFunc()(error);
  }

  successCallback(result: any){
    if(!result) {
      result = null;
    }
    this.getSuccessCallbackFunc()(result);
  }

  setSuccessCallbackFunc(callback: any){
    this.successCallbackFunc = callback;
  }

  getSuccessCallbackFunc(){
    return this.successCallbackFunc;
  }

  setErrorCallbackFunc(callback: any){
    this.errorCallbackFunc = callback;
  }

  getErrorCallbackFunc(){
    return this.errorCallbackFunc;
  }

  serializeFunction(f) {
    return encodeURI(f.toString());
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
    window.addEventListener('message', this.receiveMessageInIframe, false);
  }

  parentPostMessage(functionToBePost: any){
    window.parent.postMessage(this.serializeFunction(functionToBePost), '*');
  }

}
