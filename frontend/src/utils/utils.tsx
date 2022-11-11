// Unique Key 생성 함수
export const getKey = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};

export const setSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const deleteSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export const getSessionStorage = (key: string) => {
  return sessionStorage.getItem(key);
};
