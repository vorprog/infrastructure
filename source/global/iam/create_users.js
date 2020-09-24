const exec = require('../../utilities/exec');

generatePassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; ++i) {
    let randomNumber = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomNumber);
  }
  return password;
}

exec(`aws iam create-user --user-name rsnider`);
exec(`aws iam create-login-profile --user-name rsnider --password ${generatePassword(10)} --password-reset-required`);

exec(`aws iam create-user --user-name mroberts`);
exec(`aws iam create-login-profile --user-name mroberts --password ${generatePassword(10)} --password-reset-required`);

