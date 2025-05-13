import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRaces } from '../services/api';

export interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  Circuit: {
    circuitName: string;
    Location: {
      country: string;
    };
  };
}

interface RacesState {
  list: Race[];
  currentPage: number;
  total: number;
  loading: boolean;
  error: string | null;
  selectedDriverId: string | null;
}

const initialState: RacesState = {
  list: [],
  currentPage: 0,
  total: 0,
  loading: false,
  error: null,
  selectedDriverId: null,
};

export const getRaces = createAsyncThunk(
  'races/getRaces',
  async ({ driverId, page }: { driverId: string; page: number }) => {
    const response = await fetchRaces(driverId, page);
    return {
      data: response.RaceTable.Races,
      total: parseInt(response.total),
      driverId,
      page,
    };
  }
);

const racesSlice = createSlice({
  name: 'races',
  initialState,
  reducers: {
    setSelectedDriver: (state, action: PayloadAction<string>) => {
      state.selectedDriverId = action.payload;
    },
    resetRaces: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRaces.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
        state.selectedDriverId = action.payload.driverId;
        state.loading = false;
      })
      .addCase(getRaces.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load races';
        state.loading = false;
      });
  },
});

export const { setSelectedDriver, resetRaces } = racesSlice.actions;
export default racesSlice.reducer;