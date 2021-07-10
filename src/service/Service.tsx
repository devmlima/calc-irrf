import axios from "axios";

const BASE_URL = "http://localhost:3000/person";

export const getPerson = async () => {
  return await axios.get(`${BASE_URL}`);
};

export const getPersonById = async (id: number) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

export const postPerson = async (body: any) => {
  return await axios.post(`${BASE_URL}`, body);
};

export const putPerson = async (body: any) => {
  return await axios.put(`${BASE_URL}/${body.id}`, body);
};

export const deletePerson = async (id: number) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};
