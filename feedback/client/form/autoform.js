import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import $ from 'jquery';

AutoForm.hooks({
  feedbackForm: {
    before: {
      insert (feedback) {
        feedback.apiBackendId = FlowRouter.current().params._id;

        return feedback;
      },
    },
    onSuccess () {
      // Get success message translation
      const message = TAPi18n.__('feedbackForm_successMessage');

      // Alert user of success
      sAlert.success(message);

      Modal.hide('feedbackForm');
    },
  },
});
