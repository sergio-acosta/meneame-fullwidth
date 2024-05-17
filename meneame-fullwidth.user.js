// ==UserScript==
// @name         Menéame 100% ancho - versión 2024
// @namespace    http://meneame.net/
// @version      0.3
// @description  Modifica old.meneame.net de forma que el contenido aprovecha toda la pantalla y elmina algunas distracciones
// @author       Sergio A.
// @match        *://*.meneame.net/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Función para insertar estilos que anulan los elementos no deseados
    function insertOverrideStyles() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            #wrap {
                max-width: none !important;
            }
            .mnm-center-in-wrap {
                width: auto !important;
                margin: 0 !important;
            }

            #newsletter {
                display: none !important;
            }

            #live-window {
                display: none !important;
            }

            #sidebar {
                display: none !important;
            }

            #newswrap {
                margin: 0 !important;
            }

            ul#userinfo {
               position: absolute !important;
               right: 0 !important;
            }

        `;
        document.head.appendChild(style);
    }

    // Observa cambios en el DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!mutation.addedNodes) return;

            // Verifica si el estilo ya fue añadido, para no duplicarlo
            if (!document.querySelector('style#customOverrideStyles')) {
                insertOverrideStyles();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Insertamos los estilos inmediatamente en caso de que los nodos relevantes ya estén en el DOM
    insertOverrideStyles();
})();