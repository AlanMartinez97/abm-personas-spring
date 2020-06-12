function ValidationStringLength(min, max){
	this.min = min
	this.max = max
	this.isValid = (value = "") => {
		return (value.length >= min && value.length <= max)
	}
	this.message = "Debe haber entre ".concat(min).concat(" y ").concat(max).concat(" caracteres")
}

function ValidationEmailLike(){
	this.isValid = (value = "") => {
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		return regex.test(value)
	}
	this.message = "Debe ser una direccion valida"
}

function ValidationNumberLike(){
	this.isValid = (value = "") => {
		let regex = /^[0-9]*$/ 
		return regex.test(value)
	}
	this.message = "Debe conformarse solo de numeros"
}

function ValidationCharacterLike(){
	this.isValid = (value = "") => {
		let regex = /^[a-zA-Z ]*$/
		return regex.test(value)
	}
	this.message = "Debe conformarse solo de letras"
}

function Validator(validations = []){
	this.validations = validations
	this.validate = (value) => {
		let res = true
		validations.forEach(validation => {
			res = res && validation.isValid(value)
		})
		
		return res
	}
}

let telefonoValidator = new Validator([
	new ValidationStringLength(10,15),
	new ValidationNumberLike()
])

let apellidoValidator = new Validator([
	new ValidationStringLength(2,30),
	new ValidationCharacterLike()
])

let nombreValidator = new Validator([
	new ValidationStringLength(2,30),
	new ValidationCharacterLike()
])

let emailValidator = new Validator([
	new ValidationEmailLike(),
	new ValidationStringLength(0, 76)
])

function connectInputValidation(elem, validator){
	elem.addEventListener("input", e => {
		if(!validator.validate(e.target.value)){
			e.target.style.borderColor = "red"
		}else {
			e.target.style.borderColor = "#555"
		}
	})
}

function connectFocusTip(elem, validator){
	elem.addEventListener("focus", e => {
		e.preventDefault()
		validator.validations.forEach(validation => {
			let pTip = document.createElement("p")
			let textTip = document.createTextNode(validation.message)
			pTip.appendChild(textTip)
			pTip.classList.add("tip")
			e.target.parentElement.appendChild(pTip)
		})
	})
	
	elem.addEventListener("blur", e => {
		e.preventDefault()
		removeAllTips(e.target.elementParent)
	})
}

function removeAllTips(elem){
	let tips = document.querySelectorAll(".tip")
	tips.forEach(tip => {
		tip.remove()
	})
}

function connectNombreValidation(){
	let form = main.children.personaForm
	connectInputValidation(form.nombre, nombreValidator)
	connectFocusTip(form.nombre, nombreValidator)
}

function connectApellidoValidation(){
	let form = main.children.personaForm
	connectInputValidation(form.apellido, apellidoValidator)
	connectFocusTip(form.apellido, apellidoValidator)
}

function connectTelefonoValidation(){
	let form = main.children.personaForm
	connectInputValidation(form.telefono, telefonoValidator)
	connectFocusTip(form.telefono, telefonoValidator)
}

function connectEmailValidation(){
	let form = main.children.personaForm
	connectInputValidation(form.email, emailValidator)
	connectFocusTip(form.email, emailValidator)
	connectExistsEmailValidation(form.email)
}

function connectExistsEmailValidation(elem){
	elem.addEventListener("blur", e => {
		if(e.target.value != ""){
			ExistsEmailValidation(e.target)
		}
	})
}

function ExistsEmailValidation(email){
	let xhr = new XMLHttpRequest
	let action = "personas/exists/".concat(email.value)
	xhr.open("GET", action)
	xhr.addEventListener("readystatechange", () => {
		if(xhr.readyState == 4 && xhr.status == 200){
			let response = JSON.parse(xhr.response)
			toggleErrorMailAlreadyExists(response.result, email)
		}
	})
	xhr.setRequestHeader("Accept","application/json");
	xhr.send()
}

function toggleErrorMailAlreadyExists(mailExists, email){
	let errorEmail = email.parentElement.lastElementChild
	if(mailExists && (email.value != errorEmail.dataset.lastCheck) && (errorEmail.dataset.original != email.value)){
		errorEmail.dataset.lastCheck = email.value
		errorEmail.classList.toggle("hide")
	}
	if(!mailExists && !(errorEmail.classList.contains("hide"))){
		errorEmail.dataset.lastCheck = email.value
		errorEmail.classList.toggle("hide")
	}
}

function connectFormValidations(){
	connectNombreValidation()
	connectApellidoValidation()
	connectTelefonoValidation()
	connectEmailValidation()
}

function validateForm(){
	let form = main.children.personaForm
	return (nombreValidator.validate(form.nombre.value) &&
			apellidoValidator.validate(form.apellido.value) &&
			telefonoValidator.validate(form.telefono.value) &&
			emailValidator.validate(form.email.value) &&
			form.email.parentElement.lastElementChild.classList.contains("hide"))
}