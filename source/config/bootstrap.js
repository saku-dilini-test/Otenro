/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  async.series([
    Template.seed,
    ApplicationInventory.seed,
    Currency.seed,
    AppInitialData.seed,
    Languages.seed,
    PrimaryCategory.seed,
    SecondaryCategory.seed,
    SiteType.seed,
    TimeAndRegion.seed,
    MeasurementStandard.seed,
    ContentRating.seed,
    TemplateCategory.seed,
    TemplateMetaData.seed,
    AccountType.seed,
    Country.seed,
    YourselfReason.seed  

  ], cb);

};
