'use strict';

$(document).ready(function () {
  var contentSection = $('.main__greeting');
  var mobileOpenFormButton = $('.main__open-form-button');
  var nextPartButton = $('.form-section__next-button');
  var previousPartButton = $('.form-section__previous-button');
  var previousButtonWrapper = $('.form-section__previous-button-wrapper');
  var submitButton = $('.form-section__registration-button');
  var registrationForm = $('.form-section__form');
  var firstFormPart = $('.form-section__contact-data');
  var secondFormPart = $('.form-section__user-data');
  var rangeSlider = $('.slider__input');
  var mobileNavigationWrapper = $('.main__mobile-navigation');
  var formFields = $('.form-section__form input');
  var phoneField = $('.form-section__phone-field');
  var checkSign = $('.form-section__phone-checked');

  rangeSlider.val(1);
  phoneField.mask('+7 (999) 999-99-99');
  registrationForm[0].reset();
  submitButton.attr('disabled', true);
  nextPartButton.attr('disabled', true);

  var formSelector = function (selector) {
    switch (selector) {
      case (1):
        mobileOpenFormButton.show();
        nextPartButton.show();
        previousPartButton.hide();
        break;
      case (2):
        firstFormPart.show();
        secondFormPart.hide();
        mobileOpenFormButton.hide();
        previousPartButton.hide();
        nextPartButton.show();
        submitButton.hide();
        break;
      case (3):
        firstFormPart.hide();
        secondFormPart.show();
        mobileOpenFormButton.hide();
        nextPartButton.hide();
        previousPartButton.show();
        submitButton.show();
        break;
    }
  };

  var checkFields = function () {
    for (var i = 0; i < formFields.length; i = i + 1) {
      if (!formFields[i].checkValidity()) {
        return false;
      }
    }
    return true;
  };

  rangeSlider.on('change', function () {
    var sliderValue = parseInt(this.value, 10);
    switch (sliderValue) {
      case (1):
        formSelector(1);
        contentSection.show();
        registrationForm.hide();
        mobileNavigationWrapper.width('81%');
        break;
      case (2):
        formSelector(2);
        contentSection.hide();
        registrationForm.show();
        mobileNavigationWrapper.width(60);
        break;
      case (3):
        if (phoneField[0].checkValidity()) {
          formSelector(3);
          contentSection.hide();
          registrationForm.show();
          mobileNavigationWrapper.width(60);
          break;
        } else {
          rangeSlider.val(2);
          break;
        }
    }
  });

  mobileOpenFormButton.on('click', function () {
    formSelector(2);
    contentSection.hide();
    registrationForm.show();
    firstFormPart.show();
    mobileNavigationWrapper.width(60);
    previousButtonWrapper.hide();
    rangeSlider.val(2);
  });

  nextPartButton.on('click', function () {
    formSelector(3);
    rangeSlider.val(3);
  });

  previousPartButton.on('click', function () {
    formSelector(2);
  });

  phoneField.on('change', function () {
    if (phoneField[0].checkValidity()) {
      nextPartButton.attr('disabled', false);
      checkSign.show();
    } else {
      nextPartButton.attr('disabled', true);
      checkSign.hide();
    }
  });

  phoneField.on('focus', function () {
    checkSign.hide();
  });

  phoneField.on('blur', function () {
    if (phoneField[0].checkValidity()) {
      checkSign.show();
    } else {
      checkSign.hide();
    }
  });

  $('.form-section__form').on('change', 'input', function () {
    if (checkFields()) {
      submitButton.attr('disabled', false);
    } else {
      submitButton.attr('disabled', true);
    }
  });
});
