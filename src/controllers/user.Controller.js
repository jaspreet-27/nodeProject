

const {createUserSchema,loginUserSchema} = require("../validations/user.Validations")
const userService = require("../services/user.Service")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require("../models/user.Schema")
const activeuser = require("../models/active.Users")


// const createUser = async (req, res) => {
//     const { error } = createUserSchema.validate(req.body);
//     console.log(req.body)
//     if (error) {
//         return res.status(400).json({ error: error.details.map((err) => err.message) });
//     }
//     console.log(req.body)
//     const { email, userName, password, role } = req.body
//     console.log(req.body)
//     try {
//         let checkUser = await userModel.findOne({ "$or": [{ email: email }, { userName: userName } ,{role: role}] })
//         if (!checkUser) {
//             const salt = await bcrypt.genSalt(10)  
//             const passwordHash = await bcrypt.hash(password, salt)

//             const user = await userModel.create({
//                 ...req.body,
//                 password: passwordHash
//             })
//             res.send({
//                 data: user,
//                 message: "User created  succesfully...",
//                 status: 200
//             })
//         }
//         else {
//             res.status(403).json({ status: false, error: "user already exist" })
//         }
//     } catch (error) {
//     }
// }
const createUser = async (req, res) => {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    const result = await userService.createUser(req.body);

    if (result.status) {
        res.send(result);
    } else {
        res.status(403).json(result);
    }
};

// const loginUser = async (req, res) => {
//     console.log("im login")
//     const { error } = loginUserSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({ error: error.details.map((err) => err.message) });
//     }
//     const { email, password } = req.body
//     try {
//         const user = await userModel.findOne({ email: email })
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
// }
// const   loginUser= async (req, res) => {
//     const { error } = loginUserSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({ error: error.details.map((err) => err.message) });
//     }

//     const { email, password } = req.body;

//     const loginResult = await userService.loginUser(email, password);

//     if (loginResult.status) {
//         res.send(loginResult);
//     } else {
//         res.status(403).json(loginResult);
//     }
// };

const loginUser = async (req, res) => {
    console.log("im login");
    const { error } = loginUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            // Check if the user is in the active list
            // const isActive = await activeuser.findOne({ user: user._id });

            // if (isActive) {
            //     res.status(403).json({ status: false, error: "User is in the active list. Cannot log in." });
            //     return;
            // }

            let isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
                res.send({
                    data: { user, token },
                    status: true,
                });

                const isActive = await activeuser.findOne({ user: user._id });

                if (isActive) { 
                    res.status(403).json({ status: false, error: "User is in the active list. Cannot log in." });
                    return;
                }
                 const activeUser = new activeuser({ user: user._id });
                await activeUser.save();
    
            } else {
                let responseObj = { status: 403, json: { status: false, error: "Password/email not correct" } };
                res.responseObj = responseObj;
                next(res);
            }
        } else {
            res.status(403).json({ status: false, error: "Password/email not correct" });
        }
    } catch (error) {
        console.error(error);
        // Handle other errors or simply propagate the error
        res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};



module.exports = {createUser,  loginUser}