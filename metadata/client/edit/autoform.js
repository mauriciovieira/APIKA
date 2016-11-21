import { AutoForm } from 'meteor/aldeed:autoform';
import { Router } from 'meteor/iron:router';

import $ from 'jquery';

AutoForm.addHooks('editApiMetadataForm', {
  before: {
    insert (metadata) {
      // Get reference to Router
      const router = Router.current();

      // Get API Backend ID, from Router
      const apiId = router.params._id;

      // Set the API Backend ID property of the metadata document
      metadata.apiBackendId = apiId;

      return metadata;
    },
  },
  onSuccess () {
    // Close modal dialogue
    $('#apiMetadataModal').modal('hide');
  },
});
