import customFetch from "../../lib/customFetch";

export const getAllJobsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs');
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const getAllAnnouncementsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs/announcements');
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const getAppliedJobsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/applications');
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}
