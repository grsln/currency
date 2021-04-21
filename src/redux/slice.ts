import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../types";

const initialState: IState["toolkit"] = {
  isLoading: false,
  isError: false,
  repeatLoading: false,
  data: {
    date: "",
    previousDate: "",
    previousUrl: "",
    timestamp: "",
    valute: [],
  },
};

const toolkitSlice = createSlice({
  name: "toolkit",
  initialState,
  reducers: {
    setData(state, action) {
      state.data.date = action.payload["Date"];
      const objValute = action.payload["Valute"];
      state.data.valute = Object.keys(objValute).map((item) => objValute[item]);
    },
    startLoading(state) {
      state.isError = false;
      state.isLoading = true;
      state.repeatLoading = false;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    errorLoading(state) {
      state.isLoading = false;
      state.isError = true;
    },
    loadingData(state) {
      state.repeatLoading = true;
    },
  },
});

export const storeState = (state: IState) => state.toolkit;
export default toolkitSlice.reducer;
export const {
  setData,
  startLoading,
  endLoading,
  errorLoading,
  loadingData,
} = toolkitSlice.actions;
