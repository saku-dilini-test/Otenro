// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('categoryCtrl', function() {
//  it('has a dummy spec to test 2 + 2', function() {
//    // An intentionally failing test. No code within expect() will never equal 4.
//    expect(4).toEqual(4);
//  });

    var $controller, categoryCtrl;



      // Inject the $controller service to create instances of the controller (UsersController) we want to test
      beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
        categoryCtrl = $controller('categoryCtrl', {});
      }));

      // Verify our controller exists
      it('should be defined', function() {
        expect(categoryCtrl).toBeDefined();
      });
});