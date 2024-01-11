

const {createUserSchema} = require("../validations/user.Validations")
const userService = require("../services/user.Service")


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


module.exports = {createUser}