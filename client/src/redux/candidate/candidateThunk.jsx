import customFetch from "../../lib/customFetch";

export const editCandidateThunk = async (candidateID, thunkAPI) => {
  const candidate = thunkAPI.getState().candidate;
  console.log(candidate);
  try {
    const response = await customFetch.patch(`/candidates/${candidateID}`, { candidate });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const getSingleCandidateThunk = async (candidateID, thunkAPI) => {
  if (candidateID) {
    try {
      const response = await customFetch.get(`/candidates/${candidateID}`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  } else {
    //
  }
}

export const getCandidatesThunk = async (jobID, thunkAPI) => {
  try {
    const response = await customFetch.get(`/jobs/candidates/${jobID}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}