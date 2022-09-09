import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    filterInput(state = initialState, action) {
      const content = action.payload
      return state = content
    },
    resetFilter(state, action) {
      return state = initialState

    }
  }
})

export const { filterInput, resetFilter } = searchFilterSlice.actions
export default searchFilterSlice.reducer
