import { AxiosResponse } from 'axios';

/* eslint-disable semi */
export default interface RequestException {
  response: ResponseRequestException;
}

interface ResponseRequestException {
  data: DataResponseRequestException;
  status: number;
  statusText: string;
}

interface DataResponseRequestException {
  name: string;
  message: string;
  stack: string;
  status: boolean;
}
