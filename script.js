
//
const start = document.querySelector('#start');
const újra = document.querySelector('#reset');
const ellenőrzés = document.querySelector('#ellenorzesGomb');
const addWarning = document.querySelector('.warning');
const select = document.querySelector('#jatekTípus');
//
var d;
var selectValue;
var input;

var keziszamok;
var gepiszamok;
var azonosElemek;


function mezoEllenorzes() {
    input.addEventListener('input', function() {
        let ertek = parseInt(this.value, 10); 
            //console.log(ertek)
            if ( isNaN(ertek) ) {
                //console.log('Hibás szám!');
                //console.log(ertek);
                this.style.backgroundColor = 'coral'; 
                ellenőrzés.disabled = true;
                addWarning.innerHTML =  "Helyes számot adj meg!";
            }
            if (ertek > d || ertek < 0) {
                this.style.backgroundColor = 'coral';
                addWarning.innerHTML =  "Helyes számot adj meg!";
                ellenőrzés.disabled = true;
            } else if (ertek === 0) {
                this.style.backgroundColor = 'coral'; 
                addWarning.innerHTML =  "Helyes számot adj meg!";
                ellenőrzés.disabled = true;
            } else if (ertek > 0 || ertek < d) {
                this.style.backgroundColor = 'lightgreen'; 
                addWarning.innerHTML =  "";
                ellenőrzés.disabled = false;
            } 
    });
}

function mezoErtek() {
    selectValue = Number.parseInt(select.value);
    //console.log(selectValue)

    // szám ellenőrzéshez
    if ( selectValue == 0 ) {
            //console.log("Válassz játékot a listából!");
        addWarning.innerHTML =  "Válassz játékot a listából!";
    } else if (selectValue === 7) {
        d = 35;
            //console.log(d)
    } else if (selectValue === 6) {
        d = 45;
            //console.log(d)
    } else if (selectValue === 5) {
        d = 90;
            //console.log(d)
    }
}

function mezoGeneralas() { 
    mezoErtek();

    // űrlap létrehozása
    let form = document.createElement('form');
    form.id = 'form';
    form.className = 'form';
    for (let i = 0; i < selectValue; ++i) {
        input = document.createElement('input');
        input.id = `mezo_${ i + 1 }`;
        input.className = 'input-mezo';
        input.type = 'number';
        input.placeholder = `${ i + 1 }. szám:`;
        form.appendChild(input); 

        mezoEllenorzes();
    }
    // űrlap hozzáadása
    let gameArea = document.querySelector('.game-area');
    gameArea.innerHTML = '';  
    gameArea.appendChild(form);
}

function getFormValues() {
    let form = document.getElementById('form');
    let inputs = form.getElementsByClassName('input-mezo');
    let values = [];
    for (let i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
    }    
    //console.log(values)
    return values;
}
// eredmény hírdetés
function eredmeny() {
    keziszamok = getFormValues().map(str => parseInt(str, 10));    

    function getRandomNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNum);
        }
        return Array.from(numbers);
    }
    
    gepiszamok = getRandomNumbers(selectValue, 1, d);

    azonosElemek = [...new Set(gepiszamok)].filter(szam => keziszamok.includes(szam));

    eredmenyKiiras();
}

function eredmenyKiiras() {
    document.getElementById('vegeredmeny1').textContent = `Gépi számok: ${gepiszamok.sort((a, b) => a - b)}`;
    document.getElementById('vegeredmeny2').textContent = `Kézi számok: ${keziszamok.sort((a, b) => a - b)}`;
    document.getElementById('vegeredmeny3').textContent = `Azonos számok: ${azonosElemek.sort((a, b) => a - b)}`;
    document.getElementById('vegeredmeny4').textContent = `Találatok száma: ${azonosElemek.length}`;
}
// játék indítása
function jatekInditas() {
    mezoGeneralas();
}

// új játék 
function reset() {
    const form = document.querySelector('.game-area');
    form.innerHTML = "";

    const box1 = document.getElementById('vegeredmeny1');
    box1.textContent = 'Gépi számok:';

    const box2 = document.getElementById('vegeredmeny2');
    box2.textContent = 'Kézi számok:';

    const box3 = document.getElementById('vegeredmeny3');
    box3.textContent = 'Azonos elemek:';

    const box4 = document.getElementById('vegeredmeny4');
    box4.textContent = 'Találatok száma:';
}

// események kezelése
start.addEventListener('click', function() {
    start.disabled = true
});

ellenőrzés.addEventListener('click', function() {
    ellenőrzés.disabled = true
});

újra.addEventListener('click', function() {
    start.disabled = false;
    ellenőrzés.disabled = true
    addWarning.innerHTML = "";
});

