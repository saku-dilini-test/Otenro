## The English Cake Company
Web Site | Mobile App | Backend Server


SetUp Project
===================================================================================================================
(1) Go to git Otenro/TECC-master branch.
		git clone

(2)	install Dependency | goto root directory

		Pre-Requirements

        	node js,mongodb,sails js,bower, ionic

    i)  Set Up Cake Company Web Site
            go to Otenro -> apps -> cakeFactoryWebSite

                > npm install
                > bower install

    ii)  Set Up Cake Company Mobile App
            go to Otenro -> apps -> hybrid -> cakeFactory

                > npm install
                > bower install

    iii) Set Up Cake Company Backend Server
            go to Otenro -> apps -> hybrid -> cakeFactoryBackend

                > npm install

(3) Start project

    Development

        i) Cake Company Web Site

            goto Otenro -> apps -> cakeFactoryWebSite -> js -> app.js

                > choose the environment (local or production)
                > set SERVER_URL  IP and Port

            goto Otenro -> apps -> cakeFactoryWebSite

                > http-server

		ii) Cake Company Mobile App

		     goto Otenro -> apps -> hybrid -> cakeFactory -> www -> js -> app.js

		         > choose the environment (local or production)
		         > set SERVER_URL,ORDER_URL IP and Port

		iii) Cake Company Backend

                 Development

                    goto Otenro -> apps -> hybrid -> cakeFactoryBackend
                        > sails lift

    Production

        i) Cake Company Web Site

            1) load Cake company Front-end(apps -> cakeFactoryWebSite folder) to the apache server
            2) Cake Company Backend up

                 > login as 'git' user
                 > go to "/home/git/projects/cakeCompany/Otenro/apps/hybrid/cakeFactoryBackend"
                 > check the running apps in pm2 ( pm2 list), if you restart the server there should not be any running processes.
                 > run pm2 start app.js -x -- --prod
