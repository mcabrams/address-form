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
