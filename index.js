const prompt = require('prompt-sync')();
const NeighbourList = require('./NeighbourList');
const ChainMaker = require('./ChainMaker');

let input = prompt('Kérlek add meg a szólánc szavait:');
input = input.replace(/\s\s+/g, ' ').trim();

let neighbourList = NeighbourList.createNeighbourList(input);

try {
    ChainMaker.existsWordChain(neighbourList);
    console.log(ChainMaker.chainMaker(neighbourList));
} catch (err) {
    console.log(err.message);
}

