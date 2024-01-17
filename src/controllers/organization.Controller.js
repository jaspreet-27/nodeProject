const organizationServices = require("../services/organization.Service");
const createOrganization = async (req, res) => {
  const result = await organizationServices.Organization(req.body);
  console.log()
  if (result) {
    res.send(result);
    console.log(result);
  } else {
    res.status(403).json(result);
  }
};

const getOrganizationById = async (req, res) => {
  let { id } = req.params.id;

  try {
    const org = await organizationServices.getOrganizationById(id);
    if (org) {
      res.send(org);
      console.log(org);
    }
  } catch (error) {
    res.status(403).json(org);
  }
};
module.exports = { createOrganization, getOrganizationById };
