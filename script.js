function jatekInditas() {
    const e = parseInt(document.getElementById('jatekTípus').value);

    let lotto = [];
    for (let szam = 1; szam <= e; szam++) {
        lotto.push(szam);
    }

    let keziszamok = [];
    let d;
    if (e === 35) {
        d = 7;
    } else if (e === 45) {
        d = 6;
    } else if (e === 90) {
        d = 5;
    }

    for (let a = 0; a < d; a++) {
        const szam = parseInt(prompt(`Add meg a(z) ${a + 1}. számot:`));
        keziszamok.push(szam);
    }

    function getRandomNumbers(count, min, max) {
        if (count > max - min + 1) {
            console.error("Nem generálható ennyi ismétlés nélküli szám a megadott tartományban.");
            return [];
        }

        const numbers = new Set();

        while (numbers.size < count) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNum);
        }

        return Array.from(numbers);
    }

    const gepiszamok = getRandomNumbers(d, 1, e);

    const azonosElemek = [...new Set(gepiszamok)].filter(szam => keziszamok.includes(szam));

    const ujTartalom1 = ` ${gepiszamok.sort((a, b) => a - b)}`;
    document.getElementById('vegeredmeny1').innerHTML += ujTartalom1;

    const ujTartalom2 = ` ${keziszamok.sort((a, b) => a - b)}`;
    document.getElementById('vegeredmeny2').innerHTML += ujTartalom2;

    const ujTartalom3 = ` ${azonosElemek.sort((a, b) => a - b)}`;
    document.getElementById('vegeredmeny3').innerHTML += ujTartalom3;

    const ujTartalom4 = ` ${azonosElemek.length}`;
    document.getElementById('vegeredmeny4').innerHTML += ujTartalom4;
}

function reset() {
    const box1 = document.getElementById('vegeredmeny1');
    box1.textContent = 'Gépi számok:';

    const box2 = document.getElementById('vegeredmeny2');
    box2.textContent = 'Kézi számok:';

    const box3 = document.getElementById('vegeredmeny3');
    box3.textContent = 'Azonos elemek:';

    const box4 = document.getElementById('vegeredmeny4');
    box4.textContent = 'Találatok száma:';
}

