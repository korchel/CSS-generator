import $ from "jquery";
import {
  getNewColorInput,
  getColors,
  generateLinearGradientStyle,
} from "./utils";

const setStyles = () => {
  const isRepeating = $("#linear_gradient_repeating").is(":checked");
  const angle = $("#linear_gradient_angle").val();
  const stopInputs = $('[id^="linear_gradient_stop"]');
  const colorsInputs = $('[id^="linear_gradient_color"]');
  const hasHardStops = $("#linear_gradient_hard_stops").is(":checked");

  const colors = getColors(stopInputs, colorsInputs, hasHardStops);
  const styles = generateLinearGradientStyle(angle, colors, isRepeating);

  $("#linear_gradient_result").css("background-image", styles);
  $("#linear_gradient_result_code").text(`background-image: ${styles}`);
};

export const applyGradient = () => {
  setStyles();
  $("#linear_gradient button[data-id='delete-color']").prop("disabled", true);

  $("#linear_gradient_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }

    if (colorInputsCount === 2) {
      $("#linear_gradient button[data-id='delete-color']").prop(
        "disabled",
        false
      );
    }

    const newColorInput = getNewColorInput(
      colorInputs,
      "linear_gradient",
      colorInputsCount,
      setStyles
    );

    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#linear_gradient input").on("input", function () {
    setStyles();
  });
};
