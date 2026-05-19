const Complaint =
require('../models/Complaint');



// Apply Complaint Page
exports.applyComplaintPage =
async (req, res) => {

    res.render(
        'apply-complaint',
        {
            title:
            'APPLY COMPLAINT'
        }
    );
};



// Submit Complaint
exports.submitComplaint =
async (req, res) => {

    if (!req.user) {

        return res.redirect(
            '/signin'
        );
    }

    const {

        studentName,

        roomNumber,

        category,

        priority,

        description,

        contactNumber

    } = req.body;

    try {

        const newComplaint =
        new Complaint({

            id:
            Date.now()
            .toString(),

            studentName,

            roomNumber,

            category,

            priority,

            description,

            contactNumber,

            user: {

                id:
                req.user.id,

                full_name:
                req.user
                .full_name,

                email:
                req.user
                .email
            },

            status:
            'pending'
        });

        await newComplaint
        .save();

        res.redirect(
            '/previous-complaints'
        );

    } catch (error) {

        console.log(error);

        res.redirect(
            '/apply-complaint'
        );
    }
};



// Previous Complaints
exports.previousComplaints =
async (req, res) => {

    try {

        const complaints =
        await Complaint.find({

            'user.id':
            req.user.id
        });

        res.render(
            'previous-complaints',
            {
                title:
                'PREVIOUS COMPLAINTS',

                complaints
            }
        );

    } catch (error) {

        console.log(error);

        res.render(
            'previous-complaints',
            {
                title:
                'PREVIOUS COMPLAINTS',

                complaints: []
            }
        );
    }
};