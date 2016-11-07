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
            },
            symbol:{
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
             currency: "US Dollar",
             symbol: 'usd'

         },
         {
             sign: "CA$",
             currency: "Canadian Dollar",
             symbol:"cad"

         },
         {
             sign: "€",
             currency: "Euro",
             symbol: "eur"
         },
         {
             sign: "AED",
             currency: "United Arab Emirates Dirham",
             symbol:"aed"
         },
         {
             sign: "Af",
             currency: "Afghan Afghani",
             symbol: "afn"
         },
         {
             sign: "ALL",
             currency: "Albanian Lek",
             symbol: "all"
         },
         {
             sign: "AMD",
             currency: "Armenian Dram",
             symbol: "amd"
         },
         {
             sign: "AR$",
             currency: "Argentine Peso",
             symbol:"ars"

         },
         {
             sign: "AU$",
             currency: "Australian Dollar",
             symbol:"aud"
         },
         {
             sign: "man.",
             currency: "Azerbaijani Manat",
             symbol:"azn"
         },
         {
             sign: "KM",
             currency: "Bosnia-Herzegovina Convertible Mark",
             symbol:"bam"
         },
         {
             sign: "Tk",
             currency: "Bangladeshi Taka",
             symbol:"bdt"
         },
         {
             sign: "BGN",
             currency: "Bulgarian Lev",
             symbol:"bgn"
         },
         {
             sign: "FBu",
             currency: "Burundian Franc",
             symbol: "bif"
         },
         {
             sign: "BN$",
             currency: "Brunei Dollar",
             symbol: "bnd"
         },
         {
             sign: "Bs",
             currency: "Bolivian Boliviano",
             symbol:"bob"
         },
         {
             sign: "R$",
             currency: "Brazilian Real",
             symbol:"brl"
         },
         {
             sign: "BWP",
             currency: "Botswana Pula",
             symbol: "bwp"
         },
         {
             sign: "BZ$",
             currency: "Belize Dollar",
             symbol: "bzd"
         },
         {
             sign: "CDF",
             currency: "Congolese Franc",
             symbol: "cdf"
         },
         {
             sign: "CHF",
             currency: "Swiss Franc",
             symbol: "chf"
         },
         {
             sign: "CL$",
             currency: "Chilean Peso",
             symbol: "clp"
         },
         {
             sign: "CN¥",
             currency: "Chinese Yuan",
             symbol: "cny"
         },
         {
             sign: "CO$",
             currency: "Colombian Peso",
             symbol: "cop"
         },
         {
             sign: "₡",
             currency: "Costa Rican Colón",
             symbol : "crc"
         },
         {
             sign: "CV$",
             currency: "Cape Verdean Escudo",
             symbol: "cve"
         },
         {
             sign: "Fdj",
             currency: "Djiboutian Franc",
             symbol: "djf"
         },
         {
             sign: "Dkr",
             currency: "Danish Krone",
             symbol: "dkk"
         },
         {
             sign: "RD$",
             currency: "Dominican Peso",
             symbol: "dop"
         },
         {
             sign: "DA",
             currency: "Algerian Dinar",
             symbol: "dzd"
         },
         {
             sign: "EGP",
             currency: "Egyptian Pound",
             symbol: "egp"
         },
         {
             sign: "Br",
             currency: "Ethiopian Birr",
             symbol: "etb"
         },
         {
             sign: "£",
             currency: "British Pound Sterling",
             symbol: "gbp"
         },
         {
             sign: "GEL",
             currency: "Georgian Lari",
             symbol: "gel"
         },
         {
             sign: "FG",
             currency: "Guinean Franc",
             symbol: "gnf"
         },
         {
             sign: "GTQ",
             currency: "Guatemalan Quetzal",
             symbol: "gtq"
         },
         {
             sign: "HK$",
             currency: "Hong Kong Dollar",
             symbol: "hkd"
         },
         {
             sign: "HNL",
             currency: "Honduran Lempira",
             symbol: "hnl"
         },
         {
             sign: "kn",
             currency: "Croatian Kuna",
             symbol: "hrk"
         },
         {
             sign: "Ft",
             currency: "Hungarian Forint",
             symbol: "huf"
         },
         {
             sign: "Rp",
             currency: "Indonesian Rupiah",
             symbol: "idr"
         },
         {
             sign: "₪",
             currency: "Israeli New Sheqel",
             symbol: "ils"
         },
         {
             sign: "Rs",
             currency: "Indian Rupee",
             symbol: "inr"
         },
         {
             sign: "Ikr",
             currency: "Icelandic Króna",
             symbol: "isk"
         },
         {
             sign: "J$",
             currency: "Jamaican Dollar",
             symbol: "jmd"
         },
         {
             sign: "¥",
             currency: "Japanese Yen",
             symbol: "jpy"
         },
         {
             sign: "Ksh",
             currency: "Kenyan Shilling",
             symbol: "kes"
         },
         {
             sign: "KHR",
             currency: "Cambodian Riel",
             symbol: "khr"

         },
         {
             sign: "CF",
             currency: "Comorian Franc",
             symbol: "kmf"
         },
         {
             sign: "₩",
             currency: "South Korean Won",
             symbol: "krw"
         },
         {
             sign: "KZT",
             currency: "Kazakhstani Tenge",
             symbol: "kzt"
         },
         {
             sign: "LB£",
             currency: "Lebanese Pound",
             symbol: "lbp"
         },
         {
             sign: "SLRs",
             currency: "Sri Lankan Rupee",
             symbol: "lkr"
         },
         {
             sign: "MAD",
             currency: "Moroccan Dirham",
             symbol: "mad"
         },
         {
             sign: "MDL",
             currency: "Moldovan Leu",
             symbol: "mdl"
         },
         {
             sign: "MGA",
             currency: "Malagasy Ariary",
             symbol: "mga"
         },
         {
             sign: "MKD",
             currency: "Macedonian Denar",
             symbol: "mkd"
         },
         {
             sign: "MOP$",
             currency: "Macanese Pataca",
             symbol: "mop"
         },
         {
             sign: "MURs",
             currency: "Mauritian Rupee",
             symbol: "mur"
         },
         {
             sign: "MX$",
             currency: "Mexican Peso",
             symbol: "mxn"
         },
         {
             sign: "RM",
             currency: "Malaysian Ringgit",
             symbol: "myr"
         },
         {
             sign: "MTn",
             currency: "Mozambican Metical",
             symbol: "mzn"
         },
         {
             sign: "N$",
             currency: "Namibian Dollar",
             symbol: "nad"
         },
         {
             sign: "₦",
             currency: "Nigerian Naira",
             symbol: "ngn"
         },
         {
             sign: "C$",
             currency: "Nicaraguan Córdoba",
             symbol: "nio"
         },
         {
             sign: "Nkr",
             currency: "Norwegian Krone",
             symbol: "nok"
         },
         {
             sign: "NPRs",
             currency: "Nepalese Rupee",
             symbol: "npr"
         },
         {
             sign: "NZ$",
             currency: "New Zealand Dollar",
             symbol: "nzd"
         },
         {
             sign: "B/.",
             currency: "Panamanian Balboa",
             symbol: "pab"
         },
         {
             sign: "S/.",
             currency: "Peruvian Nuevo Sol",
             symbol: "pen"
         },
         {
             sign: "₱",
             currency: "Philippine Peso",
             symbol: "php"
         },
         {
             sign: "PKRs",
             currency: "Pakistani Rupee",
             symbol: "pkr"
         },
         {
             sign: "zł",
             currency: "Polish Zloty",
             symbol: "pln"
         },
         {
             sign: "₲",
             currency: "Paraguayan Guarani",
             symbol: "pyg"
         },
         {
             sign: "QR",
             currency: "Qatari Rial",
             symbol: "qar"
         },
         {
             sign: "RON",
             currency: "Romanian Leu",
             symbol: "ron"
         },
         {
             sign: "din.",
             currency: "Serbian Dinar",
             symbol: "rsd"
         },
         {
             sign: "RUB",
             currency: "Russian Ruble",
             symbol: "rub"
         },
         {
             sign: "RWF",
             currency: "Rwandan Franc",
             symbol: "rwf"
         },
         {
             sign: "SR",
             currency: "Saudi Riyal",
             symbol: "sar"
         },
         {
             sign: "Skr",
             currency: "Swedish Krona",
             symbol: "sek"
         },
         {
             sign: "S$",
             currency: "Singapore Dollar",
             symbol: "sgd"
         },
         {
             sign: "Ssh",
             currency: "Somali Shilling",
             symbol: "sos"
         },
         {
             sign: "฿",
             currency: "Thai Baht",
             symbol: "thb"
         },
         {
             sign: "T$",
             currency: "Tongan Paʻanga",
             symbol: "top"
         },
         {
             sign: "TL",
             currency: "Turkish Lira",
             symbol: "try"
         },
         {
             sign: "TT$",
             currency: "Trinidad and Tobago Dollar",
             symbol: "ttd"
         },
         {
             sign: "NT$",
             currency: "New Taiwan Dollar",
             symbol: "twd"
         },
         {
             sign: "TSh",
             currency: "Tanzanian Shilling",
             symbol: "tzs"
         },
         {
             sign: "₴",
             currency: "Ukrainian Hryvnia",
             symbol: "uah"
         },
         {
             sign: "USh",
             currency: "Ugandan Shilling",
             symbol: "ugx"
         },
         {
             sign: "$U",
             currency: "Uruguayan Peso",
             symbol: "uyu"
         },
         {
             sign: "UZS",
             currency: "Uzbekistan Som",
             symbol: "uzs"
         },
         {
             sign: "₫",
             currency: "Vietnamese Dong",
             symbol: "vnd"
         },
         {
             sign: "YR",
             currency: "Yemeni Rial",
             symbol: "yer"
         },
         {
             sign: "R",
             currency: "South African Rand",
             symbol: "zar"
         },
         {
             sign: "ZK",
             currency: "Zambian Kwacha",
             symbol: "zmw"
         }

     ]
 };
