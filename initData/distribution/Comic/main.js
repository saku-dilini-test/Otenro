(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/addons/addons.module.ts":
/*!*****************************************!*\
  !*** ./src/app/addons/addons.module.ts ***!
  \*****************************************/
/*! exports provided: AddonsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonsModule", function() { return AddonsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-info/contact-info.component */ "./src/app/addons/contact-info/contact-info.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AddonsModule = /** @class */ (function () {
    function AddonsModule() {
    }
    AddonsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModule"]
            ],
            exports: [
                _contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_3__["ContactInfoComponent"]
            ],
            declarations: [_contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_3__["ContactInfoComponent"]]
        })
    ], AddonsModule);
    return AddonsModule;
}());



/***/ }),

/***/ "./src/app/addons/contact-info/contact-info.component.css":
/*!****************************************************************!*\
  !*** ./src/app/addons/contact-info/contact-info.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "section{\r\n  padding-bottom: 50px;\r\n  padding-top: 56px;\r\n}\r\n\r\n\r\nh2{\r\n  margin-bottom: 25px;\r\n  font-size: 24px;\r\n  font-weight: 600;\r\n}\r\n\r\n\r\np{\r\n  margin-top: 30px;\r\n  margin-bottom: 30px;\r\n  padding-bottom: 25px;\r\n  font-size: 16px;\r\n  line-height: 30px;\r\n  border-bottom: 1px dotted #b3b3b3;\r\n}\r\n\r\n\r\n.social-media{\r\n  display: flex;\r\n  paddding-bottom:60px;\r\n}\r\n\r\n\r\n.row{\r\n  margin: 10px -15px;\r\n}\r\n\r\n\r\n@media (max-width: 767px){\r\n  .col-md-9 div{\r\n    margin-bottom: 20px;\r\n    padding-left: 27px;\r\n  }\r\n  li, i{\r\n    margin-bottom: 0;\r\n    padding-left: 0;\r\n  }\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/app/addons/contact-info/contact-info.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/addons/contact-info/contact-info.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section *ngFor=\"let contact of contacts\">\r\n\r\n    <h3 class=\"padding-vertical main-header-font\">\r\n      Contact Info:\r\n    </h3>\r\n    <!--<p class=\"main-content-font\" *ngIf=\"description\">{{description}}</p>-->\r\n    <div class=\"main-content-font\">\r\n      <div class=\"row\" *ngIf=\"contact.address\">\r\n        <div class=\"col-md-3\">\r\n          <div>\r\n            <i class=\"fa fa-map-marker\"></i> <span> Address:</span></div>\r\n        </div>\r\n        <div class=\"col-md-9\">\r\n          <div>{{contact.address}}</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\" *ngIf=\"contact.telPhone\">\r\n        <div class=\"col-md-3\">\r\n          <div>\r\n            <i class=\"fa fa-phone\"></i>  <span> Phone:</span></div>\r\n        </div>\r\n        <div class=\"col-md-9\">\r\n          <div>{{contact.telPhone}}</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\" *ngIf=\"contact.email\">\r\n        <div class=\"col-md-3\">\r\n          <div>\r\n            <i class=\"fa fa-envelope\"></i>  <span> Email:</span></div>\r\n        </div>\r\n        <div class=\"col-md-9\">\r\n          <div>\r\n            <a  href=\"mailto:{{contact.email}}\">{{contact.email}}</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\" *ngIf=\"contact.webSite\">\r\n        <div class=\"col-md-3\">\r\n          <div>\r\n            <i class=\"fa fa-file-text-o\"></i>  <span> WebSite:</span></div>\r\n        </div>\r\n        <div class=\"col-md-9\">\r\n          <div>\r\n            <a target=\"_blank\" href=\"{{contact.webSite}}\">{{contact.webSite}}</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"social-media\">\r\n        <a *ngIf=\"contact.twitter\" href=\"{{ contact.twitter }}\"  target=\"_blank\" class=\"a-btn a-block bloc-mob-center-text text-center main-content-font\"><i class=\"icon fa fa-twitter\"></i></a>\r\n        <a *ngIf=\"contact.facebook\" href=\"{{ contact.facebook }}\" target=\"_blank\" class=\"a-btn a-block bloc-mob-center-text text-center main-content-font\"><i class=\"icon fa fa-facebook\"></i></a>\r\n        <a *ngIf=\"contact.instagram\" href=\"{{ contact.instagram }}\" target=\"_blank\" class=\"a-btn a-block bloc-mob-center-text text-center main-content-font\"><i class=\"icon fa fa-instagram\"></i></a>\r\n        <a *ngIf=\"contact.pinterest\" href=\"{{ contact.pinterest }}\" target=\"_blank\" class=\"a-btn a-block bloc-mob-center-text text-center main-content-font\"><i class=\"icon fa fa-pinterest-p\"></i></a>\r\n        <a *ngIf=\"contact.linkedin\" href=\"{{ contact.linkedin }}\" target=\"_blank\" class=\"a-btn a-block bloc-mob-center-text text-center main-content-font\"><i class=\"icon fa fa-linkedin\"></i></a>\r\n      </div>\r\n    </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/addons/contact-info/contact-info.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/addons/contact-info/contact-info.component.ts ***!
  \***************************************************************/
/*! exports provided: ContactInfoComponent, contactInfoModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactInfoComponent", function() { return ContactInfoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactInfoModel", function() { return contactInfoModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_1__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_1__});
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactInfoComponent = /** @class */ (function () {
    function ContactInfoComponent() {
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_1__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_1__["userId"];
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('contacts'),
        __metadata("design:type", contactInfoModel)
    ], ContactInfoComponent.prototype, "contacts", void 0);
    ContactInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact-info',
            template: __webpack_require__(/*! ./contact-info.component.html */ "./src/app/addons/contact-info/contact-info.component.html"),
            styles: [__webpack_require__(/*! ./contact-info.component.css */ "./src/app/addons/contact-info/contact-info.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ContactInfoComponent);
    return ContactInfoComponent;
}());

var contactInfoModel = /** @class */ (function () {
    function contactInfoModel() {
    }
    return contactInfoModel;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-page-body{\r\n  min-height: calc(100vh - 382px);\r\n  display: block;\r\n}\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<app-page-body></app-page-body>\r\n<app-footer></app-footer>\r\n<ng4-loading-spinner [threshold]=\"2000\"  [loadingText]=\"'Loading...'\" [zIndex]=\"9999\"> </ng4-loading-spinner>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__});
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.title = 'app works!';
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__["userId"];
        /*
            Below code is to check whether the App is loading inside an "iFrame in CMS" or the App is loading from "ionic app in real Device"
            If the App is loading from iFrame in CMS, then the subscription screens are disabled.The reason to disable the subscriptions services in CMS is to see the templates behaviours etc...
         */
        router.events.subscribe(function (s) {
            if (s['url']) {
                var params = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["URLSearchParams"](s['url'].split('?')[1]);
                var isFromCMSAppView = params.get('isFromCMSAppView');
                if (isFromCMSAppView != null) {
                    localStorage.setItem(_this.appId + "_isFromCMSAppView", isFromCMSAppView);
                }
                else if (!localStorage.getItem(_this.appId + "_isFromCMSAppView")) {
                    localStorage.removeItem(_this.appId + "_isFromCMSAppView");
                }
            }
        });
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _addons_addons_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addons/addons.module */ "./src/app/addons/addons.module.ts");
/* harmony import */ var _page_body_page_body_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./page-body/page-body.module */ "./src/app/page-body/page-body.module.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
/* harmony import */ var _services_categories_categories_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");
/* harmony import */ var _services_products_products_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/products/products.service */ "./src/app/services/products/products.service.ts");
/* harmony import */ var _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/appdata-info/appdata-info.service */ "./src/app/services/appdata-info/appdata-info.service.ts");
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/title.service */ "./src/app/services/title.service.ts");
/* harmony import */ var _services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/subscribed-data/subscribed-data.service */ "./src/app/services/subscribed-data/subscribed-data.service.ts");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./services/cordova-plugin-services/sms.service */ "./src/app/services/cordova-plugin-services/sms.service.ts");
/* harmony import */ var _services_cordova_plugin_services_cordova_plugin_firebase_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./services/cordova-plugin-services/cordova-plugin-firebase.service */ "./src/app/services/cordova-plugin-services/cordova-plugin-firebase.service.ts");
/* harmony import */ var _services_cordova_plugin_services_cordova_plugin_device_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/cordova-plugin-services/cordova-plugin-device.service */ "./src/app/services/cordova-plugin-services/cordova-plugin-device.service.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// https://ng-bootstrap.github.io/#/getting-started

// https://angular-maps.com/guides/getting-started/

// http://tb.github.io/ng2-nouislider/











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"], _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                _addons_addons_module__WEBPACK_IMPORTED_MODULE_8__["AddonsModule"],
                _page_body_page_body_module__WEBPACK_IMPORTED_MODULE_9__["PageBodyModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbModule"].forRoot(),
                _agm_core__WEBPACK_IMPORTED_MODULE_11__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyBanVJ_9ViC-HeJruJzhetGXUERg1eYXag'
                }),
                ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_18__["Ng4LoadingSpinnerModule"].forRoot()
            ],
            providers: [_page_body_page_body_service__WEBPACK_IMPORTED_MODULE_12__["PagebodyServiceModule"],
                _services_categories_categories_service__WEBPACK_IMPORTED_MODULE_13__["CategoriesService"],
                _services_products_products_service__WEBPACK_IMPORTED_MODULE_14__["ProductsService"],
                _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_15__["AppDataService"],
                _services_title_service__WEBPACK_IMPORTED_MODULE_16__["TitleService"],
                _services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_17__["SubscribedDataService"],
                _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_19__["SMSService"],
                _services_cordova_plugin_services_cordova_plugin_firebase_service__WEBPACK_IMPORTED_MODULE_20__["CordovaPluginFirebaseService"],
                _services_cordova_plugin_services_cordova_plugin_device_service__WEBPACK_IMPORTED_MODULE_21__["CordovaPluginDeviceService"],
                _services_message_service__WEBPACK_IMPORTED_MODULE_22__["MessageService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\r\n  position: fixed;\r\n  bottom: 0;\r\n  height: 60px;\r\n  width: 100%;\r\n  box-shadow: 0px -2px 20px 2px rgba(0, 0, 0, 0.12);\r\n  background-color: #fff;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.footer .btn-group{\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-around;\r\n  height: 100%;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.footer .btn-group button{\r\n  border: 0;\r\n  color: #989898\r\n}\r\n\r\n.footer .btn-group button:active{\r\n  color: #000;\r\n  background-color: transparent;\r\n  box-shadow: none;\r\n}\r\n\r\n.footer button.btn.btn-default:active:after {\r\n  content: '';\r\n  width: 55px;\r\n  height: 5px;\r\n  background: black;\r\n  position: absolute;\r\n  left: -5px;\r\n  bottom: -14px;\r\n}\r\n\r\n.btn-default:hover{\r\n  background-color: #fff;\r\n}\r\n\r\n/*My account modal css*/\r\n\r\n.modal {\r\n  text-align: center;\r\n  padding: 0!important;\r\n}\r\n\r\n.modal:before {\r\n  content: '';\r\n  display: inline-block;\r\n  height: 100%;\r\n  vertical-align: middle;\r\n  margin-right: -4px;\r\n}\r\n\r\n.modal-dialog {\r\n  display: inline-block;\r\n  text-align: left;\r\n  vertical-align: middle;\r\n}\r\n\r\n.sub-button-sub{\r\n    background-image: linear-gradient(to right, #2ba2fa, #0092fc, #0081fb, #006ff8, #0f5af2);\r\n    border-width: 0px !important;\r\n    color: #fff !important;\r\n    padding: 10px;\r\n    border-radius: 20px;\r\n    border-width: 1px !important;\r\n    letter-spacing: 2px;\r\n    border: solid;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.sub-button-cancel{\r\n    background-image: linear-gradient(to right, #ff8c2b, #ff8328, #ff7a25, #ff7024, #ff6623);\r\n    border-width: 0px !important;\r\n    color: #fff !important;\r\n    padding: 10px;\r\n    border-radius: 20px;\r\n    border-width: 1px !important;\r\n    letter-spacing: 2px;\r\n    border: solid;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.header{\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100%;\r\n  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.12);\r\n  z-index: 10;\r\n}\r\n\r\n.wrapper {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 360px;\r\n  width: 100%;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.loader-box {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  content-alignment: center;\r\n  align-items: center;\r\n  background-color: rgba(15,15,15,0.5);\r\n  border-radius: 5px;\r\n  height: 200px;\r\n  width: 250px;\r\n  box-shadow: 1px 1px 1px 0px darkslategrey;\r\n}\r\n\r\n.loader {\r\n  border: 1px solid white;\r\n  border-radius: 50%;\r\n  border-right-color: transparent;\r\n  border-bottom-color: transparent;\r\n  width: 80px;\r\n  height: 80px;\r\n  -webkit-animation-name: loading;\r\n          animation-name: loading;\r\n  -webkit-animation-duration: 700ms;\r\n          animation-duration: 700ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear;\r\n          animation-timing-function: linear;\r\n}\r\n\r\n.loader-text {\r\n  margin-top: 10px;\r\n  padding-top: 10px;\r\n  color: lightgrey;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 18px;\r\n  -webkit-animation-name: fading;\r\n          animation-name: fading;\r\n  -webkit-animation-duration: 1500ms;\r\n          animation-duration: 1500ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear;\r\n          animation-timing-function: linear;\r\n}\r\n\r\n.description-box{\r\n  margin-top: 10px;\r\n  paddin: 10px 5px 10px 5px;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 18px;\r\n  height: 35px;\r\n  line-height: 35px;\r\n  width: 500px;\r\n  background-color: #fff;\r\n  text-align: center;\r\n  border-radius: 5px;\r\n}\r\n\r\n@-webkit-keyframes loading{\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes loading{\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@-webkit-keyframes fading {\r\n  0%, 100% {\r\n    opacity: 0.05;\r\n  }\r\n  50% {\r\n    opacity: 0.95;\r\n  }\r\n}\r\n\r\n@keyframes fading {\r\n  0%, 100% {\r\n    opacity: 0.05;\r\n  }\r\n  50% {\r\n    opacity: 0.95;\r\n  }\r\n}\r\n"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer main-footer-back\">\r\n\r\n  <div class=\"btn-group\" role=\"group\" aria-label=\"footer\">\r\n    <button type=\"button\" class=\"btn btn-default main-footer-back\" aria-label=\"Home\" (click)=\"navigate('')\">\r\n      <i class=\"fa fa-home fa-lg main-footer-font\"></i>\r\n    </button>\r\n\r\n    <button type=\"button\" class=\"btn btn-default main-footer-back\" aria-label=\"Policies\" (click)=\"navigate('policies')\">\r\n      <i class=\"fa fa-shield fa-lg main-footer-font\"></i>\r\n    </button>\r\n    <button type=\"button\" class=\"btn btn-default main-footer-back\" aria-label=\"Contact\" (click)=\"navigate('contact')\">\r\n      <i class=\"fa fa-phone fa-lg main-footer-font\"></i>\r\n    </button>\r\n    <button *ngIf=\"subscriptionStatus\" type=\"button\" class=\"btn btn-default main-footer-back\" aria-label=\"My Account\"  data-toggle=\"modal\" (click) = \"openFooterMyAccount()\">\r\n      <i class=\"fa fa-user fa-lg main-footer-font\"></i>\r\n    </button>\r\n  </div>\r\n</footer>\r\n\r\n\r\n\r\n<!-- My Account Model -->\r\n<div class=\"modal fade\" id=\"myAccountModelfooter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myAccountModalLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-body text-center\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n\r\n        <div *ngIf = \"isUnsubscribing == false\">\r\n          <h3 class=\"padding-bottom\">My Account</h3>\r\n          <h4>\r\n            Are you sure you want to unsubscribe from this service?\r\n          </h4>\r\n        </div>\r\n          <div *ngIf=\"isUnsubscribing == true\">\r\n            <div class=\"wrapper\">\r\n              <div class=\"loader-box\">\r\n                <div class=\"loader\">\r\n\r\n                </div>\r\n                <div class=\"loader-text\">\r\n                  Un-Subscribing...\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        <button type=\"button\" [disabled]=\"isUnsubscribing == true\" class=\"btn sub-button-sub btn-block\" (click)=\"onUnsubscribe()\"> Unsubscibe Now</button>\r\n        <button type=\"button\" class=\"btn sub-button-cancel btn-block\" data-dismiss=\"modal\" (click)=\"close()\">Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/subscribed-data/subscribed-data.service */ "./src/app/services/subscribed-data/subscribed-data.service.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__});
/* harmony import */ var rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/observable/IntervalObservable */ "./node_modules/rxjs-compat/_esm5/observable/IntervalObservable.js");
/* harmony import */ var rxjs_add_operator_takeWhile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/takeWhile */ "./node_modules/rxjs-compat/_esm5/add/operator/takeWhile.js");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
/* harmony import */ var _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/cordova-plugin-services/sms.service */ "./src/app/services/cordova-plugin-services/sms.service.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var footerCmp;
var FooterComponent = /** @class */ (function () {
    function FooterComponent(subscription, router, sms, messageService, dataService) {
        this.subscription = subscription;
        this.router = router;
        this.sms = sms;
        this.messageService = messageService;
        this.dataService = dataService;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["userId"];
        this.alive = true;
        this.isSubscribing = false;
        this.isUnsubscribing = false;
        this.isFromCMSAppView = false;
        footerCmp = this;
    }
    FooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView") == '1';
        $('#myAccountModelfooter').on('hide.bs.modal', function () {
            _this.alive = false;
            console.log("model footer close " + _this.alive);
            _this.isUnsubscribing = false;
        });
        this.messageService.getMessage().subscribe(function (data) {
            console.log('messageService.getMessage Footer component=>', data);
            if (data.subscription) {
                _this.dataService.subscriptionStatus = data.subscription.subscriptionStatus;
            }
            else {
                _this.dataService.subscriptionStatus = null;
            }
            _this.subscriptionStatus = _this.dataService.subscriptionStatus;
        });
    };
    FooterComponent.prototype.ngDoCheck = function () {
        if (!this.isFromCMSAppView) {
            this.subscriptionStatus = this.dataService.subscriptionStatus;
        }
    };
    FooterComponent.prototype.openFooterMyAccount = function () {
        $(function () {
            $('#myAccountModelfooter').modal('show');
        });
    };
    FooterComponent.prototype.navigate = function (val) {
        this.router.navigate([val]);
    };
    FooterComponent.prototype.close = function () {
        this.isUnsubscribing = false;
    };
    FooterComponent.prototype.onUnsubscribe = function () {
        var _this = this;
        this.alive = true;
        //Send Un-Registration SMS
        footerCmp.sms.sendUnRegistrationSMS(footerCmp.smsSuccessUnRegistrationCallback, footerCmp.smsErrorUnRegistrationCallback);
        this.dataService.numberOfTries = 1;
        var uuid = localStorage.getItem("UUID");
        var data = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn"), uuId: uuid };
        this.isUnsubscribing = true;
        rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_4__["IntervalObservable"].create(5000)
            .takeWhile(function () { return _this.alive; }) // only fires when component is alive
            .subscribe(function () {
            if (_this.dataService.numberOfTries == _this.dataService.defaultNumberOfTries) {
                _this.alive = false;
                _this.timeoutUnubscriptionPopup();
                return;
            }
            _this.dataService.numberOfTries++;
            _this.subscription.getSubscribedData(data).subscribe(function (data) {
                _this.subscriptionStatus = data.subscriptionStatus;
                _this.dataService.subscriptionStatus = data.subscriptionStatus;
                if (_this.subscriptionStatus === _this.dataService.STATUS_UNSUBSCRIBED) {
                    _this.isUnsubscribing = false;
                    localStorage.removeItem(_this.appId + "msisdn");
                    _this.alive = false;
                    _this.router.navigate(['']);
                    $(function () {
                        _this.unSubscribedSuccessPopup();
                    });
                    document.getElementById("mySidenav").style.width = "0";
                }
            });
        });
    };
    FooterComponent.prototype.smsSuccessUnRegistrationCallback = function (results) {
        console.log("smsSuccessUnRegistrationCallback in Footer Component: " + results);
    };
    FooterComponent.prototype.smsErrorUnRegistrationCallback = function (error) {
        console.log("smsErrorUnRegistrationCallback in Footer Component: " + error);
        footerCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to send the sms to unsubscribe from the service';
        $(function () {
            $('#myAccountModelfooter').modal('hide');
            $('#appStatusModel').modal('show');
        });
    };
    FooterComponent.prototype.timeoutUnubscriptionPopup = function () {
        this.dataService.displayMessage = 'The unsubscription process timed out, Please try again.';
        $(function () {
            $('#myAccountModelfooter').modal('toggle');
            $('#appStatusModel').modal('show');
        });
    };
    FooterComponent.prototype.unSubscribedSuccessPopup = function () {
        this.dataService.displayMessage = 'You got unsubscribed from the service';
        $(function () {
            $('#myAccountModelfooter').modal('toggle');
            $('#appStatusModel').modal('show');
        });
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [_services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_2__["SubscribedDataService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_7__["SMSService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_8__["MessageService"],
            _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_6__["PagebodyServiceModule"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mobile-title{\r\n  margin-top: 9px;\r\n  margin-right: 0;\r\n  padding: 5px 0px;\r\n  width: 100%;\r\n  text-align: center;\r\n  margin-left: 0;\r\n  position: absolute;\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n}\r\n\r\n.ui-navbar-toggle{\r\n  z-index: 1;\r\n  font-size: 18px;\r\n  margin-top: 5px;\r\n  margin-right: 0;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.navbar-2 ul, .navbar-2 li{\r\n  border: 0;\r\n}\r\n\r\n.logo a{\r\n  cursor: pointer;\r\n  width: 100%;\r\n}\r\n\r\n.logo img{\r\n  margin: auto;\r\n}\r\n\r\n.mar-size{\r\n  margin-left: 65px;\r\n}\r\n\r\n/*side menu animations*/\r\n\r\n.sidenav {\r\n    height: 100%;\r\n    width: 0;\r\n    position: fixed;\r\n    z-index: 1;\r\n    top: 0;\r\n    left: 0;\r\n    overflow-x: hidden;\r\n    transition: 0.5s;\r\n    padding-top: 60px;\r\n}\r\n\r\n.sidenav a {\r\n    padding: 15px;\r\n    margin: 5% 10%;\r\n    text-decoration: none;\r\n    font-size: 12px;\r\n    font-weight: 600 !important;\r\n    text-transform: uppercase;\r\n    letter-spacing: 2px;\r\n    display: block;\r\n    font-weight: 500;\r\n    text-align: center;\r\n    transition: 0.3s;\r\n    background-color: #42bdff;\r\n    color: #04261f !important;\r\n}\r\n\r\n.sidenav a:hover {\r\n    color: #f1f1f1;\r\n}\r\n\r\n.sidenav .closebtn {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 25px;\r\n    font-size: 36px;\r\n    margin-left: 50px;\r\n    cursor: pointer;\r\n}\r\n\r\n@media screen and (max-height: 450px) {\r\n  .sidenav {padding-top: 15px;}\r\n  .sidenav a {font-size: 18px;}\r\n}\r\n\r\n/*My account modal css*/\r\n\r\n.modal {\r\n  text-align: center;\r\n  padding: 0!important;\r\n}\r\n\r\n.modal:before {\r\n  content: '';\r\n  display: inline-block;\r\n  height: 100%;\r\n  vertical-align: middle;\r\n  margin-right: -4px;\r\n}\r\n\r\n.modal-dialog {\r\n  display: inline-block;\r\n  text-align: left;\r\n  vertical-align: middle;\r\n}\r\n\r\n.sub-button-sub{\r\n    background-image: linear-gradient(to right, #2ba2fa, #0092fc, #0081fb, #006ff8, #0f5af2);\r\n    border-width: 0px !important;\r\n    color: #fff !important;\r\n    padding: 10px;\r\n    border-radius: 20px;\r\n    border-width: 1px !important;\r\n    letter-spacing: 2px;\r\n    border: solid;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.sub-button-cancel{\r\n    background-image: linear-gradient(to right, #ff8c2b, #ff8328, #ff7a25, #ff7024, #ff6623);\r\n    border-width: 0px !important;\r\n    color: #fff !important;\r\n    padding: 10px;\r\n    border-radius: 20px;\r\n    border-width: 1px !important;\r\n    letter-spacing: 2px;\r\n    border: solid;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.header{\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100%;\r\n  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.12);\r\n  z-index: 10;\r\n}\r\n\r\n.wrapper {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 360px;\r\n  width: 100%;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.loader-box {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  content-alignment: center;\r\n  align-items: center;\r\n  background-color: rgba(15,15,15,0.5);\r\n  border-radius: 5px;\r\n  height: 200px;\r\n  width: 250px;\r\n  box-shadow: 1px 1px 1px 0px darkslategrey;\r\n}\r\n\r\n.loader {\r\n  border: 1px solid white;\r\n  border-radius: 50%;\r\n  border-right-color: transparent;\r\n  border-bottom-color: transparent;\r\n  width: 80px;\r\n  height: 80px;\r\n  -webkit-animation-name: loading;\r\n          animation-name: loading;\r\n  -webkit-animation-duration: 700ms;\r\n          animation-duration: 700ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear;\r\n          animation-timing-function: linear;\r\n}\r\n\r\n.loader-text {\r\n  margin-top: 10px;\r\n  padding-top: 10px;\r\n  color: lightgrey;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 18px;\r\n  -webkit-animation-name: fading;\r\n          animation-name: fading;\r\n  -webkit-animation-duration: 1500ms;\r\n          animation-duration: 1500ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear;\r\n          animation-timing-function: linear;\r\n}\r\n\r\n.description-box{\r\n  margin-top: 10px;\r\n  paddin: 10px 5px 10px 5px;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 18px;\r\n  height: 35px;\r\n  line-height: 35px;\r\n  width: 500px;\r\n  background-color: #fff;\r\n  text-align: center;\r\n  border-radius: 5px;\r\n}\r\n\r\n@-webkit-keyframes loading{\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes loading{\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@-webkit-keyframes fading {\r\n  0%, 100% {\r\n    opacity: 0.05;\r\n  }\r\n  50% {\r\n    opacity: 0.95;\r\n  }\r\n}\r\n\r\n@keyframes fading {\r\n  0%, 100% {\r\n    opacity: 0.05;\r\n  }\r\n  50% {\r\n    opacity: 0.95;\r\n  }\r\n}\r\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"header\" class=\"page-container header\">\r\n\r\n  <!-- bloc-1 -->\r\n\r\n  <div class=\"bloc bgc-white l-bloc main-navigation\" id=\"bloc-1\">\r\n    <div class=\"container\">\r\n      <nav class=\"navbar\">\r\n        <div class=\"navbar-header\">\r\n          <button *ngIf=\"hideBackOnHome\" aria-label=\"menu\" id=\"nav-toggle\" type=\"button\" class=\"pull-left ui-navbar-toggle navbar-toggle\"\r\n            (click)=\"goBack()\">\r\n            <i class=\"fa fa-arrow-left\"></i>\r\n          </button>\r\n          <button aria-label=\"menu\" id=\"nav-toggle\" type=\"button\" class=\"pull-left ui-navbar-toggle navbar-toggle\" (click)=\"openNav()\">\r\n            <i class=\"fa fa-bars lg\"></i>\r\n          </button>\r\n          <div *ngIf= \"tempName == 'product'; else notProduct\">\r\n              <div *ngIf= \"title.length > articleSize; else noAnimation\" >\r\n                  <div class=\"mobile-title visible-xs mobileTitle\"><marquee class=\"mar-size\">{{title}}</marquee></div>\r\n              </div>\r\n              <ng-template #noAnimation>\r\n                  <div class=\"mobile-title visible-xs mobileTitle\">{{title}}</div>\r\n              </ng-template>\r\n          </div>\r\n          <ng-template #notProduct>\r\n            <div class=\"mobile-title visible-xs mobileTitle\">{{title}}</div>\r\n          </ng-template>\r\n          \r\n         \r\n\r\n        </div>\r\n        <div class=\"navbar-1\">\r\n          <ul class=\"site-navigation nav navbar-nav\">\r\n            <li>\r\n              <a class=\"navbar-brand\" (click)=\"navigate('','')\">\r\n                <img width=\"100%\" src=\"{{logoUrl}}/logo.png\">\r\n              </a>\r\n            </li>\r\n            <li>\r\n              <a class=\"nav-link\" (click)=\"navigate('','')\">Home\r\n                <span class=\"sr-only\">(current)</span>\r\n              </a>\r\n            </li>\r\n            <li>\r\n              <a class=\"nav-link\" (click)=\"navigate('aboutus','About us')\">About Us</a>\r\n            </li>\r\n            <li>\r\n              <a class=\"nav-link\" (click)=\"navigate('contact','Contact us')\">Contact Us</a>\r\n            </li>\r\n            <li>\r\n              <a class=\"nav-link\" (click)=\"navigate('policies','Policies')\">Policies</a>\r\n            </li>\r\n\r\n          </ul>\r\n        </div>\r\n      </nav>\r\n    </div>\r\n  </div>\r\n  <!-- bloc-1 END -->\r\n\r\n  <!-- Mobile Navigation -->\r\n  <div id=\"mySidenav\" class=\"sidenav  main-navigation\">\r\n    <div class=\"closebtn\" (click)=\"closeNav()\">&times;</div>\r\n    <a (click)=\"navigate('','')\">Home</a>\r\n    <a *ngIf=\"subscriptionStatus === null || subscriptionStatus === 'UNSUBSCRIBED'\" data-toggle=\"modal\" (click) = \"openRegisterModel()\">Register</a>\r\n    <a *ngIf=\"subscriptionStatus === 'SUBSCRIBED'\" data-toggle=\"modal\" (click) = \"openMyAccountModel()\">My Account</a>\r\n    <a (click)=\"navigate('contact','Contact us')\">Contact Us</a>\r\n    <a (click)=\"navigate('policies','Privacy Policy')\">Privacy Policy</a>\r\n    <div class=\"navbar-brand text-center\" (click)=\"navigate('','')\">\r\n      <img src=\"{{logoUrl}}/logo.png\">\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <!-- ScrollToTop Button -->\r\n  <a class=\"bloc-button btn btn-d scrollToTop\" onclick=\"scrollToTarget('1')\">\r\n    <span class=\"fa fa-chevron-up\"></span>\r\n  </a>\r\n  <!-- ScrollToTop Button END-->\r\n\r\n</div>\r\n<!-- bloc-2 END -->\r\n\r\n\r\n\r\n<!-- My Account Model -->\r\n<div class=\"modal fade\" data-backdrop=\"static\" data-keyboard=\"false\" id=\"myAccountModel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myAccountModalLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-body text-center\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n\r\n        <div *ngIf = \"isUnsubscribing == false\">\r\n          <h3 class=\"padding-bottom\">My Account</h3>\r\n          <h4>\r\n            Are you sure you want to unsubscribe from this service?\r\n          </h4>\r\n        </div>\r\n          <div *ngIf=\"isUnsubscribing == true\">\r\n            <div class=\"wrapper\">\r\n              <div class=\"loader-box\">\r\n                <div class=\"loader\">\r\n\r\n                </div>\r\n                <div class=\"loader-text\">\r\n                  Un-Subscribing...\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        <button type=\"button\" [disabled]=\"isUnsubscribing == true\" class=\"btn sub-button-sub btn-block\" (click)=\"onUnsubscribe()\"> Unsubscibe Now</button>\r\n        <button type=\"button\" class=\"btn sub-button-cancel btn-block\" data-dismiss=\"modal\" (click)= \"close()\">Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- My Account Model -->\r\n<div class=\"modal fade\" data-backdrop=\"static\" data-keyboard=\"false\" id=\"registerModel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"registerModalLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-body text-center\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n        <div *ngIf=\"isSubscribing == false\">\r\n          <h3 class=\"padding-bottom\">Subscribe</h3>\r\n          <div *ngIf = \"appPublishDetails\">\r\n              <div  *ngFor = \"let operators of appPublishDetails.operators\">\r\n                <div *ngIf = \"operators.isEnabled\">\r\n                  <div>\r\n                    <p> {{operators.operator | titlecase}} Rs.{{operators.amount}}+tax per {{getRenewalIntervalNumberOfDaysByIntervalCode(operators.interval)}} day(s)</p>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n\r\n          <p>The subscription amount will be charged to your mobile phone account and your subscription will be renewed automatically.</p>\r\n          <p>මෙම සේවාව සදහා දායක මුදල ඔබේ ජංගම දුරකතන ගිණුමෙන් අය කරනු ලැබේ. දායක මුදල් ස්වයංක්‍රීයව නැවත අලුත් කෙරෙනු ලැබේ.</p>\r\n          <p>இந்த சேவை கட்டணம் உங்கள் தொலைபேசி கணக்கிலிருந்து அறவிடப்படும். உங்களது சேவையானது தானாகவே மீண்டும் மீள் செயட்படுத்தப்படும்.</p>\r\n        </div>\r\n        <div *ngIf=\"isSubscribing == true\">\r\n          <div class=\"wrapper\">\r\n            <div class=\"loader-box\">\r\n              <div class=\"loader\">\r\n\r\n              </div>\r\n              <div class=\"loader-text\">\r\n                Subscribing...\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <button [disabled]=\"isSubscribing == true\" type=\"button\" class=\"btn sub-button-sub btn-block\" (click)=\"onSubscribe()\"> Subscibe Now</button>\r\n        <button type=\"button\" class=\"btn sub-button-cancel btn-block\" data-dismiss=\"modal\" (click)= \"close()\">Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- My Account Model -->\r\n<div class=\"modal fade\" data-backdrop=\"static\" data-keyboard=\"false\" id=\"appStatusModel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"appStatusModelLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-body text-center\">\r\n        <h3>{{displayMessage}}</h3>\r\n        <br>\r\n        <button type=\"button\" class=\"btn sub-button-cancel btn-block\" data-dismiss=\"modal\" (click)= \"close()\">Ok</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- App push notifications Model -->\r\n<div class=\"modal fade\" data-backdrop=\"static\" data-keyboard=\"false\" id=\"appPushNotificationModel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"appStatusModelLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-body text-center\">\r\n        <strong>Notification</strong>\r\n        <br>\r\n        <p>{{pushMessage}}</p>\r\n        <br>\r\n        <button type=\"button\" class=\"btn sub-button-cancel btn-block\" data-dismiss=\"modal\" (click)= \"close()\">Ok</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__});
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/title.service */ "./src/app/services/title.service.ts");
/* harmony import */ var _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/cordova-plugin-services/sms.service */ "./src/app/services/cordova-plugin-services/sms.service.ts");
/* harmony import */ var _services_cordova_plugin_services_cordova_plugin_device_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/cordova-plugin-services/cordova-plugin-device.service */ "./src/app/services/cordova-plugin-services/cordova-plugin-device.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/subscribed-data/subscribed-data.service */ "./src/app/services/subscribed-data/subscribed-data.service.ts");
/* harmony import */ var _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/appdata-info/appdata-info.service */ "./src/app/services/appdata-info/appdata-info.service.ts");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/observable/IntervalObservable */ "./node_modules/rxjs-compat/_esm5/observable/IntervalObservable.js");
/* harmony import */ var rxjs_add_operator_takeWhile__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/add/operator/takeWhile */ "./node_modules/rxjs-compat/_esm5/add/operator/takeWhile.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var headerCmp;
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(subscription, router, dataService, titleServ, location, sms, device, appDataService, messageService, spinner) {
        var _this = this;
        this.subscription = subscription;
        this.router = router;
        this.dataService = dataService;
        this.titleServ = titleServ;
        this.location = location;
        this.sms = sms;
        this.device = device;
        this.appDataService = appDataService;
        this.messageService = messageService;
        this.spinner = spinner;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["userId"];
        this.templateName = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["templateName"];
        this.articleSize = 20;
        this.alive = true;
        this.isSubscribing = false;
        this.isUnsubscribing = false;
        this.renewalIntervals = [];
        this.isFromCMSAppView = false;
        this.cartNo = this.dataService.cart.cartItems.length;
        this.title = 'Your Horoscope';
        router.events.subscribe(function (val) {
            console.log(val['url']);
            if (val['url'] == '/' || val['url'] === '/?isFromCMSAppView=1') {
                _this.hideBackOnHome = false;
            }
            else {
                _this.hideBackOnHome = true;
            }
        });
        headerCmp = this;
        this.titleServ.getLocation().subscribe(function (source) {
            return _this.tempName = source;
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logoUrl = _assets_constantsService__WEBPACK_IMPORTED_MODULE_13__["SERVER_URL"] + "/templates/viewWebImages?userId="
            + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=';
        this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView") == '1';
        $('#registerModel').on('hide.bs.modal', function () {
            _this.alive = false;
            _this.isSubscribing = false;
        });
        $('#myAccountModel').on('hide.bs.modal', function () {
            _this.alive = false;
            _this.isUnsubscribing = false;
        });
        this.isSubscribing = false;
        this.isUnsubscribing = false;
        var msisdn = localStorage.getItem(this.appId + "msisdn");
        var uuid = localStorage.getItem("UUID");
        var data = { appId: this.appId, msisdn: msisdn, uuId: uuid };
        console.log("HeaderComp.oninit.getSubscribedData data: ", data);
        this.subscription.getSubscribedData(data).subscribe(function (results) {
            _this.subscriptionStatus = results.subscriptionStatus;
            _this.dataService.subscriptionStatus = results.subscriptionStatus;
        });
        this.appDataService.getPublishDetails().subscribe(function (data) {
            _this.appPublishDetails = data;
            //Set the keyword and port to localstorage
            localStorage.setItem(_this.sms.LOCALSTORAGE_KEYWORD_STRING, data.keyword);
            localStorage.setItem(_this.sms.LOCALSTORAGE_PORT_STRING, data.port);
        });
        if (this.dataService.renewalIntervals.length > 0) {
            this.renewalIntervals = this.dataService.renewalIntervals;
        }
        this.titleServ.currentTitle.subscribe(function (message) { return _this.title = message; });
        $(".navbar-2").on('show.bs.collapse', function () {
            $('.mobileTitle').removeClass('visible-xs');
            $('.mobileTitle').addClass('hidden');
        });
        $(".navbar-2").on('hide.bs.collapse', function () {
            $('.mobileTitle').addClass('visible-xs');
            $('.mobileTitle').removeClass('hidden');
        });
        this.messageService.getMessage().subscribe(function (data) {
            console.log('messageService.getMessage in Header Component =>', data);
            if (data.subscription) {
                _this.dataService.subscriptionStatus = data.subscription.subscriptionStatus;
            }
            else {
                _this.dataService.subscriptionStatus = null;
            }
            _this.subscriptionStatus = _this.dataService.subscriptionStatus;
        });
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        this.subscriptionStatus = this.dataService.subscriptionStatus;
        this.displayMessage = this.dataService.displayMessage;
        this.pushMessage = this.dataService.pushMessage;
    };
    HeaderComponent.prototype.navigate = function (route, name) {
        if (name === '') {
            this.title = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["name"];
        }
        else {
            this.title = name;
        }
        this.router.navigate([route]);
        this.closeNav();
    };
    HeaderComponent.prototype.goBack = function () {
        this.location.back();
    };
    HeaderComponent.prototype.manualToggle = function () {
        this.titleServ.changeTitle("Shopping Cart");
        $('.navbar-2').removeClass('in');
        $('.mobileTitle').addClass('visible-xs');
        $('.mobileTitle').removeClass('hidden');
    };
    HeaderComponent.prototype.openNav = function () {
        if (this.templateName == "News" || this.templateName == "Magazine") {
            document.getElementById("mySidenav").style.height = "100%";
            document.getElementById("header").style.height = "100%";
        }
        else {
            document.getElementById("mySidenav").style.width = "100%";
            document.getElementById("header").style.height = "100%";
        }
    };
    HeaderComponent.prototype.closeNav = function () {
        if (this.templateName == "News" || this.templateName == "Magazine") {
            document.getElementById("mySidenav").style.height = "0";
            document.getElementById("header").style.height = "initial";
        }
        else {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("header").style.height = "initial";
        }
    };
    HeaderComponent.prototype.close = function () {
        this.isUnsubscribing = false;
        this.isSubscribing = false;
    };
    HeaderComponent.prototype.openRegisterModel = function () {
        $(function () {
            $('#registerModel').modal('show');
        });
    };
    HeaderComponent.prototype.openMyAccountModel = function () {
        $(function () {
            $('#myAccountModel').modal('show');
        });
    };
    HeaderComponent.prototype.onSubscribe = function () {
        var _this = this;
        if (!this.isFromCMSAppView) {
            this.alive = true;
            //Send Registration SMS
            headerCmp.sms.sendRegistrationSMS(headerCmp.smsSuccessRegistrationCallback, headerCmp.smsErrorRegistrationCallback);
            var uuid = localStorage.getItem("UUID");
            var data_1 = { appId: this.appId, uuId: uuid };
            this.dataService.numberOfTries = 1;
            this.isSubscribing = true;
            //This will periodically check whether the User had subscribed to the Service successfully
            rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_11__["IntervalObservable"].create(5000)
                .takeWhile(function () { return _this.alive; }) // only fires when component is alive
                .subscribe(function () {
                if (_this.dataService.numberOfTries == _this.dataService.defaultNumberOfTries) {
                    _this.alive = false;
                    _this.timeoutSubscriptionPopup();
                    return;
                }
                _this.dataService.numberOfTries++;
                _this.subscription.getSubscribedData(data_1).subscribe(function (data) {
                    _this.subscriptionStatus = data.subscriptionStatus;
                    _this.dataService.subscriptionStatus = data.subscriptionStatus;
                    if (data.isError) {
                        _this.alive = false;
                        _this.dataService.displayMessage = data.displayMessage;
                        $(function () {
                            $('#registerModel').modal('toggle');
                            $('#appStatusModel').modal('show');
                        });
                        _this.closeNav();
                    }
                    else if (_this.subscriptionStatus === _this.dataService.STATUS_SUBSCRIBED) {
                        _this.isSubscribing = false;
                        localStorage.setItem(_this.appId + "msisdn", data.msisdn);
                        _this.alive = false;
                        //close the model
                        $(function () {
                            $('#registerModel').modal('toggle');
                        });
                        //close the nav bar
                        _this.closeNav();
                    }
                });
            });
        }
    };
    HeaderComponent.prototype.onUnsubscribe = function () {
        var _this = this;
        if (!this.isFromCMSAppView) {
            this.alive = true;
            this.dataService.numberOfTries = 1;
            //Send Un-Registration SMS
            headerCmp.sms.sendUnRegistrationSMS(headerCmp.smsSuccessUnRegistrationCallback, headerCmp.smsErrorUnRegistrationCallback);
            var uuid = localStorage.getItem("UUID");
            var data_2 = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn"), uuId: uuid };
            this.isUnsubscribing = true;
            rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_11__["IntervalObservable"].create(5000)
                .takeWhile(function () { return _this.alive; }) // only fires when component is alive
                .subscribe(function () {
                if (_this.dataService.numberOfTries == _this.dataService.defaultNumberOfTries) {
                    _this.alive = false;
                    _this.timeoutUnubscriptionPopup();
                    return;
                }
                _this.dataService.numberOfTries++;
                _this.subscription.getSubscribedData(data_2).subscribe(function (data) {
                    _this.subscriptionStatus = data.subscriptionStatus;
                    _this.dataService.subscriptionStatus = data.subscriptionStatus;
                    if (_this.subscriptionStatus === _this.dataService.STATUS_UNSUBSCRIBED) {
                        _this.isUnsubscribing = false;
                        localStorage.removeItem(_this.appId + "msisdn");
                        _this.alive = false;
                        _this.router.navigate(['']);
                        $(function () {
                            _this.unSubscribedSuccessPopup();
                        });
                        _this.closeNav();
                    }
                });
            });
        }
    };
    HeaderComponent.prototype.smsSuccessRegistrationCallback = function (results) {
        console.log("smsSuccessRegistrationCallback in Header Component: " + results);
    };
    HeaderComponent.prototype.smsErrorRegistrationCallback = function (error) {
        console.log("smsErrorRegistrationCallback in Header Component: " + error);
        headerCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to subscribe to the service';
        $(function () {
            $('#registerModel').modal('hide');
            $('#appStatusModel').modal('show');
        });
    };
    HeaderComponent.prototype.smsSuccessUnRegistrationCallback = function (results) {
        console.log("smsSuccessUnRegistrationCallback in Header Component: " + results);
    };
    HeaderComponent.prototype.smsErrorUnRegistrationCallback = function (error) {
        console.log("smsErrorUnRegistrationCallback in Header Component: " + error);
        headerCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to send the sms to unsubscribe from the service';
        $(function () {
            $('#myAccountModel').modal('toggle');
            $('#appStatusModel').modal('show');
        });
    };
    HeaderComponent.prototype.timeoutSubscriptionPopup = function () {
        this.dataService.displayMessage = 'The subscription process timed out. We are unable to subscribe you to the service at this time.';
        $(function () {
            $('#registerModel').modal('hide');
            $('#appStatusModel').modal('show');
        });
    };
    HeaderComponent.prototype.timeoutUnubscriptionPopup = function () {
        this.dataService.displayMessage = 'The unsubscription process timed out, Please try again.';
        $(function () {
            $('#myAccountModel').modal('toggle');
            $('#appStatusModel').modal('show');
        });
    };
    HeaderComponent.prototype.unSubscribedSuccessPopup = function () {
        this.dataService.displayMessage = 'You got unsubscribed from the service';
        $(function () {
            $('#myAccountModel').modal('toggle');
            $('#appStatusModel').modal('show');
        });
    };
    HeaderComponent.prototype.getRenewalIntervalNumberOfDaysByIntervalCode = function (code) {
        return this.appDataService.getRenewalIntervalNumberOfDaysByIntervalCode(code);
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")],
        }),
        __metadata("design:paramtypes", [_services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_8__["SubscribedDataService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_2__["PagebodyServiceModule"],
            _services_title_service__WEBPACK_IMPORTED_MODULE_4__["TitleService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"],
            _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_5__["SMSService"],
            _services_cordova_plugin_services_cordova_plugin_device_service__WEBPACK_IMPORTED_MODULE_6__["CordovaPluginDeviceService"],
            _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_9__["AppDataService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_14__["MessageService"],
            ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_10__["Ng4LoadingSpinnerService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/page-body/aboutus/aboutus.component.css":
/*!*********************************************************!*\
  !*** ./src/app/page-body/aboutus/aboutus.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* CUSTOMIZE THE CAROUSEL\r\n-------------------------------------------------- */\r\n\r\n/* Carousel base class */\r\n\r\n:host  /deep/ .carousel {\r\n  margin-bottom: 1.5rem;\r\n}\r\n\r\n/* Since positioning the image, we need to help out the caption */\r\n\r\n:host  /deep/ .carousel-caption {\r\n  z-index: 10;\r\n  bottom: 3rem;\r\n  height: 55%;\r\n}\r\n\r\n/* Declare heights because of positioning of img element */\r\n\r\n:host  /deep/ .carousel-item {\r\n  height: calc(50vh);\r\n  background-color: #777;\r\n}\r\n\r\n:host  /deep/ .carousel-item > img {\r\n  min-width: 100%;\r\n  height: 100%;\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n}\r\n\r\n:host  /deep/ .carousel-control-prev, :host  /deep/ .carousel-control-next, :host  /deep/ .carousel-indicators{\r\n\tdisplay: none;\r\n}\r\n\r\n/* ABOUT MAIN CONTENT\r\n-------------------------------------------------- */\r\n\r\n.about-main{\r\n\tpadding:100px 0;\r\n}\r\n\r\n.about-main h1{\r\n    font-size: 40px;\r\n    font-weight: 700;\r\n    color: #1c1f23;\r\n}\r\n\r\n.about-main h2{\r\n\tmargin-top: 10px;\r\n    margin-bottom: 27px;\r\n    font-size: 24px;\r\n    font-weight: 400;\r\n    letter-spacing: 0.1em;\r\n    text-transform: uppercase;\r\n    color: #b67c5a;\r\n}\r\n\r\n.about-main div{\r\n\tmargin-bottom: 40px;\r\n    font-size: 16px;\r\n    line-height: 1.9;\r\n    color: #7b7d7f;\r\n}\r\n\r\n/* MARKETING CONTENT\r\n-------------------------------------------------- */\r\n\r\n/* Center align the text within the three columns below the carousel */\r\n\r\n:host  /deep/  app-marketing-option1-left .row .col-md-6:first-child{\r\n \twidth: 100%;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    padding: 50px!important;\r\n    display: flex;\r\n}\r\n\r\n:host  /deep/  app-marketing-option1-right .row .col-md-6:nth-child(1){\r\n    width: 100%;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    padding: 50px!important;\r\n    display: flex;\r\n}\r\n\r\n:host  /deep/ .featurette-heading {\r\n  font-size: 40px;\r\n}\r\n\r\n:host  /deep/ .featurette h3{\r\n\r\n\tmargin-top: 10px;\r\n    margin-bottom: 27px;\r\n    font-size: 24px;\r\n    font-weight: 400;\r\n    letter-spacing: 0.1em;\r\n    text-transform: uppercase;\r\n    color: #b67c5a;\r\n}\r\n\r\n:host  /deep/ .featurette p{\r\n\tmargin-bottom: 40px;\r\n    font-size: 16px;\r\n    line-height: 1.9;\r\n    color: #7b7d7f;\r\n}\r\n\r\n/* Featurettes\r\n------------------------- */\r\n\r\n:host  /deep/ .featurette-divider {\r\n  margin: 5rem 0; /* Space out the Bootstrap <hr> more */\r\n}\r\n\r\n/* news letter\r\n------------------------- */\r\n\r\n:host  /deep/ .b-form-newsletter {\r\n  padding: 70px 25px 0 25px !important;\r\n}\r\n\r\n/* news letter\r\n------------------------- */\r\n\r\n.progress-list{\r\n\tmargin-top: 10rem!important;\r\n    margin-bottom: 5rem!important;\r\n}\r\n\r\n.progress-list p{\r\n    margin-top: 7px;\r\n    font-size: 18px;\r\n    font-weight: 600;\r\n    line-height: 30px;\r\n    color: #1c1f23;\r\n}\r\n\r\n.progress-list span{\r\n\tdisplay: block;\r\n}\r\n\r\n.progress-list span:first-child{\r\n    font-size: 100px;\r\n    letter-spacing: -0.1em;\r\n    color: #b67c5a;\r\n}\r\n\r\n.progress-list .col-md-4{\r\n\tpadding: 10px;\r\n\tborder-right:1px solid #ccc;\r\n\ttext-align:center;\r\n}\r\n\r\n.progress-list .col-md-4:last-child{\r\n\tborder:0 !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/page-body/aboutus/aboutus.component.html":
/*!**********************************************************!*\
  !*** ./src/app/page-body/aboutus/aboutus.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- bloc-10 -->\r\n<div class=\"bloc bgc-white l-bloc\" id=\"bloc-10\">\r\n  <div class=\"container bloc-sm\">\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-12\">\r\n        <img  data-src=\"{{aboutUsUrl}}/ABOUTUS.png\" class=\"img-responsive lazyload visible-lg-block visible-md-block\" />\r\n        <!-- <h1 class=\"text-center margin-top padding-vertical main-header-font\" [innerHTML]=\"header\"></h1> -->\r\n        <h3 class=\"padding-vertical main-header-font\" [innerHTML]=\"header\"> </h3>\r\n        <p class=\"main-content-font\" [innerHTML]=\"content\"> </p>\r\n\r\n        <div class=\"container\">\r\n          <h2 class=\"main-header-font\">Open Hours</h2>\r\n          <p class=\"main-content-font\">Weekdays : {{openWeekdays}}</p>\r\n          <p class=\"main-content-font\">Saturday : {{openSaturday}}</p>\r\n          <p class=\"main-content-font\">Sunday : {{openSunday}}</p>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- bloc-10 END -->\r\n\r\n\r\n\r\n<hr class=\"featurette-divider\">\r\n"

/***/ }),

/***/ "./src/app/page-body/aboutus/aboutus.component.ts":
/*!********************************************************!*\
  !*** ./src/app/page-body/aboutus/aboutus.component.ts ***!
  \********************************************************/
/*! exports provided: AboutusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutusComponent", function() { return AboutusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__});
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/appdata-info/appdata-info.service */ "./src/app/services/appdata-info/appdata-info.service.ts");
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/title.service */ "./src/app/services/title.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AboutusComponent = /** @class */ (function () {
    function AboutusComponent(http, appdataService, title) {
        this.http = http;
        this.appdataService = appdataService;
        this.title = title;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__["userId"];
        this.openWeekdays = "we are closed";
        this.openSunday = "we are closed";
        this.openSaturday = "we are closed";
        this.title.changeTitle("About Us");
    }
    AboutusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appdataService.getAboutUs()
            .subscribe(function (data) {
            _this.header = data.header;
            _this.content = data.content;
            _this.openHours = (data.OpenHours);
            // var objSize = Object.keys(this.openHours).length;
            try {
                if (_this.openHours.sundayOpenHour) {
                    _this.openSunday = _this.openHours.sundayOpenHour + '.' + _this.openHours.sundayOpenMinute + " to " + _this.openHours.sundayCloseHour + '.' + _this.openHours.sundayCloseMinute;
                }
            }
            catch (e) {
                _this.openSunday = "we are closed";
            }
            try {
                if (_this.openHours.saturdayOpenHour) {
                    _this.openSaturday = _this.openHours.saturdayOpenHour + '.' + _this.openHours.saturdayOpenMinute + " to " + _this.openHours.saturdayCloseHour + '.' + _this.openHours.saturdayCloseMinute;
                }
            }
            catch (e) {
                _this.openSaturday = "we are closed";
            }
            try {
                if (_this.openHours.weekDaysOpenHour) {
                    _this.openWeekdays = _this.openHours.weekDaysOpenHour + '.' + _this.openHours.weekDaysOpenMinute + " to " + _this.openHours.weekDaysCloseHour + '.' + _this.openHours.weekDaysCloseMinute;
                }
            }
            catch (e) {
                _this.openWeekdays = "we are closed";
            }
            // if ((this.openHours.sundayOpenHour) == false || this.openHours.sundayOpenHour == null || this.openHours.sundayOpenHour == ) {
            //   console.log('s');
            // }
            // if (this.openHours.weekDaysOpenHour === undefined) {
            //   this.openWeekdays = "we are closed"
            // }else{
            //   this.openWeekdays = this.openHours.weekDaysOpenHour + " to " + this.openHours.weekDaysCloseHour;
            // }
            // if (this.openHours.saturdayOpenHour != undefined) {
            //   this.openSaturday = this.openHours.saturdayOpenHour + " to " + this.openHours.saturdayCloseHour;
            // }else{
            //   this.openSaturday = "we are closed"
            // }
            // if (this.openHours.sundayOpenHour != undefined) {
            //   this.openSunday = this.openHours.sundayOpenHour + " to " + this.openHours.sundayCloseHour;
            // }else{
            //   this.openSunday = "we are closed"
            // }
            _this.aboutUsUrl = _assets_constantsService__WEBPACK_IMPORTED_MODULE_1__["SERVER_URL"] + "/templates/viewWebImages?userId="
                + _this.userId + "&appId=" + _this.appId + "&" + new Date().getTime() + '&images=';
        }, function (err) {
            console.log(err);
        });
    };
    AboutusComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-aboutus',
            template: __webpack_require__(/*! ./aboutus.component.html */ "./src/app/page-body/aboutus/aboutus.component.html"),
            styles: [__webpack_require__(/*! ./aboutus.component.css */ "./src/app/page-body/aboutus/aboutus.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_4__["AppDataService"], _services_title_service__WEBPACK_IMPORTED_MODULE_5__["TitleService"]])
    ], AboutusComponent);
    return AboutusComponent;
}());



/***/ }),

/***/ "./src/app/page-body/contact/contact.component.css":
/*!*********************************************************!*\
  !*** ./src/app/page-body/contact/contact.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\nagm-map {\r\n  height: 600px;\r\n}\r\n\r\n@media (max-width: 767px){\r\n  agm-map {\r\n    height: 360px;\r\n  }\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/app/page-body/contact/contact.component.html":
/*!**********************************************************!*\
  !*** ./src/app/page-body/contact/contact.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- this creates a google map on the page with the given lat/lng from -->\r\n<!-- the component as the initial center of the map: -->\r\n\r\n<div class=\"container\">\r\n  <!-- <agm-map  *ngIf=\"contactInfo.showMap\" [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"17\">\r\n    <agm-marker [latitude]=\"lat\" [longitude]=\"lng\"></agm-marker>\r\n  </agm-map> -->\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <app-contact-info [contacts]=\"contactInfo\"></app-contact-info>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/page-body/contact/contact.component.ts":
/*!********************************************************!*\
  !*** ./src/app/page-body/contact/contact.component.ts ***!
  \********************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/appdata-info/appdata-info.service */ "./src/app/services/appdata-info/appdata-info.service.ts");
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/title.service */ "./src/app/services/title.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactComponent = /** @class */ (function () {
    function ContactComponent(appdataService, title) {
        var _this = this;
        this.appdataService = appdataService;
        this.title = title;
        this.CONTACNTINFO = [];
        this.contactInfo = this.CONTACNTINFO;
        this.appdataService.getContactUs().subscribe(function (data) {
            _this.CONTACNTINFO.push(data);
            if (data.coords) {
                _this.lat = data.coords.latitude;
                _this.lng = data.coords.longitude;
            }
        }), (function (err) {
            alert('warning!' + " Unable to get contact us info\n Please check your connection.");
        });
        this.title.changeTitle("Contact Us");
    }
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/page-body/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/page-body/contact/contact.component.css")]
        }),
        __metadata("design:paramtypes", [_services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_1__["AppDataService"], _services_title_service__WEBPACK_IMPORTED_MODULE_2__["TitleService"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/page-body/homepage/homepage.component.css":
/*!***********************************************************!*\
  !*** ./src/app/page-body/homepage/homepage.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex-row{\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin: 20px 0;\r\n}\r\n.flex-row .flex-col{\r\n  width: calc(100vw / 2);\r\n  margin: 5px 20px;\r\n}\r\n.flex-row .flex-col img{\r\n  width: 100%;\r\n  box-shadow: 1px 1px 15px black;\r\n}\r\n.flex-row .flex-col div{\r\n  text-align: center;\r\n  font-weight: 600;\r\n  font-size: 14px;\r\n}\r\n.flex-row:last-child{\r\n  padding-bottom: 60px;\r\n}\r\n.flex-row:first-child{\r\n  padding-top: 69px;\r\n}\r\n/*My account modal css*/\r\n.modal {\r\n  text-align: center;\r\n  padding: 0!important;\r\n}\r\n.modal:before {\r\n  content: '';\r\n  display: inline-block;\r\n  height: 100%;\r\n  vertical-align: middle;\r\n  margin-right: -4px;\r\n}\r\n.modal-dialog {\r\n  display: inline-block;\r\n  text-align: left;\r\n  vertical-align: middle;\r\n}\r\n.sub-button-sub{\r\n    background-image: linear-gradient(to right, #2ba2fa, #0092fc, #0081fb, #006ff8, #0f5af2);\r\n    border-width: 0px !important;\r\n    color: #fff !important;\r\n    padding: 10px;\r\n    border-radius: 20px;\r\n    border-width: 1px !important;\r\n    letter-spacing: 2px;\r\n    border: solid;\r\n    text-transform: uppercase;\r\n}\r\n.sub-button-cancel{\r\n    background-image: linear-gradient(to right, #ff8c2b, #ff8328, #ff7a25, #ff7024, #ff6623);\r\n    border-width: 0px !important;\r\n    color: #fff !important;\r\n    padding: 10px;\r\n    border-radius: 20px;\r\n    border-width: 1px !important;\r\n    letter-spacing: 2px;\r\n    border: solid;\r\n    text-transform: uppercase;\r\n}\r\n.header{\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100%;\r\n  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.12);\r\n  z-index: 10;\r\n}\r\n.wrapper {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 360px;\r\n  width: 100%;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n.loader-box {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  content-alignment: center;\r\n  align-items: center;\r\n  background-color: rgba(15,15,15,0.5);\r\n  border-radius: 5px;\r\n  height: 200px;\r\n  width: 250px;\r\n  box-shadow: 1px 1px 1px 0px darkslategrey;\r\n}\r\n.loader {\r\n  border: 1px solid white;\r\n  border-radius: 50%;\r\n  border-right-color: transparent;\r\n  border-bottom-color: transparent;\r\n  width: 80px;\r\n  height: 80px;\r\n  -webkit-animation-name: loading;\r\n          animation-name: loading;\r\n  -webkit-animation-duration: 700ms;\r\n          animation-duration: 700ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear;\r\n          animation-timing-function: linear;\r\n}\r\n.loader-text {\r\n  margin-top: 10px;\r\n  padding-top: 10px;\r\n  color: lightgrey;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 18px;\r\n  -webkit-animation-name: fading;\r\n          animation-name: fading;\r\n  -webkit-animation-duration: 1500ms;\r\n          animation-duration: 1500ms;\r\n  -webkit-animation-iteration-count: infinite;\r\n          animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear;\r\n          animation-timing-function: linear;\r\n}\r\n.description-box{\r\n  margin-top: 10px;\r\n  padding: 10px 5px 10px 5px;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 18px;\r\n  height: 35px;\r\n  line-height: 35px;\r\n  width: 500px;\r\n  background-color: #fff;\r\n  text-align: center;\r\n  border-radius: 5px;\r\n}\r\n@-webkit-keyframes loading{\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n  }\r\n}\r\n@keyframes loading{\r\n  from {\r\n    -webkit-transform: rotate(0deg);\r\n            transform: rotate(0deg);\r\n  }\r\n  to {\r\n    -webkit-transform: rotate(360deg);\r\n            transform: rotate(360deg);\r\n  }\r\n}\r\n@-webkit-keyframes fading {\r\n  0%, 100% {\r\n    opacity: 0.05;\r\n  }\r\n  50% {\r\n    opacity: 0.95;\r\n  }\r\n}\r\n@keyframes fading {\r\n  0%, 100% {\r\n    opacity: 0.05;\r\n  }\r\n  50% {\r\n    opacity: 0.95;\r\n  }\r\n}"

/***/ }),

/***/ "./src/app/page-body/homepage/homepage.component.html":
/*!************************************************************!*\
  !*** ./src/app/page-body/homepage/homepage.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\r\n\r\n  <div class=\"bloc l-bloc\" id=\"bloc-2\">\r\n    <div class=\"container bloc-sm\">\r\n\r\n      <ng-template *ngFor=\"let category of results;let i = index\" [ngIf]=\"i % 2 === 0\">\r\n        <div class=\"flex-row\">\r\n          <div class=\"flex-col\" (click)=\"navigateShop('shop',results[i].id,results[i].name,results[i].imageUrl)\" *ngIf=\"results[i]\">\r\n            <img src=\"{{imageUrl}}/{{results[i].imageUrl}}\" >\r\n            <div class=\"main-header-font name\">{{results[i].name}}</div>\r\n          </div>\r\n          <div class=\"flex-col\" (click)=\"navigateShop('shop',results[i+1].id,results[i+1].name,results[i+1].imageUrl)\" *ngIf=\"results[i+1]\">\r\n            <img src=\"{{imageUrl}}/{{results[i+1].imageUrl}}\" >\r\n            <div class=\"main-header-font name\">{{results[i+1].name}}</div>\r\n          </div>\r\n        </div>\r\n      </ng-template>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- My Account Model -->\r\n<div class=\"modal fade\" id=\"registerModelhome\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"registerModalLabel\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-body text-center\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n          <div *ngIf=\"isSubscribing == false\">\r\n              <h3 class=\"padding-bottom\">Subscribe</h3>\r\n              <div *ngIf = \"appPublishDetails\">\r\n                  <div  *ngFor = \"let operators of appPublishDetails.operators\">\r\n                      <div *ngIf = \"operators.isEnabled\">\r\n                          <div>\r\n                              <p> {{operators.operator | titlecase}} Rs.{{operators.amount}}+tax per {{getRenewalIntervalNumberOfDaysByIntervalCode(operators.interval)}} day(s)</p>\r\n                          </div>\r\n                      </div>\r\n                  </div>\r\n              </div>\r\n\r\n              <p>The subscription amount will be charged to your mobile phone account and your subscription will be renewed automatically.</p>\r\n              <p>මෙම සේවාව සදහා දායක මුදල ඔබේ ජංගම දුරකතන ගිණුමෙන් අය කරනු ලැබේ. දායක මුදල් ස්වයංක්‍රීයව නැවත අලුත් කෙරෙනු ලැබේ.</p>\r\n              <p>இந்த சேவை கட்டணம் உங்கள் தொலைபேசி கணக்கிலிருந்து அறவிடப்படும். உங்களது சேவையானது தானாகவே மீண்டும் மீள் செயட்படுத்தப்படும்.</p>\r\n            </div>\r\n          <div *ngIf=\"isSubscribing == true\">\r\n            <div class=\"wrapper\">\r\n              <div class=\"loader-box\">\r\n                <div class=\"loader\">\r\n\r\n                </div>\r\n                <div class=\"loader-text\">\r\n                  Subscribing...\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <button [disabled]=\"isSubscribing == true\" type=\"button\" class=\"btn sub-button-sub btn-block\" (click)=\"onSubscribe()\"> Subscibe Now</button>\r\n          <button (click)=\"onCancel()\" type=\"button\" class=\"btn sub-button-cancel btn-block\" data-dismiss=\"modal\">Cancel</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./src/app/page-body/homepage/homepage.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/page-body/homepage/homepage.component.ts ***!
  \**********************************************************/
/*! exports provided: HomepageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepageComponent", function() { return HomepageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__});
/* harmony import */ var _services_categories_categories_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/title.service */ "./src/app/services/title.service.ts");
/* harmony import */ var _services_cordova_plugin_services_cordova_plugin_firebase_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/cordova-plugin-services/cordova-plugin-firebase.service */ "./src/app/services/cordova-plugin-services/cordova-plugin-firebase.service.ts");
/* harmony import */ var rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/observable/IntervalObservable */ "./node_modules/rxjs-compat/_esm5/observable/IntervalObservable.js");
/* harmony import */ var rxjs_add_operator_takeWhile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/add/operator/takeWhile */ "./node_modules/rxjs-compat/_esm5/add/operator/takeWhile.js");
/* harmony import */ var _services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/subscribed-data/subscribed-data.service */ "./src/app/services/subscribed-data/subscribed-data.service.ts");
/* harmony import */ var _services_cordova_plugin_services_cordova_plugin_device_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/cordova-plugin-services/cordova-plugin-device.service */ "./src/app/services/cordova-plugin-services/cordova-plugin-device.service.ts");
/* harmony import */ var _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/cordova-plugin-services/sms.service */ "./src/app/services/cordova-plugin-services/sms.service.ts");
/* harmony import */ var _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../services/appdata-info/appdata-info.service */ "./src/app/services/appdata-info/appdata-info.service.ts");
/* harmony import */ var _services_products_products_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/products/products.service */ "./src/app/services/products/products.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var homePageCmp;
var HomepageComponent = /** @class */ (function () {
    function HomepageComponent(route, dataService, router, categoryService, device, title, sms, push, subscription, productService, appDataService) {
        this.route = route;
        this.dataService = dataService;
        this.router = router;
        this.categoryService = categoryService;
        this.device = device;
        this.title = title;
        this.sms = sms;
        this.push = push;
        this.subscription = subscription;
        this.productService = productService;
        this.appDataService = appDataService;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["userId"];
        this.localStorageUUIDString = "UUID";
        this.alive = true;
        this.isSubscribing = false;
        this.renewalIntervals = [];
        this.isFromCMSAppView = false;
        this.title.changeTitle(_assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["name"]);
        homePageCmp = this;
        this.title.setLocation('home');
    }
    HomepageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appDataService.getPublishDetails().subscribe(function (data) {
            _this.appPublishDetails = data;
        });
        this.appDataService.getRenewalIntervals().subscribe(function (data) {
            _this.dataService.renewalIntervals = data;
            _this.renewalIntervals = _this.dataService.renewalIntervals;
        });
        this.isFromCMSAppView = localStorage.getItem(this.appId + "_isFromCMSAppView") == '1';
        $('#registerModelhome').on('hide.bs.modal', function () {
            _this.alive = false;
            _this.isSubscribing = false;
        });
        this.isSubscribing = false;
        if (!this.isFromCMSAppView) {
            this.getDeviceUUID();
        }
        this.imageUrl = _assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + "/templates/viewWebImages?userId="
            + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
        this.categoryService.getCategories().subscribe(function (data) {
            if (data.length > 0) {
                // Read the result field from the JSON response.
                _this.results = data;
                _this.dataService.searchArray = [];
                data.forEach(function (element) {
                    _this.dataService.searchArray.push({ 'name': element.name, 'id': element.id });
                });
            }
            else {
                _this.results = null;
            }
        }, function (error) {
            console.log('Error retrieving categories');
        });
    };
    HomepageComponent.prototype.loadArticle = function (catId, articleId) {
        this.route.navigate(['product', 'fromPushMessage', catId, articleId]);
    };
    // Routing Method
    HomepageComponent.prototype.navigateShop = function (val, id, name, image) {
        var _this = this;
        this.isSubscribing = false;
        if (this.isFromCMSAppView) {
            this.dataService.catId = id;
            this.router.navigate(['/' + val, id, name, image]);
        }
        else {
            var uuid = localStorage.getItem("UUID");
            var data_1 = { appId: this.appId, msisdn: localStorage.getItem(this.appId + "msisdn"), uuId: uuid };
            this.subscription.getSubscribedData(data_1).subscribe(function (data) {
                _this.subscriptionStatus = data.subscriptionStatus;
                _this.dataService.subscriptionStatus = data.subscriptionStatus;
                if (data.isError) {
                    _this.dataService.displayMessage = data.displayMessage;
                    $(function () {
                        $('#appStatusModel').modal('show');
                    });
                }
                else if (_this.subscriptionStatus === _this.dataService.STATUS_SUBSCRIBED) {
                    if (data.isPaymentSuccess) {
                        _this.dataService.displayMessage = "Successfully renewed your service";
                        $(function () {
                            $('#appStatusModel').modal('show');
                        });
                    }
                    _this.isSubscribing = false;
                    localStorage.setItem(_this.appId + "msisdn", data.msisdn);
                    _this.dataService.catId = id;
                    _this.router.navigate(['/' + val, id, name, image]);
                }
                else {
                    _this.dataService.subUserArticleData.id = id;
                    _this.dataService.subUserArticleData.name = name;
                    _this.dataService.subUserArticleData.image = image;
                    _this.isSubscribing = false;
                    $('#registerModelhome').modal('show');
                }
            });
        }
    };
    HomepageComponent.prototype.pushSuccessCallback = function (token) {
        console.log("Push Token: " + token);
        var data = 'deviceId=' + token + '&uuid=' + homePageCmp.uuid;
        try {
            homePageCmp.categoryService.sendDeviceToken(data).subscribe(function (data) {
                console.log("Device token persisted successfully");
                homePageCmp.callOnNotificationOpen();
            }, function (error) {
                console.log('Error while sending the device token to be persist.Error: ' + error);
                homePageCmp.callOnNotificationOpen();
            });
        }
        catch (err) {
            console.log("Exception in pushSuccessCallback: " + err);
        }
    };
    HomepageComponent.prototype.pushErrorCallback = function (error) {
        console.log("pushErrorCallback=>" + error);
    };
    HomepageComponent.prototype.generatePushToken = function () {
        console.log("Call generatePushToken in homepage");
        homePageCmp.push.getToken(homePageCmp.pushSuccessCallback, homePageCmp.pushErrorCallback);
    };
    HomepageComponent.prototype.onNotificationOpenSuccessCallback = function (notification) {
        console.log("inside onNotificationOpenSuccessCallback notification: " + JSON.stringify(notification));
        if (notification.tap && notification.categoryId && notification.articleId && localStorage.getItem(homePageCmp.appId + "msisdn")) {
            homePageCmp.loadArticle(notification.categoryId, notification.articleId);
        }
        else if (!notification.tap && notification.body) {
            homePageCmp.dataService.pushMessage = notification.body;
            $(function () {
                $('#appStatusModel').modal('hide');
                $('#appPushNotificationModel').modal('show');
                $('#appPushNotificationModel').off('hidden.bs.modal');
                if (notification.categoryId && notification.articleId) {
                    console.log("binded appPushNotificationModel");
                    $('#appPushNotificationModel').on('hidden.bs.modal', function () {
                        console.log("In Close appPushNotificationModel");
                        homePageCmp.loadArticle(notification.categoryId, notification.articleId);
                    });
                }
            });
        }
    };
    HomepageComponent.prototype.onNotificationOpenErrorCallback = function (error) {
        console.log("onNotificationOpenErrorCallback=>" + error);
    };
    HomepageComponent.prototype.callOnNotificationOpen = function () {
        console.log("Call callOnNotificationOpen in homepage");
        homePageCmp.push.onNotificationOpen(homePageCmp.onNotificationOpenSuccessCallback, homePageCmp.onNotificationOpenErrorCallback);
    };
    HomepageComponent.prototype.deviceUUIDCallback = function (uuid) {
        var uuidLocalStorage = localStorage.getItem(homePageCmp.localStorageUUIDString);
        if (!uuidLocalStorage && uuid) {
            localStorage.setItem(homePageCmp.localStorageUUIDString, uuid);
        }
        //This call has made to set the footer My Account/header My Account according to the Subscriptin Status.Will send messages inside getSubscriptionStatus method to footer and Header.
        var data = { appId: homePageCmp.appId, uuId: uuid };
        homePageCmp.subscription.getSubscriptionStatus(data).subscribe(function (results) { return console.log("homepage.componenet.getSubscriptionStatus=> ", results); });
        homePageCmp.uuid = uuid;
        homePageCmp.generatePushToken();
    };
    HomepageComponent.prototype.getDeviceUUID = function () {
        var uuidLocalStorage = localStorage.getItem(this.localStorageUUIDString);
        if (uuidLocalStorage) {
            this.deviceUUIDCallback(uuidLocalStorage);
        }
        else {
            this.device.getUUID(homePageCmp.deviceUUIDCallback);
        }
    };
    HomepageComponent.prototype.onCancel = function () {
        this.isSubscribing = false;
        this.alive = false;
    };
    HomepageComponent.prototype.onSubscribe = function () {
        var _this = this;
        if (!homePageCmp.sms.isServiceConfigured()) {
            alert("Service not yet configured, please contact support.");
            return;
        }
        //Send Registration SMS
        homePageCmp.sms.sendRegistrationSMS(homePageCmp.smsSuccessRegistrationCallback, homePageCmp.smsErrorRegistrationCallback);
        var uuid = localStorage.getItem("UUID");
        var data = { appId: this.appId, uuId: uuid };
        this.alive = true;
        this.isSubscribing = true;
        this.dataService.numberOfTries = 1;
        rxjs_observable_IntervalObservable__WEBPACK_IMPORTED_MODULE_8__["IntervalObservable"].create(5000)
            .takeWhile(function () { return _this.alive; }) // only fires when component is alive
            .subscribe(function () {
            console.log('# of tries: ' + _this.dataService.numberOfTries);
            if (_this.dataService.numberOfTries == _this.dataService.defaultNumberOfTries) {
                _this.alive = false;
                _this.timeoutSubscriptionPopup();
                return;
            }
            console.log('Try Sub: ' + _this.dataService.numberOfTries);
            _this.dataService.numberOfTries++;
            _this.subscription.getSubscribedData(data).subscribe(function (data) {
                _this.subscriptionStatus = data.subscriptionStatus;
                _this.dataService.subscriptionStatus = data.subscriptionStatus;
                if (data.isError) {
                    _this.alive = false;
                    _this.dataService.displayMessage = data.displayMessage;
                    $(function () {
                        $('#registerModelhome').modal('hide');
                        $('#appStatusModel').modal('show');
                    });
                }
                else if (_this.subscriptionStatus === _this.dataService.STATUS_SUBSCRIBED) {
                    _this.isSubscribing = false;
                    localStorage.setItem(_this.appId + "msisdn", data.msisdn);
                    _this.alive = false;
                    _this.dataService.catId = _this.dataService.subUserArticleData.id;
                    _this.router.navigate(['/shop',
                        _this.dataService.subUserArticleData.id,
                        _this.dataService.subUserArticleData.name,
                        _this.dataService.subUserArticleData.image]);
                    $(function () {
                        $('#registerModelhome').modal('hide');
                    });
                }
            });
        });
    };
    HomepageComponent.prototype.smsSuccessRegistrationCallback = function (results) {
        console.log("smsSuccessRegistrationCallback in homepage Component: " + results);
    };
    HomepageComponent.prototype.smsErrorRegistrationCallback = function (error) {
        console.log("smsErrorRegistrationCallback in homepage Component: " + error);
        homePageCmp.dataService.displayMessage = 'Sorry, you do not have enough credit to subscribe to the service';
        $(function () {
            $('#registerModelhome').modal('hide');
            $('#appStatusModel').modal('show');
        });
    };
    HomepageComponent.prototype.timeoutSubscriptionPopup = function () {
        this.dataService.displayMessage = 'The subscription process timed out. We are unable to subscribe you to the service at this time.';
        $(function () {
            $('#registerModelhome').modal('hide');
            $('#appStatusModel').modal('show');
        });
    };
    HomepageComponent.prototype.getRenewalIntervalNumberOfDaysByIntervalCode = function (code) {
        return this.appDataService.getRenewalIntervalNumberOfDaysByIntervalCode(code);
    };
    HomepageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-homepage',
            template: __webpack_require__(/*! ./homepage.component.html */ "./src/app/page-body/homepage/homepage.component.html"),
            styles: [__webpack_require__(/*! ./homepage.component.css */ "./src/app/page-body/homepage/homepage.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_5__["PagebodyServiceModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_categories_categories_service__WEBPACK_IMPORTED_MODULE_4__["CategoriesService"],
            _services_cordova_plugin_services_cordova_plugin_device_service__WEBPACK_IMPORTED_MODULE_11__["CordovaPluginDeviceService"],
            _services_title_service__WEBPACK_IMPORTED_MODULE_6__["TitleService"],
            _services_cordova_plugin_services_sms_service__WEBPACK_IMPORTED_MODULE_12__["SMSService"],
            _services_cordova_plugin_services_cordova_plugin_firebase_service__WEBPACK_IMPORTED_MODULE_7__["CordovaPluginFirebaseService"],
            _services_subscribed_data_subscribed_data_service__WEBPACK_IMPORTED_MODULE_10__["SubscribedDataService"],
            _services_products_products_service__WEBPACK_IMPORTED_MODULE_14__["ProductsService"],
            _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_13__["AppDataService"]])
    ], HomepageComponent);
    return HomepageComponent;
}());



/***/ }),

/***/ "./src/app/page-body/page-body-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/page-body/page-body-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: PageBodyRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageBodyRoutingModule", function() { return PageBodyRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./homepage/homepage.component */ "./src/app/page-body/homepage/homepage.component.ts");
/* harmony import */ var _aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./aboutus/aboutus.component */ "./src/app/page-body/aboutus/aboutus.component.ts");
/* harmony import */ var _policies_policies_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./policies/policies.component */ "./src/app/page-body/policies/policies.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/page-body/contact/contact.component.ts");
/* harmony import */ var _shop_shop_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shop/shop.component */ "./src/app/page-body/shop/shop.component.ts");
/* harmony import */ var _product_product_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./product/product.component */ "./src/app/page-body/product/product.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '',
        component: _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_2__["HomepageComponent"],
        pathMatch: 'full'
    },
    {
        path: 'aboutus',
        component: _aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_3__["AboutusComponent"],
        data: { title: 'About Us Page' }
    },
    {
        path: 'policies',
        component: _policies_policies_component__WEBPACK_IMPORTED_MODULE_4__["PoliciesComponent"],
        data: { title: 'Policies Page' }
    },
    {
        path: 'contact',
        component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_5__["ContactComponent"],
        data: { title: 'Contact Page' }
    },
    {
        path: 'shop/:id/:name/:image',
        component: _shop_shop_component__WEBPACK_IMPORTED_MODULE_6__["ShopComponent"],
        data: { title: 'Shop Page' }
    },
    {
        path: 'product/:catName/:catId/:articleId',
        component: _product_product_component__WEBPACK_IMPORTED_MODULE_7__["ProductComponent"],
        data: { title: 'Product Page' }
    },
    // {
    //   path: 'paypal',
    // component: PaypalPaymentComponent
    // }
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var PageBodyRoutingModule = /** @class */ (function () {
    function PageBodyRoutingModule() {
    }
    PageBodyRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PageBodyRoutingModule);
    return PageBodyRoutingModule;
}());



/***/ }),

/***/ "./src/app/page-body/page-body.component.css":
/*!***************************************************!*\
  !*** ./src/app/page-body/page-body.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/page-body/page-body.component.html":
/*!****************************************************!*\
  !*** ./src/app/page-body/page-body.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/page-body/page-body.component.ts":
/*!**************************************************!*\
  !*** ./src/app/page-body/page-body.component.ts ***!
  \**************************************************/
/*! exports provided: PageBodyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageBodyComponent", function() { return PageBodyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageBodyComponent = /** @class */ (function () {
    function PageBodyComponent() {
    }
    PageBodyComponent.prototype.ngOnInit = function () {
    };
    PageBodyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-body',
            template: __webpack_require__(/*! ./page-body.component.html */ "./src/app/page-body/page-body.component.html"),
            styles: [__webpack_require__(/*! ./page-body.component.css */ "./src/app/page-body/page-body.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], PageBodyComponent);
    return PageBodyComponent;
}());



/***/ }),

/***/ "./src/app/page-body/page-body.module.ts":
/*!***********************************************!*\
  !*** ./src/app/page-body/page-body.module.ts ***!
  \***********************************************/
/*! exports provided: PageBodyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageBodyModule", function() { return PageBodyModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _page_body_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-body-routing.module */ "./src/app/page-body/page-body-routing.module.ts");
/* harmony import */ var _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./homepage/homepage.component */ "./src/app/page-body/homepage/homepage.component.ts");
/* harmony import */ var _page_body_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-body.component */ "./src/app/page-body/page-body.component.ts");
/* harmony import */ var _addons_addons_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addons/addons.module */ "./src/app/addons/addons.module.ts");
/* harmony import */ var _aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./aboutus/aboutus.component */ "./src/app/page-body/aboutus/aboutus.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _policies_policies_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./policies/policies.component */ "./src/app/page-body/policies/policies.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/page-body/contact/contact.component.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _shop_shop_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shop/shop.component */ "./src/app/page-body/shop/shop.component.ts");
/* harmony import */ var _product_product_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./product/product.component */ "./src/app/page-body/product/product.component.ts");
/* harmony import */ var _pipes_safeHtml_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../pipes/safeHtml.pipe */ "./src/app/pipes/safeHtml.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var PageBodyModule = /** @class */ (function () {
    function PageBodyModule() {
    }
    PageBodyModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _page_body_routing_module__WEBPACK_IMPORTED_MODULE_3__["PageBodyRoutingModule"],
                _addons_addons_module__WEBPACK_IMPORTED_MODULE_6__["AddonsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_11__["AgmCoreModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ],
            exports: [
                _page_body_component__WEBPACK_IMPORTED_MODULE_5__["PageBodyComponent"]
            ],
            declarations: [
                _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_4__["HomepageComponent"],
                _page_body_component__WEBPACK_IMPORTED_MODULE_5__["PageBodyComponent"],
                _aboutus_aboutus_component__WEBPACK_IMPORTED_MODULE_7__["AboutusComponent"],
                _policies_policies_component__WEBPACK_IMPORTED_MODULE_9__["PoliciesComponent"],
                _contact_contact_component__WEBPACK_IMPORTED_MODULE_10__["ContactComponent"],
                _shop_shop_component__WEBPACK_IMPORTED_MODULE_12__["ShopComponent"],
                _product_product_component__WEBPACK_IMPORTED_MODULE_13__["ProductComponent"],
                _pipes_safeHtml_pipe__WEBPACK_IMPORTED_MODULE_14__["SafeHtmlPipe"]
            ]
        })
    ], PageBodyModule);
    return PageBodyModule;
}());



/***/ }),

/***/ "./src/app/page-body/page-body.service.ts":
/*!************************************************!*\
  !*** ./src/app/page-body/page-body.service.ts ***!
  \************************************************/
/*! exports provided: PagebodyServiceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagebodyServiceModule", function() { return PagebodyServiceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PagebodyServiceModule = /** @class */ (function () {
    function PagebodyServiceModule() {
        this.STATUS_SUBSCRIBED = 'SUBSCRIBED';
        this.STATUS_UNSUBSCRIBED = 'UNSUBSCRIBED';
        this.cart = { cartItems: [], cartSize: 0, totalPrice: 0, totalQuantity: 0 };
        this.isUserLoggedIn = { check: false };
        this.parentobj = { userLog: false, cartSize: 0, totalPrice: 0 };
        this.searchArray = [];
        this.renewalIntervals = [];
        this.subUserArticleData = { id: null, name: null, image: null };
        this.defaultNumberOfTries = 12;
        this.parentobj.cartSize = this.cart.cartSize;
        this.parentobj.userLog = this.isUserLoggedIn.check;
    }
    ;
    PagebodyServiceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], PagebodyServiceModule);
    return PagebodyServiceModule;
}());



/***/ }),

/***/ "./src/app/page-body/policies/policies.component.css":
/*!***********************************************************!*\
  !*** ./src/app/page-body/policies/policies.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".row:first-child{\r\n  padding-top: 60px;\r\n}\r\n.row:last-child{\r\n  padding-bottom: 60px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/page-body/policies/policies.component.html":
/*!************************************************************!*\
  !*** ./src/app/page-body/policies/policies.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- bloc-10 -->\r\n<div class=\"bloc bgc-white l-bloc\" id=\"bloc-10\">\r\n  <div class=\"container bloc-sm\">\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-12\">\r\n        <h3 class=\"padding-vertical main-header-font\">\r\n          Privacy Policy\r\n        </h3>\r\n        <p class=\"main-content-font\" [innerHTML]=\"privacyPolicy\"> </p>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-12\">\r\n        <h3 class=\"padding-vertical main-header-font\">\r\n          Terms and Conditions\r\n        </h3>\r\n        <p class=\"main-content-font\" [innerHTML]=\"terms\"> </p>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- <hr class=\"featurette-divider\"> -->\r\n\r\n    <div class=\"row\" *ngIf=\"defaultTerms\">\r\n      <div class=\"col-sm-12\">\r\n        <h3 class=\"padding-vertical main-header-font\">Ideadroid Terms and Conditions</h3>\r\n      </div>\r\n      <div class=\"main-content-font\" [innerHTML]=\"defaultTerms\"></div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n<!-- bloc-10 END -->\r\n"

/***/ }),

/***/ "./src/app/page-body/policies/policies.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/page-body/policies/policies.component.ts ***!
  \**********************************************************/
/*! exports provided: PoliciesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoliciesComponent", function() { return PoliciesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/appdata-info/appdata-info.service */ "./src/app/services/appdata-info/appdata-info.service.ts");
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/title.service */ "./src/app/services/title.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PoliciesComponent = /** @class */ (function () {
    function PoliciesComponent(http, appdataService, title) {
        this.http = http;
        this.appdataService = appdataService;
        this.title = title;
        this.title.changeTitle("Policies");
    }
    PoliciesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appdataService.getPolicies()
            .subscribe(function (data) {
            _this.privacyPolicy = data.privacyPolicy;
            _this.returnPolicy = data.returnPolicy;
            _this.terms = data.termsAndCondition;
        }, function (err) {
            console.log(err);
        });
        this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_4__["SERVER_URL"] + "/templates/getDefaultTerms", { responseType: 'text' }).subscribe(function (res) {
            _this.defaultTerms = res;
        });
    };
    PoliciesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-policies',
            template: __webpack_require__(/*! ./policies.component.html */ "./src/app/page-body/policies/policies.component.html"),
            styles: [__webpack_require__(/*! ./policies.component.css */ "./src/app/page-body/policies/policies.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _services_appdata_info_appdata_info_service__WEBPACK_IMPORTED_MODULE_1__["AppDataService"], _services_title_service__WEBPACK_IMPORTED_MODULE_2__["TitleService"]])
    ], PoliciesComponent);
    return PoliciesComponent;
}());



/***/ }),

/***/ "./src/app/page-body/product/product.component.css":
/*!*********************************************************!*\
  !*** ./src/app/page-body/product/product.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".desc{\r\n  white-space: pre-wrap;\r\n  margin-bottom: 64px;\r\n}\r\n.carousel-control{\r\n  height: 86%;\r\n}\r\n.page-container{\r\n  padding-top: 58px;\r\n}\r\n/* /deep/ .ug-gallery-wrapper .ug-slider-wrapper{\r\n         background-color: rgba(0,0,0,0) !important;\r\n       }\r\n\r\n/deep/.ug-slider-wrapper .ug-item-wrapper{\r\n        background-color:  rgba(0,0,0,0) !important;\r\n      }\r\n\r\n/deep/ .ug-theme-panel .ug-strip-panel{\r\n         background-color: rgba(0, 0, 0, 0) !important;\r\n       } */\r\n"

/***/ }),

/***/ "./src/app/page-body/product/product.component.html":
/*!**********************************************************!*\
  !*** ./src/app/page-body/product/product.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\">\r\n  <!-- <div id=\"gallery\" style=\"display:none;\">\r\n    <ng-template *ngFor=\"let item of Data.tempImageArray\" [ngIf]=\"item\">\r\n      <img  *ngIf=\"item.videoUrl == null\" alt=\"{{item.name}}\"\r\n            src=\"{{imageUrl}}/{{item.img}}\"\r\n            [attr.data-image]=\"imageUrl/item.img\">\r\n\r\n      <img  *ngIf=\"item.videoUrl != null\" alt=\"{{item.name}}\"\r\n            data-type=\"youtube\"\r\n            src=\"{{imageUrl}}/{{item.img}}\"\r\n            [attr.data-image]=\"imageUrl/item.img\"\r\n            [attr.data-videoid]=\"item.videoUrl\">\r\n    </ng-template>\r\n  </div> -->\r\n\r\n  <div class=\"padding\">\r\n    <!-- <h4 class=\"text-center main-header-font\">{{Data.title}}</h4> -->\r\n    <div class=\"desc main-content-font\" [innerHtml]=\"Data.desc\"> </div>\r\n  </div>\r\n\r\n  <!-- bloc-17 END -->\r\n\r\n  <!-- ScrollToTop Button -->\r\n  <a class=\"bloc-button btn btn-d scrollToTop\" onclick=\"scrollToTarget('1')\">\r\n    <span class=\"fa fa-chevron-up\"></span>\r\n  </a>\r\n  <!-- ScrollToTop Button END-->\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/page-body/product/product.component.ts":
/*!********************************************************!*\
  !*** ./src/app/page-body/product/product.component.ts ***!
  \********************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_4__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_4__});
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/title.service */ "./src/app/services/title.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _services_products_products_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/products/products.service */ "./src/app/services/products/products.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductComponent = /** @class */ (function () {
    function ProductComponent(productService, sanitizer, dataService, router, route, title) {
        this.productService = productService;
        this.sanitizer = sanitizer;
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.title = title;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_4__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_4__["userId"];
        this.parentobj = { cartItems: [], cartSize: 0, totalPrice: 0 };
        this.lockBuyButton = false;
        this.imageUrl = _assets_constantsService__WEBPACK_IMPORTED_MODULE_3__["SERVER_URL"] + "/templates/viewWebImages?userId="
            + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';
        this.Data = this.dataService.data;
        this.title.setLocation('product');
    }
    ProductComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var api = $("#gallery").unitegallery({
            theme_enable_text_panel: false,
            gallery_background_color: "rgba(0,0,0,0)",
            slider_textpanel_bg_color: "#000000",
            slider_textpanel_bg_opacity: 0,
        });
        this.setCarousalControlls();
        api.on("item_change", function (num, data) {
            _this.setCarousalControlls();
        });
    };
    ProductComponent.prototype.setCarousalControlls = function () {
        $(".ug-zoompanel").css('display', 'none');
        $(".ug-default-button-hidepanel").css('display', 'none');
        $(".ug-default-button-fullscreen-single").css('display', 'none');
        $(".ug-default-button-play-single").css({ 'right': '2px', 'left': 'unset' });
    };
    ProductComponent.prototype.loadArticle = function (catId, articleId) {
        var _this = this;
        if (catId && articleId) {
            console.log("loadArticle for catId: " + catId + " articleId: " + articleId);
            this.dataService.catId = catId;
            this.productService.getProducts().subscribe(function (articles) {
                console.log("<<<<<<<<Articles>>>>>>>>>");
                console.log(articles);
                var article = null;
                for (var i = 0; i < articles.length; i++) {
                    console.log("articles[i].id=>" + articles[i].id);
                    if (articles[i].id === articleId) {
                        article = articles[i];
                    }
                }
                if (article) {
                    _this.dataService.data = article;
                    _this.catName = article.title;
                    _this.title.changeTitle(_this.catName);
                    _this.Data = article;
                    _this.productService.createArticleViewDataInfo(_this.catName).subscribe(function (data) {
                        // Read the result field from the JSON response.
                        _this.results = data;
                    }, function (error) {
                        console.log('Error on create record');
                    });
                }
                else {
                    console.log("Article not found for the catId: " + catId + " articleId: " + articleId);
                }
            }, function (error) {
                console.log('Error shop service');
            });
        }
    };
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Product. ngOnInit", this.catId, this.articleId);
        this.router.params.subscribe(function (params) {
            if (params['catName'] != 'fromPushMessage') {
                _this.title.changeTitle(params['catName']);
            }
            else {
                //  write the code to fetch category name
            }
            console.log(_this.catId, _this.articleId);
            _this.articleId = params['articleId'];
            _this.catId = params['catId'];
            _this.loadArticle(_this.catId, _this.articleId);
        });
    };
    ProductComponent.prototype.checkUrl = function (url) {
        var id, URL;
        var res = url.slice(8);
        var res2 = res.split(/\/|&|=/);
        if (res2.length > 2) {
            id = res2[2];
        }
        else {
            id = res2[1];
        }
        return id;
    };
    ProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product',
            template: __webpack_require__(/*! ./product.component.html */ "./src/app/page-body/product/product.component.html"),
            styles: [__webpack_require__(/*! ./product.component.css */ "./src/app/page-body/product/product.component.css")],
        }),
        __metadata("design:paramtypes", [_services_products_products_service__WEBPACK_IMPORTED_MODULE_7__["ProductsService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"], _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_1__["PagebodyServiceModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _services_title_service__WEBPACK_IMPORTED_MODULE_5__["TitleService"]])
    ], ProductComponent);
    return ProductComponent;
}());



/***/ }),

/***/ "./src/app/page-body/shop/shop.component.css":
/*!***************************************************!*\
  !*** ./src/app/page-body/shop/shop.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container{\r\n  height: 100vh;\r\n}\r\n.flex-row{\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  border: 0;\r\n  padding: 10px;\r\n  margin:1%;\r\n  width:100%;\r\n  height:120px;\r\n}\r\n.flex-row img{\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  width: 80px;\r\n  height: 100px;\r\n  object-fit: cover;\r\n  color: #a5a5a5;\r\n  min-width: 80px;\r\n}\r\n.flex-row p{\r\n  font-size: 13px;\r\n  height: 34px;\r\n  overflow: hidden;\r\n  color: #a5a5a5;\r\n}\r\n.flex-row h5{\r\n  font-size: 16px;\r\n}\r\n/* commented by .sanira */\r\n/* .flex-row:last-child {\r\n  padding-bottom: 60px;\r\n}\r\n.flex-row:first-child{\r\n  padding-top: 69px;\r\n} */\r\n/* Newly Added CSS by .Sanira */\r\n.edited{\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 18% 0;\r\n  padding: 2%;\r\n  align-items: center;\r\n}\r\n.list-group-decs{\r\n  display:flex;\r\n  margin-left: 10px;\r\n  flex-direction: column;\r\n}\r\n.set-line-height{\r\n  line-height: 1.5em;\r\n}"

/***/ }),

/***/ "./src/app/page-body/shop/shop.component.html":
/*!****************************************************!*\
  !*** ./src/app/page-body/shop/shop.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bloc bgc-gray l-bloc\" id=\"bloc-0\">\r\n  <div class=\"container bloc-sm\">\r\n\r\n    <div class=\"list-group edited\">\r\n      <a class=\"list-group-item flex-row\" *ngFor=\"let article of results;let i = index\" (click)=\"navigateProd('product',article)\">\r\n        <img src=\"{{imageUrl}}/{{article.tempImageArray[0].img}}\">\r\n        <div class=\"list-group-decs\">\r\n          <h5 class=\"list-group-item-heading main-header-font set-line-height\">{{article.title}}</h5>\r\n          <p class=\"list-group-item-text main-content-font\">{{description[i]}}</p>\r\n        </div>\r\n      </a>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<!-- ScrollToTop Button -->\r\n<a class=\"bloc-button btn btn-d scrollToTop\" onclick=\"scrollToTarget('1')\">\r\n  <span class=\"fa fa-chevron-up\"></span>\r\n</a>\r\n<!-- ScrollToTop Button END-->\r\n"

/***/ }),

/***/ "./src/app/page-body/shop/shop.component.ts":
/*!**************************************************!*\
  !*** ./src/app/page-body/shop/shop.component.ts ***!
  \**************************************************/
/*! exports provided: ShopComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopComponent", function() { return ShopComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__});
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
/* harmony import */ var _services_products_products_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/products/products.service */ "./src/app/services/products/products.service.ts");
/* harmony import */ var _services_title_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/title.service */ "./src/app/services/title.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ShopComponent = /** @class */ (function () {
    function ShopComponent(productService, dataService, router, route, title) {
        var _this = this;
        this.productService = productService;
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.title = title;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_2__["userId"];
        this.description = [];
        this.imageUrl = _assets_constantsService__WEBPACK_IMPORTED_MODULE_1__["SERVER_URL"] + "/templates/viewWebImages?userId="
            + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + '&images=thirdNavi';
        this.imageUrl1 = _assets_constantsService__WEBPACK_IMPORTED_MODULE_1__["SERVER_URL"] + "/templates/viewWebImages?userId="
            + this.userId + "&appId=" + this.appId + "&" + new Date().getTime() + "&images=secondNavi";
        this.router.params.subscribe(function (params) {
            var catName = params['name'];
            if (catName) {
                _this.title.changeTitle(catName);
            }
            else {
                _this.title.changeTitle("Store");
            }
        });
        this.title.setLocation('shop');
    }
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            _this.catId = params['id']; // --> Name must match wanted parameter
            _this.catName = params['name'];
            _this.catImage = params['image'];
        });
        if (this.catId != undefined) {
            this.productService.getProducts().subscribe(function (data) {
                // Read the result field from the JSON response.
                for (var i = 0; i < data.length; i++) {
                    _this.description.push(_this.htmlToPlaintext(data[i].desc));
                }
                _this.results = data;
            }, function (error) {
                console.log('Error shop service');
            });
        }
        else {
            this.productService.getAllProducts().subscribe(function (data) {
                // Read the result field from the JSON response.
                _this.results = data;
            }, function (error) {
                console.log('Error shop service all');
            });
        }
    };
    ShopComponent.prototype.htmlToPlaintext = function (html) {
        return html.replace(/<[^>]+>/gm, '');
    };
    ShopComponent.prototype.navigateProd = function (val, item) {
        this.dataService.data = item;
        this.route.navigate([val, this.catName, item.categoryId, item.id]);
    };
    ShopComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-shop',
            template: __webpack_require__(/*! ./shop.component.html */ "./src/app/page-body/shop/shop.component.html"),
            styles: [__webpack_require__(/*! ./shop.component.css */ "./src/app/page-body/shop/shop.component.css")],
        }),
        __metadata("design:paramtypes", [_services_products_products_service__WEBPACK_IMPORTED_MODULE_5__["ProductsService"], _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_4__["PagebodyServiceModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_title_service__WEBPACK_IMPORTED_MODULE_6__["TitleService"]])
    ], ShopComponent);
    return ShopComponent;
}());



/***/ }),

/***/ "./src/app/pipes/safeHtml.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/safeHtml.pipe.ts ***!
  \****************************************/
/*! exports provided: SafeHtmlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeHtmlPipe", function() { return SafeHtmlPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'safeHtml' }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());



/***/ }),

/***/ "./src/app/services/appdata-info/appdata-info.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/services/appdata-info/appdata-info.service.ts ***!
  \***************************************************************/
/*! exports provided: AppDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppDataService", function() { return AppDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__});
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppDataService = /** @class */ (function () {
    function AppDataService(http, dataService) {
        this.http = http;
        this.dataService = dataService;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["userId"];
    }
    AppDataService.prototype.getTerms = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getTermsAndConditions?appId=' + this.appId)
            .map(function (res) { return res.text() ? res.json() : res; });
    };
    AppDataService.prototype.getPolicies = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + "/templates/getPolicies?appId=" + this.appId)
            .map(function (res) { return res.text() ? res.json() : res; });
    };
    AppDataService.prototype.getContactUs = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getContactUs?appId=' + this.appId)
            .map(function (res) { return res.text() ? res.json() : res; });
    };
    AppDataService.prototype.getAboutUs = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + "/templates/getAboutUs?appId=" + this.appId)
            .map(function (res) { return res.text() ? res.json() : res; });
    };
    AppDataService.prototype.getPublishDetails = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + "/edit/getPublishDetails?appId=" + this.appId)
            .map(function (res) { return res.text() ? res.json() : res; });
    };
    AppDataService.prototype.getRenewalIntervals = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + "/edit/getRenewals")
            .map(function (res) { return res.text() ? res.json() : res; });
    };
    AppDataService.prototype.getRenewalIntervalObjByIntervalCode = function (code) {
        var renewalIntervals = this.dataService.renewalIntervals;
        if (renewalIntervals.length > 0) {
            return renewalIntervals.filter(function (intObj) { return intObj.code === code; });
        }
        return [];
    };
    AppDataService.prototype.getRenewalIntervalNumberOfDaysByIntervalCode = function (code) {
        var renewalintObj = this.getRenewalIntervalObjByIntervalCode(code);
        if (renewalintObj.length > 0) {
            return renewalintObj[0].noOfDays;
        }
        return '';
    };
    AppDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_5__["PagebodyServiceModule"]])
    ], AppDataService);
    return AppDataService;
}());



/***/ }),

/***/ "./src/app/services/categories/categories.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/services/categories/categories.service.ts ***!
  \***********************************************************/
/*! exports provided: CategoriesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriesService", function() { return CategoriesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__});
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CategoriesService = /** @class */ (function () {
    function CategoriesService(http) {
        this.http = http;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["userId"];
    }
    // '/templates/getArticleCategoryByAppId?appId='
    // '/templates/getSpecificChild?appId='
    CategoriesService.prototype.getCategories = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getArticleCategoryByAppId?appId=' + this.appId)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    CategoriesService.prototype.sendDeviceToken = function (data) {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/postDeviceId?' + data + "&appId=" + this.appId)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    CategoriesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], CategoriesService);
    return CategoriesService;
}());



/***/ }),

/***/ "./src/app/services/cordova-plugin-services/cordova-plugin-device.service.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/services/cordova-plugin-services/cordova-plugin-device.service.ts ***!
  \***********************************************************************************/
/*! exports provided: CordovaPluginDeviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CordovaPluginDeviceService", function() { return CordovaPluginDeviceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var deviceServiceInstance;
var CordovaPluginDeviceService = /** @class */ (function () {
    function CordovaPluginDeviceService() {
        console.log("CordovaPluginDeviceService construction...");
        //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
        // window.addEventListener('message', this.receiveMessageInIframe, false);
        deviceServiceInstance = this;
    }
    CordovaPluginDeviceService.prototype.getSuccessFunctionToBePost = function () {
        var success = function (result) {
            console.log("result=> " + JSON.stringify(result, null, 2));
            if (result) {
                result = JSON.stringify(result);
            }
            else {
                result = '';
            }
            var msgSentSuccess = 'function(){ '
                + 'deviceServiceInstance.successCallback(' + result + ');'
                + '}';
            var successFunc = encodeURI(msgSentSuccess.toString());
            var frame = document.getElementById('appframe');
            // frame.contentWindow.contentWindow.postMessage(successFunc, '*'); (this was changed to below code in performance fix)
            frame.contentWindow.postMessage(successFunc, '*');
        };
        return success;
    };
    CordovaPluginDeviceService.prototype.getErrorFunctionToBePost = function () {
        var error = function (error) {
            console.log("error=> " + JSON.stringify(error, null, 2));
            if (error) {
                error = JSON.stringify(error);
            }
            else {
                error = '';
            }
            var msgSentError = 'function(){ '
                + 'deviceServiceInstance.errorCallback(' + error + ');'
                + '}';
            var errorFunc = encodeURI(msgSentError.toString());
            var frame = document.getElementById('appframe');
            frame.contentWindow.postMessage(errorFunc, '*');
        };
        return error;
    };
    CordovaPluginDeviceService.prototype.getUUID = function (successCallback) {
        this.addEventListnerReceiveMessageInIframe();
        this.successCallbackFunc = successCallback;
        //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
        var functionToBePost = "function(){"
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
            + "   frame.contentWindow.postMessage(successFunc, '*');"
            + "}";
        this.parentPostMessage(functionToBePost);
    };
    /*
     This method will call from the parent window once post to the iFrame
     */
    CordovaPluginDeviceService.prototype.receiveMessageInIframe = function (evt) {
        try {
            console.log("Exec receiveMessageInIframe + " + decodeURI(evt.data));
            eval('(' + decodeURI(evt.data) + ')();');
        }
        catch (e) {
            console.log("Error executing function: " + JSON.stringify(e, null, 2));
        }
        finally {
            window.removeEventListener('message', this.receiveMessageInIframe, false);
        }
    };
    CordovaPluginDeviceService.prototype.addEventListnerReceiveMessageInIframe = function () {
        console.log('call deviceServiceInstance.addEventListnerReceiveMessageInIframe');
        window.addEventListener('message', deviceServiceInstance.receiveMessageInIframe, false);
    };
    CordovaPluginDeviceService.prototype.parentPostMessage = function (functionToBePost) {
        console.log("call deviceServiceInstance.parentPostMessage");
        window.parent.postMessage(deviceServiceInstance.serializeFunction(functionToBePost), '*');
    };
    CordovaPluginDeviceService.prototype.serializeFunction = function (f) {
        return encodeURI(f.toString());
    };
    CordovaPluginDeviceService.prototype.errorCallback = function (error) {
        if (!error) {
            error = null;
        }
        this.errorCallbackFunc()(error);
    };
    CordovaPluginDeviceService.prototype.successCallback = function (result) {
        if (!result) {
            result = null;
        }
        this.successCallbackFunc(result);
    };
    CordovaPluginDeviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CordovaPluginDeviceService);
    return CordovaPluginDeviceService;
}());



/***/ }),

/***/ "./src/app/services/cordova-plugin-services/cordova-plugin-firebase.service.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/services/cordova-plugin-services/cordova-plugin-firebase.service.ts ***!
  \*************************************************************************************/
/*! exports provided: CordovaPluginFirebaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CordovaPluginFirebaseService", function() { return CordovaPluginFirebaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var firebaseInstance;
var CordovaPluginFirebaseService = /** @class */ (function () {
    function CordovaPluginFirebaseService() {
        console.log("CordovaPluginFirebaseService construction...");
        //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
        // window.addEventListener('message', this.receiveMessageInIframe, false);
        firebaseInstance = this;
    }
    CordovaPluginFirebaseService_1 = CordovaPluginFirebaseService;
    CordovaPluginFirebaseService.prototype.getSuccessFunctionToBePost = function () {
        var success = function (result) {
            console.log("result=> " + JSON.stringify(result, null, 2));
            if (result) {
                result = JSON.stringify(result);
            }
            else {
                result = '';
            }
            var msgSentSuccess = 'function(){ '
                + 'firebaseInstance.successCallback(' + result + ');'
                + '}';
            var successFunc = encodeURI(msgSentSuccess.toString());
            var frame = document.getElementById('appframe');
            frame.contentWindow.postMessage(successFunc, '*');
        };
        return success;
    };
    CordovaPluginFirebaseService.prototype.getErrorFunctionToBePost = function () {
        var error = function (error) {
            console.log("error=> " + JSON.stringify(error, null, 2));
            if (error) {
                error = JSON.stringify(error);
            }
            else {
                error = '';
            }
            var msgSentError = 'function(){ '
                + 'firebaseInstance.errorCallback(' + error + ');'
                + '}';
            var errorFunc = encodeURI(msgSentError.toString());
            var frame = document.getElementById('appframe');
            frame.contentWindow.postMessage(errorFunc, '*');
        };
        return error;
    };
    CordovaPluginFirebaseService.prototype.executeFBFunction = function (functionName, successCallback, errorCallback) {
        console.log("executeFBFunction");
        firebaseInstance.addEventListnerReceiveMessageInIframe();
        this.successCallbackFunc = successCallback;
        this.errorCallbackFunc = errorCallback;
        //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
        var functionToBePost = "function(){"
            + "window.FirebasePlugin." + functionName + "("
            + firebaseInstance.getSuccessFunctionToBePost().toString()
            + ", " + firebaseInstance.getErrorFunctionToBePost().toString() + ");"
            + "}";
        firebaseInstance.parentPostMessage(functionToBePost);
    };
    CordovaPluginFirebaseService.prototype.getToken = function (successCallback, errorCallback) {
        this.executeFBFunction(CordovaPluginFirebaseService_1.FB_FUNCTION_GET_TOKEN, successCallback, errorCallback);
    };
    CordovaPluginFirebaseService.prototype.onTokenRefresh = function (successCallback, errorCallback) {
        this.executeFBFunction(CordovaPluginFirebaseService_1.FB_FUNCTION_ON_TOKEN_REFRESH, successCallback, errorCallback);
    };
    CordovaPluginFirebaseService.prototype.onNotificationOpen = function (successCallback, errorCallback) {
        console.log("onNotificationOpen");
        this.executeFBFunction(CordovaPluginFirebaseService_1.FB_FUNCTION_ON_NOTIFICATION_OPEN, successCallback, errorCallback);
    };
    /*
     This method will call from the parent window once post to the iFrame
     */
    CordovaPluginFirebaseService.prototype.receiveMessageInIframe = function (evt) {
        try {
            console.log("Exec receiveMessageInIframe method in firebase service " + decodeURI(evt.data));
            eval('(' + decodeURI(evt.data) + ')();');
        }
        catch (e) {
            console.log("Error Exec receiveMessageInIframe method in firebase service. Error: " + JSON.stringify(e, null, 2));
        }
    };
    CordovaPluginFirebaseService.prototype.addEventListnerReceiveMessageInIframe = function () {
        console.log('call firebaseInstance.addEventListnerReceiveMessageInIframe');
        window.addEventListener('message', firebaseInstance.receiveMessageInIframe, false);
    };
    CordovaPluginFirebaseService.prototype.parentPostMessage = function (functionToBePost) {
        console.log("call firebaseInstance.parentPostMessage");
        window.parent.postMessage(firebaseInstance.serializeFunction(functionToBePost), '*');
    };
    CordovaPluginFirebaseService.prototype.serializeFunction = function (f) {
        return encodeURI(f.toString());
    };
    CordovaPluginFirebaseService.prototype.errorCallback = function (error) {
        if (!error) {
            error = null;
        }
        this.errorCallbackFunc(error);
    };
    CordovaPluginFirebaseService.prototype.successCallback = function (result) {
        if (!result) {
            result = null;
        }
        this.successCallbackFunc(result);
    };
    CordovaPluginFirebaseService.FB_FUNCTION_GET_TOKEN = 'getToken';
    CordovaPluginFirebaseService.FB_FUNCTION_ON_TOKEN_REFRESH = 'onTokenRefresh';
    CordovaPluginFirebaseService.FB_FUNCTION_ON_NOTIFICATION_OPEN = 'onNotificationOpen';
    CordovaPluginFirebaseService = CordovaPluginFirebaseService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CordovaPluginFirebaseService);
    return CordovaPluginFirebaseService;
    var CordovaPluginFirebaseService_1;
}());



/***/ }),

/***/ "./src/app/services/cordova-plugin-services/sms.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/services/cordova-plugin-services/sms.service.ts ***!
  \*****************************************************************/
/*! exports provided: SMSService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SMSService", function() { return SMSService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var smsInstance;
var SMSService = /** @class */ (function () {
    function SMSService() {
        this.LOCALSTORAGE_KEYWORD_STRING = 'keyword';
        this.LOCALSTORAGE_PORT_STRING = 'port';
        this.SERVICE_REGISTRATION_STRING = 'start';
        this.SERVICE_UN_REGISTRATION_STRING = 'stop';
        console.log("SMSService construction...");
        //Register an Event Listener to listen for the postMessages from the parent window to the iFrame
        // window.addEventListener('message', this.receiveMessageInIframe, false);
        smsInstance = this;
    }
    SMSService.prototype.getSuccessFunctionToBePost = function () {
        var success = function (result) {
            console.log("result=> " + JSON.stringify(result, null, 2));
            if (result) {
                result = JSON.stringify(result);
            }
            else {
                result = '';
            }
            var msgSentSuccess = 'function(){ '
                + 'smsInstance.successCallback(' + result + ');'
                + '}';
            var successFunc = encodeURI(msgSentSuccess.toString());
            var frame = document.getElementById('appframe');
            frame.contentWindow.postMessage(successFunc, '*');
        };
        return success;
    };
    SMSService.prototype.getErrorFunctionToBePost = function () {
        var error = function (error) {
            console.log("error=> " + JSON.stringify(error, null, 2));
            if (error) {
                error = JSON.stringify(error);
            }
            else {
                error = '';
            }
            var msgSentError = 'function(){ '
                + 'smsInstance.errorCallback(' + error + ');'
                + '}';
            var errorFunc = encodeURI(msgSentError.toString());
            var frame = document.getElementById('appframe');
            frame.contentWindow.postMessage(errorFunc, '*');
        };
        return error;
    };
    /*
     -Options can be passed in below format
  
     var options = {
     replaceLineBreaks: false, // true to replace \n by a new line, false by default
     android: {
     intent: 'INTENT'
     }
     };
     */
    SMSService.prototype.send = function (number, message, options, successCallback, errorCallback) {
        smsInstance.addEventListnerReceiveMessageInIframe();
        this.successCallbackFunc = successCallback;
        this.errorCallbackFunc = errorCallback;
        //Need to post the function as a String by encoding since the function itself will be executed in the parent screen.
        var functionToBePost = "function(){"
            + "sms.send('" + number + "'"
            + ", '" + message + "'"
            + ", " + JSON.stringify(options)
            + ", " + smsInstance.getSuccessFunctionToBePost().toString()
            + ", " + smsInstance.getErrorFunctionToBePost().toString() + ");"
            + "}";
        smsInstance.parentPostMessage(functionToBePost);
    };
    /*
     This method will call from the parent window once post to the iFrame
     */
    SMSService.prototype.receiveMessageInIframe = function (evt) {
        try {
            console.log("Exec receiveMessageInIframe method in sms service " + decodeURI(evt.data));
            eval('(' + decodeURI(evt.data) + ')();');
        }
        catch (e) {
            console.log("Error Exec receiveMessageInIframe method in sms service. Error: " + JSON.stringify(e, null, 2));
        }
        finally {
            window.removeEventListener('message', smsInstance.receiveMessageInIframe, false);
        }
    };
    /*
      This SMS will send to Register/Un-Register the service
     */
    SMSService.prototype.sendReg_UNREG_SMS = function (serviceRegUnregString, successCallback, errorCallback) {
        var options = {
            replaceLineBreaks: false,
            android: {}
        };
        var keyword = localStorage.getItem(smsInstance.LOCALSTORAGE_KEYWORD_STRING);
        var port = localStorage.getItem(smsInstance.LOCALSTORAGE_PORT_STRING);
        var uuid = localStorage.getItem("UUID");
        var smsBody = serviceRegUnregString + " " + keyword + " UUID " + uuid;
        console.log("Send SMS=> body:" + smsBody + " port:" + port);
        if (keyword && port && uuid) {
            smsInstance.send(port, smsBody, options, successCallback, errorCallback);
        }
        else {
            alert("Service not yet configured, please contact support.");
        }
    };
    /*
     This SMS will send to Register the service
     */
    SMSService.prototype.sendRegistrationSMS = function (successCallback, errorCallback) {
        smsInstance.sendReg_UNREG_SMS(smsInstance.SERVICE_REGISTRATION_STRING, successCallback, errorCallback);
    };
    /*
     This SMS will send to Un-Register the service
     */
    SMSService.prototype.sendUnRegistrationSMS = function (successCallback, errorCallback) {
        smsInstance.sendReg_UNREG_SMS(smsInstance.SERVICE_UN_REGISTRATION_STRING, successCallback, errorCallback);
    };
    SMSService.prototype.addEventListnerReceiveMessageInIframe = function () {
        console.log('call smsInstance.addEventListnerReceiveMessageInIframe');
        window.addEventListener('message', smsInstance.receiveMessageInIframe, false);
    };
    SMSService.prototype.parentPostMessage = function (functionToBePost) {
        console.log("call smsInstance.parentPostMessage");
        window.parent.postMessage(smsInstance.serializeFunction(functionToBePost), '*');
    };
    SMSService.prototype.serializeFunction = function (f) {
        return encodeURI(f.toString());
    };
    SMSService.prototype.errorCallback = function (error) {
        if (!error) {
            error = null;
        }
        this.errorCallbackFunc(error);
    };
    SMSService.prototype.successCallback = function (result) {
        if (!result) {
            result = null;
        }
        this.successCallbackFunc(result);
    };
    SMSService.prototype.isServiceConfigured = function () {
        var keyword = localStorage.getItem(smsInstance.LOCALSTORAGE_KEYWORD_STRING);
        var port = localStorage.getItem(smsInstance.LOCALSTORAGE_PORT_STRING);
        var uuid = localStorage.getItem("UUID");
        console.log('localStorage keys and values, keyword=' + keyword + ' port=' + port + ' uuid=' + uuid);
        return keyword && port && uuid;
    };
    SMSService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], SMSService);
    return SMSService;
}());



/***/ }),

/***/ "./src/app/services/message.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/message.service.ts ***!
  \*********************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MessageService = /** @class */ (function () {
    function MessageService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    MessageService.prototype.sendMessage = function (message) {
        this.subject.next(message);
    };
    MessageService.prototype.clearMessage = function () {
        this.subject.next();
    };
    MessageService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/services/products/products.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/products/products.service.ts ***!
  \*******************************************************/
/*! exports provided: ProductsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsService", function() { return ProductsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/madeEasy.json */ "./src/assets/madeEasy.json");
var _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/Object.assign({}, _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__, {"default": _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__});
/* harmony import */ var _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../page-body/page-body.service */ "./src/app/page-body/page-body.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductsService = /** @class */ (function () {
    function ProductsService(http, dataService) {
        this.http = http;
        this.dataService = dataService;
        this.appId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["appId"];
        this.userId = _assets_madeEasy_json__WEBPACK_IMPORTED_MODULE_3__["userId"];
    }
    ProductsService.prototype.getProducts = function () {
        // '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + this.dataService.catId
        // '/templates/getArticles?appId=' + $rootScope.appId + "&categoryId=" + firstCat.id
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getArticles?appId=' + this.appId + '&categoryId=' + this.dataService.catId)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    ProductsService.prototype.getAllProducts = function () {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getProductsByAppId?appId=' + this.appId)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    ProductsService.prototype.getCategoryData = function (id) {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getCategoryByProdId?id=' + id)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    ProductsService.prototype.createArticleViewDataInfo = function (articleName) {
        return this.http.get(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/createArticleViewDataInfo?appId=' + this.appId + "&articleName=" + articleName)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    ProductsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _page_body_page_body_service__WEBPACK_IMPORTED_MODULE_4__["PagebodyServiceModule"]])
    ], ProductsService);
    return ProductsService;
}());



/***/ }),

/***/ "./src/app/services/subscribed-data/subscribed-data.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/services/subscribed-data/subscribed-data.service.ts ***!
  \*********************************************************************/
/*! exports provided: SubscribedDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscribedDataService", function() { return SubscribedDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _assets_constantsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/constantsService */ "./src/assets/constantsService.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SubscribedDataService = /** @class */ (function () {
    function SubscribedDataService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
    }
    SubscribedDataService.prototype.getSubscribedData = function (data) {
        var _this = this;
        return this.http.post(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/ideabiz/isSubscribed', data)
            .map(function (res) {
            if (res.text()) {
                _this.messageService.sendMessage({ subscription: res.json() });
                return res.json();
            }
            _this.messageService.sendMessage({ subscription: null });
            return null;
        });
    };
    SubscribedDataService.prototype.getSubscriptionStatus = function (data) {
        var _this = this;
        return this.http.post(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/ideabiz/getSubscriptionStatus', data)
            .map(function (res) {
            if (res.text()) {
                _this.messageService.sendMessage({ subscription: res.json() });
                return res.json();
            }
            _this.messageService.sendMessage({ subscription: null });
            return null;
        });
    };
    SubscribedDataService.prototype.getAppStatus = function (data) {
        return this.http.post(_assets_constantsService__WEBPACK_IMPORTED_MODULE_2__["SERVER_URL"] + '/templates/getAppStatus', data)
            .map(function (res) { return res.text() ? res.json() : null; });
    };
    SubscribedDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], SubscribedDataService);
    return SubscribedDataService;
}());



/***/ }),

/***/ "./src/app/services/title.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/title.service.ts ***!
  \*******************************************/
/*! exports provided: TitleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TitleService", function() { return TitleService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/BehaviorSubject */ "./node_modules/rxjs-compat/_esm5/BehaviorSubject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TitleService = /** @class */ (function () {
    function TitleService() {
        this.locationSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.titleSource = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]("Home");
        this.currentTitle = this.titleSource.asObservable();
    }
    TitleService.prototype.changeTitle = function (title) {
        this.titleSource.next(title);
    };
    TitleService.prototype.setLocation = function (location) {
        this.locationSource.next(location);
    };
    TitleService.prototype.getLocation = function () {
        return this.locationSource.asObservable();
    };
    TitleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], TitleService);
    return TitleService;
}());



/***/ }),

/***/ "./src/assets/constantsService.ts":
/*!****************************************!*\
  !*** ./src/assets/constantsService.ts ***!
  \****************************************/
/*! exports provided: SERVER_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_URL", function() { return SERVER_URL; });
var SERVER_URL = 'serverUrl';


/***/ }),

/***/ "./src/assets/madeEasy.json":
/*!**********************************!*\
  !*** ./src/assets/madeEasy.json ***!
  \**********************************/
/*! exports provided: name, appId, userId, serviceApi, templateName, default */
/***/ (function(module) {

module.exports = {"name":"unknownName","appId":"unknownAppId","userId":"unknownUserName","serviceApi":{"host":"serverUrl","port":1337},"templateName":"unknownTemplateName"};

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Simato\Desktop\DevFolder\AppMaker\ArticleAppsBase_Comic\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map