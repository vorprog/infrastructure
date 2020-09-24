module.exports = (length = 10) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; ++i) {
    let randomNumber = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomNumber);
  }
  return password;
};
