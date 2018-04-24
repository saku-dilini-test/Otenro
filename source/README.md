# Otenro

SetUp Project
===================================================================================================================
(1)	clone the repository

		git clone https://github.com/onbitlabspvt/Otenro.git

(2)	install Dependency | goto root directory

		Pre-Requirements

        	node js,mongodb,sails js,bower

        > npm install
        > bower install


Setup for Web-Applications
===================================================================================================================
(3) Node_modules for the web application:

	goto --> initData --> previewData --> meServerFiles

        > npm install
		

(4) init preview data for templates preview

    goto -> initData -> previewData - > importData.sh

        > set MESERVER directory path
        > set APPFILESERVER directory path
        > set db

    give execute permission for importData.sh file as follows (for linux users) on command line prompt
    chmod 777 importData.sh
    
    Run 'importData.sh' bash file as './importData.sh' on command line prompt (for linux users)
    (for windows platform  use cygwin (https://www.cygwin.com/) and Run 'sed -i 's/\r$//' importData.sh' and execute ./importData.sh )


(5) Start project

		goto -> config -> env -> development.js
		goto -> assets -> env -> development.js
		
		 	> set server IP and Port
		 	> set meSever IP and Port

		goto root directory

			> sails lift



Apache server changes for meServer
===================================================================================================================
Apache version 2.2

Do the below changes in httpd.conf file
Change the <Directory "/var/www> to <Directory "/var/www/html/meServer"> and should be as below.
<Directory "/var/www/html/meServer">

    Options Indexes FollowSymLinks
    AllowOverride None
    Order deny,allow
    Deny from all
    Allow from 127.0.0.1 ::1 localhost 192.168
</Directory>

Restart Apache server by the command "sudo service httpd restart"

Apache version 2.4

Do the below changes in apache2.conf file
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        <RequireAll>
                Require local
        </RequireAll>
</Directory>

Restart Apache server by the command "sudo service apache2 restart"


Firebase configuration for push notifications
======================================================================================

Firebase console url: https://console.firebase.google.com/u/1/
User: spdonbit@gmail.com
pwd: ABcd@#1234
Firebase Project name: Ideadroid

Below should be in the source/api/service/config.js(Note: AUTHORIZATION key may differ, check the firebase project to find the key)
---------------------------------------------------
PUSH_API_URL : 'https://fcm.googleapis.com/fcm/send',
AUTHORIZATION : 'key=AAAA_PMyt6w:APA91bGc83P6ymZoLGooHVrGc7IO8iSAMVN59JoElyzZylSYwMZVnQFXpvGgAiLmHi1wkYSTT4XxHKMDVshwwYIJyXfRAEYXpAAwhk9UYcB755kW73uRRO7oiAsNGcEFR8iboHON5X-9'



