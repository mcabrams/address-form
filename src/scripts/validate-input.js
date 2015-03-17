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
