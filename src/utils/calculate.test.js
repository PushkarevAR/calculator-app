import calculate from './calculate';

it('sum calculation tests:', () => {
  expect(calculate('0+0')).toEqual(0);
  expect(calculate('1+0')).toEqual(1);
  expect(calculate('10+1')).toEqual(11);
  expect(calculate('10+-5')).toEqual(5);
});

it('subtraction calculation tests:', () => {
  expect(calculate('1-0')).toEqual(1);
  expect(calculate('10-1')).toEqual(9);
  expect(calculate('10--1')).toEqual(11);
  expect(calculate('0-1')).toEqual(-1);
});

it('multiplication calculation tests:', () => {
  expect(calculate('1*0')).toEqual(0);
  expect(calculate('10*2')).toEqual(20);
  expect(calculate('10*-1')).toEqual(-10);
});

it('division calculation tests:', () => {
  expect(calculate('1/2')).toEqual(0.5);
  expect(calculate('10/-2')).toEqual(-5);
  expect(calculate('10/1')).toEqual(10);
});

it('calculation tests:', () => {
  expect(calculate('1+2*(2+3)')).toEqual(11);
  expect(calculate('20/4*(2-1)')).toEqual(5);
});
