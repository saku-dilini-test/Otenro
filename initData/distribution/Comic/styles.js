(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./src/styles.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./src/styles.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*custom styles*/\r\n.orderItem{\r\n  margin-top: 50px;\r\n}\r\n.cliente {\r\n  margin-top:5px;\r\n  border: #2b2929 medium solid;\r\n  border-radius: 10px;\r\n  -moz-border-radius: 10px;\r\n  -webkit-border-radius: 10px;\r\n  background-color:lavender;\r\n}\r\n.progress {\r\n  margin: 0;\r\n  background: url('test.png');\r\n  /* background-color: #47454B; */\r\n  background-size: 100%;\r\n  position: relative;\r\n  height: 100vh;\r\n  display: block;\r\n  width: 100vw;\r\n  overflow: hidden;\r\n}\r\n.progress-circle{\r\n  position: relative;\r\n  top: calc(50% - 50px);\r\n  left: calc(50vw - 50px);\r\n}\r\n.progress-circle.indefinite .progress {\r\n  stroke: #00b8ff;\r\n  stroke-width: 2;\r\n  stroke-dashoffset: 0;\r\n  stroke-dasharray: 63 188;\r\n  -webkit-animation: progress-indef 2s linear infinite;\r\n          animation: progress-indef 2s linear infinite;\r\n}\r\n.progress-circle.indefinite .bg {\r\n  stroke: #eee;\r\n  stroke-width: 2;\r\n}\r\n@-webkit-keyframes progress-indef {\r\n  0% { stroke-dashoffset: 251; }\r\n  100% { stroke-dashoffset: 0; }\r\n}\r\n@keyframes progress-indef {\r\n  0% { stroke-dashoffset: 251; }\r\n  100% { stroke-dashoffset: 0; }\r\n}\r\n/*-----------------------------------------------------------------------------------\r\n\t    index\r\n        Built with Blocs\r\n-----------------------------------------------------------------------------------*/\r\nbody{\r\n  margin:0;\r\n  padding:0;\r\n  background:#FFF;\r\n  overflow-x:hidden;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\na,button{transition: all .3s ease-in-out;outline: none!important;}\r\n/* Prevent ugly blue glow on chrome and safari */\r\na:hover{text-decoration: none; cursor:pointer;}\r\n/*#page-loading-blocs-notifaction{position: fixed;top: 0;bottom: 0;width: 100%;z-index:100000;background:#FFFFFF url(\"./assets/images/pageload-spinner.gif\") no-repeat center center;}*/\r\n/* = Blocs\r\n-------------------------------------------------------------- */\r\n.bloc{\r\n  width:100%;\r\n  clear:both;\r\n  background: 50% 50% no-repeat;\r\n  padding:0 50px;\r\n  background-size: cover;\r\n  position:relative;\r\n}\r\n.bloc{\r\n  padding: 0;\r\n}\r\n.bloc .container{\r\n  padding-left:0;\r\n  padding-right:0;\r\n}\r\n/* Sizes */\r\n.bloc-lg{\r\n  padding:100px 50px;\r\n}\r\n.bloc-sm{\r\n  padding:20px 50px;\r\n}\r\n/* Row Margin Offsets */\r\n.voffset{\r\n  margin-top:30px;\r\n}\r\n.voffset-md{\r\n  margin-top:50px;\r\n}\r\n.voffset-lg{\r\n  margin-top:80px;\r\n}\r\n/* Column No Gutters */\r\n.row-no-gutters{\r\n  margin-right:0;\r\n  margin-left:0;\r\n}\r\n.row.row-no-gutters > [class^=\"col-\"],.row.row-no-gutters > [class*=\" col-\"] {\r\n  padding-right: 0;\r\n  padding-left: 0;\r\n}\r\n/* Bloc text custom styling */\r\n#bloc-3 h2{\r\n  font-size: 25px;\r\n}\r\n#bloc-3 p{\r\n  font-family: \"Open Sans\";\r\n  font-weight: 400;\r\n  font-size: 18px;\r\n  line-height: 32px;\r\n}\r\n#bloc-4 h2{\r\n  font-size: 25px;\r\n}\r\n#bloc-4 p{\r\n  font-family: \"Open Sans\";\r\n  font-weight: 400;\r\n  font-size: 18px;\r\n  line-height: 32px;\r\n}\r\n#bloc-5 p{\r\n  font-size: 30px;\r\n  line-height: 31px;\r\n}\r\n#bloc-7 h1{\r\n  font-size: 28px;\r\n  line-height: 28px;\r\n}\r\n#bloc-10 h3{\r\n  font-size: 20px;\r\n  line-height: 27px;\r\n}\r\n#bloc-10 p{\r\n  font-size: 17px;\r\n}\r\n#bloc-14 h3{\r\n  font-family: \"Open Sans\";\r\n  font-weight: 600;\r\n  font-size: 22px;\r\n}\r\n#bloc-14 p{\r\n  font-family: \"Open Sans\";\r\n  font-weight: 400;\r\n  font-size: 16px;\r\n  line-height: 28px;\r\n}\r\n/* = NavBar\r\n-------------------------------------------------------------- */\r\n.navbar{\r\n  margin-bottom: 8px;\r\n}\r\n.navbar-brand{\r\n  height:auto;\r\n  padding:3px 15px;\r\n  font-size:25px;\r\n  font-weight:normal;\r\n  font-weight:600;\r\n  line-height:44px;\r\n  width: 100%;\r\n}\r\n.navbar-brand img{\r\n  margin:auto;\r\n  width: 250px;\r\n}\r\n.nav-center .navbar-brand img{\r\n  margin:0;\r\n}\r\n/*.navbar .nav{*/\r\n/*padding-top: 2px;*/\r\n/*margin-right: -16px;*/\r\n/*float:right;*/\r\n/*z-index:1;*/\r\n/*}*/\r\n.nav > li{\r\n  float:left;\r\n  margin: auto 0;\r\n  font-size:16px;\r\n}\r\n.navbar-nav .open .dropdown-menu > li > a{\r\n  text-align: inherit;\r\n}\r\n.nav > li a:hover, .nav > li a:focus{\r\n  background:transparent;\r\n}\r\n.navbar-toggle{\r\n  border: 0px;\r\n}\r\n.navbar-toggle:hover{\r\n  background:transparent!important;\r\n}\r\n/*.navbar-toggle .icon-bar{*/\r\n/*background-color: rgba(0,0,0,.5);*/\r\n/*width: 26px;*/\r\n/*}*/\r\n/* Inverted navbar */\r\n.nav-invert .navbar .nav{\r\n  float:left;\r\n}\r\n.nav-invert .navbar-header, .nav-invert .navbar-brand{\r\n  float:right;\r\n  position:relative;\r\n  z-index:2;\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-nav > li > a {\r\n    text-align: center;\r\n    padding: 5px !important;\r\n  }\r\n}\r\n@media (min-width: 768px) and  (max-width:908px) {\r\n  .navbar-nav > li > a {\r\n    padding: 5px;\r\n    font-size: 14px;\r\n  }\r\n}\r\n@media (min-width: 768px) {\r\n  .navbar-1{\r\n    display: block;\r\n  }\r\n  .navbar-2{\r\n    display: none !important;\r\n  }\r\n}\r\n@media (max-width: 767px) {\r\n  .navbar-1{\r\n    display: none;\r\n  }\r\n  .navbar-2{\r\n    visibility: visible;\r\n  }\r\n}\r\n@media (min-width: 768px){\r\n  .site-navigation{\r\n    width: 100%;\r\n    display: flex;\r\n    justify-content: space-around;\r\n  }\r\n  .nav > li .dropdown-menu a,.nav > li .dropdown-menu a:hover{\r\n    color:#484848;\r\n  }\r\n  .nav-invert .site-navigation{\r\n    left:0;\r\n    right:0;\r\n  }\r\n  .nav-center{\r\n    text-align:center;\r\n  }\r\n  .nav-center .navbar-header{\r\n    width:100%;\r\n  }\r\n  .nav-center .navbar-header, .nav-center .navbar-brand, .nav-center .nav > li{\r\n    float: none;\r\n    display:inline-block;\r\n  }\r\n  .nav-center .site-navigation{\r\n    position:relative;\r\n    width:100%;\r\n    right:0;\r\n    margin-right:0px;\r\n    margin-top:20px;\r\n  }\r\n  .nav-center.mini-nav .navbar-toggle{\r\n    float:none;\r\n    margin: 10px auto 0;\r\n  }\r\n}\r\n.nav > li > .dropdown a{\r\n  background: none!important;\r\n  display: block;\r\n  padding: 14px 15px;\r\n}\r\nnav .caret{\r\n  margin: 0 5px;\r\n}\r\n/* Dropdown Menus SubMenu */\r\n.dropdown-menu .dropdown-menu{\r\n  top:-8px;\r\n  left:100%;\r\n}\r\n.dropdown-menu .dropmenu-flow-right{\r\n  top:100%;\r\n  left:0;\r\n  margin-left: -1px;\r\n  border-top-left-radius: 0;\r\n  border-top-right-radius: 0;\r\n}\r\n.dropdown-menu .dropdown span{\r\n  border: 4px solid black;\r\n  border-top-color:transparent;\r\n  border-right-color:transparent;\r\n  border-bottom-color:transparent;\r\n  margin: 6px -5px 0 0!important;\r\n  float: right;\r\n}\r\n/* = Bric adjustment margins\r\n-------------------------------------------------------------- */\r\n.mg-clear{\r\n  margin:0;\r\n}\r\n.mg-sm{\r\n  margin-top:10px;\r\n  margin-bottom:5px;\r\n}\r\n.mg-md{\r\n  margin-top:10px;\r\n  margin-bottom:20px;\r\n}\r\n.mg-lg{\r\n  margin-top:10px;\r\n  margin-bottom:40px;\r\n}\r\n/* = Buttons\r\n-------------------------------------------------------------- */\r\n.btn.pull-right{\r\n  margin: 0 0 5px 5px;\r\n}\r\n.btn-d,.btn-d:hover,.btn-d:focus{\r\n  color:#FFF;\r\n  background:rgba(0,0,0,.3);\r\n}\r\n/* Prevent ugly blue glow on chrome and safari */\r\nbutton{\r\n  outline: none!important;\r\n}\r\n.btn-rd{\r\n  border-radius: 40px;\r\n}\r\n.a-btn{\r\n  padding: 6px 10px 6px 0;\r\n  line-height: 1.42857143;\r\n  display:inline-block;\r\n}\r\n.text-center .a-btn{\r\n  padding: 6px 0;\r\n}\r\n.a-block{\r\n  width:100%;\r\n  text-align:left;\r\n}\r\n.text-center .a-block{\r\n  text-align:center;\r\n}\r\n.btn .caret{\r\n  margin:0 0 0 5px}\r\n.dropdown a .caret{\r\n                     margin:0 0 0 5px}\r\n.btn-dropdown .dropdown-menu .dropdown{\r\n                                        padding: 3px 20px;\r\n                                      }\r\n/* = Icons\r\n-------------------------------------------------------------- */\r\n.icon-sm{\r\n  font-size:18px!important;\r\n}\r\n/* = Panels\r\n-------------------------------------------------------------- */\r\n.panel{\r\n  border:0;\r\n  box-shadow: 0 0 2px rgba(0,0,0,.4);\r\n}\r\n.panel-heading, .panel-footer{\r\n  background-color: inherit;\r\n  border-color: rgba(0,0,0,.1)!important;\r\n}\r\n.panel-sq, .panel-sq .panel-heading, .panel-sq .panel-footer{\r\n  border-radius:0;\r\n}\r\n.panel-rd{\r\n  border-radius:30px;\r\n}\r\n.panel-rd .panel-heading{\r\n  border-radius:29px 29px 0 0;\r\n}\r\n.panel-rd .panel-footer{\r\n  border-radius:0 0 29px 29px;\r\n}\r\n/* = Dividers\r\n-------------------------------------------------------------- */\r\n.divider-h{\r\n  padding:20px 0;\r\n}\r\n.divider-h span{\r\n  display: block;\r\n  border-top:1px solid transparent;\r\n}\r\n.divider-half{\r\n  width: 50%;\r\n  margin: 0 auto;\r\n}\r\n.dropdown-menu .divider-h,.dropdown-menu .divider-half{\r\n  padding:0;\r\n}\r\n/* = Carousel\r\n-------------------------------------------------------------- */\r\n.carousel{\r\n  display:inline-block;\r\n  vertical-align:bottom;\r\n}\r\n.full-width-bloc .carousel{\r\n  width:100%;\r\n}\r\n.carousel .item img{\r\n  margin-right:auto;\r\n  margin-left:auto;\r\n}\r\n.carousel-control span{\r\n  position: absolute;\r\n  top: 50%;\r\n  z-index: 5;\r\n  display: inline-block;\r\n}\r\n.carousel-control{\r\n  color:#FFF!important;\r\n  text-shadow: none;\r\n}\r\n.carousel-indicators li{\r\n  margin: 0 4px;\r\n}\r\n.carousel-indicators .active{\r\n  margin: 0 4px -1px;\r\n}\r\n.carousel-control.left span{\r\n  margin-left:-15px;\r\n}\r\n.no-shadows .carousel-control.left, .no-shadows .carousel-control.right{\r\n  background-image: none;\r\n}\r\n/* ScrollToTop button */\r\n.scrollToTop{\r\n  width:40px;\r\n  height:40px;\r\n  position:fixed;\r\n  bottom:70px;\r\n  right:10px;\r\n  display: none;\r\n  opacity: 0;\r\n  z-index: 500;\r\n  transition: all .3s ease-in-out;\r\n}\r\n.scrollToTop span{\r\n  margin-top: 6px;\r\n}\r\n.showScrollTop{\r\n  font-size: 14px;\r\n  opacity: 1;\r\n  display: block;\r\n}\r\n/* Hide Object */\r\n.object-hidden{\r\n  display:none;\r\n}\r\n/* = Custom Styling\r\n-------------------------------------------------------------- */\r\n.container{\r\n  max-width:1170px;\r\n}\r\n.hero-bloc-text{\r\n  font-size:55px;\r\n}\r\n.hero-bloc-text-sub{\r\n  font-size:36px;\r\n}\r\n.blocs-green-button{\r\n  background-color:#1abc9c;\r\n}\r\n.blocs-green-button:hover{\r\n  background-color:#1aae91;\r\n}\r\n.blocs-blue-button{\r\n  background-color:#4B96DE;\r\n}\r\n.blocs-blue-button:hover{\r\n  background-color:#448BCE;\r\n}\r\n.sub-header-text{\r\n  font-size:44px;\r\n  letter-spacing:5px;\r\n  font-weight:800 !important;\r\n  text-transform:uppercase;\r\n  color:#5A6079;\r\n  font-family:\"\"Open Sans\"\";\r\n  text-decoration:none;\r\n  padding:13px 13px 13px 13px;\r\n}\r\n.spacing1{\r\n  padding:0px 0px 0px 13px;\r\n  height:45px;\r\n  color:#677089;\r\n  border-style:solid;\r\n  border-width:0px 0px 2px 0px;\r\n  margin-bottom:51px;\r\n  border-color:rgba(255,255,255,0.4);\r\n  font-family:\"Lato\";\r\n  font-weight:700 !important;\r\n  margin-top:-20px;\r\n}\r\n.button-circular-radius{\r\n  border-radius:60px 60px 60px 60px;\r\n  background-color:#838399;\r\n  font-family:\"Lato\";\r\n  font-weight:700;\r\n  text-transform:uppercase;\r\n  padding:10px 15px 10px 15px;\r\n  font-size:16px;\r\n}\r\n.divider{\r\n  background-color:transparent;\r\n  border-color:#112C42;\r\n  color:#FFFFFF!important;\r\n  padding-top:0px;\r\n  text-shadow:0px 0px 0px #000000;\r\n}\r\n.button-circular-radius-small{\r\n  font-size:14px;\r\n}\r\n.products{\r\n  width:380px;\r\n}\r\n.div{\r\n  width:380px;\r\n  height:380px;\r\n  background-repeat:no-repeat;\r\n  background-position:center top;\r\n  background-size:380px auto;\r\n  padding-top:20px;\r\n  border-style:none;\r\n}\r\n.label{\r\n  background-size:3px auto;\r\n}\r\nlabel{\r\n  background-size:380px auto;\r\n}\r\n.product-header{\r\n  font-size:28px;\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:600;\r\n  color:#FEFEFE!important;\r\n  text-align:center;\r\n  text-shadow:2px 0px 6px rgba(0,0,0,0.3);\r\n}\r\n.prices-color{\r\n  color:#FEFCFA!important;\r\n  text-shadow:0px 3px 5px rgba(0,0,0,0.5);\r\n}\r\n.div2{\r\n  margin-top:-30%;\r\n}\r\n.margin{\r\n  margin-top:55%;\r\n}\r\n.name-label{\r\n  padding: 15px 5px 0 5px;\r\n  font-size:20px;\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:600;\r\n  width:100%;\r\n  text-align:center;\r\n}\r\n.price-label{\r\n  padding-left:30px;\r\n  padding-right:30px;\r\n  font-family:\"Lato\";\r\n  font-weight:400;\r\n  font-size:18px;\r\n  text-align:center;\r\n  width:100%;\r\n}\r\n.button-margin{\r\n  margin-bottom:10px;\r\n}\r\n.button-outline{\r\n  background-color:#FFFFFF;\r\n  border-style:solid;\r\n}\r\n.dopdown-list{\r\n  width:100%;\r\n  background-color:#C2D0DA;\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:400;\r\n  box-shadow:0px 0px 0px rgba(0,0,0,0.0);\r\n  background-clip:padding-box!important;\r\n  -webkit-background-clip:padding-box!important;\r\n  font-size:18px;\r\n}\r\n.dropdown{\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:400;\r\n  font-size:20px;\r\n}\r\n.rounded-radius-button{\r\n  border-radius:30px 30px 30px 30px;\r\n  padding:10px 15px 10px 15px;\r\n  border-color:#636C84;\r\n  background-color:#636C84;\r\n  font-size:23px;\r\n}\r\n.search{\r\n  font-size:20px;\r\n  display:none;\r\n  padding:20px 20px 20px 28px;\r\n  width:3%;\r\n}\r\n.raw{\r\n  padding: 10px 0px 10px 0px;\r\n}\r\n.heading1{\r\n  font-size:22px;\r\n  color:#FBFBFB!important;\r\n  width:100%;\r\n  background-color:#939EB7;\r\n  border-radius:6px 6px 6px ;\r\n  padding:12px 12px 12px 12px;\r\n}\r\n.heading-small{\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:600;\r\n  font-size:22px;\r\n  color:#6B788D!important;\r\n  padding-left:15px;\r\n}\r\n.link1{\r\n  font-size:24px;\r\n  color:#FEFFFF!important;\r\n  background-color:#c3c3c3;\r\n  padding:11px 11px 11px 11px;\r\n  border-color:rgba(0,0,0,0.0);\r\n}\r\n.link-2{\r\n  font-size:20px;\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:600;\r\n  color:#FEFFFF!important;\r\n}\r\n.row2{\r\n  margin-top:-9%;\r\n}\r\n.product-detail{\r\n  padding-left:20px;\r\n  padding-right:20px;\r\n  border-color:rgba(217,0,0,0.0);\r\n  border-style:none;\r\n}\r\n.row3{\r\n  padding:10px 10px 40px 10px;\r\n}\r\n.prices-space{\r\n  padding-top:4%;\r\n}\r\n.icon-2{\r\n  padding-right:0px;\r\n  margin:29px 0px 0px 30px;\r\n}\r\n.panel-detail{\r\n  margin-top:20px;\r\n}\r\n.social-media-details{\r\n  margin-top:10px;\r\n  padding-right:30%;\r\n}\r\n.social-media-details-heading{\r\n  margin-top:8%;\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:800;\r\n}\r\n.content-bold{\r\n  font-family:\"\"Open Sans\"\";\r\n  font-weight:800;\r\n}\r\n.social-header{\r\n  padding-left:0px;\r\n  margin-top:13px;\r\n  margin-left:80px;\r\n}\r\n/* = Colour\r\n-------------------------------------------------------------- */\r\n/* Background colour styles */\r\n.bgc-gainsboro{\r\n  background-color:#CDDAE0;\r\n}\r\n.bgc-pale-silver{\r\n  background-color:#CFBDAC;\r\n}\r\n.bgc-rosy-brown{\r\n  background-color:#B59286;\r\n}\r\n.bgc-slate-gray{\r\n  background-color:#707D8D;\r\n}\r\n.bgc-tan{\r\n  background-color:#CDAF83;\r\n}\r\n.bgc-light-gray{\r\n  background-color:#CACDD2;\r\n}\r\n.bgc-black{\r\n  background-color:#000000;\r\n}\r\n/* Text colour styles */\r\n.tc-black{\r\n  color:#000000!important;\r\n}\r\n/* = Mobile adjustments\r\n-------------------------------------------------------------- */\r\n@media (max-width: 1120px)\r\n{\r\n  .bloc.full-width-bloc, .bloc-tile-2.full-width-bloc .container, .bloc-tile-3.full-width-bloc .container, .bloc-tile-4.full-width-bloc .container{\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n  }\r\n}\r\n@media (max-width: 992px) and (min-width: 768px)\r\n{\r\n  .nav-center.navbar .nav{\r\n    max-width:100%\r\n  }\r\n}\r\n@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {.b-parallax{background-attachment:scroll;}}\r\n@media (max-width: 991px)\r\n{\r\n  .container{width:100%;}\r\n  .b-parallax{background-attachment:scroll;}\r\n  .page-container, #hero-bloc{overflow-x: hidden;position: relative;} /* Prevent unwanted side scroll on mobile */\r\n  .bloc-group, .bloc-group .bloc{display:block;width:100%;}\r\n  .bloc-tile-2 .container, .bloc-tile-3 .container, .bloc-tile-4 .container{padding-left: 10px;padding-right: 10px;}\r\n}\r\n@media (max-width: 767px)\r\n{\r\n  .page-container{\r\n    overflow-x: hidden;\r\n    position:relative;\r\n  }\r\n  h1,h2,h3,h4,h5,h6,p,#disqus_thread{\r\n    padding-left:10px!important;\r\n    padding-right:10px!important;\r\n  }\r\n  #hero-bloc h1{\r\n    font-size:40px;\r\n  }\r\n  #hero-bloc h2{\r\n    font-size:34px;\r\n  }\r\n  #hero-bloc h3{\r\n    font-size:25px;\r\n  }\r\n  .b-parallax{\r\n    background-attachment:scroll;\r\n  }\r\n  .navbar .nav{\r\n    padding-top: 0;\r\n    border-top:1px solid rgba(0,0,0,.2);\r\n    float:none!important;\r\n  }\r\n  .navbar.row{\r\n    margin-left: 0;\r\n    margin-right: 0;\r\n  }\r\n  .site-navigation{\r\n    position:inherit;\r\n    transform:none;\r\n    -webkit-transform:none;\r\n    -ms-transform:none;\r\n  }\r\n  .nav > li{\r\n    margin-top: 0;\r\n    border-bottom:1px solid rgba(0,0,0,.1);\r\n    background:rgba(0,0,0,.05);\r\n    text-align: left;\r\n    padding-left:15px;\r\n    width:100%;\r\n  }\r\n  .nav > li:hover{\r\n    background:rgba(0,0,0,.08);\r\n  }\r\n  .dropdown .dropdown a .caret{\r\n    float: none;\r\n    margin: 5px 0 0 10px!important;\r\n    border: 4px solid black;\r\n    border-bottom-color: transparent;\r\n    border-right-color: transparent;\r\n    border-left-color: transparent;\r\n  }\r\n\r\n  #hero-bloc .navbar .nav{\r\n    background:rgba(0,0,0,.8);\r\n  }\r\n  #hero-bloc .navbar .nav a{\r\n    color:rgba(255,255,255,.6);\r\n  }\r\n  .hero{\r\n    padding:50px 0;\r\n  }\r\n  .hero-nav{\r\n    left:-1px;\r\n    right:-1px;\r\n  }\r\n  .navbar-collapse{\r\n    padding:0;\r\n    overflow-x: hidden;\r\n    box-shadow: none;\r\n  }\r\n  .navbar-brand img{\r\n    width: 100%;\r\n    margin: auto;\r\n  }\r\n  .nav-invert .navbar-header{\r\n    float: none;\r\n    width:100%;\r\n  }\r\n  .nav-invert .navbar-toggle{\r\n    float:left;\r\n  }\r\n  .bloc{\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n  }\r\n  .bloc-sm {\r\n    padding: 0;\r\n  }\r\n  .bloc-xxl,.bloc-xl,.bloc-lg{\r\n    padding: 40px 0;\r\n  }\r\n  .bloc-sm,.bloc-md{\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n  }\r\n  .bloc-tile-2 .container, .bloc-tile-3 .container, .bloc-tile-4 .container{\r\n    padding-left:0;padding-right:0;\r\n  }\r\n  .a-block{\r\n    padding:0 10px;\r\n  }\r\n  .btn-dwn{\r\n    display:none;\r\n  }\r\n  .voffset{\r\n    margin-top:0px;\r\n  }\r\n  .voffset-md{\r\n    margin-top:20px;\r\n  }\r\n  .voffset-lg{\r\n    margin-top:30px;\r\n  }\r\n  form{\r\n    padding:5px;\r\n  }\r\n  .close-lightbox{\r\n    display:inline-block;\r\n  }\r\n  .video-bg-container{\r\n    display:none;\r\n  }\r\n  .blocsapp-device-iphone5{\r\n    background-size: 216px 425px;\r\n    padding-top:60px;\r\n    width:216px;\r\n    height:425px;\r\n  }\r\n  .blocsapp-device-iphone5 img{\r\n    width: 180px;\r\n    height: 320px;\r\n  }\r\n}\r\n@media (max-width: 400px)\r\n{\r\n  .bloc{\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n    background-size: auto 200%;\r\n  }\r\n}\r\n@media (max-width: 767px){\r\n  .bloc-mob-center-text{\r\n    text-align:center;\r\n  }\r\n  .blocs-team-avatar{\r\n    max-width:280px;\r\n  }\r\n  .blocs-team-header{\r\n    text-align:center;\r\n  }\r\n  .blocs-team-details{\r\n    text-align:center;\r\n  }\r\n  .blocs-team-first-social{\r\n    margin-left:41%;\r\n  }\r\n}\r\nbody::-webkit-scrollbar {\r\n  width: 5px;\r\n}\r\nbody::-webkit-scrollbar-track {\r\n  background: #ddd;\r\n}\r\nbody::-webkit-scrollbar-thumb {\r\n  background: #666;\r\n}\r\n/* added by .sanira */\r\np img{\r\n  width:100%;\r\n  margin-bottom: 5%;\r\n}\r\n.desc p{\r\n   margin: 0 !important;\r\n   line-height: normal !important;\r\n }\r\n.desc p:last-child{\r\n  margin-bottom: 15% !important;\r\n}"

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/raw-loader!../node_modules/postcss-loader/lib??embedded!./styles.css */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./src/styles.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Simato\Desktop\DevFolder\AppMaker\ArticleAppsBase_Comic\src\styles.css */"./src/styles.css");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map