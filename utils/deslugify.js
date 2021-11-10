export const deslugify = (value) => {
  value = value.replace(/\/+/g, "");
  value = value.replace("[id]", "");
  let words = value.split("-");
  words = words.map((word) => capitalize(word));
  value = words.join(" ");
  return value;
};

const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
