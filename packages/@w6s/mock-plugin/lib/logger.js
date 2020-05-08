require('colors');

module.exports = (message, enable) => {
  if (!enable) return;
  console.log('[MOCK] '.green, message);
};
