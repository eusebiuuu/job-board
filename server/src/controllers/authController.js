const { StatusCodes } = require("http-status-codes");

const register = (req, res) => {
    return res.status(StatusCodes.CREATED).json({
        msg: 'Register user',
    });
}

const login = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Login user',
    });
}

const showCurrentUser = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Show current user'
    });
}

const logout = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Logout user',
    });
}

const verifyEmail = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Verify email',
    });
}

const changeEmail = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Change email',
    });
}

const forgotPassword = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Forgot password',
    });
}

const resetPassword = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Reset password',
    });
}

module.exports = {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    showCurrentUser,
    changeEmail,
};