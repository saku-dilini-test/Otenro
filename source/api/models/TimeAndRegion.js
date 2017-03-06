/**
 * TimeAndRegion.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            timeAndRegion:{
                type: 'string'
            }
     }
     /*,
     seedData: [
             {
                 timeAndRegion : '(UTC-12:00) International Date Line West',
             },
             {
                 timeAndRegion : '(UTC-11:00) Coordinated Universal Time -11'
             },
             {
                timeAndRegion: '(UTC-10:00) Hawaii'
             },
             {
                timeAndRegion: '(UTC-09:00) Alaska'
             },
             {
                timeAndRegion: '(UTC-08:00) Pacific Time (US and Canada)'
             },
             {
                timeAndRegion: '(UTC-08:00)Baja California'
             },
             {
                timeAndRegion: '(UTC-07:00) Mountain Time (US and Canada)'
             },
             {
                timeAndRegion: '(UTC-07:00) Chihuahua, La Paz, Mazatlan'
             },
             {
                timeAndRegion: '(UTC-07:00) Arizona'
             },
             {
                timeAndRegion: '(UTC-06:00) Saskatchewan'
             },
             {
                timeAndRegion: '(UTC-06:00) Central America'
             },
             {
                timeAndRegion: '(UTC-06:00) Central Time (US and Canada)'
             },
             {
                timeAndRegion: '(UTC-06:00) Guadalajara, Mexico City, Monterrey'
             },
             {
                timeAndRegion: '(UTC-05:00) Eastern Time (US and Canada)'
             },
             {
                timeAndRegion: '(UTC-05:00) Bogota, Lima, Quito'
             },
             {
                timeAndRegion: '(UTC-05:00) Indiana (East)'
             },
             {
                timeAndRegion: '(UTC-04:30) Caracas'
             },
             {
                timeAndRegion: '(UTC-04:00) Atlantic Time (Canada)'
             },
             {
                timeAndRegion: '(UTC-04:00) Cuiaba'
             },
             {
                timeAndRegion: '(UTC-04:00) Santiago'
             },
             {
                timeAndRegion: '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan'
             },
             {
                timeAndRegion: '(UTC-04:00) Asuncion'
             },
             {
                timeAndRegion: '(UTC-03:30) Newfoundland'
             },
             {
                timeAndRegion: '(UTC-03:00) Brasilia'
             },
             {
                timeAndRegion: '(UTC-03:00) Greenland'
             },
             {
                timeAndRegion: '(UTC-03:00) Montevideo'
             },
             {
                timeAndRegion: '(UTC-03:00) Cayenne, Fortaleza'
             },
             {
                timeAndRegion: '(UTC-03:00) Buenos Aires'
             },
             {
                timeAndRegion: '(UTC-02:00) Mid-Atlantic'
             },
             {
                timeAndRegion: '(UTC-02:00) Coordinated Universal Time -02'
             },
             {
                timeAndRegion: '(UTC-01:00) Azores'
             },
             {
                timeAndRegion: '(UTC-01:00) Cabo Verde Is.'
             },
             {
                timeAndRegion: '(UTC) Dublin, Edinburgh, Lisbon, London'
             },
             {
                timeAndRegion: '(UTC) Monrovia, Reykjavik'
             },
             {
                timeAndRegion: '(UTC) Casablanca'
             },
             {
                timeAndRegion: '(UTC) Coordinated Universal Time'
             },
             {
                timeAndRegion: '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague'
             },
             {
                timeAndRegion: '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb'
             },
             {
                timeAndRegion: '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris'
             },
             {
                timeAndRegion: '(UTC+01:00) West Central Africa'
             },
             {
                timeAndRegion: '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'
             },
             {
                timeAndRegion: '(UTC+01:00) Windhoek'
             },
             {
                timeAndRegion: '(UTC+02:00) Minsk'
             },
             {
                timeAndRegion: '(UTC+02:00) Cairo'
             },
             {
                timeAndRegion: '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'
             },
             {
                timeAndRegion: '(UTC+02:00) Athens, Bucharest'
             },
             {
                timeAndRegion: '(UTC+02:00) Jerusalem'
             },
             {
                timeAndRegion: '(UTC+02:00) Amman'
             },
             {
                timeAndRegion: '(UTC+02:00) Beirut'
             },
             {
                timeAndRegion: '(UTC+02:00) Harare, Pretoria'
             },
             {
                timeAndRegion: '(UTC+02:00) Damascus'
             },
             {
                timeAndRegion: '(UTC+02:00) Istanbul'
             },
             {
                timeAndRegion: '(UTC+03:00) Kuwait, Riyadh'
             },
             {
                timeAndRegion: '(UTC+03:00) Baghdad'
             },
             {
                timeAndRegion: '(UTC+03:00) Nairobi'
             },
             {
                timeAndRegion: '(UTC+03:00) Kaliningrad'
             },
             {
                timeAndRegion: '(UTC+03:30) Tehran'
             },
             {
                timeAndRegion: '(UTC+04:00) Moscow, St. Petersburg, Volgograd'
             },
             {
                timeAndRegion: '(UTC+04:00) Abu Dhabi, Muscat'
             },
             {
                timeAndRegion: '(UTC+04:00) Baku'
             },
             {
                timeAndRegion: '(UTC+04:00) Yerevan'
             },
             {
                timeAndRegion: '(UTC+04:00) Tbilisi'
             },
             {
                timeAndRegion: '(UTC+04:00) Port Louis'
             },
             {
                timeAndRegion: '(UTC+04:30) Kabul'
             },
             {
                timeAndRegion: '(UTC+05:00) Tashkent'
             },
             {
                timeAndRegion: '(UTC+05:00) Islamabad, Karachi'
             },
             {
                timeAndRegion: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi'
             },
             {
                timeAndRegion: '(UTC+05:30) Sri Jayawardenepura'
             },
             {
                timeAndRegion: '(UTC+05:45) Kathmandu'
             },
             {
                timeAndRegion: '(UTC+06:00) Ekaterinburg'
             },
             {
                timeAndRegion: '(UTC+06:00) Astana'
             },
             {
                timeAndRegion: '(UTC+06:00) Dhaka'
             },
             {
                timeAndRegion: '(UTC+06:30) Yangon (Rangoon)'
             },
             {
                timeAndRegion: '(UTC+07:00) Novosibirsk'
             },
             {
                timeAndRegion: '(UTC+07:00) Bangkok, Hanoi, Jakarta'
             },
             {
                timeAndRegion: '(UTC+08:00) Krasnoyarsk'
             },
             {
                timeAndRegion: '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi'
             },
             {
                timeAndRegion: '(UTC+08:00) Kuala Lumpur, Singapore'
             },
             {
                timeAndRegion: '(UTC+08:00) Taipei'
             },
             {
                timeAndRegion: '(UTC+08:00) Perth'
             },
             {
                timeAndRegion: '(UTC+08:00) Ulaanbaatar'
             },
             {
                timeAndRegion: '(UTC+09:00) Irkutsk'
             },
             {
                timeAndRegion: '(UTC+09:00) Seoul'
             },
             {
                timeAndRegion: '(UTC+09:00) Osaka, Sapporo, Tokyo'
             },
             {
                timeAndRegion: '(UTC+09:30) Darwin'
             },
             {
                timeAndRegion: '(UTC+09:30) Adelaide'
             },
             {
                timeAndRegion: '(UTC+10:00) Yakutsk'
             },
             {
                timeAndRegion: '(UTC+10:00) Canberra, Melbourne, Sydney'
             },
             {
                timeAndRegion: '(UTC+10:00) Brisbane'
             },
             {
                timeAndRegion: '(UTC+10:00) Hobart'
             },
             {
                timeAndRegion: '(UTC+10:00) Guam, Port Moresby'
             },
             {
                timeAndRegion: '(UTC+11:00) Vladivostok'
             },
             {
                timeAndRegion: '(UTC+11:00) Solomon Is., New Caledonia'
             },
             {
                timeAndRegion: '(UTC+12:00) Magadan'
             },
             {
                timeAndRegion: '(UTC+12:00) Fiji'
             },
             {
                timeAndRegion: '(UTC+12:00) Auckland, Wellington'
             },
             {
                timeAndRegion: '(UTC+12:00) Coordinated Universal Time +12'
             },
             {
                timeAndRegion: "(UTC+13:00) Nuku'alofa"
             },
             {
                timeAndRegion: '(UTC-11:00)Samoa'
             }
     ]*/
 };
