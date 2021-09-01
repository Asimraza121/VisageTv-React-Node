import axios from "axios";
import { StorageKeys } from "../Storage";

export function headersPost(url, data) {
  const token = localStorage.getItem(StorageKeys?.token);
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function simplePost(url, data) {
  return axios.post(url, data);
}

export function simpleGet(url) {
  return axios.get(url);
}
export function headersGet(url) {
  const token = localStorage.getItem(StorageKeys?.token);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function headersDel(url) {
  const token = localStorage.getItem(StorageKeys?.token);
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function headersUpdate(url, data) {
  const token = localStorage.getItem(StorageKeys?.token);
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
