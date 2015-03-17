var FORM_COMPONENTS = require('./form-components.js');

module.exports = function($input) {
  var formComponent = _.where(FORM_COMPONENTS, {htmlId: $input.attr('id')})[0];
  var validateMethod = formComponent.valid;
  var valid = validateMethod($input.val()).valid;

  if (valid === "no") {
    $input.parent().addClass('has-error');
    $input.parent().removeClass('has-success');
    $input.parent().removeClass('has-warning');
    return false;
  } else if (valid === "maybe") {
    $input.parent().addClass('has-warning');
    $input.parent().removeClass('has-success');
    $input.parent().removeClass('has-error');
    return true;
  } else {
    $input.parent().addClass('has-success');
    $input.parent().removeClass('has-error');
    $input.parent().removeClass('has-warning');
    return true;
  }
};
