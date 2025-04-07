import $ from "jquery";
import { getRandomColor } from "./getRandomColor.js";

export const getNewShadowColorInput = (
  colorInputs,
  type,
  colorInputsCount,
  setStyles
) => {
  const newColorInput = colorInputs.last().clone();
  newColorInput
    .find("[for*='offset_x']")
    .attr("for", `${type}_offset_x_${colorInputsCount + 1}`);
  newColorInput
    .find("[id*='offset_x']")
    .attr("id", `${type}_offset_x_${colorInputsCount + 1}`)
    .on("input", setStyles);
  newColorInput
    .find("[for*='offset_y']")
    .attr("for", `${type}_offset_y_${colorInputsCount + 1}`);
  newColorInput
    .find("[id*='offset_y']")
    .attr("id", `${type}_offset_y_${colorInputsCount + 1}`)
    .on("input", setStyles);
  newColorInput
    .find("[for*='blur_radius']")
    .attr("for", `${type}_blur_radius_${colorInputsCount + 1}`);
  newColorInput
    .find("[id*='blur_radius']")
    .attr("id", `${type}_blur_radius_${colorInputsCount + 1}`)
    .on("input", setStyles);
  // applies only to box shadow
  newColorInput
    .find("[for*='spread_radius']")
    .attr("for", `${type}_spread_radius_${colorInputsCount + 1}`);
  newColorInput
    .find("[id*='spread_radius']")
    .attr("id", `${type}_spread_radius_${colorInputsCount + 1}`)
    .on("input", setStyles);
  newColorInput
    .find("[for*='inside']")
    .attr("for", `${type}_inside_${colorInputsCount + 1}`);
  newColorInput
    .find("[id*='inside']")
    .attr("id", `${type}_inside_${colorInputsCount + 1}`)
    .on("input", setStyles);

  newColorInput
    .find("[for*='opacity']")
    .attr("for", `${type}_opacity_${colorInputsCount + 1}`);
  newColorInput
    .find("[id*='opacity']")
    .attr("id", `${type}_opacity_${colorInputsCount + 1}`)
    .on("input", setStyles);
  newColorInput
    .find("[type='color']")
    .attr("id", `${type}_color_${colorInputsCount + 1}`)
    .val(getRandomColor())
    .on("input", setStyles);
  newColorInput
    .find("[data-id='delete-color']")
    .prop("disabled", false)
    .on("click", function () {
      const colorInputsCount = $(this)
        .closest(".color-inputs")
        .children().length;
      newColorInput.remove();
      if (colorInputsCount <= 2) {
        $("[data-id='delete-color']").prop("disabled", true);
      }
      setStyles();
    });
  newColorInput.find('input[type="number"]').on("input", function () {
    $(this).prev('input[type="range"]').val($(this).val());
  });
  newColorInput.find('input[type="range"]').on("input", function () {
    $(this).next('input[type="number"]').val($(this).val());
  });
  return newColorInput;
};
