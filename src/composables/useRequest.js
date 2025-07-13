import { isArray } from '@/utils/tool';

// 客户端请求
const useClientRequest = (url, opts = {}) => {
  const token = useCookie('token');
  const runtimeConfig = useRuntimeConfig();

  const defaultOptions = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      options.headers = options.headers || {};
      if (token.value) {
        options.headers.Authorization = 'Bearer ' + token.value;
      }
    },
    onResponse({ response }) {
      if (response.status === 200 && response._data.code && response._data.code !== 200) {
        ElMessage.error(response._data.msg);
      }
    },
    onResponseError({ response }) {
      ElMessage.error(`${response.status} ${response.statusText}`)
      ElMessage.error(
        isArray(response._data.data.msg)
          ? response._data.data.msg[0]
          : response._data.data.msg
      );
    }
  };

  return $fetch(url, {
    ...defaultOptions,
    ...opts
  });
};

// 服务端请求
const useServerRequest = (url, opts = {}) => {
  const token = useCookie('token');
  const runtimeConfig = useRuntimeConfig();

  const defaultOptions = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      options.headers = options.headers || {};
      if (token.value) {
        options.headers.Authorization = 'Bearer ' + token.value;
      }
    },
    onResponse({ response }) {
      if (response.status === 200 && response._data.code && response._data.code !== 200) {
        if (process.client) {
          ElMessage.error(response._data.msg);
        }
      }
    },
    onResponseError({ response }) {
      if (process.client) {
        ElMessage.error(
          isArray(response._data.data.msg)
            ? response._data.data.msg[0]
            : response._data.data.msg
        );
      }
    }
  };

  return useFetch(url, {
    ...defaultOptions,
    ...opts
  });
};


export const useRequest = () => {
  return {
    useClientRequest,
    useServerRequest
  }
}
