// Unique Key 생성 함수
export const getKey = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};

// 페이지네이션 테스트용 OMR
export const randomOmr = (max: number) => {
  const omr: number[][] = Array.from(Array(20), () => new Array(5));
  for (let problem = 0; problem < 20; problem += 1) {
    for (let element = 0; element < 5; element += 1) {
      omr[problem][element] = Math.floor(Math.random() * max);
    }
  }
  return omr;
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
