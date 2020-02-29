import * as Yup from 'yup';

export const genKey = function() {
  return Math.random()
    .toString(36)
    .substring(7);
};

/*
 * Function for Emulator HTTP requests,
 * can be replaced with with native browser fetch API or any AJAX lib
 * */
export const fakeRequest = (delay: number, batchRequestId: string, getState: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getState().simulator.currentBatchRequestId === batchRequestId) {
        resolve('ok');
      } else {
        reject('Request was canceled');
      }
    }, delay * 1000);
  });
};

export const formValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name of request is required'),
  delay: Yup.number()
    .min(1, 'Min delay value is 1 second')
    .max(10, 'Max delay value is 10 seconds')
});