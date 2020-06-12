document.addEventListener('DOMContentLoaded', function(){
	getListOfPersonas()
	connectNavBack()
	connectNavCreate()
})

//Navigation

let main = document.querySelector("main")
let nav = document.querySelector("nav")


function getListOfPersonas(callback = () =>{}){
	getView("/personas", () => {
		connectNav()
		callback()
	})
}

function connectNav(){
	connectNavToForm()
	connectDelete()
}

function connectDeleteConfirmation(){
	let deleteNavElems = document.querySelectorAll(".page-nav-delete")
	let modal = main.children.deleteConfirmation
	deleteNavElems.forEach(navElem => {
		navElem.addEventListener("click", () => {
			toggleModal()
			modal.children.modalContent.children[1].children.acceptBtn.dataset.action = navElem.children[0].dataset.action
			modal.children.modalContent.children[1].children.acceptBtn.dataset.emailDelete = navElem.parentElement.parentElement.id
		})
	})
}

function connectDelete(){
	connectCloseModal()
	window.addEventListener("click", windowOnClick)
	connectBtnsModal()
	connectDeleteConfirmation()
}

function connectBtnsModal(){
	let modalContent = main.children.deleteConfirmation.children.modalContent
	modalContent.children[1].children.cancelBtn.addEventListener("click", toggleModal)
	modalContent.children[1].children.acceptBtn.addEventListener("click", acceptActionModal)
}

function acceptActionModal(){
	let acceptBtn = main.children.deleteConfirmation.children.modalContent.children[1].children.acceptBtn
	sendDeleteRequest(acceptBtn.dataset.action)
	deleteRow(acceptBtn.dataset.emailDelete)
}

function deleteRow(rowId){
	let rowToDelete = document.getElementById(rowId)
	rowToDelete.parentElement.removeChild(rowToDelete)
}

function connectCloseModal(){
	let modalContent = main.children.deleteConfirmation.children.modalContent
	modalContent.children.closeModal.addEventListener("click", toggleModal)
}

function windowOnClick(event){
	let modal = main.children.deleteConfirmation
	if (event.target === modal){
		toggleModal()
	}
}

function toggleModal(){
	let modal = main.children.deleteConfirmation
	modal.classList.toggle("show-modal")
}

function connectNavBack(){
	let backButton = nav.children.back
	backButton.addEventListener("click", e => {
		getListOfPersonas()
		toggleDisplayBackButton()
		toggleDisplayCreateButton()
	})
}

function connectNavToForm(){
	let navElems = document.querySelectorAll(".page-nav-form")
	
	navElems.forEach(navElem => {
		navElem.addEventListener("click", e => {
			e.preventDefault()
			toggleDisplayCreateButton()
			toggleDisplayBackButton()
			getView(e.target.dataset.action, connectForm)

		})
	})
}

function connectNavCreate(){
	let navCreate = nav.children.create
	navCreate.addEventListener("click", e => {
		e.preventDefault()
		toggleDisplayCreateButton()
		toggleDisplayBackButton()
		getView(e.target.dataset.action, connectForm)
	})
}

function toggleDisplayCreateButton(){
	let createButton = nav.children.create
	createButton.classList.toggle("hide")
}

function toggleDisplayBackButton(){
	let backButton = nav.children.back
    backButton.classList.toggle("hide")
}

function connectFormSubmit(){
	let form = main.children.personaForm
	form.addEventListener("submit", e => {
		e.preventDefault()
		if(validateForm()){
			sendForm()
		}else{
			M.toast({html: 'Formulario invalido, por favor corrija sus errores para proseguir', classes:'error-toast'})
		}

	})
}

function connectForm(){
	connectFormSubmit()
	connectFormValidations()
}

/* ajax */

function getView(action , callback=()=>{}){
  let xhr = new XMLHttpRequest
  xhr.open("GET", action)
  xhr.addEventListener("readystatechange", () => {
    if(xhr.readyState == 4 && xhr.status == 200){
      main.innerHTML = xhr.response
      callback()
    }
  })
  xhr.send()
}

function sendDeleteRequest(action, callback = () => {}){
	let xhr = new XMLHttpRequest
	xhr.open("DELETE", action)
	xhr.addEventListener("readystatechange", () => {
		if(xhr.readyState == 4 && xhr.status == 200){
			toggleModal()
			M.toast({html: 'Persona eliminada con exito', classes:'success-toast'})
			callback()
		}
	})
	xhr.send()
}


/* form */
function sendForm(){
	let form = main.children.personaForm
	let persona = {
		nombre : form.nombre.value,
		apellido : form.apellido.value,
		telefono : form.telefono.value,
		email : form.email.value
	}
	
	let xhr = new XMLHttpRequest
	xhr.open(form.method, form.action)
	xhr.addEventListener("readystatechange", () => {
		if(xhr.readyState == 4 && xhr.status == 200){
			getListOfPersonas(() => {
				toggleDisplayBackButton()
				toggleDisplayCreateButton()
				let row = document.getElementById(persona.email)
				window.scrollTo(0, row.offsetTop)
				M.toast({html: 'Persona editada con exito', classes:'success-toast'})
			})
		}
		if(xhr.readyState == 4 && xhr.status == 201){
			getListOfPersonas(() => {
				toggleDisplayBackButton()
				toggleDisplayCreateButton()
				let row = document.getElementById(persona.email)
				window.scrollTo(0, row.offsetTop)
				M.toast({html: 'Persona creada con exito', classes:'success-toast'})
			})
		}
	})
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(JSON.stringify(persona))
}

