import axios from 'axios';
import { Race } from '../types';

const API = axios.create({
  baseURL: 'https://ergast.com/api/f1',
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    }
    throw new Error(error.response?.data?.message || 'Network error');
  }
);

const API_URL = 'https://ergast.com/api/f1';

export const fetchDrivers = async (page: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/drivers.json?limit=10&offset=${page * 10}`
    );
    return {
      data: response.data.MRData,
      page // Добавляем номер страницы в ответ
    };
  } catch (error) {
    throw error;
  }
};

export const fetchDriverDetails = async (driverId: string) => {
  try {
    const response = await axios.get(`${API_URL}/drivers/${driverId}.json`);
    return response.data.MRData.DriverTable.Drivers[0];
  } catch (error) {
    throw error;
  }
};

export const fetchRaces = async (driverId: string, page: number): Promise<{
  RaceTable: {
    Races: Race[];
  };
  total: string;
}> => {
  try {
    const response = await axios.get(
      `${API_URL}/drivers/${driverId}/races.json?limit=5&offset=${page * 5}`
    );
    return response.data.MRData;
  } catch (error) {
    throw error;
  }
};

export const fetchDriverRaces = async (driverId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/drivers/${driverId}/races.json?limit=5`
    );
    return response.data.MRData;
  } catch (error) {
    throw error;
  }
};