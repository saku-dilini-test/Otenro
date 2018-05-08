module.exports = {


  schema: true,

  attributes: {

    name:  {
      type: 'string'
    },
    email:  {
      type: 'string',
      required: true,
      unique: true
    },
    contactNo:  {
      type: 'string'
    }
  }
}