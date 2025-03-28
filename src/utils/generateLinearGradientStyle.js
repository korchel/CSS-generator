export const generateLinearGradientStyle = (angle, colors, isRepeating) => {
  return `${
    isRepeating ? "repeating-" : ""
  }linear-gradient(${angle}deg, ${colors})`;
};
