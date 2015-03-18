/* global google, _ */
'use strict';

var FORM_COMPONENTS = require('./form-components.js');
var validateInput = require('./validate-input.js');
var activateInput = require('./activate-input.js');

var fillInAddress = function(autocomplete) {
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
      var $input = $('#' + addressInfoLookup.htmlId);
      $input.val(val);

      // TODO: Add check to make sure input changed before activating
      activateInput($input);
      validateInput($input);
    }
  });

  var $addressLine1Input = $('#address-line1-input');

  $addressLine1Input.blur();
  if (typeof streetNumber !== 'undefined' && typeof route !== 'undefined') {
    $addressLine1Input.val(streetNumber + ' ' + route);
    activateInput($addressLine1Input);
  }
  validateInput($addressLine1Input);
  $('#address-line2-input').focus();
};

var setupGoogleMaps = function() {
  var autocompleteInput = document.getElementById('address-line1-input');

  var options = {
    componentRestrictions: {country: "us"},
    types: ['geocode']
  };

  var autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options);

  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInAddress(autocomplete);
  });

  // Prevent form submission when hitting enter on autocomplete
  $(autocompleteInput).keypress(function(e) {
    if (e.which === 13) {
      return false;
    }
  });
};

module.exports = {
  setupGoogleMaps: setupGoogleMaps,
  fillInAddress: fillInAddress
};
