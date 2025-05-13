import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchDrivers, fetchDriverDetails, fetchDriverRaces } from '../services/api';
import { Race } from '../types';

export interface Driver {
  driverId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  url: string;
}

interface DriverState {
  list: Driver[];
  selectedDriver: Driver | null;
  currentPage: number;
  total: number;
  loading: boolean;
  error: string | null;
  races: Race[];
}

const initialState: DriverState = {
  list: [],
  selectedDriver: null,
  races: [],
  currentPage: 0,
  total: 0,
  loading: false,
  error: null,
};

export const getDrivers = createAsyncThunk(
  'drivers/getDrivers',
  async (page: number) => {
    return await fetchDrivers(page);
  }
);

export const getDriverDetails = createAsyncThunk(
  'drivers/getDriverDetails',
  async (driverId: string) => {
    return await fetchDriverDetails(driverId);
  }
);

export const getDriverRaces = createAsyncThunk(
  'drivers/getDriverRaces',
  async (driverId: string) => {
    const response = await fetchDriverRaces(driverId);
    return response.RaceTable.Races;
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDrivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load drivers';
        state.loading = false;
      })
      .addCase(getDriverDetails.fulfilled, (state, action) => {
        state.selectedDriver = action.payload;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.list = action.payload.data.DriverTable.Drivers;
        state.total = parseInt(action.payload.data.total);
        state.currentPage = action.meta.arg;
        state.loading = false;
        state.error = null;
      })
      .addCase(getDriverRaces.fulfilled, (state, action) => {
        state.races = action.payload;
      });
  },
});

export const { setCurrentPage } = driversSlice.actions;

export default driversSlice.reducer;