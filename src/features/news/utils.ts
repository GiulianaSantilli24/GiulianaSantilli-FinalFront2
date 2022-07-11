const capitalize = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const mayusculas = (word: string) => {
  return word
    .split(" ")
    .map((str) => capitalize(str))
    .join(" ");
};

export const minutero = (hour: any) => {
  const ahora = new Date();
  return Math.floor((ahora.getTime() - hour.getTime()) / 60000);
};
