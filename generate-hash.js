const bcrypt = require('bcryptjs');

const password = 'teste';

bcrypt.hash(password, 12).then(hash => {
  console.log('Password:', password);
  console.log('Hash:', hash);
});
