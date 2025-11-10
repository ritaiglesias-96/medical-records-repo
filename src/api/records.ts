import { Patient } from '../types';

export const fetchPatients = async (): Promise<Patient[]> => {
  const res = await fetch(`https://63bedcf7f5cfc0949b634fc8.mockapi.io/users`);
  if (!res.ok) throw new Error('Failed to fetch patients data');

  const data: Patient[] = await res.json();
  return data;
};
