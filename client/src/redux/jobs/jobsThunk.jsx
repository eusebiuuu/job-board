import customFetch from "../../lib/customFetch";

export const getAllJobsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs');
    console.log(resp);
    return resp.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
};

export const getAllAnnouncementsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs/announcements');
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
}

