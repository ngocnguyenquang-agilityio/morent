export const getTotalPages = (totalItems: number, pageSize: number): number =>
  Math.ceil(totalItems / pageSize);

export const getPageStart = (currentPage: number, pageSize: number): number =>
  (currentPage - 1) * pageSize;

export const getPageItems = <T>(
  items: T[],
  currentPage: number,
  pageSize: number,
): T[] => {
  const start = getPageStart(currentPage, pageSize);
  return items.slice(start, start + pageSize);
};

export const getPageNumbers = (totalPages: number): number[] => {
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};
