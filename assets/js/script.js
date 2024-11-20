// =========================================================================
// Déclaration des variables                                               
// =========================================================================
const cle_activation = document.getElementById('cle_activation'); //const erreurformat = document.getElementById('cle_activation');
const monFormulaire = document.getElementById('form-activation');
const declaration = document.getElementById('declaration');
const MessageErreur = document.getElementById('message_erreur');
let declarationok = false;
let formatok = false;
let produitok = false;
let valide = false;

const REGEX_CODE_PRODUIT = /(([\d\w]){5}-){2,4}([\d\w]){5}/;
const listeProduits = {
    "Q1JBC-3ZPX8-TVHUH" : "Final Fantasy 1",
    "P3CJN-JNGJM-XYYT4" : "Contra",
    "2RCWA-XPRPX-GJHPR" : "The Legend of Zelda",
    "H4LS8-L1L3T-08D9X" : "Rygar",
    "KBZB7-PQYDY-D5TMZ-MUABS-JNGJM" : "Metroid",
    "VPTU1-9UZXA-X4ED4-F596J-XPRPX" : "Ninja Gaiden",
    "SUY17-21D57-5QYJU-UE6PN-HZ452" : "Kirby's Adventure"
};
const erreurValidation = {
    "terme" : "Vous devez accepter les termes de l’Accord de souscription Vapeur pour finaliser la transaction.",
    "formatInvalide" : "Le code produit que vous avez saisi est invalide, il ne respecte pas le format requis.",
    "produitInexistant" : "Aucun produit n'est associé au code de produit saisi."
};

// Code pour provoquer une animation sur le bouton Activer
const boutonActiver = document.querySelector('.bouton-activation');
boutonActiver.addEventListener('click', (e) => {
    e.target.classList.add('bouton-click');
    ValidationFormat(e); // **Appel de la fonction de validation lors du clic sur le bouton**
});
boutonActiver.addEventListener('transitionend', (e) => {
    e.target.classList.remove('bouton-click');
    ValidationFormat(e);
});

/**
 * Recherche dans le tableau listeProduits un produit associé à un code de produit
 * @param {string} codeProduit Le code de produit à valider
 * @returns true si le produit existe dans le tableau
 */
function isProduitExiste(codeProduit) {
    return listeProduits[codeProduit.toString().toUpperCase()] ? true : false;
}

// =========================================================================
// Ajoutez votre code plus bas                                             
// =========================================================================
erreurformat.addEventListener("input", ValidationFormat);
monFormulaire.addEventListener("submit", ValidationFormat); 
declaration.addEventListener("change", ValidationFormat);

function ValidationFormat(e) {
    if (e) e.preventDefault(); // **Empêcher la soumission du formulaire**

    // Validation du format du code produit
    if (cle_activation.value.match(REGEX_CODE_PRODUIT)) {
        formatok = true;
    } else {
        formatok = false;
        MessageErreur.textContent = erreurValidation.formatInvalide;
        MessageErreur.classList.remove('hidden'); // **Afficher le message d'erreur si le format est invalide**
        return false
    }

    // Validation de l'existence du produit
    if (isProduitExiste(cle_activation.value)) {
        produitok = true;
    } else {
        produitok = false;
        MessageErreur.textContent = erreurValidation.produitInexistant;
        MessageErreur.classList.remove('hidden'); // **Afficher le message d'erreur si le produit n'existe pas**
        return false;
    }

    // Validation de la déclaration
    if (declaration.checked) {
        declarationok = true;
    } else {
        declarationok = false;
        MessageErreur.textContent = erreurValidation.terme;
        MessageErreur.classList.remove('hidden'); // **Afficher le message d'erreur si la déclaration n'est pas acceptée**
        return false;
    }

    // Validation finale
    if (formatok && produitok && declarationok) {
        valide = true;
        MessageErreur.classList.add('hidden'); // **Masquer le message d'erreur si tout est OK**
        monFormulaire.submit(); // **Soumettre le formulaire si tout est valide**
    } else {
        valide = false;
    }

    return valide;
}
