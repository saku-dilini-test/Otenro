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

        'SUBSCRIBED': {
            'code': 'SUBSCRIBED',
            'desc': 'Subscribed'
        },
        'UNSUBSCRIBED': {
            'code': 'UNSUBSCRIBED',
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
            'email': 'supportTest@mobitel.com'
        },
        'Dialog': {
            'code': 'DIALOG',
            'desc': 'Dialog',
            'shareSplit': '60',
            'email': 'supportTest@dialog.com'
        },
        'Hutch': {
            'code': 'HUTCH',
            'desc': 'Hutch',
            'shareSplit': '60',
            'email': 'supportTest@hutch.com'
        },
        'Airtel': {
            'code': 'AIRTEL',
            'desc': 'Airtel',
            'shareSplit': '60',
            'email': 'supportTest@airtel.com'
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
                 "color":"#ffffff"
             },
             {
                 "code": "SUBMITTED_FOR_CONFIG",
                 "description": "Submitted for Configurations",
                 "nextAvailable": [
                     "SUBMITTED_FOR_APPROVAL"
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
                 "color":"#ffffff"
             },
             {
               "code": "APPROVED",
               "description": "Approved",
               "nextAvailable": [
                 "SUSPENDED",
                 "TERMINATED"
               ],
               "color":"#c7febc"
             },
             {
               "code": "REJECTED",
               "description": "Rejected",
               "nextAvailable": [],
               "color":"#FDAFB0"
             },
             {
               "code": "SUSPENDED",
               "description": "Suspended",
               "nextAvailable": [
                 "APPROVED",
                 "TERMINATED"
               ],
               "color":"#fee5b4"
             },
             {
               "code": "TERMINATED",
               "description": "Terminated",
               "nextAvailable": [],
               "color" : "#FDAFB0"
             }
           ]
        },
    USER_ROLES:{
        'ADMIN': {
            'code': 'ADMIN',
            'desc': 'Admin'
        },
        'SUPER_ADMIN': {
            'code': 'SUPER_ADMIN',
            'desc': 'Super Admin'
        },
        'OPERATOR': {
            'code': 'OPERATOR',
            'desc': 'Operator'
        },
        'APP_CREATOR': {
            'code': 'APP_CREATOR',
            'desc': 'App Creator'
        }
    },

    IDEABIZ_EMAIL : sails.config.IDEABIZ_EMAIL,
    IDEABIZ_GROUP_EMAIL : sails.config.IDEABIZ_GROUP_EMAIL,


};
