
const OrganizationModel = require("../models/organization");
const userModel = require("../models/user.Schema")
const linkModel = require("../models/linkUserWithOrg")

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
    console.log(organizationData)
  
    const organization = await OrganizationModel.create(organizationData);
    console.log(organizationData)
    if( organization)  
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


const getOrganizationById = async (id) => {
  try {
    const organizationDetails = await linkModel.aggregate(
      [
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: 'organization', 
          localField: 'organization_id',
          foreignField: '_id',
          as: 'links',
        },
      },

      {
        $lookup: {
          from: 'user', 
          localField: 'user_id',
          foreignField: '_id',
          as: 'userdetails',
        },
      },
      {
        $project: {
          name: 1,   
          linkedUsers: '$users', 
        },
      },
    ]);

    if (organizationDetails.length === 0) {
      return {
        status: false,
        error: 'Organization not found.',
      };
    }

    return {
      status: true,
      data: organizationDetails[0],
      message: 'Organization details retrieved successfully.',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};












// const getOrganizationById = async (id) => {
//   try {
//     const organizationDetails = await OrganizationModel.aggregate([
//       {
//         $match: {
//           _id: id,
//         },
//       },
//       {
//         $lookup: {
//           from: 'linkModel',
//           localField: '_id',
//           foreignField: 'organization_id',
//           as: 'links',
//         },
//       },
//       {
//         $lookup: {
//           from: 'userModel',
//           let: { user_ids: '$links.user_id' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $in: ['$_id', '$$user_ids'],
//                 },
//               },
//             },
//           ],
//           as: 'users',
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           linkedUsers: '$users',
//         },
//       },
//     ]);

//     if (organizationDetails.length === 0) {
//       return {
//         status: false,
//         error: 'Organization not found.',
//       };
//     }

//     return {
//       status: true,
//       data: organizationDetails[0],
//       message: 'Organization details retrieved successfully.',
//     };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };



module.exports = {
  Organization, getOrganizationById  
};  
