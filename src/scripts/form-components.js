'use strict';

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

module.exports = FORM_COMPONENTS;
