import { Driver, Race } from "../types";

export interface DriverState {
  list: Driver[];
  selectedDriver: Driver | null;
  races: Race[];
  currentPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export interface RacesState {
  list: Race[];
  currentPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  drivers: DriverState;
  races: RacesState;
}