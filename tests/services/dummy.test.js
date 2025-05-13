const dummyFunctions = require('../../src/services/dummy-service');

test('Dummy Service Test Passed', () => {
    const spy = jest.spyOn(dummyFunctions, 'helper').mockImplementation(() => {
        return false;
    });
    const result = dummyFunctions.execute();
    expect(result).toBe('The number is odd');
    spy.mockRestore();
});

test('Dummy Service Test Failed', () => {
    const spy = jest.spyOn(dummyFunctions, 'helper').mockImplementation(() => {
        return true;
    });
    const result = dummyFunctions.execute();
    expect(result).toBe('The number is even');
    spy.mockRestore();
});
