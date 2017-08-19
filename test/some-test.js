import test from 'ava';
 
test('that arrays deeply equal', t => {
    t.deepEqual([1, 2], [1, 2]);
});