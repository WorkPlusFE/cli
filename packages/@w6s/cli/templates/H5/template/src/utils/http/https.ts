import axios, { AxiosResponse } from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  (config) => config,
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

/**
 * 请求接口传参处理
 * @param params 请求接口的传参
 */
export function handleData<T extends Common.PlainObject>(params: T): T {
  const data = Object.create(null);
  // 过滤掉空传参 (undefined || '' || null)
  Object.keys(params).forEach((k) => {
    if (params[k] !== undefined || params[k] !== null || String(params[k]) !== "") {
      data[k] = params[k];
    }
  });
  return data;
}

/**
 * Get请求
 * @export
 * @template T
 * @param {string} url 接口地址
 * @param {Common.PlainObject} [params={}] 接口传参
 * @param {boolean} [cache=false]
 * @returns {Promise<AxiosResponse<T>>}
 */
export function apiGet<T>(
  url: string,
  params: Common.PlainObject = {},
  headers: Common.PlainObject = {}
): Promise<AxiosResponse<T>> {
  // handleHeader
  let param = "?";
  Object.keys(handleData(params)).forEach((key) => {
    param += handleData(params)[key];
  });
  return service
    .get(`${url}${param}`, { headers })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

/**
 * Post请求
 * @export
 * @template T
 * @param {string} url 接口地址
 * @param {Common.PlainObject} [params={}] 接口传参
 * @returns {Promise<AxiosResponse<T>>}
 */
export function apiPost<T>(
  url: string,
  params: Common.PlainObject = {},
  headers: Common.PlainObject = {}
): Promise<AxiosResponse<T>> {
  const param = handleData(params);
  return service
    .post(url, param, { headers })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

/**
 * Put请求
 * @export
 * @template T
 * @param {string} url 接口地址
 * @param {Common.PlainObject} [params={}] 接口传参
 * @returns {Promise<AxiosResponse<T>>}
 */
export function apiPut<T>(
  url: string,
  params: Common.PlainObject = {},
  headers: Common.PlainObject = {}
): Promise<AxiosResponse<T>> {
  const param = handleData(params);
  return service
    .put(url, param, { headers })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

/**
 * Delete请求
 * @export
 * @template T
 * @param {string} url 接口地址
 * @param {Common.PlainObject} [params={}] 接口传参
 * @returns {Promise<AxiosResponse<T>>}
 */
export function apiDelete<T>(
  url: string,
  params: Common.PlainObject = {},
  headers: Common.PlainObject = {}
): Promise<AxiosResponse<T>> {
  const param = handleData(params);
  return service
    .put(url, param, { headers })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export default service;
