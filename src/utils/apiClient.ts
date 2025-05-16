import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.drfinancas.com/testes',
  headers: {
    Authorization: '87451e7c-48bc-48d1-a038-c16783dd404c'
  }
});