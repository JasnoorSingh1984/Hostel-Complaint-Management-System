const express =
require('express');

const router =
express.Router();

const authMiddleware =
require(
'../middlewares/authMiddleware'
);

const complaintController =
require(
'../controllers/complaintController'
);



// Apply Complaint
router.get(

    '/apply-complaint',

    authMiddleware,

    complaintController
    .applyComplaintPage
);



// Submit Complaint
router.post(

    '/submit-complaint',

    authMiddleware,

    complaintController
    .submitComplaint
);



// Previous Complaints
router.get(

    '/previous-complaints',

    authMiddleware,

    complaintController
    .previousComplaints
);

module.exports =
router;