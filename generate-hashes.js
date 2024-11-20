import bcrypt from "bcryptjs";

// List of plain passwords to hash
const plainPasswords = ["password123", "securePass", "mySecret"]; // Replace these with actual passwords
const saltRounds = 10;

async function generateHashes(passwords) {
    try {
        for (const password of passwords) {
            // Generate a hash for each password
            const hash = await bcrypt.hash(password, saltRounds);
            console.log(`Password: ${password}, Hash: ${hash}`);
        }
    } catch (error) {
        console.error("Error hashing passwords:", error);
    }
}

// run with "node generate_hashes.js"
generateHashes(plainPasswords);
