#!/bin/bash
echo  'start....'

MESERVER='c:/xampp/htdocs/meServer/temp/';
NODE='c:/xampp/htdocs/meServer/';
APPFILESERVER='c:/xampp/htdocs/meServer/temp/';

ENV='dev'   #this is for development
#ENV='pro'  #this is for production
DB=''

if [ $ENV == 'dev' ]
then
	DB='appBuilder'
	serverUrl='http://localhost:1337'
else
	DB='otenro'
	serverUrl='http://dashboard.otenro.com'
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

echo $MESERVER
echo $NODE

cd meServerFiles/unknownUser/templates/
   for d in ./*;do
       cd $d/js/
       ls
       sed -i "s@serverUrl@$serverUrl@" constantsService.js
       cd -
    done

cd ../../../
cp -r ./appFileServerFiles/unknownUser $APPFILESERVER
cp -r ./meServerFiles/unknownUser $MESERVER
#cp -r ./meServerFiles/node_modules $NODE



echo  'end'
