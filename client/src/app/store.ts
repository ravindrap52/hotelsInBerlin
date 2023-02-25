import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from '../features/hotels/hotelsSlice';

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;