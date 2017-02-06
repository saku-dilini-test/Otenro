import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeAdapter } from '@angular/upgrade';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MyAppComponent } from './myapp.component';


//platformBrowserDynamic().bootstrapModule(AppModule);
let adapter = new UpgradeAdapter(AppModule);

angular.module('app').directive('myApp', adapter.downgradeNg2Component(AppComponent));
angular.module('app').directive('thisApp', adapter.downgradeNg2Component(MyAppComponent));

adapter.bootstrap(document.body, ['app']);


/*platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['app']);
});*/





