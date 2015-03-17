var FORM_COMPONENTS = require('./form-components.js');

module.exports = function($input) {
  $input.siblings('label').addClass('active');
};
