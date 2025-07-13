export function escapeHtml(str: string) {
  let temp = '';
  if (str.length === 0) return '';
  temp = str.replace(/&amp;/g, '&');
  temp = temp.replace(/&lt;/g, '<');
  temp = temp.replace(/&gt;/g, '>');
  temp = temp.replace(/&nbsp;/g, ' ');
  temp = temp.replace(/&#39;/g, "'");
  temp = temp.replace(/&quot;/g, '"');
  return temp;
}

export function isArray(str: unknown) {
  return Object.prototype.toString.call(str) === '[object Array]';
}

export const decodeString = (str: string) => {
  try {
    // 双重解码处理
    return decodeURIComponent(decodeURIComponent(str));
  } catch (e) {
    console.error('string 解码错误:', str, e);
    return str;
  }
};

export function imgHandle(content = '') {
  const imgUrlRex = /<img[^>]*src="([^"]+)"[^>]*>/i;
  const match = content.match(imgUrlRex);
  return match ? match[1] : '';
}
