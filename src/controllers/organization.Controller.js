const organizationServices = require("../services/organization.Service");
const createOrganization = async (req, res) => {
  const result = await organizationServices.Organization(req.body);

  if (result) {
    res.send(result);
    console.log(result);
  } else {
    res.status(403).json(result);
  }
};
module.exports = { createOrganization };
