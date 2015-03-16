'use strict';

// var validateFormData = require('./validate-form-data.js');
var displayFormData = require('./display-form-data.js');

module.exports = function($form) {
  $($form).submit(function() {
    var formData = {};

    // Iterate over inputs and add info to formData object
    $(this).find('input:not([type=submit])').each(function() {
      var $input = $( this );
      formData[$input.attr('id')] = $input.val();
    });

    validateFormData(formData);

    displayFormData(formData);

    event.preventDefault();
  });
};
