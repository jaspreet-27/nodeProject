const Link = require("../models/linkUserWithOrg");
const organizationModel = require("../models/organization");
const userModel = require("../models/user.Schema");



const createLinkUser = async (user_id, organization_id) => {
  try {
    const user = await userModel.findById(user_id);
    const organization = await organizationModel.findById(organization_id);

    if (!user || !organization) {
      return {
        status: false,
        error: "User or organization not found.",
      };
    }
    const existingLink = await Link.findOne({
      user_id: user._id,
      organization_id: organization._id,
    });
    if (existingLink) {
      return {
        status: false,
        error: "Link already exists.",
      };
    }
    const result = await Link.create({
      user_id: user._id,
      organization_id: organization._id,
    });

    return {
      status: true,
      data: {
        user_id: user._id,
        organization_id: organization._id,
        link_id: result._id,
      },
      message: "User linked to organization successfully.",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }  
};
module.exports = {createLinkUser};

