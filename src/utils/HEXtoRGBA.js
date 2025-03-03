export const HEXtoRGBA = (HEXcolor, opacity) => {
  const red16 = HEXcolor.substring(1, 3);
  const green16 = HEXcolor.substring(3, 5);
  const blue16 = HEXcolor.substring(5);
  const red10 = parseInt(red16, 16);
  const green10 = parseInt(green16, 16);
  const blue10 = parseInt(blue16, 16);
  return `rgba(${red10} ${green10} ${blue10} / ${opacity})`;
};
