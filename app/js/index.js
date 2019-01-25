(function() {
  'use strict';

  let userInfo = {};

  function CustomValidation(input, infoObj) {
    this.invalidities = [];
    this.arrOfRuls = [];
    this.infoObj = infoObj;
    this.inputNode = input;

    this.registerListener();
  }

  CustomValidation.prototype = {
    addInvalidity: function(message) {
      this.invalidities.push(message);
    },
    getInvalidities: function() {
      return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
      this.arrOfRuls.forEach(item => {
        if (item.isInvalid(input)) {
          input.classList.add('js-invalid-input');
          input.classList.remove('js-valid-input');
          item.element.classList.add('js-invalid');
          item.element.classList.remove('js-valid');
          this.addInvalidity(item.invalidityMessage);
        } else {
          input.classList.remove('js-invalid-input');
          input.classList.add('js-valid-input');
          item.element.classList.add('js-valid');
          item.element.classList.remove('js-invalid');
        }
      });
    },
    checkInput: function() {
      this.inputNode.CustomValidation.invalidities = [];
      this.checkValidity(this.inputNode);

      if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
        this.inputNode.setCustomValidity('');
        this.addInfoAboutUser(this.inputNode);
      } else {
        let message = this.inputNode.CustomValidation.getInvalidities();
        this.inputNode.setCustomValidity(message);
      }
    },
    addInfoAboutUser: function(input) {
      let key = input.id;
      this.infoObj[key] = input.value;
    },
    registerListener: function() {
      let CustomValidation = this;

      this.inputNode.addEventListener('input', function() {
        CustomValidation.checkInput();
      });
    }
  };

  const customerNameValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-name-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return (input.value.length >= 0 && input.value.length < 3);
      },
      invalidityMessage: 'This field must contains at least 3 characters',
      element: document.querySelector('.js-custom-name-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must only contains letters (no digits or special characters)',
      element: document.querySelector('.js-custom-name-req li:nth-child(3)')
    }
  ];

  const emailValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-email-req li:first-child')
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contains only one \'@\'',
      element: document.querySelector('.js-custom-email-req li:nth-child(2)')
    }
  ];

  const phoneValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-phone-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return input.value[0] != '+';
      },
      invalidityMessage: 'The firs character must be \'+\'',
      element: document.querySelector('.js-custom-phone-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /^\+[0-9]+$/;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'This field must contain only digints',
      element: document.querySelector('.js-custom-phone-req li:nth-child(3)')
    },
    {
      isInvalid: function(input) {
        return input.value.length < 9;
      },
      invalidityMessage: 'Minlenght is 9 characters',
      element: document.querySelector('.js-custom-phone-req li:nth-child(4)')
    }
  ];

  const addressValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-address-req li:first-child') 
    }
  ];

  const cityValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-city-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-z ,.'-]+$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain only letters (no digits or special characters)',
      element: document.querySelector('.js-custom-city-req li:nth-child(2)')
    }
  ];

  const stateValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-state-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-z ,.'-]+$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain only letters (no digits or special characters)',
      element: document.querySelector('.js-custom-state-req li:nth-child(2)')
    }
  ];

  const zipValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-zip-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /([^\d\s\w])+/;
        return regexp.test(input.value);
      },
      invalidityMessage: 'Must contain only letters and/or digits (no special characters)',
      element: document.querySelector('.js-custom-zip-req li:nth-child(2)')
    }
  ];

  const countryValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-country-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-z ,.'-]+$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain only letters (no digits or special characters)',
      element: document.querySelector('.js-custom-country-req li:nth-child(2)')
    }
  ];

  const nameOfCurdValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-name-card-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return (input.value.length > 0 && input.value.length < 3);
      },
      invalidityMessage: 'This field must contains at least 3 characters',
      element: document.querySelector('.js-name-card-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must only contains letters (no digits or special characters)',
      element: document.querySelector('.js-name-card-req li:nth-child(3)')
    }
  ];

  const curdNumberValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-cc-number-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return input.value.length != 16;
      },
      invalidityMessage: 'Must contains 16 digits',
      element: document.querySelector('.js-cc-number-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /[^0-9]+/;
        return regexp.test(input.value);
      },
      invalidityMessage: 'Must only contain digits (no letters or special characters)',
      element: document.querySelector('.js-cc-number-req li:nth-child(3)')
    }
  ];

  const cvcValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-cvc-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return (input.value.length !== 3 && input.value.length !== 4);
      },
      invalidityMessage: 'Must conatin 3 or 4 digits',
      element: document.querySelector('.js-cvc-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /[^0-9]+/;
        return regexp.test(input.value);
      },
      invalidityMessage: 'Must only contain digits (no letters or special characters)',
      element: document.querySelector('.js-cvc-req li:nth-child(3)')
    }
  ];

  const expiryValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-card-expiry-req li:first-child')
    },
    {
      isInvalid: function(input) {
        return input.value.length != 7
      },
      invalidityMessage: 'Must contain only 7 characters (including '-')',
      element: document.querySelector('.js-card-expiry-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /[^-0-9]+/;
        return regexp.test(input.value);
      },
      invalidityMessage: 'Must only contain digits (no letters or special characters)',
      element: document.querySelector('.js-card-expiry-req li:nth-child(3)')
    }
  ];

  const form = document.querySelector('.js-form');

  const customerNameInput = document.querySelector('.js-customer-name');
  customerNameInput.CustomValidation = new CustomValidation(customerNameInput, userInfo);
  customerNameInput.CustomValidation.arrOfRuls = customerNameValidityChecks;

  const customerEmail = document.querySelector('.js-customer-email');
  customerEmail.CustomValidation = new CustomValidation(customerEmail, userInfo);
  customerEmail.CustomValidation.arrOfRuls = emailValidityChecks;

  const customerPhone = document.querySelector('.js-customer-tel');
  customerPhone.CustomValidation = new CustomValidation(customerPhone, userInfo);
  customerPhone.CustomValidation.arrOfRuls = phoneValidityChecks;

  const customerAddress = document.querySelector('.js-customer-address');
  customerAddress.CustomValidation = new CustomValidation(customerAddress, userInfo);
  customerAddress.CustomValidation.arrOfRuls = addressValidityChecks;

  const customerCity = document.querySelector('.js-customer-city');
  customerCity.CustomValidation = new CustomValidation(customerCity, userInfo);
  customerCity.CustomValidation.arrOfRuls = cityValidityChecks;

  const customerState = document.querySelector('.js-customer-state');
  customerState.CustomValidation = new CustomValidation(customerState, userInfo);
  customerState.CustomValidation.arrOfRuls = stateValidityChecks;

  const customerZip = document.querySelector('.js-customer-zip');
  customerZip.CustomValidation = new CustomValidation(customerZip, userInfo);
  customerZip.CustomValidation.arrOfRuls = zipValidityChecks;

  const customerCountry = document.querySelector('.js-customer-country');
  customerCountry.CustomValidation = new CustomValidation(customerCountry, userInfo);
  customerCountry.CustomValidation.arrOfRuls = countryValidityChecks;

  const customerCardName = document.querySelector('.js-cardholder-name');
  customerCardName.CustomValidation = new CustomValidation(customerCardName, userInfo);
  customerCardName.CustomValidation.arrOfRuls = nameOfCurdValidityChecks;

  const customerCardNumber = document.querySelector('.js-card-number');
  customerCardNumber.CustomValidation = new CustomValidation(customerCardNumber, userInfo);
  customerCardNumber.CustomValidation.arrOfRuls = curdNumberValidityChecks;

  const cusotmerCvc = document.querySelector('.js-card-cvc');
  cusotmerCvc.CustomValidation = new CustomValidation(cusotmerCvc, userInfo);
  cusotmerCvc.CustomValidation.arrOfRuls = cvcValidityChecks;

  const customerCardExpiry = document.querySelector('.js-card-expiry');
  customerCardExpiry.CustomValidation = new CustomValidation(customerCardExpiry, userInfo);
  customerCardExpiry.CustomValidation.arrOfRuls = expiryValidityChecks;

  const allInputs = document.querySelectorAll('.js-inputs');

  const cancelBtn = document.querySelector('.js-cancel-btn');
  const submitBtn = document.querySelector('.js-submit-btn');

  submitBtn.addEventListener('click', function() {
    getInfoAboutUser(userInfo);
  });

  form.addEventListener('submit', function() {
    validate(allInputs);
  });

  cancelBtn.addEventListener('click', function() {
    resetForm(form);
  });

  function resetForm(someForm) {
    someForm.reset();
  }

  function validate(arrOfInputs) {
    [].forEach.call(arrOfInputs, item => {
      item.CustomValidation.checkInput();
    });
  }



  function getInfoAboutUser(infoObj) {
    console.dir(infoObj);
  }

}());