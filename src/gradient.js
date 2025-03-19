import $ from "jquery";
import { getRandomColor } from "./utils/getRandomColor.js";

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

  $("#gradient_add_color").on("click", function () {
    const colorInputs = $(this).parent().siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }
    const newColorInput = colorInputs.children().last().clone();
    newColorInput
      .find(".color-input-group label")
      .attr("for", `gradient_color_${colorInputsCount + 1}`)
      .text("Color");
    newColorInput
      .find(".color-input-group input")
      .attr("id", `gradient_color_${colorInputsCount + 1}`)
      .val(getRandomColor())
      .on("input", setStyles);
    newColorInput
      .find(".stop-input-group label")
      .attr("for", `gradient_stop_${colorInputsCount + 1}`);
    newColorInput
      .find(".stop-input-group input")
      .attr("id", `gradient_stop_${colorInputsCount + 1}`)
      .on("input", setStyles);

    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#linear_gradient input").on("input", function () {
    setStyles();
  });
};
