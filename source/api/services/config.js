module.exports = {

    ME_SERVER: sails.config.ME_SERVER,
    ME_SERVER_URL: sails.config.ME_SERVER_URL,
    APP_FILE_SERVER: sails.config.APP_FILE_SERVER,

    server: {
        host : sails.config.HOST_URL,
        port : sails.config.port
    },

    ME_PORT : sails.config.ME_SERVER_PORT,
    CLIENT_SECRET:sails.config.CLIENT_SECRET,
    TEMPLATES_PATH :sails.config.TEMPLATES_PATH,
    PROGRESSIVE_TEMPLATES_PATH :sails.config.PROGRESSIVE_TEMPLATES_PATH,

    PUSH_API_URL : 'https://fcm.googleapis.com/fcm/send',
    AUTHORIZATION : 'key=AAAAJ4YjgQI:APA91bH-TmfU_nC3oKelw9ramCmDN5Mx1MllS3NeMvfJxcHvh-rIvPxqBlC782UU9DO8jrU9qV5hzzPDN1isyCVzhmLyhS7hZQZg_ZQHtoDFZHxMQI3GSp1PqeeVdbn4QccdcQh35uk9',

    KEYWORD_LENGTH: sails.config.KEYWORD_LENGTH,

    //IdeaBiz
    IDEABIZ_AUTH_CONSUMER_KEY: sails.config.IDEABIZ_AUTH_CONSUMER_KEY,
    IDEABIZ_AUTH_CONSUMER_SECRET: sails.config.IDEABIZ_AUTH_CONSUMER_SECRET,
    IDEABIZ_AUTH_USERNAME: sails.config.IDEABIZ_AUTH_USERNAME,
    IDEABIZ_AUTH_PASSWORD: sails.config.IDEABIZ_AUTH_PASSWORD,

    IDEABIZ_ADMIN_API_ACTIONS: {
        'STATE_CHECK': 'STATE_CHECK',
        'HISTORY': 'HISTORY',
        'STATE_CHANGE': 'STATE_CHANGE'
    },
    IDEABIZ_SUBSCRIPTION_STATUS: {

        'SUBSCRIBE': {
            'code': 'SUBSCRIBE',
            'desc': 'Subscribed'
        },
        'UNSUBSCRIBE': {
            'code': 'UNSUSCRIBE',
            'desc': 'Unsubscribed'
        }
    },

    IDEABIZ_RENTAL_STATUS:{


        'RENTAL_FAILED': {
            'code': 'RENTAL_FAILED',
            'desc': 'Rental Failed'
        },
        'RENTAL_CHARGED': {
            'code': 'RENTAL_CHARGED',
            'desc': 'Rental Charged'
        }


    },


    APP_USER_STATUS: {
        'ACTIVE': 'A',
        'INACTIVE': 'I'
    },
    IDEABIZ_USER_ACTIONS:{'states':["APPROVED,REJECTED"]},
    IDEABIZ_USER_NETWORK_CLIENTS:{

        'Mobitel': {
            'code': 'MOBITEL',
            'desc': 'Mobitel',
            'shareSplit': '60',
            'chargingMethod': 'daily'
        },
        'Dialog': {
            'code': 'DIALOG',
            'desc': 'Dialog',
            'shareSplit': '60',
            'chargingMethod': 'daily'
        },
        'Hutch': {
            'code': 'HUTCH',
            'desc': 'Hutch',
            'shareSplit': '60',
            'chargingMethod': 'daily'
        },
        'Airtel': {
            'code': 'AIRTEL',
            'desc': 'Airtel',
            'shareSplit': '60',
            'chargingMethod': 'daily'
        }

    },
         IDEABIZ_ADMIN_APP_STATUS:{

             "PUBLISH_STATUSES": [
                 {
                     "code": "NOT_SUBMITTED",
                     "description": "Not Submitted",
                     "nextAvailable": [
                         "SUBMITTED_FOR_APPROVAL"
                     ],
                     "allowedRoles": [
                         "admin",
                         "superAdmin",
                         "appCreater"
                     ],
                     "color":"#ffffff"
                 },
                 {
                     "code": "SUBMITTED_FOR_APPROVAL",
                     "description": "Submitted for Approval",
                     "nextAvailable": [
                         "APPROVED",
                         "REJECTED"
                     ],
                     "allowedRoles": [
                         "admin",
                         "superAdmin",
                         "appCreater"
                     ],
                     "color":"#ffffff"
                 },
                 {
                   "code": "APPROVED",
                   "description": "Approved",
                   "nextAvailable": [
                     "SUSPENDED",
                     "TERMINATED"
                   ],
                   "allowedRoles": [
                     "admin",
                     "superAdmin"
                   ],
                   "color":"#c7febc"
                 },
                 {
                   "code": "REJECTED",
                   "description": "Rejected",
                   "nextAvailable": [],
                   "allowedRoles": [],
                   "color":"#FDAFB0"
                 },
                 {
                   "code": "SUSPENDED",
                   "description": "Suspended",
                   "nextAvailable": [
                     "APPROVED",
                     "TERMINATED"
                   ],
                   "allowedRoles": [
                     "admin",
                     "superAdmin"
                   ],
                   "color":"#fee5b4"
                 },
                 {
                   "code": "TERMINATED",
                   "description": "Terminated",
                   "nextAvailable": [],
                   "allowedRoles": [
                     "admin",
                     "superAdmin"
                   ],
                   "color" : "#FDAFB0"
                 }
               ]
            }

};
