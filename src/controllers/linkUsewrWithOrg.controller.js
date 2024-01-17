
const service = require("../services/linkUserWithOrg");
// const Link = require("../models/linkUserWithOrg");

const linkUser = async (req, res) => {
  try {
    const { user_id, organization_id } = req.body;
    const link = await service.createLinkUser(user_id, organization_id);
    res.json({
      status: true,
      message: "User linked to organization successfully.",
      data: link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = { linkUser };  

