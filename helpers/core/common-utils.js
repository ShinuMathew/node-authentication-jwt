const bcrypt = require('bcrypt');

class CommonUtils {

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // await bcrypt.hash(password, 10)  /* generates a salt of 'n' rounds automatically based on the second arg */      
        return hashedPassword.trim();
    }

    async comparePassword(enteredPassword, actualPassword) {
        return await bcrypt.compare(enteredPassword, actualPassword);
    }
}

module.exports = CommonUtils;