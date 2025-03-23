import $ from "jquery";
import { getNewColorInput } from "./utils/getNewColorInput.js";

const generateGradientStyle = (angle, colors, isRepeating) => {
  const colorString = colors
    .map(({ color, stop }) => `${color} ${stop}%`)
    .join(", ");
  return `${
    isRepeating ? "repeating-" : ""
  }linear-gradient(${angle}deg, ${colorString})`;
};

const setStyles = () => {
  const isRepeating = $("#gradient_repeating").is(":checked");
  const angle = $("#gradient_angle").val();
  const stopInputs = $('[id^="gradient_stop"]');
  const colors = $('[id^="gradient_color"]')
    .map((i, colorInput) => {
      return {
        color: $(colorInput).val(),
        stop: $(stopInputs[i]).val(),
      };
    })
    .get();

  const styles = generateGradientStyle(angle, colors, isRepeating);
  $("#gradient_result").css("background-image", styles);
  $("#gradient_result_code").text(`background-image: ${styles}`);
};

export const applyGradient = () => {
  setStyles();
  $("#linear_gradient button[data-id='delete-color']").prop("disabled", true);

  $("#gradient_add_color").on("click", function () {
    const colorInputs = $(this).parent().siblings(".color-inputs");
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
      "gradient",
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
