'use strict';

var validateFormData = require('./validate-form-data.js');

module.exports = function(form) {

  var handleSubmit = function() {
    var formData = {};

    // Iterate over inputs and add info to formData object
    $(this).find('input:not([type=submit])').each(function() {
      var $input = $( this );
      formData[$input.attr('id')] = $input.val();
    });

    validateFormData(form, formData);

    event.preventDefault();
  }

  $(form).on("submit", handleSubmit);
};
