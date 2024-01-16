const linkModelWithOrg = require("../models/linkUserWithOrg");
const organization = require ("../models/organization")
const user = require("../models/user.Schema")


const createlinkUser = async (user_id, organization_id) => {
    try {
    
        const result = await linkModelWithOrg.create({ user_id, organization_id });

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};
module.exports = {createlinkUser};