const bcrypt = require('bcryptjs');

const password = 'admin@123';
const saltRounds = 10;  // You can adjust this value

// Generate the hash
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log("Hashed Password:", hash);
});
