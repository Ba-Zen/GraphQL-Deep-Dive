import myCurrentLocation, { getGreeting, message, name } from './myModule';
import add, { subtract } from './math';

console.log(message);
console.log(name);
console.log(myCurrentLocation);
console.log(getGreeting('Bobby'));

console.log(add(2, 4));
console.log(subtract(10, 3));
