/* jshint devel:true */
( function ($, window, document, undefined ) {
  'use strict';

  $( document ).ready(function () {

    var FORM_COMPONENTS = {
      'address-line1-input': {
        textToDisplay: 'Address Line 1',
        googleType: 'street_number',
        googleNameLength: 'long_name',
        htmlId: 'address-line1-input'
      },
      'address-line2-input': {
        textToDisplay: 'Address Line 2',
        googleType: 'subpremise',
        googleNameLength: 'long_name',
        htmlId: 'address-line2-input'
      },
      'city-input': {
        textToDisplay: 'City',
        googleType: 'locality',
        googleNameLength: 'long_name',
        htmlId: 'city-input'
      },
      'first-name-input': {
        textToDisplay: 'First Name',
        googleType: null,
        googleNameLength: null,
        htmlId: 'first-name-input'
      },
      'last-name-input': {
        textToDisplay: 'Last Name',
        googleType: null,
        googleNameLength: null,
        htmlId: 'last-name-input'
      },
      'state-input': {
        textToDisplay: 'State',
        googleType: 'administrative_area_level_1',
        googleNameLength: 'short_name',
        htmlId: 'state-input'
      },
      'zip-input': {
        textToDisplay: 'Zip',
        googleType: 'postal_code',
        googleNameLength: 'short_name',
        htmlId: 'zip-input'
      }
    };

    onDocumentReady();

    // Form submission handler
    $('#address-form').submit(function() {
      var formData = {};

      // Iterate over inputs and add info to formData object
      $( this ).find('input:not([type=submit])').each(function() {
        var $input = $( this );
        formData[$input.attr('id')] = $input.val();
      });

      displayFormData(formData);

      event.preventDefault();
    });

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

        function fillInAddress() {
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

          document.getElementById('address-line1-input').value = streetNumber + ' ' + route;
        }
      }

    }

    function displayFormData(formData) {
      var displayedUl = $( '<ul/>' );

      _.each(formData, function(fieldValue, fieldName){
        displayedUl.append($('<li>' + FORM_COMPONENTS[fieldName].textToDisplay + ': ' + fieldValue + '</li>'));
      });

      $('#address-summary').append(displayedUl);
    }
  });

})( jQuery, window, document );
