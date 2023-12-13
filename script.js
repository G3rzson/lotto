

// ez történjen játék inditáskor
function jatekInditas() {
        // melyik játékot választottuk
    const select = document.getElementById('jatekTípus');
    const selectedValue = parseInt(select.value);
        //console.log(selectedValue)

        // érték átalakítása mezők generálásához
    let d;
    if (selectedValue === 35) {
        d = 7;
            //console.log('7')
    } else if (selectedValue === 45) {
        d = 6;
            //console.log('6')
    } else if (selectedValue === 90) {
        d = 5;
            //console.log('5')
    }

        // az új űrlap létrehozása
    var form = document.createElement('form');
    form.id = 'form';
    form.className = 'form';

        // űrlap elemek hozzáadása
    for (let i = 0; i < d; ++i) {
        var input = document.createElement('input');
        input.id = `mezo_${ i + 1 }`;
        input.className = 'input-mezo';
        input.type = 'text';
        input.placeholder = `${ i + 1 }. szám:`;
        form.appendChild(input);

            // Az input mezőkhöz eseménykezelő hozzáadása
        input.addEventListener('input', function () {
                // Azonnali ellenőrzés
            let ertek = parseInt(this.value, 10); // Az input értékének számmá alakítása

            if (isNaN(ertek)) {
                    // Ha nem számot írtak be, kezeljük le ezt az esetet
                    //console.log('Hibás szám!');
                this.style.backgroundColor = 'coral'; 
            } else {
                    // Szám esetén ellenőrizzük a feltételt
                if (ertek > selectedValue) {
                    this.style.backgroundColor = 'coral';
                } else if (ertek === 0) {
                    this.style.backgroundColor = 'coral'; 
                } else if (ertek > 0 && ertek < selectedValue) {
                    this.style.backgroundColor = 'lightgreen'; 
                } 
            }
        });
    }
        // űrlap hozzáadása a "mezok" id-jú elemhez
    var mezokContainer = document.getElementById('mezok');
    mezokContainer.innerHTML = '';  // Törölje a meglévő mezőket
    mezokContainer.appendChild(form);
};
//------------------------------------------------------------------------
    // eredmény hírdetés
function eredmeny() {

    // kézi számok
    function getFormValues() {
        var form = document.getElementById('form'); // A form ID-jét a sajátodra cseréld
        var inputs = form.getElementsByClassName('input-mezo');
        var values = [];

        for (var i = 0; i < inputs.length; i++) {
            values.push(inputs[i].value);
        }

        return values;
    }

    // Példa használat
    var keziszamok = getFormValues();

    let keziszamokint = keziszamok.map(str => parseInt(str, 10));

    // melyik játékot választottuk
    const select = document.getElementById('jatekTípus');
    const selectedValue = parseInt(select.value);

    // érték átalakítása mezők generálásához
    let d;
    if (selectedValue === 35) {
        d = 7;
        //console.log('7')
    } else if (selectedValue === 45) {
        d = 6;
        //console.log('6')
    } else if (selectedValue === 90) {
        d = 5;
        //console.log('5')
    }

    // random számok generálása
    function getRandomNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNum);
        }
        return Array.from(numbers);
    }
    
    var gepiszamok = getRandomNumbers(d, 1, selectedValue);

    const azonosElemek = [...new Set(gepiszamok)].filter(szam => keziszamokint.includes(szam));

// Az eredmények megjelenítése
document.getElementById('vegeredmeny1').textContent = `Gépi számok: ${gepiszamok.sort((a, b) => a - b)}`;
document.getElementById('vegeredmeny2').textContent = `Kézi számok: ${keziszamokint.sort((a, b) => a - b)}`;
document.getElementById('vegeredmeny3').textContent = `Azonos számok: ${azonosElemek.sort((a, b) => a - b)}`;
document.getElementById('vegeredmeny4').textContent = `Találatok száma: ${azonosElemek.length}`;
}
//-----------------------------------------------------------------------
// resetelés
function reset() {
    const box1 = document.getElementById('vegeredmeny1');
    box1.textContent = 'Gépi számok:';

    const box2 = document.getElementById('vegeredmeny2');
    box2.textContent = 'Kézi számok:';

    const box3 = document.getElementById('vegeredmeny3');
    box3.textContent = 'Azonos elemek:';

    const box4 = document.getElementById('vegeredmeny4');
    box4.textContent = 'Találatok száma:';

    const form = document.getElementById('form');
    form.reset();
}
