const NoChainError = require('./NoChainError');

// Gráfalgoritmus, ami megkeres egy Hamilton-útat a gráfban azaz láncot fűz a szavakból.
// Paraméterként gráf szomszádossági listás ábrázolását várja.
function chainMaker(neighbourList) {

    // segéd változók az algoritmushoz
    let keys = Object.keys(neighbourList);
    let start = keys[0];
    let stepCounter = {};
    stepCounter[keys[0]] = 0;

    // megkeressük a legkevesebb szomszéddal rendelkező csúcsot, nyílván ha van olyan szó, amihez csak egy
    // másikat lehet láncolni, akkor onnan kell kezdeni a láncot vagy ott kell befejezni, én most ott kezdem.
    // mellékesként a stepCounter változóba beállítok minden csúcsra egy 0-t, hogy később tudjam számolni
    // ezekkel a már bejárt útakat.
    for (let i = 1; i < keys.length; i++) {
        stepCounter[keys[i]] = 0;
        if (neighbourList[keys[i]].length < neighbourList[start].length) {
            start = keys[i];
        }
    }

    // A kimeneti listának az elejére hozzáfűzöm a kezdőcsúcsot valamint eltárolom aktuális csúcsként.
    let output = [];
    output.push(start);
    let finished = false;
    let actual = start;

    // Az algoritmus szíve, egy átalakított mélységi keresés. Belerakom egy listába a csúcsokat,
    // amiken már áthaladtam, majd a szomszédjaiból a soronkövetkezőbe átmegyek, ha egy csúcsnál elakadok,
    // akkor egy szinttel feljebb megyek, kidobom a listából a csúcsot és az előző csúcs szomszédaiból
    // a következőt nézem.
    // Ezt egészen addig folytatom, míg a listában benne nem lesz az összes csúcs (találok egy láncot),
    // vagy míg a lista ki nem ürül, ekkor nem képezhető lánc az adott szavakból. 
    // A lista stack-ként (veremként) funkcionál. 
    while (!finished) {
        if (stepCounter[actual] == neighbourList[actual].length) {
            stepCounter[actual] = 0;
            output.pop();
            actual = output[output.length - 1];
            ++stepCounter[actual];
        } else if (!output.includes(neighbourList[actual][stepCounter[actual]])) {
            actual = neighbourList[actual][stepCounter[actual]];
            output.push(actual);
        } else if (neighbourList[actual].length > stepCounter[actual]) {
            ++stepCounter[actual];
        }
        if (output.length == Object.keys(neighbourList).length) {
            finished = true;
        }
        if (output.length == 0) {
            throw new NoChainError('hiba: a megadott szavakból nem lehetséges szóláncot építeni!');
        }
    }

    return output.toString().replaceAll(',', ' ');
}


// A függvény ellenőrzi, hogy a gráfalgoritmus lefuttatásának van-e értelme, ha van olyan szó, amihez
// egy másik szót sem lehet fűzni, vagy ha 2-nél több olyan szó van, amihez csak 1-1 kapcsolható
// akkor nem lehet láncot képezni (Nincs Hamilton-út).
// Paraméter a gráf szomszédossági listás ábrázolása.
function existsWordChain(neighbourList) {
    let oneSimilarWord = 0;
    for (let neighbours of Object.values(neighbourList)) {
        if (neighbours.length == 0) {
            throw new NoChainError('hiba: a megadott szavakból nem lehetséges szóláncot építeni!');
        } else if (neighbours.length == 1) {
            ++oneSimilarWord;
        }
    }

    if (oneSimilarWord > 2) {
        throw new NoChainError('hiba: a megadott szavakból nem lehetséges szóláncot építeni!');
    }

    return true;
}

module.exports.chainMaker = chainMaker;
module.exports.existsWordChain = existsWordChain;
