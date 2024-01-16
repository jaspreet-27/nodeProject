
const OrganizationModel = require("../models/organization");
const userModel = require("../models/user.Schema")

const Organization = async (organizationData) => {
  try {
    const existingOrganization = await OrganizationModel.findOne({
      name: organizationData.name,
    });
    if (existingOrganization) {
      return {
        status: false,
        error: "Organization with this name already exists.",
      };
    }
    const organization = await OrganizationModel.create(organizationData);
    return {
      status: true,    
      data: organization,  
      message: "Organization created successfully.",
    };
  } catch (error) {
    console.error(error);  
    return {
      status: false,
      error: "Internal Server Error",
    };
  }
};
   
module.exports = {
  Organization,   
};  
