function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const contentModal = document.querySelector(".content");
const modalBody = document.querySelector(".modal-body");
const btnClose = document.querySelector(".close")
const btnSubmit = document.querySelector(".btn-submit")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/*****************************************************************/

// fermer le modal
btnClose.addEventListener("click", ()=>{
  modalbg.style.opacity = 0;
  //resetForm();
  modalbg.addEventListener("transitionend", attendreFinAnimation);
});

// attendre la fin de la transition du modal
function attendreFinAnimation(){
  modalbg.removeEventListener("transitionend", attendreFinAnimation);
  modalbg.removeAttribute("style");
}

// Réinitialise le formulaire
function resetForm(){
  formulaire.reset();
  formValide = true;
  formValues = {};
}

// Objet contenant toutes les entrées du formulaire
let formValues = {};

// Variable indiquant si le formulaire est valide
let formValide = null;


btnSubmit.addEventListener("click", event => {
  event.preventDefault();

  // initialisation 
  formValide = true;
  //formValues = {};

  // test prénom
  const firstNameInput = document.getElementById("first");
  validerTextInput(firstNameInput, 0);

  // test nom
  const nameInput = document.getElementById("last");
  validerTextInput(nameInput, 1);

  // test email
  const emailInput = document.getElementById("email");
  validerEmailInput(emailInput, 2);

  // test date de naissance
  const birthdateInput = document.getElementById("birthdate");
  validerBirthdateInput(birthdateInput, 3);

  // test nombre de tournois
  const quantityInput = document.getElementById("quantity");
  validerQuantityInput(quantityInput, 4);  

  // test participation tournois
  const locationInputs = document.querySelectorAll(".checkbox-input[name='location'");
  validerLocationInput(locationInputs, 5);  

  // test des conditions d'utilisation
  const checkbox1Input = document.getElementById("checkbox1");
  validerCheckboxInput(checkbox1Input, 6);

  // test prochains évènements
  const checkbox2Input = document.getElementById("checkbox2");
  validerCheckboxInput(checkbox2Input, 7);

  console.log(formValues);
  console.log("Le formulaire est :", formValide);

  // toutes les réponses sont bonnes
  if(formValide){
    
    let contentHeight = contentModal.clientHeight;
    contentModal.style.height = contentHeight + "px";

    // Le texte de remerciement
    let div = `
    <div style="margin-top: ${contentHeight/2 - 100}px">
      <h3>Merci pour <br>votre inscription</h3>
    </div>
    <button class="btn-close btn-submit">Fermer</button>
    `;
    modalBody.innerHTML = div;

    // Le bouton pour fermer
    btnClose2 = document.querySelector(".btn-close");

    // fermer le modal
    btnClose2.addEventListener("click", ()=>{
      modalbg.style.opacity = 0;
      modalbg.addEventListener("transitionend", attendreFinAnimation);
    });

  }

});


// Validation des champs texte
function validerTextInput(input, formDataNum){
  let inputValue = input.value.trim();
  let inputName = input.name;
  try {
    if(inputValue === ""){
      throw new Error("Ce champValue est obligatoire.");
    }else if(inputValue.length < 2){
      throw new Error("La réponse est trop courte.");
    }else{
      supprimerMessageErreur(formDataNum);
      formValues[inputName] = inputValue;
    }

  } catch(error) {
    afficheMessageErreur(error.message, formDataNum);
    formValide = false;
  }
}

// Validation du champ Email
function validerEmailInput(input, formDataNum){

  let inputValue = input.value.trim();
  let inputName = input.name;
  const emailRegex = new RegExp("[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[A-Za-z0-9._-]+");
  try {
    if(inputValue === ""){
      throw new Error("Ce champValue est obligatoire.");
    }
    if(!emailRegex.test(inputValue)){
      throw new Error("L'email n'est pas valide.");
    }else{
      supprimerMessageErreur(formDataNum);
      formValues[inputName] = inputValue;
    }

  } catch(error) {
    afficheMessageErreur(error.message, formDataNum);
    formValide = false;
  }
}

// Validation du champ date de naissance
function validerBirthdateInput(input, formDataNum){

  let inputValue = input.value.trim();
  let inputName = input.name;

  try {
    let dateAnniversaire = new Date(inputValue);
    let dateAujourdhui = new Date();

    if(isNaN(dateAnniversaire.getTime())) {
      throw new Error("La date n'est pas au bon format.")
    }else if (dateAnniversaire >= dateAujourdhui){
      throw new Error("La date doit être antérieur à aujourd'hui.");
    }else{
      supprimerMessageErreur(formDataNum);
      formValues[inputName] = inputValue;
    }

  } catch(error) {
    afficheMessageErreur(error.message, formDataNum);
    formValide = false;
  }
}

// Validation du champ nombre de tournois
function validerQuantityInput(input, formDataNum){

  let inputValue = parseInt(input.value);
  let inputName = input.name;
  try {
    if(isNaN(inputValue)) {
      throw new Error("Entrer un nombre.");
    }
    if(inputValue > 99){
      throw new Error("La quantité est trop grande.");
    }else{
      supprimerMessageErreur(formDataNum);
      formValues[inputName] = inputValue;
    }

  } catch(error) {
    afficheMessageErreur(error.message, formDataNum);
    formValide = false;
  }
}

// Validation checkbox du lieu du tournoi
function validerLocationInput(inputs, formDataNum) {
  let inputValue = null;
  let inputName = null;

  inputs.forEach(input => {
    if(input.checked) {
      inputValue = input.value;
      inputName = input.name;
    }
  });
  try {
    if(inputValue === null) {
      throw new Error("Vous devez selectionner un tournoi.")
    }else{
      supprimerMessageErreur(formDataNum);
      formValues[inputName] = inputValue;
    }

  } catch(error) {
    afficheMessageErreur(error.message, formDataNum);
    formValide = false;
  }
}

// Validation checkbox condition d'utilisation et contact
function validerCheckboxInput(checkbox, formDataNum){
  let checkbox1Label = document.querySelector("label[for='checkbox1']");
  let checkbox1Icon = document.querySelector("label[for='checkbox1'] span")
  
  if(checkbox.id === "checkbox1" & !checkbox.checked){
    checkbox1Label.style.color = "#e54858";
    checkbox1Icon.style = "border: 2px solid #e54858";
    formValide = false;
  }else if( (checkbox.id === "checkbox1" && checkbox.checked) || checkbox.id === "checkbox2" ){
    checkbox1Label.removeAttribute("style");
    checkbox1Icon.removeAttribute("style");
  }
  formValues[checkbox.id] = checkbox.checked;
}


// Affiche le message d'erreur
function afficheMessageErreur(message, formDataNum){
  formData[formDataNum].setAttribute("data-error", message);
  formData[formDataNum].setAttribute("data-error-visible", "true");
}

// Supprime le message d'erreur
function supprimerMessageErreur(formDataNum){
  formData[formDataNum].removeAttribute("data-error");
  formData[formDataNum].removeAttribute("data-error-visible");
}


