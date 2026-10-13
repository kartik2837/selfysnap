const UserService = require('../services/UserService');
const UserError = require('../exceptions/UserError');

const getUserProfileByJwt = async (req, res) => {
    try {

        const user = await req.user;
        return res.status(200).json(user);
    } catch (err) {
        handleErrors(err, res);
    }
};

const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await UserService.findUserByEmail(email);
        return res.status(200).json(user);
    } catch (err) {
        handleErrors(err, res);
    }
};

const User = require('../models/User');

const updateProfile = async (req, res) => {
    try {
        const { fullName, mobile } = req.body;
        const userId = req.user._id;

        const updated = await User.findByIdAndUpdate(
            userId,
            { ...(fullName && { fullName }), ...(mobile && { mobile }) },
            { new: true }
        ).select('-password');

        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updated);
    } catch (err) {
        handleErrors(err, res);
    }
};

const handleErrors = (err, res) => {
    if (err instanceof UserError) {
        return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};

// Export the controller methods
module.exports = {
    getUserProfileByJwt,
    getUserByEmail,
    updateProfile,
};
