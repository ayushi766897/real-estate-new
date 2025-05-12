const bcrypt = require('bcryptjs');

// Hashed password from MongoDB
const hashedPassword = "$2a$10$7Q2YkHjOKmJ1bYv0lF2taeL8H1ldj90.EAEPTuTfY98wXQ6vKwJkK";

// Plain text password (admin123)
const passwordToTest = "admin1234";

bcrypt.compare(passwordToTest, hashedPassword, (err, isMatch) => {
    if (err) {
        console.log("Error:", err);
    } else if (isMatch) {
        console.log("✅ Password matches!");
    } else {
        console.log("❌ Password does NOT match!");
    }
});
