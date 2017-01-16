#!/bin/bash
echo  'start....'

MESERVER='/var/www/html/meServer/temp/';
APPFILESERVER='/home/prasanna/Desktop/appFileServer/';

ENV='dev'   #this is for development
#ENV='pro'  #this is for production
DB=''

if [ $ENV == 'dev' ]
then
	DB='appBuilder'
else
	DB='otenro'
fi

echo $DB


mongoimport --db $DB --collection application --file application.json
mongoimport --db $DB --collection article --file article.json
mongoimport --db $DB --collection articlecategory --file articlecategory.json
mongoimport --db $DB --collection secondnavigation --file secondnavigation.json
mongoimport --db $DB --collection thirdnavigation --file thirdnavigation.json

#for export data
#mongoexport --db $DB --collection application --out application.json
#mongoexport --db $DB --collection article --out article.json
#mongoexport --db $DB --collection articlecategory --out articlecategory.json
#mongoexport --db $DB --collection secondnavigation --out secondnavigation.json
#mongoexport --db $DB --collection thirdnavigation --out thirdnavigation.json

echo $MESERVER

cp -r ./appFileServerFiles/unknownUser $APPFILESERVER
cp -r ./meServerFiles/unknownUser $MESERVER

echo  'end'
