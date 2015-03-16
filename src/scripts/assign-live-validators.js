'use strict';

var FORM_COMPONENTS = require('./form-components.js');

module.exports = function(formSelector) {
  // Iterate over inputs and add info to formData object
  $(formSelector).find('input:not([type=submit])').each(function() {
    var $input = $( this );
    var formComponent = _.where(FORM_COMPONENTS, {htmlId: $input.attr('id')})[0];

    $input.blur(function(event) {
      console.log( formComponent.valid(event.target.value) );
    });
  });
};
