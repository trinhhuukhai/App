export const isValidEmail = (stringEmail) =>  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))

//validate password

export const isValidPassword = (stringPassword) => stringPassword.length >=3

export const convertToArray = (myString) => myString.split(',');


export const convertMoney = (myString) => myString.toLocaleString();
