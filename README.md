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

(3) Start project

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

Apache version 2.4

Do the below changes in apache2.conf file
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        <RequireAll>
                Require local
        </RequireAll>
</Directory>
