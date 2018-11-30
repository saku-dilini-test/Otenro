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
    USE_SENDMAIL :sails.config.USE_SENDMAIL,
    IDEABIZ_IP_POOL_ENABLED :sails.config.IDEABIZ_IP_POOL_ENABLED,

    ANDROID_APK_BUILD_ZIPALIGN_PATH : sails.config.ANDROID_APK_BUILD_ZIPALIGN_PATH,
    ANDROID_VERSION : sails.config.ANDROID_VERSION,
    SUPPORT_USER_EMAIL : sails.config.SUPPORT_USER_EMAIL,

    PUSH_API_URL : 'https://fcm.googleapis.com/fcm/send',
    AUTHORIZATION : 'key=AAAAJ4YjgQI:APA91bH-TmfU_nC3oKelw9ramCmDN5Mx1MllS3NeMvfJxcHvh-rIvPxqBlC782UU9DO8jrU9qV5hzzPDN1isyCVzhmLyhS7hZQZg_ZQHtoDFZHxMQI3GSp1PqeeVdbn4QccdcQh35uk9',

    KEYWORD_LENGTH: 11,

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
        'Dialog': {
            'code': 'DIALOG',
            'desc': 'Dialog',
            'shareSplit': '60',
            'email': 'supportTest@dialog.com',
            'priceRange': {
                'daily': {
                    'min': 1,
                    'max': 10
                },
                'monthly': {
                    'min': 30,
                    'max': 500
                }
            }
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
    IDEABIZ_ADMIN_EMAIL : sails.config.IDEABIZ_ADMIN_EMAIL,
    SIMATO_SUPPORT : sails.config.SIMATO_SUPPORT,
    IDEABIZ_SUPER_ADMIN_EMAIL : sails.config.IDEABIZ_SUPER_ADMIN_EMAIL,
    IDEABIZ_SUPPORT_EMAIL : sails.config.IDEABIZ_SUPPORT_EMAIL,
    IDEABIZ_APP_GENERATOR_EMAIL : sails.config.IDEABIZ_APP_GENERATOR_EMAIL,

    //APK_BUILD_STATUS use to check the apk generation process is in which stage.This will set in Application.apkStatus
    APK_BUILD_STATUS: {
        'PENDING': {
            'code': 'PENDING',
            'desc': 'Pending'
        },
        'SUCCESS': {
            'code': 'SUCCESS',
            'desc': 'Success'
        },
        'ERROR': {
            'code': 'ERROR',
            'desc': 'Error'
        }
    },

    //END_USER_MESSAGES are the messages which we will show to the end user(in the mobile app itself)
    END_USER_MESSAGES: {
        'SERVER_ERROR': 'Sorry, we can not process your request at this time. Please try again after some time.',
        'OPERATOR_NOT_FOUND': 'Service not available for your network operator.',
        'APP_TERMINATED': 'The service is no longer available on the network.',
        'APP_SUSPENDED': 'The service is temporarily unavailable on the network.',
        'APP_REJECTED': 'The service is currently not available on the network. ',
        'APP_SUBMITTED_FOR_APPROVAL': 'The service is currently not available on the network.',
        'APP_SUBMITTED_FOR_CONFIGURATION': 'The service is currently not available on the network.',
        'APP_NOT_SUBMITTED': 'The service is currently not available on the network.',
        'APP_DELETED': 'The service is no longer available.',
        'USER_UNSUBSCRIBED': 'You got unsubscribed from this service',
        'INSUFFICIENT_BALANCE': 'Sorry, your subscription is currently inactive due to insufficient balance. Please reload and try again.',
        'SUCCESSFULLY_RENEWED': 'Successfully renewed your service.'
    },

    //These renewal intervals are defined in a json call port.json, but we defined it in here since we need to use this in the code
    RENEWAL_INTERVALS: {
        'DAILY': {
            'code': 'Daily',
            'desc': 'Daily'
        },
        'MONTHLY': {
            'code': 'Monthly',
            'desc': 'Monthly'
        }
    },

    //Push Message Sending status PushMessage.status
    PUSH_MESSAGE_STATUS: {
        'PENDING': {
            'code': 'PENDING',
            'desc': 'Pending'
        },
        'SENT': {
            'code': 'SENT',
            'desc': 'Sent'
        },
        'ERROR': {
            'code': 'ERROR',
            'desc': 'Error'
        }
    },

    //Will keep the user status in user Registration 
    USER_REGISTRATION_STATUS: {
        'PENDING': {
            'code': 'PENDING',
            'desc': 'Pending'
        },
        'VERIFIED': {
            'code': 'VERIFIED',
            'desc': 'Verified'
        }
    },
    IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS : sails.config.IDEABIZ_ADMIN_MO_CALLBACK_FORWARD_URLS

};
