// const createUserSchema = require('../validators/createUserSchema');
const userModel = require("../models/user.Schema")
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    const { email, userName, password, role } = userData;

    try {
        let checkUser = await userModel.findOne({
            "$or": [{ email: email }, { userName: userName }, { role: role }]
        });

        if (!checkUser) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await userModel.create({
                email: email,
                userName: userName,
                password: passwordHash, // Store hashed password
                role: role
            });

            return {
                data: user,
                message: "User created successfully...",
                status: 200
            };
        } else {
            return {
                status: false,
                error: "User already exists"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error: "Internal Server Error"
        };
    }
};

module.exports = {
    createUser
};
