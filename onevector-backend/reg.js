const bcrypt = require('bcrypt');

async function hashPassword() {
    const password = 'your_plain_text_password'; // Replace with the desired password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword); // Use this hashed password for registration
}

// Invoke the async function
hashPassword().catch(console.error);
