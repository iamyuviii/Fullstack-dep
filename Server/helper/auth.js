// Password encryption using bcryptjs
const bcrypt = require('bcryptjs');
const hashPass = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}
const comparePass = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

module.exports = {
    hashPass, comparePass
}
