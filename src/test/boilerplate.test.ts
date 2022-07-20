test('test', () => {
  const initial = 'test';

  expect(test).not.toBe('test');
});

test('boilerplate', () => {
  expect('boilerplate').not.toBe('real');
})