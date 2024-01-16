const service = require("../services/linkUserWithOrg")

// const linkUser= async(req,res) =>{
//     try {
//         const link = await service.createlinkUser(req.body)
//         if(link){
//             res.send({
//                 status :ture,
//                 message : success
//             })
//         }

//     } catch (error) {
//         res.send({
//             status :false,
//             message : error.message  
//         })
        
//     }
// }

const linkUser = async (req, res) => {
    try {
        const { user_id, organization_id } = req.body;

        const link = await service.createlinkUser(user_id, organization_id );

        res.json({
            status: true,
            message: 'User linked to organization successfully....',
            data:link,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {linkUser};