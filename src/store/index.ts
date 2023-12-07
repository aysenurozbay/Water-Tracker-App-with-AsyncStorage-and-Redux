import { configureStore } from '@reduxjs/toolkit'
import { waterTracker } from './waterTracker'

export const store = configureStore({
  reducer: {
    waterTracker: waterTracker.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
