#!/bin/bash
echo  'start....'

#leave and comment other env
#local
MESERVER='c:/xampp/htdocs/meServer/temp/';
NODE='c:/xampp/htdocs/meServer/node_modules/';
APPFILESERVER='c:/xampp/htdocs/meServer/temp/';

#stag
#MESERVER='/home/admin/web/testcdn.otenro.com/public_html/temp/';
#NODE='/home/admin/web/testcdn.otenro.com/public_html/node_modules/';
#APPFILESERVER='/home/otenro/OtenroTest/appFileServer/';

#prod
#MESERVER='/home/admin/web/cdn.appmaker.lk/public_html/developer/meServer/temp/';
#NODE='/home/admin/web/cdn.appmaker.lk/public_html/developer/meServer/node_modules/';
#APPFILESERVER='/home/admin/web/cdn.appmaker.lk/public_html/developer/appFileServer/';

ENV='dev'   #this is for development
#ENV='pro'  #this is for production
#ENV='stag'  #this is for staging
DB=''

if [ $ENV == 'dev' ]
then
	DB='appmaker'
	serverUrl='http://localhost:1337'
elif [ $ENV == 'stag' ]
then
	DB='otenroTest'
	serverUrl='https://testdashboard.otenro.com:1448'
else
	DB='appmaker'
	serverUrl='https://developer.appmaker.lk'
fi
echo $DB
echo $serverUrl

mongoimport --db $DB --collection accounttype --file dataFiles/accounttype.json
mongoimport --db $DB --collection appinitialdata --file dataFiles/appinitialdata.json
mongoimport --db $DB --collection contentrating --file dataFiles/contentrating.json
mongoimport --db $DB --collection country --file dataFiles/country.json
mongoimport --db $DB --collection currency --file dataFiles/currency.json
mongoimport --db $DB --collection languages --file dataFiles/languages.json
mongoimport --db $DB --collection measurementstandard --file dataFiles/measurementstandard.json
mongoimport --db $DB --collection primarycategory --file dataFiles/primarycategory.json
mongoimport --db $DB --collection secondarycategory --file dataFiles/secondarycategory.json
mongoimport --db $DB --collection sitetype --file dataFiles/sitetype.json
mongoimport --db $DB --collection templatemetadata --file dataFiles/templatemetadata.json
mongoimport --db $DB --collection timeandregion --file dataFiles/timeandregion.json
mongoimport --db $DB --collection yourselfreason --file dataFiles/yourselfreason.json
mongoimport --db $DB --collection templatecategory --file dataFiles/templatecategory.json
mongoimport --db $DB --collection template --file dataFiles/template.json
mongoimport --db $DB --collection application --file dataFiles/application.json
mongoimport --db $DB --collection article --file dataFiles/article.json
mongoimport --db $DB --collection articlecategory --file dataFiles/articlecategory.json
mongoimport --db $DB --collection secondnavigation --file dataFiles/secondnavigation.json
mongoimport --db $DB --collection thirdnavigation --file dataFiles/thirdnavigation.json
mongoimport --db $DB --collection slider --file dataFiles/slider.json

#for export data
#mongoexport --db $DB --collection accounttype --out accounttype.json
#mongoexport --db $DB --collection appinitialdata --out appinitialdata.json
#mongoexport --db $DB --collection contentrating --out contentrating.json
#mongoexport --db $DB --collection country --out country.json
#mongoexport --db $DB --collection currency --out currency.json
#mongoexport --db $DB --collection languages --out languages.json
#mongoexport --db $DB --collection measurementstandard --out measurementstandard.json
#mongoexport --db $DB --collection primarycategory --out primarycategory.json
#mongoexport --db $DB --collection secondarycategory --out secondarycategory.json
#mongoexport --db $DB --collection sitetype --out sitetype.json
#mongoexport --db $DB --collection templatemetadata --out templatemetadata.json
#mongoexport --db $DB --collection timeandregion --out timeandregion.json
#mongoexport --db $DB --collection yourselfreason --out yourselfreason.json
#mongoexport --db $DB --collection templatecategory --out templatecategory.json
#mongoexport --db $DB --collection template --out template.json
#mongoexport --db $DB --collection accounttype --out accounttype.json
#mongoexport --db $DB --collection application --out application.json
#mongoexport --db $DB --collection article --out article.json
#mongoexport --db $DB --collection articlecategory --out articlecategory.json
#mongoexport --db $DB --collection secondnavigation --out secondnavigation.json
#mongoexport --db $DB --collection thirdnavigation --out thirdnavigation.json
#mongoimport --db $DB --collection slider --out slider.json

echo $MESERVER
echo $NODE

pwd
cd meServerFiles/unknownUser/progressiveTemplates/
   for d in ./*;do
        cd $d/assets/
        ls
        sed -i "s@serverUrl@$serverUrl@" constantsService.ts
        NAME=`grep -m 1 "\"name\"" madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        APPID=`grep -m 1 "\"appId\"" madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        USERID=`grep -m 1 "\"userId\"" madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        TEMPNAME=`grep -m 1 "\"templateName\"" madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        echo $APPID
        echo $USERID
        echo $TEMPNAME
        cd ../
        pwd
        sed -i "s@serverUrl@$serverUrl@" main.*.js
        sed -i "s@unknownName@$NAME@" main.*.js
        sed -i "s@unknownAppId@$APPID@" main.*.js
        sed -i "s@unknownUserName@$USERID@" main.*.js
        sed -i "s@unknownTemplateName@$TEMPNAME@" main.*.js
        cd ../
    done

cd ../../../
pwd
cp -r ./appFileServerFiles/unknownUser $APPFILESERVER
cp -r ./meServerFiles/unknownUser $MESERVER
cp -r ./meServerFiles/node_modules $NODE
cp -r ./sample.csv $MESERVER




echo  'end'
