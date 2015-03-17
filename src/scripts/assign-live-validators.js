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
