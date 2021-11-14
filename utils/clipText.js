export const clippedText = (text, length) => {
  if (!text) return;
  if (!length) length = 22;
  if (text?.length < length) return text;
  return text?.slice(0, length) + "...";
};
