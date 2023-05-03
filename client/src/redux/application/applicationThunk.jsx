import customFetch from "../../lib/customFetch"

export const getAppliedJobsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/applications');
    console.log(resp);
    return resp.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue('something went wrong');
  }
}