#!/bin/bash
echo  'starting....'

#commented below code because it is not neccesary but if anyone want to have the db connection that how u do it
#APPS=$( mongo appmaker --eval "db.application.find().pretty()")

#variables
APPS=(`echo $1 | tr ',' ' '`);
USERS=(`echo $2 | tr ',' ' '`);
MESERVER=$3;
TEMPLATEPATH=$4;
serverUrl=$5;
CHCEKACTIVESTATUS=(`echo $6 | tr ',' ' '`);
CHECKCUSTOMSTATUS=(`echo $7 | tr ',' ' '`);

#color guide for more info : https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
cyan=`tput setaf 6`
reset=`tput sgr0`
#testing
echo "${red}red text ${green}green text ${yellow}yellow text ${cyan}cyan text${reset}"

# loops iterate through a
# set of values until the
# list (APPS) is exhausted
# access each element
# as $app
echo "$(date) ${cyan}Starting Old apps backup .... ${reset}"
cd $MESERVER
if [ backupUpdatedApps.zip ]
then
    rm -rf backupUpdatedApps.zip
fi
zip -r backupUpdatedApps.zip ./*

echo "$(date) ${cyan}Starting All App Update .... ${reset}"
i=0
for app in "${APPS[@]}"
do
    #check if the app active and if it is custom one dnt update it
    if [ ${CHCEKACTIVESTATUS[i]} = true ] && [ ! ${CHECKCUSTOMSTATUS[i]} = true ]
    then
        echo "$(date) ${cyan}Update Started of ${reset}user=${green}${USERS[i]} ${reset}app=${green}${APPS[i]}${reset}"
        #FOR $i APP AND USER ID

        cd $MESERVER/${USERS[i]}/progressiveTemplates/
        pwd
        ls
        MADEEASYJSON="./${APPS[i]}/assets/madeEasy.json";
        #get the template name
        templateName=`grep -m 1 "\"templateName\"" $MADEEASYJSON | sed -r 's/^ *//;s/.*: *"//;s/",?//'`

        #get the template to the destination and replace madeEasy and constantService
        cp -r $TEMPLATEPATH/$templateName ./
        cp -r ${APPS[i]}/assets/madeEasy.json ./$templateName/assets/
        cp -r ${APPS[i]}/assets/constantsService.ts ./$templateName/assets/

        #setup main.js according to working directory
        #get the values
        NAME=`grep -m 1 "\"name\"" $templateName/assets/madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        APPID=`grep -m 1 "\"appId\"" $templateName/assets/madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        USERID=`grep -m 1 "\"userId\"" $templateName/assets/madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        TEMPNAME=`grep -m 1 "\"templateName\"" $templateName/assets/madeEasy.json | sed -r 's/^ *//;s/.*: *"//;s/",?//'`
        #replace the values
        sed -i "s@serverUrl@$serverUrl@" $templateName/main.*.js
        sed -i "s@unknownName@$NAME@" $templateName/main.*.js
        sed -i "s@unknownAppId@$APPID@" $templateName/main.*.js
        sed -i "s@unknownUserName@$USERID@" $templateName/main.*.js
        sed -i "s@unknownTemplateName@$TEMPNAME@" $templateName/main.*.js

        if [ ${APPS[i]}_old.zip ]
        then
            rm -rf ${APPS[i]}_old.zip
        fi
        #rename the old app as appId_old
        zip -r ${APPS[i]}_old.zip ${APPS[i]}
        #delete the old app
        rm ${APPS[i]}/*
        #rename the remaning old app with assets folder to temp
        mv -f ${APPS[i]} temp
        #remove the assets folder from new updated app
        rm -rf $templateName/assets
        #rename the updated new app as old_appId
        mv -f $templateName ${APPS[i]}
        #copy and replace the asset folder from temp and remove temp folder and we are done
        yes | cp -rf temp/assets ${APPS[i]}/
        rm -rf temp
        echo "$(date) ${cyan}Update finished of ${reset}user=${green}${USERS[i]} ${reset}app=${green}${APPS[i]}${reset}"
    else
        echo "$(date) ${yellow}Found deleted or custom app ${reset}user=${green}${USERS[i]} ${reset}app=${green}${APPS[i]}${reset}"
    fi

#    increment i by 1
    i=$((i+1));
done

echo "$(date) ${cyan}Finished All App Update .... ${reset}"
echo  'end'
