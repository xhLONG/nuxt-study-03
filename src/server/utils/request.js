import { $fetch } from 'ofetch';

export async function serverRequest(url, options = {}) {
  try {
    const response = await $fetch(url, {
      method: 'GET',
      timeout: 8000,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    });

    return response;
  } catch (err) {
    console.error(`[serverRequest] Error requesting ${url}:`, err?.message || err);

    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: err?.message || '服务端请求失败',
      data: err?.data || null
    });
  }
}
