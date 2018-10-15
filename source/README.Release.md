# Ideadroid

Test/QA/stage(192.168.8.115 - http://appmaker.ddns.net) Server Release
===================================================================================================================
(1)	Server Info
    IMPORTANT - You should be in Bell4G network
    SSH - ssh root@192.168.8.115 / ssh root@appmaker.ddns.net (Outside)
    PW - Simat02008@!!!

(2)	Project Info
    Path - /home/projects/appmaker/Otenro/

(3)	Logs
    entire log path - /home/projects/appmaker/Otenro/source/combined.outerr.log
    error log path - /root/.pm2/logs/ideadroid-error.log                      
    out log path - /root/.pm2/logs/ideadroid-out.log 

(4)	Release Procedure
    1.cd /home/projects/appmaker/Otenro/source/
    2.Do a "git pull" (There may be conflicts which need to be stash.Use command 'git stash --patch' carefully.See the section "git stashing" for more information)
    3.npm install
    4.cd /home/projects/appmaker/Otenro/initData/previewData/
    5.run ./importData.sh
    6.cd /home/projects/appmaker/Otenro/source/
    7.Run Relavant PM2 command (Please check the pm2.ideadroid.config.js has the NODE_ENV property set as "stage" > NODE_ENV : "stage", "ID": "0")
        restart: pm2 restart pm2.ideadroid.config.js
        start: pm2 start pm2.ideadroid.config.js
        delete: pm2 delete pm2.ideadroid.config.js
        stop: pm2 stop pm2.ideadroid.config.js
    8.Check PM2 logs whether the System is up and running using "pm2 logs 0" (See "PM2 Commands" section below for more info)

        
Production(AWS - https://ideadroid.ideamart.io) Server Release
===================================================================================================================
(1)	Login: Have a look at the the Section below "AWS ssh login steps for Live Server(ideadroid.ideamart.io) and Live DB Server"
            
(2)	Project Info
    Path - /home/projects/ideadroid/Otenro/
    Production Branch: Ideadroid

(3)	Logs
    entire log path - /home/projects/ideadroid/Otenro/source/combined.outerr.log
    error log path - /root/.pm2/logs/ideadroid-error.log                      
    out log path - /root/.pm2/logs/ideadroid-out.log 

(4)	Release Procedure
    1.sudo su
    2.cd /home/projects/ideadroid/Otenro/
    3.Do a "git pull" (There may be conflicts which need to be stash.Use command 'git stash --patch' carefully.See the section "git stashing" for more information)
    4.cd /home/projects/ideadroid/Otenro/source/
    5.npm install
    6.cd /home/projects/ideadroid/Otenro/initData/previewData/
    7.run ./importData.sh
    8.cd /home/projects/ideadroid/Otenro/source/
    9.Run Relavant PM2 command (Please check the pm2.ideadroid.config.js has the NODE_ENV property set as "production" > NODE_ENV : "production", "ID": "0")
        restart: pm2 restart pm2.ideadroid.config.js
        start: pm2 start pm2.ideadroid.config.js
        delete: pm2 delete pm2.ideadroid.config.js
        stop: pm2 stop pm2.ideadroid.config.js
    10.Check PM2 logs whether the System is up and running using "pm2 logs 0" (See "PM2 Commands" section below for more info)


PM2 Commands
===================================================================================================================
pm2 list - Will list all the processes
pm2 show <id> - Will show the detail information for the given process id
pm2 logs <id> - Show you the running logs


AWS ssh login steps for Live Server(ideadroid.ideamart.io) and Live DB Server
=====================================================
Live AWS server IP >> 18.136.104.112
Live AWS db server IP >> 13.229.197.90
Live AWS server key >> liveidearoid.pem
Live AWS db server key >> idearoiddb.pem

Step 1 - copy the key file from Otenro/source/ into local desktop change the permissions as below

#chmod 600 idearoiddb.pem
#chmod 600 liveidearoid.pem

Step 2 - open the terminal and run below ssh command

#ssh -i idearoiddb.pem centos@13.229.197.90
#ssh -i liveidearoid.pem centos@18.136.104.112

AWS ssh login steps for windows users
------------------------------------
Live AWS server putty private key >> idearoiddbserver.ppk
Live AWS db server putty private key >> liveidearoid.ppk

Step 1 – download putty >> https://www.putty.org/
Step 2 – open the putty terminal and locate the IP address
    Put the 18.136.104.112 in "Host Name (or IP address)" field, and 22 as the Port.
Step 3 – locate the putty private key file
    Connection > SSH > Auth > Browse (browse putty private key from desktop) > open


Live Bill Run information
==========================
1.Login Information to the server
    IP Address: 173.82.219.199
    Username: root
    Password: HB6IJgu8sCf45n1c6I

2.How to check whether the Billrun is up and running?
    #cd /root/apache-tomcat-7.0.88/logs
    #tailf catalina.out

3.How to Start/Stop the Billrun process?
    Killing process -
        #ps -ef | grep /root/apache-tomcat-7.0.88
        #kill -9 process ID
    Start process –
        #cd /root/apache-tomcat-7.0.88/bin/
        #./startup.sh
4.Tomcat Path?
    #cd /root/apache-tomcat-7.0.88/
5.Log fie path(Catelina.out)?
    #cd /root/apache-tomcat-7.0.88/logs


Live Proxy information
==========================
1.Login Information to the server
    IP Address: 173.82.219.199
    Username: root
    Password: HB6IJgu8sCf45n1c6I

2.How to check whether the proxy is up and running?
    #cd /root/apache-tomcat-improxy-7.0.88/logs
    #tailf catalina.out

3.How to Start/Stop the proxy process?
    Killing process -
        #ps -ef | grep /root/apache-tomcat-improxy-7.0.88
        #kill -9 process ID
    Start process –
        #cd /root/apache-tomcat-improxy-7.0.88/bin/
        #./startup.sh
3.Tomcat Path?
    #cd /root/apache-tomcat-improxy-7.0.88/
4.Log fie path(Catelina.out)?
    #cd /root/apache-tomcat-improxy-7.0.88/logs


Test Server(appmaker.ddns.net) Bill Run information
=================================================
1.Login Information to the server
    IP Address: 192.168.8.115
    Username: root
    Password: root@123

2.How to check whether the Billrun is up and running?
#cd /root/apache-tomcat-7.0.88/logs
#tailf catalina.out

3.How to Start/Stop the Billrun process?
    Killing process -
        #ps -ef | grep /root/apache-tomcat-7.0.88
        #kill -9 process ID
    Start process –
        #cd /root/apache-tomcat-7.0.88/bin/
        #./startup.sh
3.Tomcat Path?
    #cd /root/apache-tomcat-7.0.88/
4.Log fie path(Catelina.out)?
    #cd /root/apache-tomcat-7.0.88/logs

Test Server(appmaker.ddns.net) Proxy information
=================================================
1.Login Information to the server
    IP Address: 192.168.8.115
    Username: root
    Password: root@123
2.How to check whether the Billrun is up and running?
    #cd /root/apache-tomcat-improxy-7.0.88/logs
    #tailf catalina.out
3.How to Start/Stop the Proxy process?
    Killing process -
        #ps -ef | grep /root/apache-tomcat-improxy-7.0.88
        #kill -9 process ID
    Start process –
        #cd /root/apache-tomcat-improxy-7.0.88/bin/
        #./startup.sh
4.Tomcat Path?
    #cd /root/apache-tomcat-improxy-7.0.88/
5.Log fie path(Catelina.out)?
    #cd /root/apache-tomcat-improxy-7.0.88/logs

git stashing
===============
Select "a" to add(stash) the file
select "d" to declare(do not add) the file
"q" to quit and leave the remaining hunks unstashed
