/**
 * Currency.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

 module.exports = {

     schema: true,
     attributes: {
            currency:{
                type: 'string'
            },
            sign:{
               type: 'string'
            }
     },
     seedData: [
             /*{
                 currency : 'LKR',
                 sign : 'Rs.'
             },
             {
                 currency : 'USD',
                 sign : '$'
             },
             {
                 currency : 'EUR',
                 sign : '€'
             },*/
         {
             sign: "$",
             currency: "US Dollar"

         },
         {
             sign: "CA$",
             currency: "Canadian Dollar"

         },
         {
             sign: "€",
             currency: "Euro"
         },
         {
             sign: "AED",
             currency: "United Arab Emirates Dirham"
         },
         {
             sign: "Af",
             currency: "Afghan Afghani"
         },
         {
             sign: "ALL",
             currency: "Albanian Lek"
         },
         {
             sign: "AMD",
             currency: "Armenian Dram"
         },
         {
             sign: "AR$",
             currency: "Argentine Peso"

         },
         {
             sign: "AU$",
             currency: "Australian Dollar"
         },
         {
             sign: "man.",
             currency: "Azerbaijani Manat"
         },
         {
             sign: "KM",
             currency: "Bosnia-Herzegovina Convertible Mark"
         },
         {
             sign: "Tk",
             currency: "Bangladeshi Taka"
         },
         {
             sign: "BGN",
             currency: "Bulgarian Lev"
         },
         {
             sign: "BD",
             currency: "Bahraini Dinar"
         },
         {
             sign: "FBu",
             currency: "Burundian Franc"
         },
         {
             sign: "BN$",
             currency: "Brunei Dollar"
         },
         {
             sign: "Bs",
             currency: "Bolivian Boliviano"
         },
         {
             sign: "R$",
             currency: "Brazilian Real"
         },
         {
             sign: "BWP",
             currency: "Botswanan Pula"
         },
         {
             sign: "BYR",
             currency: "Belarusian Ruble"
         },
         {
             sign: "BZ$",
             currency: "Belize Dollar"
         },
         {
             sign: "CDF",
             currency: "Congolese Franc"
         },
         {
             sign: "CHF",
             currency: "Swiss Franc"
         },
         {
             sign: "CL$",
             currency: "Chilean Peso"
         },
         {
             sign: "CN¥",
             currency: "Chinese Yuan"
         },
         {
             sign: "CO$",
             currency: "Colombian Peso"
         },
         {
             sign: "₡",
             currency: "Costa Rican Colón"
         },
         {
             sign: "CV$",
             currency: "Cape Verdean Escudo"
         },
         {
             sign: "Kč",
             currency: "Czech Republic Koruna"
         },
         {
             sign: "Fdj",
             currency: "Djiboutian Franc"
         },
         {
             sign: "Dkr",
             currency: "Danish Krone"
         },
         {
             sign: "RD$",
             currency: "Dominican Peso"
         },
         {
             sign: "DA",
             currency: "Algerian Dinar"
         },
         {
             sign: "Ekr",
             currency: "Estonian Kroon"
         },
         {
             sign: "EGP",
             currency: "Egyptian Pound"
         },
         {
             sign: "Nfk",
             currency: "Eritrean Nakfa"
         },
         {
             sign: "Br",
             currency: "Ethiopian Birr"
         },
         {
             sign: "£",
             currency: "British Pound Sterling"
         },
         {
             sign: "GEL",
             currency: "Georgian Lari"
         },
         {
             sign: "GH₵",
             currency: "Ghanaian Cedi"
         },
         {
             sign: "FG",
             currency: "Guinean Franc"
         },
         {
             sign: "GTQ",
             currency: "Guatemalan Quetzal"
         },
         {
             sign: "HK$",
             currency: "Hong Kong Dollar"
         },
         {
             sign: "HNL",
             currency: "Honduran Lempira"
         },
         {
             sign: "kn",
             currency: "Croatian Kuna"
         },
         {
             sign: "Ft",
             currency: "Hungarian Forint"
         },
         {
             sign: "Rp",
             currency: "Indonesian Rupiah"
         },
         {
             sign: "₪",
             currency: "Israeli New Sheqel"
         },
         {
             sign: "Rs",
             currency: "Indian Rupee"
         },
         {
             sign: "IQD",
             currency: "Iraqi Dinar"
         },
         {
             sign: "IRR",
             currency: "Iranian Rial"
         },
         {
             sign: "Ikr",
             currency: "Icelandic Króna"
         },
         {
             sign: "J$",
             currency: "Jamaican Dollar"
         },
         {
             sign: "JD",
             currency: "Jordanian Dinar"
         },
         {
             sign: "¥",
             currency: "Japanese Yen"
         },
         {
             sign: "Ksh",
             currency: "Kenyan Shilling"
         },
         {
             sign: "KHR",
             currency: "Cambodian Riel"
         },
         {
             sign: "CF",
             currency: "Comorian Franc"
         },
         {
             sign: "₩",
             currency: "South Korean Won"
         },
         {
             sign: "KD",
             currency: "Kuwaiti Dinar"
         },
         {
             sign: "KZT",
             currency: "Kazakhstani Tenge"
         },
         {
             sign: "LB£",
             currency: "Lebanese Pound"
         },
         {
             sign: "SLRs",
             currency: "Sri Lankan Rupee"
         },
         {
             sign: "Lt",
             currency: "Lithuanian Litas"
         },
         {
             sign: "Ls",
             currency: "Latvian Lats"
         },
         {
             sign: "LD",
             currency: "Libyan Dinar"
         },
         {
             sign: "MAD",
             currency: "Moroccan Dirham"
         },
         {
             sign: "MDL",
             currency: "Moldovan Leu"
         },
         {
             sign: "MGA",
             currency: "Malagasy Ariary"
         },
         {
             sign: "MKD",
             currency: "Macedonian Denar"
         },
         {
             sign: "MMK",
             currency: "Myanma Kyat"
         },
         {
             sign: "MOP$",
             currency: "Macanese Pataca"
         },
         {
             sign: "MURs",
             currency: "Mauritian Rupee"
         },
         {
             sign: "MX$",
             currency: "Mexican Peso"
         },
         {
             sign: "RM",
             currency: "Malaysian Ringgit"
         },
         {
             sign: "MTn",
             currency: "Mozambican Metical"
         },
         {
             sign: "N$",
             currency: "Namibian Dollar"
         },
         {
             sign: "₦",
             currency: "Nigerian Naira"
         },
         {
             sign: "C$",
             currency: "Nicaraguan Córdoba"
         },
         {
             sign: "Nkr",
             currency: "Norwegian Krone"
         },
         {
             sign: "NPRs",
             currency: "Nepalese Rupee"
         },
         {
             sign: "NZ$",
             currency: "New Zealand Dollar"
         },
         {
             sign: "OMR",
             currency: "Omani Rial"
         },
         {
             sign: "B/.",
             currency: "Panamanian Balboa"
         },
         {
             sign: "S/.",
             currency: "Peruvian Nuevo Sol"
         },
         {
             sign: "₱",
             currency: "Philippine Peso"
         },
         {
             sign: "PKRs",
             currency: "Pakistani Rupee"
         },
         {
             sign: "zł",
             currency: "Polish Zloty"
         },
         {
             sign: "₲",
             currency: "Paraguayan Guarani"
         },
         {
             sign: "QR",
             currency: "Qatari Rial"
         },
         {
             sign: "RON",
             currency: "Romanian Leu"
         },
         {
             sign: "din.",
             currency: "Serbian Dinar"
         },
         {
             sign: "RUB",
             currency: "Russian Ruble"
         },
         {
             sign: "RWF",
             currency: "Rwandan Franc"
         },
         {
             sign: "SR",
             currency: "Saudi Riyal"
         },
         {
             sign: "SDG",
             currency: "Sudanese Pound"
         },
         {
             sign: "Skr",
             currency: "Swedish Krona"
         },
         {
             sign: "S$",
             currency: "Singapore Dollar"
         },
         {
             sign: "Ssh",
             currency: "Somali Shilling"
         },
         {
             sign: "SY£",
             currency: "Syrian Pound"
         },
         {
             sign: "฿",
             currency: "Thai Baht"
         },
         {
             sign: "DT",
             currency: "Tunisian Dinar"
         },
         {
             sign: "T$",
             currency: "Tongan Paʻanga"
         },
         {
             sign: "TL",
             currency: "Turkish Lira"
         },
         {
             sign: "TT$",
             currency: "Trinidad and Tobago Dollar"
         },
         {
             sign: "NT$",
             currency: "New Taiwan Dollar"
         },
         {
             sign: "TSh",
             currency: "Tanzanian Shilling"
         },
         {
             sign: "₴",
             currency: "Ukrainian Hryvnia"
         },
         {
             sign: "USh",
             currency: "Ugandan Shilling"
         },
         {
             sign: "$U",
             currency: "Uruguayan Peso"
         },
         {
             sign: "UZS",
             currency: "Uzbekistan Som"
         },
         {
             sign: "Bs.F.",
             currency: "Venezuelan Bolívar"
         },
         {
             sign: "₫",
             currency: "Vietnamese Dong"
         },
         {
             sign: "FCFA",
             currency: "CFA Franc BEAC"
         },
         {
             sign: "CFA",
             currency: "CFA Franc BCEAO"
         },
         {
             sign: "YR",
             currency: "Yemeni Rial"
         },
         {
             sign: "R",
             currency: "South African Rand"
         },
         {
             sign: "ZK",
             currency: "Zambian Kwacha"
         }

     ]
 };
