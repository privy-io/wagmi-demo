export const sleep = async (timeout: number) => {
  await new Promise((res) => {
    setTimeout(() => {
      res('');
    }, timeout);
  });
};
