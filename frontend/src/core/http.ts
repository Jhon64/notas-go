
import axios, {  HeadersDefaults} from "axios";
import { Loading } from "notiflix";
import { Notificacion } from "../helpers/notiflix.helper";


interface IHttp {
  baseURL?: string;
  url: string;
  params?: string | object;
  headers?: HeadersDefaults;
}

export interface IHttpResponse {
  data: any;
  status: number;
  statusText: string;
  error?: string;
}
axios.interceptors.request.use(
  function (config) {
    
    // Do something before request is sent
   //  const token=localStorage.getToken()
   //  config.headers = { 'Content-type': 'application/json' }
   //  if (token) {
   //    config.headers.Authorization = "Bearer " + token;
   //  }
    return config;
  },
  function (error) {
    console.log("error request::", error);
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("response Interceptor ::", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const newResponse = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response) {
      const errorResponse = error.response;
      if (errorResponse.status == 401) {
        window.dispatchEvent(new Event('onLogout'))
        Notificacion.info('Autentíquese nuevamente')
      }
      return Promise.reject({
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        error: errorResponse.data?.message||errorResponse.data?.error||error?.error||error?.message,
      });
    }
    return Promise.reject(error);
  }
);

const parseParamsToString = (params: string | object) => {
  let paramstring = "?";
  if (typeof params == "string") {
    return paramstring + params;
  } else {
    const keys = Object.entries(params);
    for (let [key, value] of keys) {
      console.log("Params HTTP ::", [key, value]);
      return paramstring;
    }
  }
};

export const initialConfig = () => {
  if (window.baseUrlAPI) axios.defaults.baseURL = window.baseUrlAPI;
  else {
    Notificacion.error("No se encontrò la URL BASE API");
    return;
  }
};

export const Http = {
  GET: <T>(url: string, params?: string | object,loading?:boolean): Promise<IHttpResponse> => {
    initialConfig();
    if (params) url += parseParamsToString(params);
    if (loading){
      Loading.circle("Loading...");  
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          const newResponse: IHttpResponse = {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
          };
          Loading.remove();
          resolve(newResponse);
        })
        .catch((err) => {
          Loading.remove();
          console.log("ERROR GET::", err);
          reject(err);
        });
    });
  },
  DELETE: <T>(url: string, params?: string | object,loading?:boolean): Promise<IHttpResponse> => {
    initialConfig();
    if (params) url += parseParamsToString(params);
    if (loading){
      Loading.circle("Loading...");  
    }
    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => {
          const newResponse: IHttpResponse = {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
          };
          Loading.remove();
          resolve(newResponse);
        })
        .catch((err) => {
          Loading.remove();
          console.log("ERROR DELETE::", err);
          reject(err);
        });
    });
  },
  POST: <T>(url: string,data:any, params?: string | object,loading?:boolean): Promise<IHttpResponse> => {
    initialConfig();
    if (params) url += parseParamsToString(params);
    if (loading){
      Loading.circle("Loading...");  
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url,data)
        .then((response) => {
          const newResponse: IHttpResponse = {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
          };
          Loading.remove();
          resolve(newResponse);
        })
        .catch((err) => {
          Loading.remove();
          console.log("ERROR POST::", err);
          reject(err);
        });
    });
  },
  PUT: <T>(url: string,data:any, params?: string | object,loading?:boolean): Promise<IHttpResponse> => {
    initialConfig();
    if (params) url += parseParamsToString(params);
    if (loading){
      Loading.circle("Loading...");  
    }
    return new Promise((resolve, reject) => {
      axios
        .put(url,data)
        .then((response) => {
          const newResponse: IHttpResponse = {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
          };
          Loading.remove();
          resolve(newResponse);
        })
        .catch((err) => {
          Loading.remove();
          console.log("ERROR PUT::", err);
          reject(err);
        });
    });
  },
};