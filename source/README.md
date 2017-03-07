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

(3) init preview data for templates preview

    goto -> api -> previewData - > importData.sh

        > set MESERVER directory path
        > set APPFILESERVER directory path
        > set db

    give execute permission for importData.sh file as follows (for linux users) on command line prompt
    chmod 777 importData.sh

    **WARNING: run the below mentioned clearData.sh only in dev environment**
    run clearData.sh. This will clear the database
    
    Run 'importData.sh' bash file as './importData.sh' on command line prompt (for linux users)
    (for windows platform  use cygwin (https://www.cygwin.com/) and Run 'sed -i 's/\r$//' importData.sh' and execute ./importData.sh )


(4) Start project

		goto -> config -> env -> development.js
		goto -> assests -> js -> services -> appConfig.js

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

