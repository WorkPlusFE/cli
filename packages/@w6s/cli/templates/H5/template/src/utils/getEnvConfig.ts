import axios from 'axios';

export default (): Promise<string> => {
  if (process.env.NODE_ENV === 'production') {
    return new Promise((resolve) => {
      axios.get('config.json').then(({ data }) => {
        resolve(data.VUE_APP_BASE_API);
      });
    });
  }
  return new Promise((resolve) => {
    resolve(process.env.VUE_APP_BASE_API as string);
  });
};
