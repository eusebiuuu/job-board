import { StatusCodes } from 'http-status-codes';

const checkout = (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Checkout',
    });
}

const getSingleCompany = async (req, res) => {
    const companyID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Get company with id ${companyID}`,
    });
}

const editCompany = async (req, res) => {
    const companyID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Edit company with id ${companyID}`,
    });
}

const deleteCompany = async (req, res) => {
    const companyID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Delete company with id ${companyID}`,
    });
}

const createCompany = async (req, res) => {
    const curCompany = req.body.company;
    return res.status(StatusCodes.OK).json({
        msg: `Add company`,
        company: curCompany,
    });
}

export {
    createCompany,
    getSingleCompany,
    checkout,
    deleteCompany,
    editCompany
}