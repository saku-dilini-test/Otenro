(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'compjs:': 'components/js'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      myngapp: 'components/app',
      myapp: 'components/app',

      // angular bundles
      '@angular/core': 'components/js/@angular/core/bundles/core.umd.js',
      '@angular/common': 'components/js/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'components/js/@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'components/js/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'components/js/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'components/js/@angular/http/bundles/http.umd.js',
      '@angular/router': 'components/js/@angular/router/bundles/router.umd.js',
      '@angular/forms': 'components/js/@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'components/js/@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'components/js/@angular/upgrade/bundles/upgrade-static.umd.js',

      // other libraries
      'rxjs':                      'components/js/rxjs',
      'angular-in-memory-web-api': 'components/js/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'typescript': 'components/js/typescript/lib/typescript.js'
    },
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      myngapp: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
