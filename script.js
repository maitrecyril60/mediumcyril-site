// ============================================================
// Maitre Cyril - mediumcyril.com
// Menu mobile + suivi des conversions Google Ads / GTM
// ============================================================

var CONV = {
    appel: '',
    whatsapp: '',
    formulaire: ''
};

function suivreConversion(nom) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'conversion_' + nom });
    if (typeof gtag === 'function' && CONV[nom]) {
          gtag('event', 'conversion', { send_to: 'AW-18112453978/' + CONV[nom] });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('nav.mainnav');
    if (burger && nav) {
          burger.addEventListener('click', function () {
                  nav.classList.toggle('ouvert');
          });
    }

                            document.querySelectorAll('img[data-fallback]').forEach(function (img) {
                                  img.addEventListener('error', function () { img.remove(); });
                            });

                            document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
                                  a.addEventListener('click', function () { suivreConversion('appel'); });
                            });
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
          a.addEventListener('click', function () { suivreConversion('whatsapp'); });
    });

                            document.querySelectorAll('form[name="consultation"]').forEach(function (form) {
                                  form.addEventListener('submit', function (e) {
                                          e.preventDefault();
                                          var bouton = form.querySelector('button[type="submit"]');
                                          if (bouton) { bouton.disabled = true; bouton.textContent = 'Envoi en cours...'; }
                                          var donnees = new URLSearchParams(new FormData(form)).toString();
                                          fetch('/', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                    body: donnees
                                          }).then(function () {
                                                    window.location.href = 'merci.html';
                                          }).catch(function () {
                                                    window.location.href = 'merci.html';
                                          });
                                  });
                            });
});
