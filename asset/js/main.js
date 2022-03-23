// button per iniziare l'evento al click
let btnStart = document.getElementById('btnStart');

// button per ricaricare la pagina e iniziare una nuova partita
let btnReset = document.getElementById('btnReset');

// container in cui stampare i numeri
let containerOutput = document.getElementById('containerOutput');

// array vuoto in cui pushare i numeri casuali
let numeriSimon = [];

// variabile per il prompt in cui inserire i  numeri
let remember;

// array vuoto in cui pushare i numeri inseriti dall'utente
let numeriUtente = [];


// ANCHOR 1) Visualizzare in pagina 5 numeri casuali.

// evento al click del button PLAY
btnStart.addEventListener('click', function(){
    
    for (let i = 0; i < 5; i++) {

        // creare contenitore per ognugno dei numeri da stampare
        let number = document.createElement('div');
        number.className = 'number';
        containerOutput.appendChild(number)

        // variabile con funzione per generare i numeri random da 1 a 99
        var numeriRandom = getRandomInt(1,99)

        // stampare i numeri nella pagina
        number.innerHTML += `${numeriRandom}`

        numeriSimon.push(numeriRandom);

          // riordinare i numeri in ordine crescente nell'array
        numeriSimon = numeriSimon.sort( function compare(c,d){
            return c - d;
        })

        // ANCHOR 2) Da lì parte un timer di 30 secondi.
        
        // funzione asincrona per far scomparire i numeri quando l'utente deve inserire i valori
        setTimeout(() => {
            number.className = 'd-none';
            containerOutput.style.justifyContent = 'center';
            containerOutput.style.fontSize = '3em';
        }, 3000);

        // ANCHOR 3) Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
        
        // funzione asincrona per permettere all'utente di inserire i numeri visti (se li ricorda)
        setTimeout(() => {
            remember = parseInt(prompt(`Inserisci i numeri che hai visto precedentemente: (step ${i+1})`));

            if ( numeriSimon.includes(remember) ) {
                if (!numeriUtente.includes(remember)) {
                    numeriUtente.push(remember);
                } else {
                    let tiPiaceVincereFacile = parseInt(prompt(`Inserisci un numero diverso da quelli già inseriti.`));
                    if (!numeriUtente.includes(tiPiaceVincereFacile)) {
                        numeriUtente.push(tiPiaceVincereFacile);
                    }
                }
        // ANCHOR 4) Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
                document.getElementById('containerOutput').innerHTML = `Hai inserito ${numeriUtente.length} numeri corretti (<span class="f_Bold">${numeriUtente.join(", ")}</span>).`;
            } else if (numeriUtente.length === 0 ) {
                document.getElementById('containerOutput').innerHTML = `Hai bisogno di fosforo`;
            }

        }, 3100);
        
    }
    

    
},{once:true}
)

// evento al click refresh pagina (reset)
btnReset.addEventListener('click', function(){
    location.reload();
}
)


// funzione per generare numeri random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}