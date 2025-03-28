export const generateConicGradientStyle = (
  angle,
  colors,
  isRepeating,
  positionX,
  positionY
) => {
  if (positionX || positionY) {
    return `${
      isRepeating ? "repeating-" : ""
    }conic-gradient(from ${angle}deg at ${positionX}% ${positionY}%, ${colors})`;
  }
  return `${
    isRepeating ? "repeating-" : ""
  }conic-gradient(from ${angle}deg, ${colors})`;
};
