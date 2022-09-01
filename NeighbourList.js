// A függvény elkészíti a gráfalgoritmushoz szükséges szomszédossági listát. Egy objektumot ad vissza,
// amiben az inputként megadott szóközzel elválasztott szavak szerepelnek kulcsként, valamint értékként
// a láncban melléjük fűzhető szavak egy-egy listában.
function createNeighbourList(input) {
    let words = input.split(' ');
    let neighbourList = {};
    for (let i = 0; i < words.length; i++) {
        neighbourList[words[i]] = [];
    }
    for (let i = 0; i < words.length - 1; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (stringCompare(words[i], words[j])) {
                neighbourList[words[i]].push(words[j])
                neighbourList[words[j]].push(words[i])
            }
        }
    }
    return neighbourList;
}

// A függvény eldönti, hogy a paraméterül megadott 2 szó között 1 karakter-e az eltérés.
// Minden szót adit vizsgálok, míg nincsen benne két eltérés vagy az egyik végére nem érek.
// ha találok egy eltérést akkor a hosszabb szóban egyel növelem az indexet, ha a két szó ugyanolyan hosszú, akkor
// mindkét indexet növelem. Végül ellenőrzöm, hogy az utolsó karakter nem hibádzik-e, ezt a cikluson kívül.
function stringCompare(word1, word2) {
    let lengthDiff = Math.abs(word1.length - word2.length);
    if (lengthDiff > 1) {
        return false;
    }
    let i = 0;
    let j = 0;
    let difference = 0;

    while (difference < 2 && word1.length > i && word2.length > j) {
        if (word1[i] == word2[j]) {
            ++i;
            ++j;
        } else if (word1.length > word2.length) {
            ++i;
            ++difference;
        } else if (word2.length > word1.length) {
            ++j;
            ++difference;
        } else {
            ++i;
            ++j;
            ++difference;
        }
    }
    if (i != word1.length && j != word2.length && difference < 2) {
        ++difference;
    }
    if (difference < 2) {
        return true;
    } else {
        return false;
    }
}

module.exports.createNeighbourList = createNeighbourList;
module.exports.stringCompare = stringCompare;