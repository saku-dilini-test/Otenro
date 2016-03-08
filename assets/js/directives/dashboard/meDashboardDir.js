/**
 * Created by udeshikaperera on 17/08/2015.
 */
(function(){
    angular.module('app').directive('meDashboard', [
        'dashboardService',meDashboard]);

    function meDashboard(dashboardService){
        return {
            scope:{

            },
            template: "<obl-dashboard></obl-dashboard>",
            link: function(scope){
                scope.title = " My Apps";
                scope.widgets =[];
                dashboardService.getAllApps().then(function(apps){
                    console.log(apps);
                    for(var i=0; i <apps.data.length ; i++){
                        var appSettings = apps.data[i];
                            appSettings.sizeX =2;
                            appSettings.sizeY =2;
                            appSettings.template='<me-app-box></me-app-box>';
                        scope.widgets.push(appSettings);
                    }
                });
                //var appParams = {
                //    id:apps.data.length
                //}
                //dashboardService.getTemplatesData(appParams).success(function(data){
                //    console.log(data);
                //    scope.templates = data;
                //});
                scope.gridsterOpts={
                    columns : 8,
                    margins: [80,80],
                    rowHeight: 180,
                    outerMargin: false,
                    pushing: false,
                    floating: false,
                    swapping: false,
                    resizable: {
                        enabled: false
                    }
                };

            }
        }
    }
})();