import { useState } from "react";
import axios from "axios";
// import {jwtDecode} from "jwt-decode";
// import dayjs from "dayjs";
// import { useContext } from "react";
import { API_BASE_URL } from "../config";
// import AuthContext from "../contexts/AuthContext";
const baseURL = API_BASE_URL;

const useAxios = () => {
  // const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
      "Content-Type": "multipart/form-data",
    },
  });

  // axiosInstance.interceptors.request.use(async (req) => {
  //   const user = jwtDecode(authTokens.access);
  //   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  //   if (!isExpired) return req;

  //   const response = await axios.post(`${baseURL}/login/refresh/`, {
  //     refresh: authTokens.refresh,
  //   });

  //   localStorage.setItem("authTokens", JSON.stringify(response.data));

  //   setAuthTokens(response.data);
  //   setUser(jwtDecode(response.data.access));

  //   req.headers.Authorization = `Bearer ${response.data.access}`;
  //   return req;
  // });

  return axiosInstance;
};

export default useAxios;
