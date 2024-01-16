// const createUserSchema = require('../validators/createUserSchema');
const userModel = require("../models/user.Schema")
const bcrypt = require('bcrypt');


const createUser = async (userData) => {
    const { email, userName, password, role } = userData;

    try {
        let checkUser = await userModel.findOne({email: email
            // "$or": [{ email: email }, { userName: userName }, { role: role }]
        });

        if (!checkUser) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await userModel.create({
                email: email,
                userName: userName,
                password: passwordHash, 
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
                error: "email is already exist"
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

//   try {
//         const user = await UserModel.findOne({ email: email })
//         if (user) {
//             let isPasswordValid = await bcrypt.compare(password, user.password)
//             if (!!isPasswordValid) {
//                 const token = jwt.sign({ user_id: user?._id, email }, process.env.TOKEN_KEY);
//                 res.send({
//                     data: { user, token },
//                     status: true
//                 })
//             } else {

//                 let responseObj = { status: 403, json: { status: false, error: "password/email not correct" } }
//                 res.responseObj = responseObj
//                 next(res)
//             }
//         } else {
//             res.status(403).json({ status: false, error: "password/email not correct" })
//         }
//     } catch (error) {
//         // next(error);
//     }
// const loginUser = async (email, password) => {
//     try {
//         const user = await userModel.findOne({ email });

//         if (user) {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
//                 return {
//                     status: true,
//                     data: { user, token },
//                     message: "Login successful",
//                 };
//             } else {
//                 return {
//                     status: false,
//                     error: "Password/email not correct",
//                 };
//             }
//         } else {
//             return {
//                 status: false,
//                 error: "Password/email not correct",
//             };
//         }
//     } catch (error) {
//         console.error(error);
//         return {
//             status: false,
//             error: "Internal Server Error",
//         };
//     }
// };


module.exports = {
    createUser
};
