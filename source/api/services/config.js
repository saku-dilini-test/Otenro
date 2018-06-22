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
            'shareSplit': '40%-60%'
        },
        'Dialog': {
            'code': 'DIALOG',
            'desc': 'Dialog',
            'shareSplit': '40%-60%'
        },
        'Hutch': {
            'code': 'HUTCH',
            'desc': 'Hutch',
            'shareSplit': '40%-60%'
        },
        'Airtel': {
            'code': 'AIRTEL',
            'desc': 'Airtel',
            'shareSplit': '40%-60%'
        }

    },
         IDEABIZ_ADMIN_APP_STATUS:{

             "PUBLISH_STATUSES": [
                 {
                   "code": "PENDING",
                   "description": "Pending",
                   "nextAvailable": [
                     "APPROVED",
                     "REJECTED"
                   ],
                   "allowedRoles": [
                     "admin",
                     "superAdmin",
                     "appCreater"
                   ]
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
                   "color":"rgb(146, 240, 146)"
                 },
                 {
                   "code": "REJECTED",
                   "description": "Rejected",
                   "nextAvailable": [],
                   "allowedRoles": [],
                   "color":"rgb(253, 108, 108)"
                 },
                 {
                   "code": "SUSPENDED",
                   "description": "Suspended",
                   "nextAvailable": [
                     "APPROVED"
                   ],
                   "allowedRoles": [
                     "admin",
                     "superAdmin"
                   ],
                   "color":"rgb(240, 248, 120)"
                 },
                 {
                   "code": "TERMINATED",
                   "description": "Terminated",
                   "nextAvailable": [],
                   "allowedRoles": [
                     "admin",
                     "superAdmin"
                   ],
                   "color" : "rgb(253, 108, 108)"
                 }
               ]
            }

};
