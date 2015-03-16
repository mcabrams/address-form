/* global google, _ */
/* jshint devel:true */
( function ($, window, document, undefined ) {
  'use strict';

  var FORM_COMPONENTS = require('./form-components.js');

  $( document ).ready(function () {

    function onDocumentReady() {

      // If jvFloat is available, initialize the fields with it
      if ($.isFunction(jQuery.fn.jvFloat)) {
        $('#address-form').children().jvFloat();
      }

      // If google places API available, set up address autocompletion
      if (typeof google !== 'undefined') {

        var autocompleteInput = document.getElementById('address-line1-input');

        var northAmericaBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(83.162102, -52.233040),
            new google.maps.LatLng(5.499550, -167.276413)
          );

        var options = {
          bounds: northAmericaBounds,
          types: ['geocode']
        };

        var autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options);

        // When the user selects an address from the dropdown,
        // populate the address fields in the form.
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          fillInAddress();
        });

        // Prevent form submission when hitting enter on autocomplete
        $(autocompleteInput).keypress(function(e) {
          if (e.which === 13) {
            return false;
          }
        });

        var fillInAddress = function() {
          // Get the place details from the autocomplete object.
          var place = autocomplete.getPlace();

          _.each(FORM_COMPONENTS, function(fieldValue, fieldName){
            if (fieldName !== 'first-name-input' && fieldName !== 'last-name-input') {
              document.getElementById(fieldName).value = '';
              document.getElementById(fieldName).disabled = false;
            }
          });

          var streetNumber;
          var route;

          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          _.each(place.address_components, function(addressComponent){
            var addressType = addressComponent.types[0];

            var addressInfoLookup = _.where(FORM_COMPONENTS, {googleType: addressType})[0];

            if (addressType === 'street_number') {
              streetNumber = addressComponent.long_name;
              return;
            }

            if (addressType === 'route') {
              route = addressComponent.long_name;
              return;
            }

            if (typeof addressInfoLookup !== 'undefined') {
              var val = addressComponent[addressInfoLookup.googleNameLength];
              document.getElementById(addressInfoLookup.htmlId).value = val;
            }
          });

          $('#address-line1-input').blur();
          if (typeof streetNumber !== 'undefined' && typeof route !== 'undefined') {
            $('#address-line1-input').val(streetNumber + ' ' + route);
          }
          $('#address-line2-input').focus();
        };
      }

    }

    var displayFormData = require('./display-form-data.js');

    onDocumentReady();

    // Form submission handler
    $('#address-form').submit(function() {
      var formData = {};

      // Iterate over inputs and add info to formData object
      $(this).find('input:not([type=submit])').each(function() {
        var $input = $( this );
        formData[$input.attr('id')] = $input.val();
      });

      displayFormData(formData);

      event.preventDefault();
    });
  });
})( jQuery, window, document );
