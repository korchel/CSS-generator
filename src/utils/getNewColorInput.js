import $ from "jquery";
import { getRandomColor } from "./getRandomColor.js";

export const getNewColorInput = (
  colorInputs,
  type,
  colorInputsCount,
  setStyles
) => {
  const newColorInput = colorInputs.children().first().clone();

  newColorInput
    .find(".color-input label")
    .attr("for", `${type}_color_${colorInputsCount + 1}`);
  newColorInput
    .find(".color-input input")
    .attr("id", `${type}_color_${colorInputsCount + 1}`)
    .val(getRandomColor())
    .on("input", setStyles);
  newColorInput
    .find(".slider-input-group label")
    .attr("for", `${type}_stop_${colorInputsCount + 1}`);
  newColorInput
    .find(".slider-input-group input[type='range']")
    .attr("id", `${type}_stop_${colorInputsCount + 1}`)
    .on("input", setStyles)
    .on("input", function () {
      $(this).siblings('input[type="number"]').val($(this).val());
    });
  newColorInput.find('input[type="number"]').on("input", function () {
    $(this).siblings('input[type="range"]').val($(this).val());
  });
  newColorInput.find("button").on("click", function () {
    const colorInputsCount = $(this).closest(".color-inputs").children().length;
    newColorInput.remove();
    if (colorInputsCount <= 3) {
      $("[data-id='delete-color']").prop("disabled", true);
    }
    setStyles();
  });

  return newColorInput;
};
