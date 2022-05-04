
//**Focus on name field
const nameObject = document.querySelector("#name");
nameObject.focus();


//**Hide/show option for writing other job
const jobList = document.querySelector("#title");
const otheJobRole = document.querySelector("#other-job-role");
otheJobRole.style.display="none";

jobList.addEventListener("change", e => {
	if(e.target.value === "other"){
   	 	otheJobRole.style.display = "block"} 
   	 else{
   	 	otheJobRole.style.display = "none";
   	 }})
  

//**Showing the correct colors for each design
  const design = document.querySelector("#design");
  const color = document.querySelector("#color");
  const option = color.children;

//**Disabling the color list until design is chosen
  color.disabled = true;

  design.addEventListener("change", e => {
  	 color.disabled = false;
  	 for(let i = 0 ; i < option.length; i++){
  	 	let eventValue = e.target.value;
  	 	let dataTheme = option[i].getAttribute("data-theme");

  	if(eventValue === dataTheme){
  		option[i].hidden = false;
        option[i].setAttribute("selected", "true");
   	 } 
   	 else{
   	    option[i].hidden = true;
        option[i].setAttribute("selected", "false");
   	 } 
  }})
   

//**choosing activities and calculating the total cost

const registerForActivities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
let totalCost = 0;
const allOptions = document.querySelectorAll("#activities-box input[type=checkbox]");


registerForActivities.addEventListener("change", e => {
	let dataCost = parseInt(e.target.getAttribute("data-cost"));
	if(e.target.checked){
		totalCost = totalCost + dataCost;
	} else{
		totalCost = totalCost - dataCost;
	}
		    activitiesCost.innerHTML = `Total: $${totalCost}`

 for (let i = 0; i < allOptions.length; i++){
     if (e.target.getAttribute("data-day-and-time") === allOptions[i].getAttribute("data-day-and-time")
     && e.target.checked === true){
         allOptions[i].disabled = true;
         e.target.removeAttribute("disabled");
     }
     else if (e.target.getAttribute("data-day-and-time") !== allOptions[i].getAttribute("data-day-and-time")
     && allOptions[i].disabled === false){
         allOptions[i].removeAttribute("disabled");
         e.target.enabled = true;
     }
     else if (e.target.getAttribute("data-day-and-time") === allOptions[i].getAttribute("data-day-and-time")
     && e.target.checked === false){
         allOptions[i].disabled = false;
         e.target.enabled = false;
}}})



//**Setting the payment options

const imGoingToPayWith = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
document.querySelector("option[value='credit-card']").setAttribute("selected",true);

  paypal.hidden = true;
  bitcoin.hidden = true;

  imGoingToPayWith.addEventListener("change", (e) => {
     let options = imGoingToPayWith.children;
 for (let i = 0; i < options.length; i++) {
    //hide & display fields conditionally based on the selected option
  if (e.target.value === "paypal"){
    creditCard.hidden = true;
    bitcoin.hidden = true;
    paypal.hidden = false;
    
 }
 else if (e.target.value === "bitcoin"){
    creditCard.hidden = true;
    bitcoin.hidden = false;
    paypal.hidden = true;
}
else if (e.target.value === "credit-card"){ 
    creditCard.hidden = false;
    bitcoin.hidden = true;
    paypal.hidden = true;
 }}});


//**form validation
const emailAddress = document.querySelector("#email");
const cardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const form = document.querySelector("form");

let initialTotal = 0;


form.addEventListener("submit", e => {
//**This function checks that there is a name value. If there is a value, the valid class is assigned and hint is removed.
    function nameCheck(name) {
        const nameEntry = nameObject.value;
        const nameRegex = /^[A-Za-z]$/;
            if(nameRegex.test(nameEntry)){
                nameObject.parentElement.className = "valid";
                nameObject.parentElement.lastElementChild.classList.add("hint");
                return true
                
         }
        else{
            nameObject.parentElement.className = "not-valid";
            nameObject.parentElement.lastElementChild.classList.remove("hint");
            return false
            }
    }
//**Assign true false value for later validation
        const nameValid = nameCheck();

    function emailCheck(email) {
//** This function uses the recomended regex to determine validity of email. If email regex test is true, the valid class is assigned and hint is removed.
        const emailEntry = emailAddress.value;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(emailRegex.test(emailEntry)){
                emailAddress.parentElement.className = "valid";
                emailAddress.parentElement.lastElementChild.classList.add("hint");
                return true
            }
            else{
                emailAddress.parentElement.className = "not-valid";
                emailAddress.parentElement.lastElementChild.classList.remove("hint");
                return false
            }
        }
//**Assign true false value for later validation
     const emailValid = emailCheck();

    function activityCheck(activity) {
//This function checks if there is a value greater than 0 in the total element, there is more than one activity selected and is therefore valid
        const activitiesHint = document.querySelector("#activities-hint");
        if (totalCost > 0){
            registerForActivities.className = "activities valid";
            activitiesHint.classList.add("hint");
            return true
        }
        else {
            registerForActivities.className = "activities not-valid";
            activitiesHint.classList.remove("hint");
            return false
        }
    }
//**Assign true false value for later validation
    const activityValid = activityCheck();

//**This function checks if there are between 13 - 16 digits input 
    function cardCheck(number) {
        const numberEntry = cardNumber.value;
        if (numberEntry.length === 1) {
            digit = "digit";
        }
        else {
            digit = "digits";
        }    
        const numberRegex = /^\d{13,16}$/;

        const imGoingToPayWithValue = imGoingToPayWith.value;
        let hint = cardNumber.parentElement.lastElementChild;
            if (numberRegex.test(numberEntry) === true && imGoingToPayWithValue === "credit-card"){
                cardNumber.parentElement.lastElementChild.classList.add("hint");
                cardNumber.parentElement.className = "valid";
                return true
            }
            else if (numberRegex.test(numberEntry) === false){
                    cardNumber.parentElement.className = "not-valid";
                    cardNumber.parentElement.lastElementChild.classList.remove("hint");
                    hint.textContent = `The number you entered is ${numberEntry.length} ${digit}. Credit card number must be between 13 - 16 digits`
                    return false
                }
            else {
                return true
            }
            }      
//**Assign true false value for later validation
        const numberValid = cardCheck();

//**This function checks if there are 3 digits input 
    function cvvCheck(cv) {
        const cvEntry = cvv.value;
        const cvRegex = /^\d{3}$/;
            if (cvRegex.test(cvEntry) === true){
                    cvv.parentElement.lastElementChild.classList.add("hint");
                    cvv.parentElement.className = "valid";
                    return true
                }
                else if (cvRegex.test(cvEntry) === false){
                        cvv.parentElement.className = "not-valid";
                        cvv.parentElement.lastElementChild.classList.remove("hint");
                        return false
                    }
                }
//**Assign true false value for later validation
            const cvvValid = cvvCheck();

//**This function checks if there are 5 digits input 
     function zipCheck(zip) {
        const zipEntry = zipCode.value;
        const zipRegex = /^\d{5}$/;    
                    if (zipRegex.test(zipEntry) === true){
                        zipCode.parentElement.className = "valid";
                        zipCode.parentElement.lastElementChild.classList.add("hint");
                        return true
                    }
                    else if (zipRegex.test(zipEntry) === false){
                            zipCode.parentElement.className = "not-valid";
                            zipCode.parentElement.lastElementChild.classList.remove("hint");
                            return false
                        }
                    }
//**Assign true false value for later validation
    const zipValid = zipCheck();

//**Checks if the customer cohse cc as payment method
 const paymentValue = imGoingToPayWith.value;
 //**Submit the form if the customer cohse cc as payment method and everything is valid
  if 
      (nameValid && emailValid && activityValid && numberValid && cvvValid && zipValid  && paymentValue === 'credit-card') 
 {
form.submit();

  }
//**Submit the form if the customer cohse paypal OR bitcoing as payment method and everything is valid
  else if ((paymentValue === 'bitcoin' || paymentValue === 'paypal')&& nameValid && emailValid && activityValid){
form.submit();
  }
//**Otherwise prevent default
  else {
    e.preventDefault();
 
  }

});




//**Accessibility focusing on the activities

const allOptionsParent = allOptions.parentElement
 for(let i = 0; i < allOptions.length; i++){
 	allOptions[i].addEventListener("focus", e =>{
 		e.target.parentElement.className = "focus";

 	})
 	allOptions[i].addEventListener("blur", e =>{
 		e.target.parentElement.className = "";

 	})
 }


//**Cvv realtime validation using keyup

const cvEntry = cvv.value;

cvv.addEventListener("keyup", e => {

    const cvvRegex = /^\d{3}$/;
    if(cvvRegex.test(e.target.value) === true){

        cvv.parentElement.lastElementChild.classList.add("hint");
    }
    else if (cvvRegex.test(e.target.value) === false){
        cvv.parentElement.lastElementChild.classList.remove("hint");
    }
});


