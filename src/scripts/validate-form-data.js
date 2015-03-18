'use strict';
var validateInput = require('./validate-input.js');
var displayFormData = require('./display-form-data.js');

var showErrorAlert = function(message) {
  $('#address-form-submit-status').removeClass('hide');
  $('#address-form-submit-status').addClass('bg-danger');
  $('#address-form-submit-status').text(message);
}

var showSuccessAlert = function(message) {
  $('#address-form-submit-status').removeClass('hide');
  $('#address-form-submit-status').removeClass('bg-danger');
  $('#address-form-submit-status').addClass('bg-success');
  $('#address-form-submit-status').text(message);
}

var handleDoubleSubmit = function() {
  event.preventDefault();
};

module.exports = function(form, formData) {
  var okToVerify = true;

  _.each(formData, function(fieldValue, fieldName){
    if (validateInput($('#' + fieldName)) === false) {
      okToVerify = false;
    }
  });

  if (!okToVerify) {
    $('#address-form-submit-status').removeClass('hide');
    $('#address-form-submit-status').text('Looks like you left some required fields empty :-O');
  } else {
    $('#address-form-submit-status').addClass('hide');
  }

  if (okToVerify) {
    $.ajax({
      url: "https://api.smartystreets.com/street-address",
      dataType: "JSONP",
      data: {
        "auth-token": "372514068640637840",
        "city": formData["city-input"],
        "state": formData["state-input"],
        "street": formData["address-line1-input"],
        "street2": formData["address-line2-input"],
        "zipcode": formData["zip-input"],
        "candidates": 1
      },
      success: function (data, status, xhr) {
        var data = data[0];
        if (data && data.analysis) {
          switch (data.analysis.dpv_match_code) {
            case "Y":
              showSuccessAlert('Looks great! Expect your shipment soon.');
              $('#address-form-submit').attr('disabled', 'true');
              $(form).off();
              $(form).on("submit", handleDoubleSubmit);
              displayFormData(formData);
              break;
            case "D":
              showErrorAlert('We recognize the address, but need a unit number or additional info to ship here. Your order has not been submitted.');
              break;
            case "S":
              showErrorAlert('We recognize the address, but are you sure you need the Address Line 2 info?');
              break;
            default:
              showErrorAlert('Hmm, something didn\'t go quite right, can you try correcting that address?');
              break;
          }
        } else {
          showErrorAlert('Hmm, something didn\'t go quite right, can you try correcting that address?')
        }
      },
      error: function() {
        $('#address-form-submit-status').removeClass('hide');
        $('#address-form-submit-status').text('We encountered an error. Please try again soon, sorry!');
      }
    });
  }
};
