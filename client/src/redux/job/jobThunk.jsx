import customFetch from "../../lib/customFetch";

export const createJobThunk = async (_, thunkAPI) => {
  const job = thunkAPI.getState().job;
  // console.log(job);
  try {
    const response = await customFetch.post('/jobs', { job });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
}

export const getSingleJobThunk = async (jobID, thunkAPI) => {
  try {
    const response = await customFetch.get(`/jobs/${jobID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
}

export const editJobThunk = async (jobID, thunkAPI) => {
  const job = thunkAPI.getState().job;
  console.log(job);
  try {
    const response = await customFetch.patch(`/jobs/${jobID}`, { job });
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
}

export const deleteJobThunk = async (jobID, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/jobs/${jobID}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
}