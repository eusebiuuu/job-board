import { StatusCodes } from 'http-status-codes'

const getAllJobs = async (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: 'Get all jobs',
    });
}

const getSingleJob = async (req, res) => {
    const jobId = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Get job with id ${jobId}`,
    });
}

const editJob = async (req, res) => {
    const jobID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Edit job with id ${jobID}`,
    });
}

const deleteJob = async (req, res) => {
    const jobID = req.params.id;
    return res.status(StatusCodes.OK).json({
        msg: `Delete job with id ${jobID}`,
    });
}

const addJob = async (req, res) => {
    const curJob = req.body.job;
    return res.status(StatusCodes.CREATED).json({
        msg: `Add job`,
        job: curJob
    });
}

const getAppliedJobs = async (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: `Get all applied jobs`,
    });
}

const getAllAnnouncements = async (req, res) => {
    return res.status(StatusCodes.OK).json({
        msg: `Get all announcements`,
    });
}

export {
    addJob,
    getAllAnnouncements,
    getAllJobs,
    getAppliedJobs,
    getSingleJob,
    editJob,
    deleteJob
}