export const onlyNumbers = (text: string) => {
  if (text) {
    const regex = /\D/g;
    return text.replace(regex, "");
  }

  return null;
};
