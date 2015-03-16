'use strict';

var FORM_COMPONENTS = require('./form-components.js');

module.exports = function(formData) {
  var displayedUl = $( '<ul/>' );

  _.each(formData, function(fieldValue, fieldName){
    displayedUl.append($('<li>' + FORM_COMPONENTS[fieldName].textToDisplay + ': ' + fieldValue + '</li>'));
  });

  $('#address-summary').append(displayedUl);
};
