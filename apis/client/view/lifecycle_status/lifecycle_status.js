import { Apis } from '/apis/collection/';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import $ from 'jquery';

Template.apiLifecycleStatus.onCreated(function () {
  // Get reference to template instance
  const templateInstance = Template.instance();

  // Track edit mode with reactive variable (initially false)
  templateInstance.editMode = new ReactiveVar(false);
});

Template.apiLifecycleStatus.helpers({
  apisCollection () {
    // Return a reference to Apis collection
    return Apis;
  },
  editMode () {
    // Get reference to template instahce
    const templateInstance = Template.instance();

    // Return value of edit mode reactive variable
    return templateInstance.editMode.get();
  },
  labelType () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Placeholder for label type
    let labelType;

    // Get API lifecycle status from template instance
    const lifecycleStatus = templateInstance.data.api.lifecycleStatus;

    // Get label type based on lifecycle status
    switch (lifecycleStatus) {
      case 'development':
        labelType = 'primary';
        break;
      case 'production':
        labelType = 'success';
        break;
      case 'design':
        labelType = 'info';
        break;
      case 'testing':
        labelType = 'warning';
        break;
      case 'deprecated':
        labelType = 'danger';
        break;
      default:
        labelType = 'default';
    }
    return labelType;
  },
  lifecycleStatus () {
    // Get reference to template instahce
    const templateInstance = Template.instance();

    let statusText;

    if (templateInstance.data.api && templateInstance.data.api.lifecycleStatus) {
      // Get lifecycle status from API document
      status = templateInstance.data.api.lifecycleStatus;

      // Get status text translation
      statusText = TAPi18n.__(`apiLifecycleStatus_labelText_${status}`);
    } else {
      // Get translation text for Unknown lifecycle status
      const unknown = TAPi18n.__('apiLifecycleStatus_labelText_unknown');

      statusText = unknown;
    }

    return statusText;
  },
  lifecycleStatusField () {
    return ['lifecycleStatus'];
  },
});

Template.apiLifecycleStatus.events({
  'click #edit-api-lifecycle-status': function (event, templateInstance) {
    // Enable edit mode
    templateInstance.editMode.set(true);
  },
  'click button[type="submit"]': function (event, templateInstance) {
    // Disable edit mode
    templateInstance.editMode.set(false);
  },
});
