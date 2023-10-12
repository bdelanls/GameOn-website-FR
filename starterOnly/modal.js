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

const formulaire = document.querySelector("form");
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

// Événement pour fermer le modal
btnClose.addEventListener("click", ()=>{
  modalbg.style.opacity = 0;
  modalbg.addEventListener("transitionend", attendreFinAnimation);
  resetForm();
});

// Attendre la fin de la transition du modal et supprimer l'attribut style
function attendreFinAnimation(){
  modalbg.removeEventListener("transitionend", attendreFinAnimation); // Supprime l'écouteur d'événement
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


// Événement lors du clic sur le bouton "je m'inscris"
btnSubmit.addEventListener("click", event => {
  event.preventDefault();

  // initialisation 
  formValide = true;


  // test prénom
  const firstNameInput = document.getElementById("first");
  validerTextInput(firstNameInput);
  
  // test nom
  const nameInput = document.getElementById("last");
  validerTextInput(nameInput);

  // test email
  const emailInput = document.getElementById("email");
  validerEmailInput(emailInput);

  // test date de naissance
  const birthdateInput = document.getElementById("birthdate");
  validerBirthdateInput(birthdateInput);

  // test nombre de tournois
  const quantityInput = document.getElementById("quantity");
  validerQuantityInput(quantityInput);  

  // test participation tournois
  const locationInputs = document.querySelectorAll(".checkbox-input[name='location'");
  validerLocationInput(locationInputs);  

  // test des conditions d'utilisation
  const checkbox1Input = document.getElementById("checkbox1");
  validerCheckboxInput(checkbox1Input);

  // test prochains évènements
  const checkbox2Input = document.getElementById("checkbox2");
  validerCheckboxInput(checkbox2Input);

  // Si toutes les entrées sont valides, afficher un message de remerciement
  if(formValide){

    console.log(formValues); // Log des valeurs du formulaire pour débogage
    
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

    // Bouton pour fermer le message de remerciement
    let btnClose2 = document.querySelector(".btn-close");

    // Événement pour fermer le modal de remerciement
    btnClose2.addEventListener("click", ()=>{
      modalbg.style.opacity = 0;
      modalbg.addEventListener("transitionend", attendreFinAnimation);
    });

  }
});


// Validation des champs texte
function validerTextInput(input){

  let inputValue = input.value.trim();

  try {
    if(inputValue === ""){
      throw new Error("Ce champ est obligatoire.");
    }else if(inputValue.length < 2){
      throw new Error("La réponse est trop courte.");
    }else{
      inputValide(input, inputValue);
    }
  } catch(error) {
    afficheMessageErreur(input, error.message);
  }
}

// Validation du champ Email
function validerEmailInput(input){

  let inputValue = input.value.trim();
  const emailRegex = new RegExp("[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[A-Za-z0-9._-]+");

  try {
    if(inputValue === ""){
      throw new Error("Ce champ est obligatoire.");
    }else if(!emailRegex.test(inputValue)){
      throw new Error("L'email n'est pas valide.");
    }else{
      inputValide(input, inputValue);
    }
  } catch(error) {
    afficheMessageErreur(input, error.message);
  }
}

// Validation du champ date de naissance
function validerBirthdateInput(input){

  let inputValue = input.value.trim();

  try {
    let dateAnniversaire = new Date(inputValue);
    let dateAujourdhui = new Date();

    if(isNaN(dateAnniversaire.getTime())) {
      throw new Error("La date n'est pas au bon format.")
    }else if (dateAnniversaire >= dateAujourdhui){
      throw new Error("La date doit être antérieur à aujourd'hui.");
    }else{
      inputValide(input, inputValue);
    }

  } catch(error) {
    afficheMessageErreur(input, error.message);
  }
}

// Validation du champ nombre de tournois
function validerQuantityInput(input){

  let inputValue = parseInt(input.value);
  try {
    if(isNaN(inputValue)) {
      throw new Error("Entrer un nombre.");
    }
    if(inputValue > 99){
      throw new Error("La quantité est trop grande.");
    }else{
      inputValide(input, inputValue);
    }

  } catch(error) {
    afficheMessageErreur(input, error.message);
  }
}

// Validation du lieu du tournoi
function validerLocationInput(inputs) {
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
      inputValide(inputs[0], inputValue);
    }

  } catch(error) {
    afficheMessageErreur(inputs[0], error.message);
  }
}

// Validation checkbox condition d'utilisation et contact
function validerCheckboxInput(checkbox){
  let checkbox1Label = document.querySelector("label[for='checkbox1']");
  let checkbox1Icon = document.querySelector("label[for='checkbox1'] span")
  
  if (checkbox.id === "checkbox1" && !checkbox.checked) {
    checkbox1Label.style.color = "#e54858";
    checkbox1Icon.style = "border: 2px solid #e54858";
    formValide = false;
  } else if (checkbox.id === "checkbox1" && checkbox.checked) {
    checkbox1Label.removeAttribute("style");
    checkbox1Icon.removeAttribute("style");
  }
  formValues[checkbox.id] = checkbox.checked;
}


// Affiche les messages d'erreur
function afficheMessageErreur(input, message){
  input.parentNode.setAttribute("data-error", message);
  input.parentNode.setAttribute("data-error-visible", "true");
  formValide = false;
}

// Supprime les messages d'erreur
function supprimerMessageErreur(input){
  input.parentNode.removeAttribute("data-error");
  input.parentNode.removeAttribute("data-error-visible");
}

// Fonction pour traiter une entrée valide
function inputValide(input, inputValue){
  let inputName = input.name;
  supprimerMessageErreur(input);
  formValues[inputName] = inputValue;
}