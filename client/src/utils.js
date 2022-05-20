export const shortAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const addressZero = "0x0000000000000000000000000000000000000000";

export const date = (timestamp) => {
  var x = new Date(timestamp * 1000);
  // return `${x.getDate()}/${x.getMonth()}, ${x.toLocaleTimeString()}`;
  return `${x.toLocaleDateString()}, ${x.toLocaleTimeString()}`;
};

export const date2 = (timestamp) => {
  var x = new Date(timestamp * 1000);
  return `${x.getDate()}/${x.getMonth()}, ${x.toLocaleTimeString()}`;
};
