/**
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      // Copy of compiler options in standard tsconfig.json
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "lib": ["es2016", "dom"],
      "noImplicitAny": true,
      "suppressImplicitAnyIndexErrors": true,
      "outDir": "./dist/out-tsc",
      "baseUrl": "src",
      "sourceMap": true,
      "declaration": false,
      "typeRoots": [
        "/meServer/node_modules/@types"
      ],
    },
    meta: {
      'typescript': {
        "exports": "ts"
      },
      '*.json': { loader: 'plugin-json'}
    },
    paths: {
      // paths serve as alias
      'npm:': '/meServer/node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',
      'plugin-json': 'npm:systemjs-plugin-json/json.js',
      //  angular bundles
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',   
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
       'owl.carousel': 'npm:owl.carousel/dist/owl.carousel.js',
       'angular-owl-carousel': 'npm:angular-owl-carousel/',
       '@agm/core': 'npm:@agm/core/core.umd.js',
       'nouislider': 'npm:nouislider',
       '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
       'tslib': 'npm:tslib/tslib.js',
      'ng2-nouislider': 'npm:ng2-nouislider',

      // other libraries
      'rxjs':                      'npm:rxjs',
      // 'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ts':                        'https://unpkg.com/plugin-typescript@5.2.7/lib/plugin.js', 
      'typescript':                'npm:typescript/lib/typescript.js',

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-owl-carousel': {
       main: './index.js',
       defaultExtension: 'js'
      },
      'environments': {defaultExtension: 'ts'},
      'nouislider': { main: 'distribute/nouislider.js', defaultExtension: 'js' },
      'ng2-nouislider': { main: 'src/nouislider.js', defaultExtension: 'js' },
    }
  });

})(this);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
