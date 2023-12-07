import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData, updateData } from '../helpers/AsyncStorageHelper'

export interface WaterTrackerState {
  waterAmount: number
}

const initialState: WaterTrackerState = {
  waterAmount: 0,
}
export const fetchInitialData = createAsyncThunk('waterTracker/fetchInitialData', async (_, { rejectWithValue }) => {
  try {
    const retrievedData = await getData() // AsyncStorage'den veriyi alma
    return retrievedData
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateAsyncStorageData = createAsyncThunk('yourSlice/setAsyncStorageData', async (data, { rejectWithValue }) => {
  try {
    await updateData(data) // AsyncStorage'e veriyi kaydet
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const waterTracker = createSlice({
  name: 'waterTracker',
  initialState,
  reducers: {
    updateAmount: (state, action: PayloadAction<{ amount: number }>) => {
      state.waterAmount += action.payload.amount
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      // AsyncStorage'den alınan veriyi kullanarak durumu güncelle
      state.waterAmount = action.payload
    })
  },
})
