/**
 * Created by amila on 12/17/15.
 */

module.exports = {
  attributes: {
    locationName: 'string',
    branch:  'boolean',
    deliveryCharge : 'integer'
  },
  seedData: [
    {
      locationName: 'Colombo 5,7,8',
      branch: false,
      deliveryCharge : 150
    },
    {
      locationName: 'Colombo 3,4,6',
      branch: false,
      deliveryCharge : 200
    },
    {
      locationName: 'Colombo 2',
      branch: false,
      deliveryCharge : 250
    },
    {
      locationName: 'Nugegoda',
      branch: false,
      deliveryCharge : 250
    },
    {
      locationName: 'Nawala',
      branch: false,
      deliveryCharge : 250
    },
    {
      locationName: 'Rajagiriya',
      branch: false,
      deliveryCharge : 250
    },
    {
      locationName: 'Kotte',
      branch: false,
      deliveryCharge : 300
    },
    {
      locationName: 'Colombo 1, 9, 15, 6',
      branch: false,
      deliveryCharge : 400
    },
    {
      locationName: 'Bataramulla',
      branch: false,
      deliveryCharge : 400
    },
    {
      locationName: 'Palawatta',
      branch: false,
      deliveryCharge : 400
    },
    {
      locationName: 'Mt Lavania',
      branch: false,
      deliveryCharge : 400
    },
    {
      locationName: 'Jawatta',
      branch: true,
    },
    {
      locationName: 'Palawatta',
      branch: true,
    }
  ]
};
