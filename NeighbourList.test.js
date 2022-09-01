const NeighbourList = require('./NeighbourList');

test('Szóösszehasonlítás tesztelése', ()=>{
    expect(NeighbourList.stringCompare('Sajtos','Sijtos')).toBe(true);
    expect(NeighbourList.stringCompare('Sajtos','Sjtos')).toBe(true);
    expect(NeighbourList.stringCompare('Sajtos','Sajtosa')).toBe(true);
    expect(NeighbourList.stringCompare('Sajtos','ajtos')).toBe(true);
    expect(NeighbourList.stringCompare('Sajtos','Sajto')).toBe(true);
    expect(NeighbourList.stringCompare('Lekváros','Lkvros')).toBe(false);
    expect(NeighbourList.stringCompare('kapa','sapka')).toBe(false);
});

test('Szomszédsági listakészítés tesztelése', ()=>{
    let result = NeighbourList.createNeighbourList('haj baj sohaj ohaj');
    expect(result['haj'].length).toBe(2);
    expect(result['ohaj'].length).toBe(2);
    expect(result['sohaj'].length).toBe(1);
});