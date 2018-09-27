#!/bin/bash
echo  'start....'

#leave and comment other env

ENV='dev'   #this is for development
#ENV='pro'  #this is for production
#ENV='stag'  #this is for staging

MESERVER=''
APPFILESERVER=''
MONGO_PARAMS='' #This is to build the mongo params set for different connections
DB=''

if [ $ENV == 'dev' ]
then
    echo '++++++++++++++++Running importData.sh for Development+++++++++++++++++++'
    MESERVER='/Library/WebServer/Documents/meServer/temp/';
    APPFILESERVER='/Users/chamilthushantha/Desktop/appFileServer/';
	DB='appmaker'
	serverUrl='http://192.168.8.112:1337'
elif [ $ENV == 'stag' ]
then
    echo '++++++++++++++++Running importData.sh for Staging+++++++++++++++++++'
    MESERVER='/home/admin/web/testcdn.otenro.com/public_html/temp/';
    APPFILESERVER='/home/otenro/OtenroTest/appFileServer/';
	DB='appmaker'
	serverUrl='http://appmaker.ddns.net'
else
    echo '++++++++++++++++Running importData.sh for Production+++++++++++++++++++'
    MESERVER='/home/admin/web/cdn.appmaker.lk/public_html/developer/meServer/temp/';
    APPFILESERVER='/home/admin/web/cdn.appmaker.lk/public_html/developer/appFileServer/';
    DB='ideadroid'
    serverUrl='https://ideadroid.ideamart.io'
    MONGO_PARAMS='--host 13.229.197.90:27017 --username ideadroid --password SUperman123';
fi
echo $DB
echo $serverUrl
echo $MESERVER
echo $APPFILESERVER

mongoimport $MONGO_PARAMS --db $DB --collection accounttype --file dataFiles/accounttype.json
mongoimport $MONGO_PARAMS --db $DB --collection appinitialdata --file dataFiles/appinitialdata.json
mongoimport $MONGO_PARAMS --db $DB --collection contentrating --file dataFiles/contentrating.json
mongoimport $MONGO_PARAMS --db $DB --collection country --file dataFiles/country.json
mongoimport $MONGO_PARAMS --db $DB --collection currency --file dataFiles/currency.json
mongoimport $MONGO_PARAMS --db $DB --collection languages --file dataFiles/languages.json
mongoimport $MONGO_PARAMS --db $DB --collection measurementstandard --file dataFiles/measurementstandard.json
mongoimport $MONGO_PARAMS --db $DB --collection primarycategory --file dataFiles/primarycategory.json
mongoimport $MONGO_PARAMS --db $DB --collection secondarycategory --file dataFiles/secondarycategory.json
mongoimport $MONGO_PARAMS --db $DB --collection sitetype --file dataFiles/sitetype.json
mongoimport $MONGO_PARAMS --db $DB --collection templatemetadata --file dataFiles/templatemetadata.json
mongoimport $MONGO_PARAMS --db $DB --collection timeandregion --file dataFiles/timeandregion.json
mongoimport $MONGO_PARAMS --db $DB --collection yourselfreason --file dataFiles/yourselfreason.json
mongoimport $MONGO_PARAMS --db $DB --collection templatecategory --file dataFiles/templatecategory.json
mongoimport $MONGO_PARAMS --db $DB --collection template --file dataFiles/template.json
mongoimport $MONGO_PARAMS --db $DB --collection application --file dataFiles/application.json
mongoimport $MONGO_PARAMS --db $DB --collection article --file dataFiles/article.json
mongoimport $MONGO_PARAMS --db $DB --collection articlecategory --file dataFiles/articlecategory.json
mongoimport $MONGO_PARAMS --db $DB --collection secondnavigation --file dataFiles/secondnavigation.json
mongoimport $MONGO_PARAMS --db $DB --collection thirdnavigation --file dataFiles/thirdnavigation.json
mongoimport $MONGO_PARAMS --db $DB --collection slider --file dataFiles/slider.json
mongoimport $MONGO_PARAMS --db $DB --collection renewalintervals --file dataFiles/renewalintervals.json

#for export data
#mongoexport $MONGO_PARAMS --db $DB --collection accounttype --out accounttype.json
#mongoexport $MONGO_PARAMS --db $DB --collection appinitialdata --out appinitialdata.json
#mongoexport $MONGO_PARAMS --db $DB --collection contentrating --out contentrating.json
#mongoexport $MONGO_PARAMS --db $DB --collection country --out country.json
#mongoexport $MONGO_PARAMS --db $DB --collection currency --out currency.json
#mongoexport $MONGO_PARAMS --db $DB --collection languages --out languages.json
#mongoexport $MONGO_PARAMS --db $DB --collection measurementstandard --out measurementstandard.json
#mongoexport $MONGO_PARAMS --db $DB --collection primarycategory --out primarycategory.json
#mongoexport $MONGO_PARAMS --db $DB --collection secondarycategory --out secondarycategory.json
#mongoexport $MONGO_PARAMS --db $DB --collection sitetype --out sitetype.json
#mongoexport $MONGO_PARAMS --db $DB --collection templatemetadata --out templatemetadata.json
#mongoexport $MONGO_PARAMS --db $DB --collection timeandregion --out timeandregion.json
#mongoexport $MONGO_PARAMS --db $DB --collection yourselfreason --out yourselfreason.json
#mongoexport $MONGO_PARAMS --db $DB --collection templatecategory --out templatecategory.json
#mongoexport $MONGO_PARAMS --db $DB --collection template --out template.json
#mongoexport $MONGO_PARAMS --db $DB --collection accounttype --out accounttype.json
#mongoexport $MONGO_PARAMS --db $DB --collection application --out application.json
#mongoexport $MONGO_PARAMS --db $DB --collection article --out article.json
#mongoexport $MONGO_PARAMS --db $DB --collection articlecategory --out articlecategory.json
#mongoexport $MONGO_PARAMS --db $DB --collection secondnavigation --out secondnavigation.json
#mongoexport $MONGO_PARAMS --db $DB --collection thirdnavigation --out thirdnavigation.json
#mongoexport $MONGO_PARAMS --db $DB --collection slider --out slider.json
#mongoexport $MONGO_PARAMS --db $DB --collection renewalintervals --out renewalintervals.json

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
cp -r ./sample.csv $MESERVER




echo  'end'
