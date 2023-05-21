import customFetch from "../../lib/customFetch";

export const editCandidateThunk = async (candidateID, thunkAPI) => {
  const candidate = thunkAPI.getState().candidate;
  console.log(candidate);
  try {
    const response = await customFetch.patch(`/candidates/${candidateID}`, { candidate });
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const getSingleCandidateThunk = async (candidateID, thunkAPI) => {
  try {
    const response = await customFetch.get(`/candidates/${candidateID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const deleteCandidateThunk = async (candidateID, thunkAPI) => {
  try {
    const response = await customFetch.delete(`/candidates/${candidateID}`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data);
  }
}