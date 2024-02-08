'use strict';

const section = document.querySelector(".win")

let endCount = 0;

// TODO AFFICHER LA DIV GAGNEE 

function startGame() {

    section.classList.remove("flex");


    const flipCards = document.querySelectorAll(".flip-card");
    const noPlay = document.querySelector(".no-play");
    const btn = document.querySelector(".btn");

    let dataCompare = [];
    let lastCardPicked = [];

    for (const elem of flipCards) {

        elem.addEventListener('click', function () {

            elem.classList.add('is-flipped');
            dataCompare.push(elem.dataset.card);
            lastCardPicked.push(elem);

            // TODO Si les deux lastCardPicked contiennent la classList is-flipped ne rien faire sinon les retourner et faire la comparaison

            if (dataCompare.length == 2) {

                noPlay.classList.add('forbidden');
                setTimeout(() => {
                    noPlay.classList.remove('forbidden');
                }, 100); //1000

                if (dataCompare[0] === dataCompare[1]) {
                    dataCompare = [];
                    lastCardPicked = [];
                    endCount++;
                    console.log('Match');
                    console.log('end count :', endCount);
                } else {
                    setTimeout(() => {
                        dataCompare = [];
                        lastAreFlipped();
                    }, 1000);
                    console.log('Mismatch');
                    console.log('end count :', endCount);
                };
            };
        });
    };

    // Selection et comparaison des cartes
    function shuffleAndReplaceChildren(parentSelector) {
        const parent = document.querySelector('.cards');

        // Convertis NodeList en tableau pour pouvoir le mélanger
        const childrenArray = Array.from(flipCards);

        // Algorithme de mélange de (Fisher-Yates)
        for (let i = childrenArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [childrenArray[i], childrenArray[j]] = [childrenArray[j], childrenArray[i]];
        };

        // Supprime les anciennes div
        parent.innerHTML = '';

        // Réinsére les div mélangées dans le parent
        childrenArray.forEach(child => {
            parent.appendChild(child);
        });
    };
    // Retourne uniquement les dernieres cartes manquées
    function lastAreFlipped() {
        for (const lastElem of lastCardPicked) {

            if (lastElem.classList.contains('is-flipped')) {
                lastElem.classList.remove('is-flipped');
            };
        };
    };

    // Retourne toute les cartes
    function isFlipped() {
        for (const elem of flipCards) {
            if (elem.classList.contains('is-flipped')) {
                elem.classList.remove('is-flipped');
            };
        };
    };

    // Restart Game 
    btn.addEventListener('click', () => {
        endCount = 0;
        isFlipped();
        startGame();
        shuffleAndReplaceChildren('.flip-card');
    });

    shuffleAndReplaceChildren('.flip-card');
};
startGame();
