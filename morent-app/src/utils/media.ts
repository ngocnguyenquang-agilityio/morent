// Constants
import { STRAPI_BASE_URL } from '@/constants/route';

export const getMediaUrl = (url: string) => {
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${STRAPI_BASE_URL}${url}`;
};
