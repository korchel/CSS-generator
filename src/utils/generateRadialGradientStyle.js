export const generateRadialGradientStyle = (
  shape,
  colors,
  isRepeating,
  positionX,
  positionY
) => {
  if (positionX || positionY) {
    return `${
      isRepeating ? "repeating-" : ""
    }radial-gradient(${shape} at ${positionX}% ${positionY}%, ${colors})`;
  }
  return `${
    isRepeating ? "repeating-" : ""
  }radial-gradient(${shape}, ${colors})`;
};
