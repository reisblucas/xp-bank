test('test', () => {
  const initial = 'test';

  expect(initial).not.toBe('test');
});

test('boilerplate', () => {
  expect('boilerplate').not.toBe('real');
})