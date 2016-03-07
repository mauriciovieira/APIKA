Template.manageApiBackends.created = function () {
  this.subscribe('myManagedApis');
};

Template.manageApiBackends.rendered = function () {
  var myManagedApis = ApiBackends.find().fetch();

  //console.log(myManagedApis);
};

Template.manageApiBackends.helpers({
  'managedApis': function () {
    // Get the current user
    var userId = Meteor.user()._id;

    // Get API Backends managed by user (provided by subscription)
    var managedApis = ApiBackends.find({managerIds: userId});

    return managedApis;
  }
});

Template.manageApiBackends.events({
  "click #deleteModal": function() {
    var apiBackendId = this._id;
    Modal.show('deleteApiBackendConfirmation', function() {
        return ApiBackends.findOne(apiBackendId);
    });
  }
});
