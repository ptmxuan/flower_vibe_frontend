import axios from "axios";
import { useState } from "react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

const configAxios = {
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosGetData_ = axios.create(configAxios);

axiosGetData_.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useApi = (endpointUrl) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const get = async (query = "", customEndpoint = "") => {
    setLoading(true);
    // await delay(1000);
    return axiosGetData_
      .get((customEndpoint ? customEndpoint : endpointUrl) + query)
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const post = (payload, customEndpoint = "") => {
    setLoading(true);
    return axiosGetData_
      .post(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .catch((error) => {
        setError(error);
        return error.response.data;
      })
      .finally(() => setLoading(false));
  };

  const put = async (payload, customEndpoint = null) => {
    setLoading(true);
    // await delay(1000);
    return axiosGetData_
      .put(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .catch((error) => {
        setError(error.response?.data || error.message);
        return error.response.data;
      })
      .finally(() => setLoading(false));
  };

  const patch = (payload, customEndpoint = "") => {
    setLoading(true);
    return axiosGetData_
      .patch(customEndpoint ? customEndpoint : endpointUrl, payload)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const del = (payload, customEndpoint = "") => {
    setLoading(true);
    return axiosGetData_
      .delete(customEndpoint ? customEndpoint : endpointUrl, { data: payload })
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return {
    loading,
    data,
    error,
    del,
    get,
    patch,
    post,
    put,
  };
};
