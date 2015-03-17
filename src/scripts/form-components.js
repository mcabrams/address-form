'use strict';

var defaultValid = function(value) {
  if (typeof value !== 'undefined' && value !== '') {
    return {
      valid: "yes",
      message: ""
    }
  } else {
    return {
      valid: "no",
      message: ""
    }
  }
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
    valid: function(value) {
      if (typeof value !== 'undefined' && value !== '') {
        return {
          valid: "yes",
          message: ""
        }
      } else {
        return {
          valid: "maybe",
          message: ""
        }
      }
    }
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
