// Named export - Has a name. Have as many as needed
// Default export - Has no name. You can only have one.

const message = 'this is a message from myModule.js';

const name = 'Bazen';

const location = 'Boston';

const getGreeting = name => {
  return `How's it going ${name}?`;
};

export { message, name, getGreeting, location as default };
