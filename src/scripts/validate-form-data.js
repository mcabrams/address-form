'use strict';
var validateInput = require('./validate-input.js');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

module.exports = function(formData) {
  var okToVerify = true,
      verified = false;

  _.each(formData, function(fieldValue, fieldName){
    if (validateInput($('#' + fieldName)) === false) {
      okToVerify = false;
    }
  });

  if (!okToVerify) {
    console.log(okToVerify);
    $('#address-form-submit-status').removeClass('hide');
    $('#address-form-submit-status').text('Looks like you left some required fields empty :-O');
  }

  if (okToVerify) {
    Lob.verification.verify({ // Inline address only
      address_line1: formData["address-line1-input"],
      address_line2: formData["address-line2-input"],
      address_city: formData["city-input"],
      address_state: formData["state-input"],
      address_zip: formData["zip-input"]
    }, function (err, res) {
      if (err) {
        $('#address-form-submit-status').removeClass('hide');
        $('#address-form-submit-status').text('This address doesn\'t look quite right to us, can you fix it?');
        verified = false;
      }
      if (res.address) {
        $('#address-form-submit-status').removeClass('hide');
        $('#address-form-submit-status').removeClass('bg-danger');
        $('#address-form-submit-status').addClass('bg-success');
        $('#address-form-submit-status').text('Looks great! Expect your shipment soon.');
        verified = true;
      }
    });
  }

  return verified;
};
