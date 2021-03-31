const userName = document.querySelector('#name');
const selectJobTitle = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
const colorSelect = document.querySelector('#color');
const designSelect = document.querySelector('#design');
const regForActivities = document.querySelector('#activities');
let totalCost = document.querySelector('#activities-cost');
let calculatedTotalCost = 0;
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const emailAddress = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const formElement = document.getElementsByTagName('form')[0];
const activitiesBox = document.querySelector('#activities-box');
const activitiesSectionChecks = activitiesBox.querySelectorAll("input"); 



//Sets the default payment method as Credit Card

const defaultPaymentMethod = paymentMethod.children[1].setAttribute("selected", "selected");

//Hides the "other" job description text field by default

otherJobRole.style.display = 'none';

//Hides the paypal and bitcoin payment descriptions by default

paypal.style.display = 'none';

bitcoin.style.display = 'none';

// focus on username by default

userName.focus();

/*Listens for "other" to be selected from the drop down menu and if
it is then displays the "other job role?" text area */

selectJobTitle.addEventListener('change', (event) => {

	if (event.target.value === "other") {
		otherJobRole.style.display = 'block';
	} else {
		otherJobRole.style.display = 'none';
	}

});

//Disables the color select drop down menu by default

colorSelect.disabled = true;

/*Listens for which shirt design is choosen and changes
which color options are available for that design*/

designSelect.addEventListener('change', (event) => {
	colorSelect.disabled = false;
	for (let i = 0; i < colorSelect.children.length; i++) {
		let shirtDesign = event.target.value;
		let currentColorOption = colorSelect.children[i];
		let shirtTheme = currentColorOption.getAttribute("data-theme");

		if ( shirtDesign == shirtTheme ) {
			currentColorOption.hidden = false;
			currentColorOption.selected = true;
		} else {
			currentColorOption.hidden = true;
			currentColorOption.selected = false;
		}
	}
});

/*Listens for which activites are choosen and adds or subtracts the
total and displays it in real time.*/

regForActivities.addEventListener('change', (event) => {
	let clickedActCost = event.target.getAttribute("data-cost");
	let actCostNumber = parseInt(clickedActCost);
	if (event.target.checked) {
		calculatedTotalCost += actCostNumber;
	} else {
		calculatedTotalCost -= actCostNumber;
	}
	totalCost.innerHTML = `Total: $${calculatedTotalCost} `;

});

/*Listens for which payment method is selected and changes
which displays accordingly.*/

paymentMethod.addEventListener('change', (event) => {
	let selectedPaymentMethod = event.target.value;

	if (selectedPaymentMethod == "paypal" ) {
		paypal.style.display = 'block';
		creditCard.style.display = 'none';
		bitcoin.style.display = 'none';

	} else if (selectedPaymentMethod == "bitcoin") {
		bitcoin.style.display = 'block';
		paypal.style.display = 'none';
		creditCard.style.display = 'none';

	} else {
		creditCard.style.display = 'block';
		paypal.style.display = 'none';
		bitcoin.style.display = 'none';
	}
});


formElement.addEventListener('submit', (event) => {

	/*Listens for the form to submit and checks if the 
	name field is filled in or not. If the field is empty it won't submit.*/
	validateName();

	/*Listens for the form to submit and checks if the 
	email field is a vaild email format. If not, it won't submit.*/
	validateEmail();

	/*Listens for the form to submit and checks to make sure
	at least 1 activity has been selected. If not the form won't submit.*/
	validateActivities();

	/*Listens for the form to submit and checks to make sure
	that the cc number is between 13-16 numbers. If not the form won't submit.*/
	validateCreditCardNumber();

	/*Listens for the form to submit and checks to make sure
	that the zip code is 5 numbers. If not the form won't submit.*/
	validateCreditCardZip();

	/*Listens for the form to submit and checks to make sure
	that the cvv is 3 numbers. If not the form won't submit.*/
	validateCVV();
});

/* The following 'keyup' eventListeners listen for a keyup and 
provide form validation error indications at the moment they occur*/

userName.addEventListener('keyup', (event) => {
	validateName();
});
emailAddress.addEventListener('keyup', (event) => {
	validateEmail();
});
cardNumber.addEventListener('keyup', (event) => {
	validateCreditCardNumber();
});

zipCode.addEventListener('keyup', (event) => {
	validateCreditCardZip();
});

cvv.addEventListener('keyup', (event) => {
	validateCVV();
});

/* Validates that the feild is not left blank. 
Also provides error message or let's the user know if the field is correct or not */ 

const validateName = () => {
	let nameFieldValue = userName.value;
	let nameTest = /[a-zA-Z]{1,}/.test(nameFieldValue);
	if (nameTest == false) {
		event.preventDefault();
		userName.parentElement.classList.add("not-valid");
		userName.parentElement.classList.remove("valid");
		userName.parentElement.lastElementChild.style.display = 'block';
	} 
	if (nameTest == true) {
		userName.parentElement.classList.add("valid");
		userName.parentElement.classList.remove("not-valid");
		userName.parentElement.lastElementChild.style.display = 'none';
	}
}

/* Validates that the email is entered correctly.
Also provides error message or let's the user know if the field is correct or not */ 

const validateEmail = () => {
	let emailFieldValue = emailAddress.value;

	if (emailAddress.value.trim() === '' || emailAddress.value == null) {
		// if email address is empty, then change the hint
		document.querySelector("#email-hint").innerText = 'Please enter an email address.';
	} else {
		document.querySelector("#email-hint").innerText = 'Email address must be formatted correctly';
	}
	
	let emailTest = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailFieldValue);
	if (emailTest == false) {
		event.preventDefault();
		emailAddress.parentElement.classList.add("not-valid");
		emailAddress.parentElement.classList.remove("valid");
		emailAddress.parentElement.lastElementChild.style.display = 'block';
	} 
	if (emailTest == true) {
		emailAddress.parentElement.classList.add("valid");
		emailAddress.parentElement.classList.remove("not-valid");
		emailAddress.parentElement.lastElementChild.style.display = 'none';
	}
}

/* Validates that at least one activity is checked.
Also provides error message or let's the user know if one is checked */ 

const validateActivities = () => {
	let isChecked = false;
	const ActivitiesBoxInputs = activitiesBox.querySelectorAll("input"); 
	for (let i = 0; i < ActivitiesBoxInputs.length; i++) {
		if (ActivitiesBoxInputs[i].checked) {
			isChecked = true;
			activitiesBox.parentElement.classList.add("valid");
			activitiesBox.parentElement.classList.remove("not-valid");
			activitiesBox.parentElement.lastElementChild.style.display = 'none';
			break;
		}
	} 
	if (isChecked == false) {
		event.preventDefault();
		activitiesBox.parentElement.classList.add("not-valid");
		activitiesBox.parentElement.classList.remove("valid");
		activitiesBox.parentElement.lastElementChild.style.display = 'block';
	}
}

/* Validates that the cc number is entered correctly.
Also provides error message or let's the user know if the field is correct or not */ 

const validateCreditCardNumber = () => {
	if ( paymentMethod.value == 'credit-card' ) {
		let creditCardNumberValue = cardNumber.value;
		let ccTest = /^[0-9]{13,16}$/.test(creditCardNumberValue);
		if (ccTest == false) {
			event.preventDefault();
			cardNumber.parentElement.classList.add("not-valid");
			cardNumber.parentElement.classList.remove("valid");
			cardNumber.parentElement.lastElementChild.style.display = 'block';
		} 
		if (ccTest == true) {
			cardNumber.parentElement.classList.add("valid");
			cardNumber.parentElement.classList.remove("not-valid");
			cardNumber.parentElement.lastElementChild.style.display = 'none';
		}
	}
}

/* Validates that the zipe code is entered correctly.
Also provides error message or let's the user know if the field is correct or not */ 

const validateCreditCardZip = () => {
	if ( paymentMethod.value == 'credit-card' ) {
		let zipTest = /^[0-9]{5}$/.test(zipCode.value);
		if (zipTest == false) {
			event.preventDefault();
			zipCode.parentElement.classList.add("not-valid");
			zipCode.parentElement.classList.remove("valid");
			zipCode.parentElement.lastElementChild.style.display = 'block';
		} 
		if (zipTest == true) {
			zipCode.parentElement.classList.add("valid");
			zipCode.parentElement.classList.remove("not-valid");
			zipCode.parentElement.lastElementChild.style.display = 'none';
		}
	}
}

/* Validates that the cvv number is entered correctly.
Also provides error message or let's the user know if the field is correct or not */ 

const validateCVV = () => {
	if ( paymentMethod.value == 'credit-card' ) {
		let cvvValue = cvv.value;
		let cvvTest = /^[0-9]{3}$/.test(cvvValue);
		if (!cvvTest) {
			event.preventDefault();
			cvv.parentElement.classList.add("not-valid");
			cvv.parentElement.classList.remove("valid");
			cvv.parentElement.lastElementChild.style.display = 'block';
		} else if (cvvTest) {
			cvv.parentElement.classList.add("valid");
			cvv.parentElement.classList.remove("not-valid");
			cvv.parentElement.lastElementChild.style.display = 'none';
		}
	}
}

/*Loops through the activity checkboxes to bring them 
into focus when selected and unfocused when not.*/

for ( let i = 0; i < activitiesSectionChecks.length; i++ ) {
	
	activitiesSectionChecks[i].addEventListener('focus', (event) => {
		activitiesSectionChecks[i].parentElement.classList.add("focus");
	});

	activitiesSectionChecks[i].addEventListener('blur', (event) => {
		activitiesSectionChecks[i].parentElement.classList.remove("focus");
	});

	activitiesSectionChecks[i].addEventListener('change', (event) => {
		disableConflictingTime(activitiesSectionChecks, event.target);
	});
}

/* Disables activities if they have conflicting times (when checked). 
When unchecked the disabled activities become active again.*/

const disableConflictingTime = (activityInputs, targetInput) => {
	let selectedTimes = [];
	for ( let i = 0; i < activityInputs.length; i++ ) {
		let time = activityInputs[i].getAttribute('data-day-and-time');
		let inputName = activityInputs[i].name;

		let selectedTime = targetInput.getAttribute('data-day-and-time');
		let selectedInputName = targetInput.name;
		let isTargetInputChecked = targetInput.checked
		activityInputs[i].disabled = false;

		activityInputs[i].parentElement.classList.remove('disabled');

		if (time === selectedTime && isTargetInputChecked && inputName != selectedInputName) {
			// conflict - time is the same, input is checked, input name is not the same as target input name
			activityInputs[i].parentElement.classList.add('disabled');
			activityInputs[i].disabled = true;
		}
	}
}
