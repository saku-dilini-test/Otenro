<h1>Hello fellow developers!</h1> <br>
<strong>This document is about the new image editor.</strong> <br> <br>

<h4>Folder description and paths</h4>
1. <h6>tui-image-editor.js</h6>
        this is the main JS file which responsible for the image editor work flow. the file in the mentioned path is changed by .sanira
        to match the requirements made by the superiors.
        
        source\assets\js\dependencies\tuiImageEditor\js\tui-image-editor.js

2. <h6>black-theme.js / white-theme.js</h6>
        theme files which defined by the image editor library, you can create your own theme using one of these, here we are using white theme right now with some minor changes.
        
        source\assets\js\dependencies\tuiImageEditor\js\themes\black-theme.js
        source\assets\js\dependencies\tuiImageEditor\js\themes\white-theme.js

3. <h6>tui-image-editor.css</h6>
        styles of the image editor
        
        source\assets\js\dependencies\tuiImageEditor\js\styles\tui-image-editor.css

4. <h6>imageEditroCtrl.js</h6>
        controller file for the image editor. which is responsible for initiating the image editor, and it's main customized buttons
            `crop & edit`
            `crop & save`
            `cancel`
         there are three main methods responsible for each one of those buttons behaviors.
        
        source\assets\js\controllers\edit\imageEditor\imageEditroCtrl.js

5. <h6>imageEditorService.js</h6>
        service which can use anywhere in the app to call the image editor using below function. 
        `callImageEditor(_file,_width,_height,_menuName,_callFrom)`<br>
        `_file` - `pass the uploaded image file`<br>
        `_width` - `optional, integer value for define the cropzone width if this value passed, _height should be passed along with this`<br>
        `_height` - `optional, integer value for define the cropzone height if this value passed, _weight should be passed along with this`<br>
        if `-width` & `_height` does not passed image editor crop zone behaviors will act without maintaining accept ratio, obviously you have to pass undefined as `_width` & `_height` if you don't need to crop zone maintain the accept ratio<br>
        `_menuName` - `initial data set from the controller where image editor calls from`<br>
        `_callFrom` - `string to identify from where image editor is called from`<br>
        
        source\assets\js\services\edit\imageEditor\imageEditorService.js

6. <h6>imageEditor.html</h6>
        template of the image editor which calls from the imageEditorService.js
        
        source\assets\templates\user\edit\imageEditor\imageEditor.html
        
<h4>Added Functions to the `tui-image-editor.js`</h4>
1. <h6>setCropRect(width,height)</h6>
    Set the crop zone dimensions for response to the API call
        `@param {width;number, height:number}`<br>
	    `@return {Object} with properties {width:number, height:number}`<br>
	after initiating the image editor in the controller, call this function to set the crop zone rect to maintain the accept ratio when adjesting the crop zone from adjustment points.
	calling this function will change the entire behavior of the crop zone adjustments and crop zone drawing. if this function won't call, then the crop zone will behave as default given by the tui-image-editor.js originally.
	
<h4>Dependencies</h4>
There are some libraries(bower components) which the tui-image-editor is depend on, those are,<br>
1.`"tui-code-snippet": "^1.4.0"`<br>
2.`"tui-color-picker": "^2.2.0"`<br>
3.`"fabric": "~1.6.7"`<br>
these versions are very important to tui-image-editor work properly.

<h4>Original Library URLs</h4>
    https://nhnent.github.io/tui.image-editor/latest/tutorial-example01-includeUi.html <br>
    https://github.com/nhnent/tui.image-editor/tree/master/docs
	
<br><br>
Other than these details, all the relevant dependency libraries and original tui-image-editor version which used here is in the zipped folder in following path.

    source\assets\js\dependencies\tuiImageEditor\DependenciesAndOriginalFiles.zip 
