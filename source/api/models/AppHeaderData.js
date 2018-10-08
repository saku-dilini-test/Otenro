
module.exports = {

    attributes: {

        appId: { type: 'string' },
        maxCategoryCharacterLength : { type: 'integer'},
        usedCategoryCharacterLength: { type: 'integer' },
        isPoliciesChecked : { type: 'boolean', defaultsTo : false },
        isContactUsChecked : { type: 'boolean', defaultsTo : false },
        isAboutUsChecked : { type: 'boolean', defaultsTo : false },
    }
}