(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/scripts/main.js":[function(require,module,exports){
/* global  _ */
/* jshint devel:true */
( function ($, window, document, undefined ) {
  'use strict';

  var FORM_COMPONENTS = require('./form-components.js');
  var googlePlacesAutocomplete = require('./google-places-autocomplete.js');
  var assignFormSubmitHandler = require('./handle-form-submit.js');
  var assignLiveValidators = require('./assign-live-validators.js');

  $( document ).ready(function () {

    function onDocumentReady() {
      // If jvFloat is available, initialize the fields with it
      if ($.isFunction(jQuery.fn.jvFloat)) {
        $('#address-form').children().children().jvFloat();
      }

      googlePlacesAutocomplete.setupGoogleMaps();
    }

    onDocumentReady();
    assignFormSubmitHandler('#address-form');
    assignLiveValidators('#address-form');
  });
})( jQuery, window, document );

},{"./assign-live-validators.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/assign-live-validators.js","./form-components.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/form-components.js","./google-places-autocomplete.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/google-places-autocomplete.js","./handle-form-submit.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/handle-form-submit.js"}],"/Users/matthewabrams/git/personal/address-form/src/scripts/assign-live-validators.js":[function(require,module,exports){
'use strict';

var validateInput = require('./validate-input.js');

var inputBlurCallback = function(event) {
  var $input = $( event.target );
  validateInput($input);
};

module.exports = function(formSelector) {
  // Iterate over inputs and add info to formData object
  $(formSelector).find('input:not([type=submit])').each(function() {
    var $input = $( this );

    $input.blur(inputBlurCallback);
  });
};

},{"./validate-input.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/validate-input.js"}],"/Users/matthewabrams/git/personal/address-form/src/scripts/display-form-data.js":[function(require,module,exports){
'use strict';

var FORM_COMPONENTS = require('./form-components.js');

module.exports = function(formData) {
  var displayedUl = $( '<ul/>' );

  _.each(formData, function(fieldValue, fieldName){
    displayedUl.append($('<li>' + FORM_COMPONENTS[fieldName].textToDisplay + ': ' + fieldValue + '</li>'));
  });

  $('#address-summary').append(displayedUl);
};

},{"./form-components.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/form-components.js"}],"/Users/matthewabrams/git/personal/address-form/src/scripts/form-components.js":[function(require,module,exports){
'use strict';
var defaultValid = function(value) {
  if (typeof value !== 'undefined' && value !== '') {
    return true;
  }
  return false;
};

var FORM_COMPONENTS = {
  'address-line1-input': {
    textToDisplay: 'Address Line 1',
    googleType: 'street_number',
    googleNameLength: 'long_name',
    htmlId: 'address-line1-input',
    valid: defaultValid
  },
  'address-line2-input': {
    textToDisplay: 'Address Line 2',
    googleType: 'subpremise',
    googleNameLength: 'long_name',
    htmlId: 'address-line2-input',
    valid: defaultValid
  },
  'city-input': {
    textToDisplay: 'City',
    googleType: 'locality',
    googleNameLength: 'long_name',
    htmlId: 'city-input',
    valid: defaultValid
  },
  'first-name-input': {
    textToDisplay: 'First Name',
    googleType: null,
    googleNameLength: null,
    htmlId: 'first-name-input',
    valid: defaultValid
  },
  'last-name-input': {
    textToDisplay: 'Last Name',
    googleType: null,
    googleNameLength: null,
    htmlId: 'last-name-input',
    valid: defaultValid
  },
  'state-input': {
    textToDisplay: 'State',
    googleType: 'administrative_area_level_1',
    googleNameLength: 'short_name',
    htmlId: 'state-input',
    valid: defaultValid
  },
  'zip-input': {
    textToDisplay: 'Zip',
    googleType: 'postal_code',
    googleNameLength: 'short_name',
    htmlId: 'zip-input',
    valid: defaultValid
  }
};

module.exports = FORM_COMPONENTS;

},{}],"/Users/matthewabrams/git/personal/address-form/src/scripts/google-places-autocomplete.js":[function(require,module,exports){
/* global google, _ */
'use strict';

var FORM_COMPONENTS = require('./form-components.js');
var validateInput = require('./validate-input.js');

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
      validateInput($input);
    }
  });

  var $addressLine1Input = $('#address-line1-input');

  $addressLine1Input.blur();
  if (typeof streetNumber !== 'undefined' && typeof route !== 'undefined') {
    $addressLine1Input.val(streetNumber + ' ' + route);
  }
  validateInput($addressLine1Input);
  $('#address-line2-input').focus();
};

var setupGoogleMaps = function() {
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

},{"./form-components.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/form-components.js","./validate-input.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/validate-input.js"}],"/Users/matthewabrams/git/personal/address-form/src/scripts/handle-form-submit.js":[function(require,module,exports){
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

    // validateFormData(formData);

    displayFormData(formData);

    event.preventDefault();
  });
};

},{"./display-form-data.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/display-form-data.js"}],"/Users/matthewabrams/git/personal/address-form/src/scripts/validate-input.js":[function(require,module,exports){
var FORM_COMPONENTS = require('./form-components.js');

module.exports = function($input) {
  var formComponent = _.where(FORM_COMPONENTS, {htmlId: $input.attr('id')})[0];
  var validateMethod = formComponent.valid;
  var valid = validateMethod($input.val());

  if (valid) {
    $input.parent().addClass('has-success');
    $input.parent().removeClass('has-error');
  } else {
    $input.parent().addClass('has-error');
    $input.parent().removeClass('has-success');
  }
};

},{"./form-components.js":"/Users/matthewabrams/git/personal/address-form/src/scripts/form-components.js"}]},{},["./src/scripts/main.js"]);

//# sourceMappingURL=bundle.js.map