/* jshint devel:true */
( function ($, window, document, undefined ) {
  'use strict';

  $( document ).ready(function () {

    var INPUT_NAME_LOOKUP = {
      'addressLine1': 'Address Line 1',
      'addressLine2': 'Address Line 2',
      'city': 'City',
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'state': 'State',
      'zip': 'Zip'
    };

    // Form submit handler
    $('#address-form').submit(function() {
      var formData = {};

      // Iterate over inputs and add info to formData object
      $( this ).children().filter('input:not([type=submit])').each(function() {
        var $input = $( this );
        formData[$input.prop('name')] = $input.val();
        console.log(INPUT_NAME_LOOKUP[$( this ).prop('name')] + ': ' + $( this ).val());
      });

      displayFormData(formData);

      event.preventDefault();
    });

    function displayFormData(formData) {
      var displayedUl = $( '<ul/>' );

      _.each(formData, function(fieldValue ,fieldName){
        displayedUl.append($('<li>' + INPUT_NAME_LOOKUP[fieldName] + ': ' + fieldValue + '</li>'));
      });

      $('#address-summary').append(displayedUl);
    }
  });

})( jQuery, window, document );
