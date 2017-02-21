/**
 * Created by prasanna on 8/4/16.
 */

module.exports = {

    schema: true,
    attributes: {
        countryCode:{
            type: 'string'
        },
        countryName:{
            type: 'string'
        }
    }
    /*,
    seedData: [
                    {
                        "countryCode": "AD",
                        "countryName": "Andorra"
                    },

                    {
                        "countryCode": "AF",
                        "countryName": "Afghanistan"
                    },
                    {
                        "countryCode": "AG",
                        "countryName": "Antigua and Barbuda"
                    },
                    {
                        "countryCode": "AI",
                        "countryName": "Anguilla"
                    },
                    {
                        "countryCode": "DZ",
                        "countryName": "Algeria"
                    },
                    {
                        "countryCode": "AL",
                        "countryName": "Albania"
                    },
                    {
                        "countryCode": "AM",
                        "countryName": "Armenia"
                    },
                    {
                        "countryCode": "AO",
                        "countryName": "Angola"
                    },
                    {
                        "countryCode": "AQ",
                        "countryName": "Antarctica"
                    },
                    {
                        "countryCode": "AR",
                        "countryName": "Argentina"
                    },
                    {
                        "countryCode": "AS",
                        "countryName": "American Samoa"
                    },
                    {
                        "countryCode": "AT",
                        "countryName": "Austria"
                    },
                    {
                        "countryCode": "AU",
                        "countryName": "Australia"
                    },
                    {
                        "countryCode": "AW",
                        "countryName": "Aruba"
                    },
                    {
                        "countryCode": "AX",
                        "countryName": "Åland"
                    },
                    {
                        "countryCode": "AZ",
                        "countryName": "Azerbaijan"
                    },
                    {
                        "countryCode": "BA",
                        "countryName": "Bosnia and Herzegovina"
                    },
                    {
                        "countryCode": "BB",
                        "countryName": "Barbados"
                    },
                    {
                        "countryCode": "BD",
                        "countryName": "Bangladesh"
                    },
                    {
                        "countryCode": "BE",
                        "countryName": "Belgium"
                    },
                    {
                        "countryCode": "BF",
                        "countryName": "Burkina Faso"
                    },
                    {
                        "countryCode": "BG",
                        "countryName": "Bulgaria"
                    },
                    {
                        "countryCode": "BH",
                        "countryName": "Bahrain"
                    },
                    {
                        "countryCode": "BI",
                        "countryName": "Burundi"
                    },
                    {
                        "countryCode": "BJ",
                        "countryName": "Benin"
                    },

                    {
                        "countryCode": "BM",
                        "countryName": "Bermuda"
                    },
                    {
                        "countryCode": "BN",
                        "countryName": "Brunei"
                    },
                    {
                        "countryCode": "IO",
                        "countryName": "British Indian Ocean Territory"
                    },
                    {
                        "countryCode": "BO",
                        "countryName": "Bolivia"
                    },
                    {
                        "countryCode": "BQ",
                        "countryName": "Bonaire"
                    },
                    {
                        "countryCode": "BR",
                        "countryName": "Brazil"
                    },
                    {
                        "countryCode": "BS",
                        "countryName": "Bahamas"
                    },
                    {
                        "countryCode": "BT",
                        "countryName": "Bhutan"
                    },
                    {
                        "countryCode": "BV",
                        "countryName": "Bouvet Island"
                    },
                    {
                        "countryCode": "BW",
                        "countryName": "Botswana"
                    },
                    {
                        "countryCode": "BY",
                        "countryName": "Belarus"
                    },
                    {
                        "countryCode": "BZ",
                        "countryName": "Belize"
                    },
                    {
                        "countryCode": "VG",
                        "countryName": "British Virgin Islands"
                    },
                    {
                        "countryCode": "CA",
                        "countryName": "Canada"
                    },
                    {
                        "countryCode": "TD",
                        "countryName": "Chad"
                    },
                    {
                        "countryCode": "CC",
                        "countryName": "Cocos [Keeling] Islands"
                    },
                    {
                        "countryCode": "CF",
                        "countryName": "Central African Republic"
                    },
                    {
                        "countryCode": "CK",
                        "countryName": "Cook Islands"
                    },
                    {
                        "countryCode": "CL",
                        "countryName": "Chile"
                    },
                    {
                        "countryCode": "KH",
                        "countryName": "Cambodia"
                    },
                    {
                        "countryCode": "CM",
                        "countryName": "Cameroon"
                    },
                    {
                        "countryCode": "CN",
                        "countryName": "China"
                    },
                    {
                        "countryCode": "CO",
                        "countryName": "Colombia"
                    },
                    {
                        "countryCode": "CR",
                        "countryName": "Costa Rica"
                    },
                    {
                        "countryCode": "CU",
                        "countryName": "Cuba"
                    },
                    {
                        "countryCode": "KY",
                        "countryName": "Cayman Islands"
                    },
                    {
                        "countryCode": "KM",
                        "countryName": "Comoros"
                    },
                    {
                        "countryCode": "CV",
                        "countryName": "Cape Verde"
                    },
                    {
                        "countryCode": "CW",
                        "countryName": "Curacao"
                    },
                    {
                        "countryCode": "CX",
                        "countryName": "Christmas Island"
                    },
                    {
                        "countryCode": "HR",
                        "countryName": "Croatia"
                    },
                    {
                        "countryCode": "CY",
                        "countryName": "Cyprus"
                    },
                    {
                        "countryCode": "CZ",
                        "countryName": "Czech Republic"
                    },
                    {
                        "countryCode": "CD",
                        "countryName": "Democratic Republic of the Congo"
                    },
                    {
                        "countryCode": "DJ",
                        "countryName": "Djibouti"
                    },
                    {
                        "countryCode": "DK",
                        "countryName": "Denmark"
                    },
                    {
                        "countryCode": "DM",
                        "countryName": "Dominica"
                    },
                    {
                        "countryCode": "DO",
                        "countryName": "Dominican Republic"
                    },
                    {
                        "countryCode": "EC",
                        "countryName": "Ecuador"
                    },
                    {
                        "countryCode": "EE",
                        "countryName": "Estonia"
                    },
                    {
                        "countryCode": "EG",
                        "countryName": "Egypt"
                    },
                    {
                        "countryCode": "SV",
                        "countryName": "El Salvador"
                    },
                    {
                        "countryCode": "ER",
                        "countryName": "Eritrea"
                    },
                    {
                        "countryCode": "ET",
                        "countryName": "Ethiopia"
                    },
                    {
                        "countryCode": "GQ",
                        "countryName": "Equatorial Guinea"
                    },
                    {
                        "countryCode": "FI",
                        "countryName": "Finland"
                    },
                    {
                        "countryCode": "FJ",
                        "countryName": "Fiji"
                    },
                    {
                        "countryCode": "FK",
                        "countryName": "Falkland Islands"
                    },
                    {
                        "countryCode": "GF",
                        "countryName": "French Guiana"
                    },
                    {
                        "countryCode": "FO",
                        "countryName": "Faroe Islands"
                    },
                    {
                        "countryCode": "FR",
                        "countryName": "France"
                    },
                    {
                        "countryCode": "PF",
                        "countryName": "French Polynesia"
                    },
                    {
                        "countryCode": "TF",
                        "countryName": "French Southern Territories"
                    },
                    {
                        "countryCode": "GA",
                        "countryName": "Gabon"
                    },
                    {
                        "countryCode": "DE",
                        "countryName": "Germany"
                    },
                    {
                        "countryCode": "GD",
                        "countryName": "Grenada"
                    },
                    {
                        "countryCode": "GE",
                        "countryName": "Georgia"
                    },
                    {
                        "countryCode": "GG",
                        "countryName": "Guernsey"
                    },
                    {
                        "countryCode": "GH",
                        "countryName": "Ghana"
                    },
                    {
                        "countryCode": "GI",
                        "countryName": "Gibraltar"
                    },
                    {
                        "countryCode": "GL",
                        "countryName": "Greenland"
                    },
                    {
                        "countryCode": "GM",
                        "countryName": "Gambia"
                    },
                    {
                        "countryCode": "GN",
                        "countryName": "Guinea"
                    },
                    {
                        "countryCode": "GP",
                        "countryName": "Guadeloupe"
                    },

                    {
                        "countryCode": "GR",
                        "countryName": "Greece"
                    },
                    {
                        "countryCode": "GT",
                        "countryName": "Guatemala"
                    },
                    {
                        "countryCode": "GU",
                        "countryName": "Guam"
                    },
                    {
                        "countryCode": "GW",
                        "countryName": "Guinea-Bissau"
                    },
                    {
                        "countryCode": "GY",
                        "countryName": "Guyana"
                    },
                    {
                        "countryCode": "HK",
                        "countryName": "Hong Kong"
                    },
                    {
                        "countryCode": "HM",
                        "countryName": "Heard Island and McDonald Islands"
                    },
                    {
                        "countryCode": "HN",
                        "countryName": "Honduras"
                    },
                    {
                        "countryCode": "HT",
                        "countryName": "Haiti"
                    },
                    {
                        "countryCode": "HU",
                        "countryName": "Hungary"
                    },
                    {
                        "countryCode": "ID",
                        "countryName": "Indonesia"
                    },
                    {
                        "countryCode": "IE",
                        "countryName": "Ireland"
                    },
                    {
                        "countryCode": "IL",
                        "countryName": "Israel"
                    },
                    {
                        "countryCode": "IM",
                        "countryName": "Isle of Man"
                    },
                    {
                        "countryCode": "CI",
                        "countryName": "Ivory Coast"
                    },
                    {
                        "countryCode": "IN",
                        "countryName": "India"
                    },
                    {
                        "countryCode": "IQ",
                        "countryName": "Iraq"
                    },
                    {
                        "countryCode": "IR",
                        "countryName": "Iran"
                    },
                    {
                        "countryCode": "IS",
                        "countryName": "Iceland"
                    },
                    {
                        "countryCode": "IT",
                        "countryName": "Italy"
                    },
                    {
                        "countryCode": "JE",
                        "countryName": "Jersey"
                    },
                    {
                        "countryCode": "JM",
                        "countryName": "Jamaica"
                    },
                    {
                        "countryCode": "JO",
                        "countryName": "Jordan"
                    },
                    {
                        "countryCode": "JP",
                        "countryName": "Japan"
                    },
                    {
                        "countryCode": "KE",
                        "countryName": "Kenya"
                    },
                    {
                        "countryCode": "KG",
                        "countryName": "Kyrgyzstan"
                    },
                    {
                        "countryCode": "KI",
                        "countryName": "Kiribati"
                    },
                    {
                        "countryCode": "KW",
                        "countryName": "Kuwait"
                    },
                    {
                        "countryCode": "KZ",
                        "countryName": "Kazakhstan"
                    },
                    {
                        "countryCode": "XK",
                        "countryName": "Kosovo"
                    },
                    {
                        "countryCode": "LA",
                        "countryName": "Laos"
                    },
                    {
                        "countryCode": "LB",
                        "countryName": "Lebanon"
                    },
                    {
                        "countryCode": "LI",
                        "countryName": "Liechtenstein"
                    },
                    {
                        "countryCode": "LR",
                        "countryName": "Liberia"
                    },
                    {
                        "countryCode": "LS",
                        "countryName": "Lesotho"
                    },
                    {
                        "countryCode": "LT",
                        "countryName": "Lithuania"
                    },
                    {
                        "countryCode": "LU",
                        "countryName": "Luxembourg"
                    },
                    {
                        "countryCode": "LV",
                        "countryName": "Latvia"
                    },
                    {
                        "countryCode": "LY",
                        "countryName": "Libya"
                    },
                    {
                        "countryCode": "MA",
                        "countryName": "Morocco"
                    },
                    {
                        "countryCode": "MC",
                        "countryName": "Monaco"
                    },
                    {
                        "countryCode": "MD",
                        "countryName": "Moldova"
                    },
                    {
                        "countryCode": "ME",
                        "countryName": "Montenegro"
                    },
                    {
                        "countryCode": "MG",
                        "countryName": "Madagascar"
                    },
                    {
                        "countryCode": "MH",
                        "countryName": "Marshall Islands"
                    },
                    {
                        "countryCode": "FM",
                        "countryName": "Micronesia"
                    },
                    {
                        "countryCode": "MK",
                        "countryName": "Macedonia"
                    },
                    {
                        "countryCode": "ML",
                        "countryName": "Mali"
                    },
                    {
                        "countryCode": "MM",
                        "countryName": "Myanmar [Burma]"
                    },
                    {
                        "countryCode": "MN",
                        "countryName": "Mongolia"
                    },
                    {
                        "countryCode": "MO",
                        "countryName": "Macao"
                    },
                    {
                        "countryCode": "MQ",
                        "countryName": "Martinique"
                    },
                    {
                        "countryCode": "MR",
                        "countryName": "Mauritania"
                    },
                    {
                        "countryCode": "MS",
                        "countryName": "Montserrat"
                    },
                    {
                        "countryCode": "MT",
                        "countryName": "Malta"
                    },
                    {
                        "countryCode": "MU",
                        "countryName": "Mauritius"
                    },
                    {
                        "countryCode": "MV",
                        "countryName": "Maldives"
                    },
                    {
                        "countryCode": "YT",
                        "countryName": "Mayotte"
                    },
                    {
                        "countryCode": "MW",
                        "countryName": "Malawi"
                    },
                    {
                        "countryCode": "MX",
                        "countryName": "Mexico"
                    },
                    {
                        "countryCode": "MY",
                        "countryName": "Malaysia"
                    },
                    {
                        "countryCode": "MZ",
                        "countryName": "Mozambique"
                    },
                    {
                        "countryCode": "NA",
                        "countryName": "Namibia"
                    },
                    {
                        "countryCode": "NC",
                        "countryName": "New Caledonia"
                    },
                    {
                        "countryCode": "NE",
                        "countryName": "Niger"
                    },
                    {
                        "countryCode": "NF",
                        "countryName": "Norfolk Island"
                    },
                    {
                        "countryCode": "MP",
                        "countryName": "Northern Mariana Islands"
                    },
                    {
                        "countryCode": "NG",
                        "countryName": "Nigeria"
                    },
                    {
                        "countryCode": "NI",
                        "countryName": "Nicaragua"
                    },
                    {
                        "countryCode": "NL",
                        "countryName": "Netherlands"
                    },
                    {
                        "countryCode": "KP",
                        "countryName": "North Korea"
                    },

                    {
                        "countryCode": "NO",
                        "countryName": "Norway"
                    },
                    {
                        "countryCode": "NP",
                        "countryName": "Nepal"
                    },
                    {
                        "countryCode": "NR",
                        "countryName": "Nauru"
                    },
                    {
                        "countryCode": "NU",
                        "countryName": "Niue"
                    },
                    {
                        "countryCode": "NZ",
                        "countryName": "New Zealand"
                    },
                    {
                        "countryCode": "OM",
                        "countryName": "Oman"
                    },
                    {
                        "countryCode": "PA",
                        "countryName": "Panama"
                    },
                    {
                        "countryCode": "PE",
                        "countryName": "Peru"
                    },
                    {
                        "countryCode": "PG",
                        "countryName": "Papua New Guinea"
                    },
                    {
                        "countryCode": "PH",
                        "countryName": "Philippines"
                    },
                    {
                        "countryCode": "PK",
                        "countryName": "Pakistan"
                    },
                    {
                        "countryCode": "PL",
                        "countryName": "Poland"
                    },
                    {
                        "countryCode": "PN",
                        "countryName": "Pitcairn Islands"
                    },
                    {
                        "countryCode": "PR",
                        "countryName": "Puerto Rico"
                    },
                    {
                        "countryCode": "PS",
                        "countryName": "Palestine"
                    },
                    {
                        "countryCode": "PT",
                        "countryName": "Portugal"
                    },
                    {
                        "countryCode": "PW",
                        "countryName": "Palau"
                    },
                    {
                        "countryCode": "PY",
                        "countryName": "Paraguay"
                    },
                    {
                        "countryCode": "QA",
                        "countryName": "Qatar"
                    },
                    {
                        "countryCode": "CG",
                        "countryName": "Republic of the Congo"
                    },
                    {
                        "countryCode": "RE",
                        "countryName": "Réunion"
                    },
                    {
                        "countryCode": "RO",
                        "countryName": "Romania"
                    },
                    {
                        "countryCode": "RU",
                        "countryName": "Russia"
                    },
                    {
                        "countryCode": "RW",
                        "countryName": "Rwanda"
                    },
                    {
                        "countryCode": "SA",
                        "countryName": "Saudi Arabia"
                    },
                    {
                        "countryCode": "SB",
                        "countryName": "Solomon Islands"
                    },
                    {
                        "countryCode": "CH",
                        "countryName": "Switzerland"
                    },
                    {
                        "countryCode": "LK",
                        "countryName": "Sri Lanka"
                    },
                    {
                        "countryCode": "SC",
                        "countryName": "Seychelles"
                    },
                    {
                        "countryCode": "KR",
                        "countryName": "South Korea"
                    },
                    {
                        "countryCode": "SD",
                        "countryName": "Sudan"
                    },
                    {
                        "countryCode": "RS",
                        "countryName": "Serbia"
                    },
                    {
                        "countryCode": "PM",
                        "countryName": "Saint Pierre and Miquelon"
                    },
                    {
                        "countryCode": "SE",
                        "countryName": "Sweden"
                    },
                    {
                        "countryCode": "SG",
                        "countryName": "Singapore"
                    },
                    {
                        "countryCode": "KN",
                        "countryName": "Saint Kitts and Nevis"
                    },
                    {
                        "countryCode": "SH",
                        "countryName": "Saint Helena"
                    },
                    {
                        "countryCode": "MF",
                        "countryName": "Saint Martin"
                    },
                    {
                        "countryCode": "ES",
                        "countryName": "Spain"
                    },
                    {
                        "countryCode": "SI",
                        "countryName": "Slovenia"
                    },
                    {
                        "countryCode": "SJ",
                        "countryName": "Svalbard and Jan Mayen"
                    },
                    {
                        "countryCode": "GS",
                        "countryName": "South Georgia and the South Sandwich Islands"
                    },
                    {
                        "countryCode": "SK",
                        "countryName": "Slovakia"
                    },
                    {
                        "countryCode": "SL",
                        "countryName": "Sierra Leone"
                    },
                    {
                        "countryCode": "SM",
                        "countryName": "San Marino"
                    },
                    {
                        "countryCode": "SN",
                        "countryName": "Senegal"
                    },
                    {
                        "countryCode": "SO",
                        "countryName": "Somalia"
                    },
                    {
                        "countryCode": "SR",
                        "countryName": "Suriname"
                    },
                    {
                        "countryCode": "SS",
                        "countryName": "South Sudan"
                    },
                    {
                        "countryCode": "ST",
                        "countryName": "São Tomé and Príncipe"
                    },
                    {
                        "countryCode": "SX",
                        "countryName": "Sint Maarten"
                    },
                    {
                        "countryCode": "SY",
                        "countryName": "Syria"
                    },
                    {
                        "countryCode": "SZ",
                        "countryName": "Swaziland"
                    },
                    {
                        "countryCode": "BL",
                        "countryName": "Saint Barthélemy"
                    },
                    {
                        "countryCode": "LC",
                        "countryName": "Saint Lucia"
                    },
                    {
                        "countryCode": "VC",
                        "countryName": "Saint Vincent and the Grenadines"
                    },
                    {
                        "countryCode": "ZA",
                        "countryName": "South Africa"
                    },
                    {
                        "countryCode": "WS",
                        "countryName": "Samoa"
                    },
                    {
                        "countryCode": "TC",
                        "countryName": "Turks and Caicos Islands"
                    },
                    {
                        "countryCode": "TG",
                        "countryName": "Togo"
                    },
                    {
                        "countryCode": "TH",
                        "countryName": "Thailand"
                    },
                    {
                        "countryCode": "TJ",
                        "countryName": "Tajikistan"
                    },
                    {
                        "countryCode": "TK",
                        "countryName": "Tokelau"
                    },
                    {
                        "countryCode": "TL",
                        "countryName": "East Timor"
                    },
                    {
                        "countryCode": "TM",
                        "countryName": "Turkmenistan"
                    },
                    {
                        "countryCode": "TN",
                        "countryName": "Tunisia"
                    },
                    {
                        "countryCode": "TO",
                        "countryName": "Tonga"
                    },
                    {
                        "countryCode": "TR",
                        "countryName": "Turkey"
                    },
                    {
                        "countryCode": "TT",
                        "countryName": "Trinidad and Tobago"
                    },
                    {
                        "countryCode": "TV",
                        "countryName": "Tuvalu"
                    },
                    {
                        "countryCode": "TW",
                        "countryName": "Taiwan"
                    },
                    {
                        "countryCode": "TZ",
                        "countryName": "Tanzania"
                    },
                    {
                        "countryCode": "UA",
                        "countryName": "Ukraine"
                    },
                    {
                        "countryCode": "UG",
                        "countryName": "Uganda"
                    },
                    {
                        "countryCode": "AE",
                        "countryName": "United Arab Emirates"
                    },
                    {
                        "countryCode": "UM",
                        "countryName": "U.S. Minor Outlying Islands"
                    },
                    {
                        "countryCode": "US",
                        "countryName": "United States"
                    },
                    {
                        "countryCode": "GB",
                        "countryName": "United Kingdom"
                    },
                    {
                        "countryCode": "UY",
                        "countryName": "Uruguay"
                    },
                    {
                        "countryCode": "UZ",
                        "countryName": "Uzbekistan"
                    },
                    {
                        "countryCode": "VI",
                        "countryName": "U.S. Virgin Islands"
                    },
                    {
                        "countryCode": "VA",
                        "countryName": "Vatican City"
                    },
                    {
                        "countryCode": "VE",
                        "countryName": "Venezuela"
                    },
                    {
                        "countryCode": "VN",
                        "countryName": "Vietnam"
                    },
                    {
                        "countryCode": "VU",
                        "countryName": "Vanuatu"
                    },
                    {
                        "countryCode": "WF",
                        "countryName": "Wallis and Futuna"
                    },
                    {
                        "countryCode": "EH",
                        "countryName": "Western Sahara"
                    },
                    {
                        "countryCode": "YE",
                        "countryName": "Yemen"
                    },
                    {
                        "countryCode": "ZM",
                        "countryName": "Zambia"
                    },
                    {
                        "countryCode": "ZW",
                        "countryName": "Zimbabwe"
                    }
                ]*/
};

