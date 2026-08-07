// ============================================================
// Maitre Cyril — mediumcyril.com
// Menu mobile + suivi des conversions Google Ads / GTM
//
// Contact centralise sur WhatsApp + formulaire (choix assume).
// Seule la page Belgique conserve un lien telephonique.
// ============================================================

// Etiquettes de conversion Google Ads (compte AW-18112453978).
// Laisser vide si les conversions sont gerees dans GTM.
var CONV = {
  whatsapp:   '',
  formulaire: '',
  appel:      ''   // conserve uniquement pour la page Belgique
};

function suivreConversion(nom) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'conversion_' + nom });
  if (typeof gtag === 'function' && CONV[nom]) {
    gtag('event', 'conversion', { send_to: 'AW-18112453978/' + CONV[nom] });
  }
}

document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('nav.mainnav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('ouvert'); });
  }

  // Image qui ne charge pas : on la retire, le degrade prend le relais
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () { img.remove(); });
  });

  // CONVERSION PRINCIPALE : WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.addEventListener('click', function () { suivreConversion('whatsapp'); });
  });

  // Appel : ne se declenche que sur la page Belgique (seule a avoir un lien tel:)
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () { suivreConversion('appel'); });
  });

  // Formulaire Netlify : envoi en arriere-plan puis redirection propre
  document.querySelectorAll('form[name="consultation"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bouton = form.querySelector('button[type="submit"]');
      var libelle = bouton ? bouton.textContent : '';
      if (bouton) { bouton.disabled = true; bouton.textContent = '...'; }
      var donnees = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: donnees
      }).then(function () {
        window.location.href = '/merci';
      }).catch(function () {
        if (bouton) { bouton.disabled = false; bouton.textContent = libelle; }
        window.location.href = '/merci';
      });
    });
  });
});
