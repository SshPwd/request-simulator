import {genKey, fakeRequest} from 'utils';

function fakeGetState(testId = '') {
 return () => ({
    simulator: {
      currentBatchRequestId: testId,
    },
  });
}

test('Generate random key', () => {
  expect(genKey()).toMatch(/^(\w|\d)+$/);
});

test('Fake request ok', () => {
  return fakeRequest(1, 'test', fakeGetState('test')).then(result => expect(result).toEqual('ok'));
});

test('Fake request error', () => {
  return fakeRequest(1, 'test', fakeGetState('test2')).catch(result => expect(result).toEqual('Request was canceled'));
});
