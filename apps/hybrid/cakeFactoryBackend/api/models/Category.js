/**
 *
 * @type {{attributes: {id: string, name: string, logo: string}, seedData: *[]}}
 */

module.exports = {
  attributes: {
    name: 'string',
    logoUrl: 'string',
    categoryCode:'string',
    products:{
      collection: 'Product',
      via: 'category'
    }
  },

  seedData: [
    {
      name: 'LAYER CAKES',
      categoryCode:'LAYER CAKES',
      logoUrl: 'images/products/266327082.jpg'

    },
    {
      name: 'LOAF CAKES',
      categoryCode:'LOAF CAKES',
      logoUrl: 'images/products/266321990.jpg'

    },
    {
      name: 'GATEAUX',
      categoryCode:'GATEAUX',
      logoUrl: 'images/products/266321868.jpg'

    },
    {
      name: 'CHEESECAKES',
      categoryCode:'CHEESECAKES',
      logoUrl: 'images/products/266321862.jpg'
    },
    {
      name: 'LOGS',
      categoryCode:'LOGS',
      logoUrl: 'images/products/266327054.jpg'
    },
    {
      name: 'TARTS',
      categoryCode:'TARTS',
      logoUrl: 'images/products/266321956.jpg'
    },
    {
      name: 'SWEET PIES',
      categoryCode:'SWEET PIES',
      logoUrl: 'images/products/266321998.jpg'
    },
    {
      name: 'GLASS DESSERTS',
      categoryCode:'GLASS DESSERTS',
      logoUrl: 'images/products/266321920.jpg'
    },
    {
      name: 'OTHER SWEETS',
      categoryCode:'OTHER SWEETS',
      logoUrl: 'images/products/266327010.jpg'
    }
  ]
};
