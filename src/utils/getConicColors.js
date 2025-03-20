import $ from "jquery";

export const getConicColors = (stopInputs, colorInputs, hasHardStops) => {
  const colors = colorInputs
    .map((i, colorInput) => {
      if (hasHardStops) {
        const stop1 = i === 0 ? 0 : $(stopInputs[i - 1]).val();
        const stop2 = $(stopInputs[i]).val();
        return {
          color: $(colorInput).val(),
          stop: `${stop1}deg ${stop2}deg`,
        };
      }
      return {
        color: $(colorInput).val(),
        stop: `${$(stopInputs[i]).val()}deg`,
      };
    })
    .get();
  return colors.map(({ color, stop }) => `${color} ${stop}`).join(", ");
};
