const NeighbourList = require('./NeighbourList');
const ChainMaker = require('./ChainMaker');
const NoChainError = require('./NoChainError');

test('Szólánc készítésének tesztelése', () => {
    let neighbourList = NeighbourList.createNeighbourList('karo mikro maro makro kar kap');
    expect(ChainMaker.chainMaker(neighbourList)).toBe = ('mikro makro maro karo kar kap');

    neighbourList = NeighbourList.createNeighbourList('barni smarni bari ari kari marni');
    expect(ChainMaker.chainMaker(neighbourList)).toBe = ('smarni marni barni bari ari kari');

    neighbourList = NeighbourList.createNeighbourList('pia rita vita zita pita pip pipa');
    expect(ChainMaker.chainMaker(neighbourList)).toBe = ('pip pia pipa pita rita vita zita');

    neighbourList = NeighbourList.createNeighbourList('sali barni pali barbi barmi bali');
    expect(() => ChainMaker.chainMaker(neighbourList))
    .toThrow(new NoChainError('hiba: a megadott szavakból nem lehetséges szóláncot építeni!'));
});

test('Szólánc létezés vizsgálatának tesztelése', () => {
    let neighbourList = NeighbourList.createNeighbourList('pari barni bari sanyi');
    expect(() => ChainMaker.existsWordChain(neighbourList))
        .toThrow(new NoChainError('hiba: a megadott szavakból nem lehetséges szóláncot építeni!'));

    neighbourList = NeighbourList.createNeighbourList('pari barni bari bar bab');
    expect(() => ChainMaker.existsWordChain(neighbourList))
        .toThrow(new NoChainError('hiba: a megadott szavakból nem lehetséges szóláncot építeni!'));

    neighbourList = NeighbourList.createNeighbourList('mikro makro maro karo kar kap');
    expect(ChainMaker.existsWordChain(neighbourList)).toBe(true);
    
    neighbourList = NeighbourList.createNeighbourList('barni smarni bari ari kari marni');
    expect(ChainMaker.existsWordChain(neighbourList)).toBe(true);
});

