import $ from "jquery";
import { getConicColors } from "./utils/getConicColors.js";

const generateGradientStyle = (
  angle,
  positionX,
  positionY,
  colors,
  isRepeating
) => {
  return `${
    isRepeating ? "repeating-" : ""
  }conic-gradient(from ${angle}deg at ${positionX}% ${positionY}%, ${colors})`;
};

const setStyles = () => {
  const angle = $("#conic_gradient_angle").val();
  const isRepeating = $("#conic_gradient_repeating").is(":checked");
  const hasHardStops = $("#conic_gradient_hard_stops").is(":checked");
  const positionX = $("#conic_gradient_position_x").val();
  const positionY = $("#conic_gradient_position_y").val();
  const stopInputs = $('[id^="conic_gradient_stop"]');
  const colorInput = $('[id^="conic_gradient_color"]');

  const colors = getConicColors(stopInputs, colorInput, hasHardStops);

  const styles = generateGradientStyle(
    angle,
    positionX,
    positionY,
    colors,
    isRepeating
  );
  $("#conic_gradient_result").css("background-image", styles);
  $("#conic_gradient_result_code").text(`background-image: ${styles}`);
};

export const applyConicGradient = () => {
  setStyles();

  $("[href='conic_gradient']").on("click", () => {
    $("#conic_gradient_position_y").width(
      0.95 * $("#conic_gradient_result").height()
    );
  });

  $(window).on("resize", function () {
    $("#conic_gradient_position_y").width(
      0.95 * $("#conic_gradient_result").height()
    );
  });

  $("#conic_gradient_add_color").on("click", function () {
    const colorInputs = $(this).parent().siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }
    const newColorInput = colorInputs.children().first().clone();
    newColorInput
      .find(".color-input-group label")
      .attr("for", `conic_gradient_color_${colorInputsCount + 1}`)
      .text("Color");
    newColorInput
      .find(".color-input-group input")
      .attr("id", `conic_gradient_color_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find(".stop-input-group label")
      .attr("for", `conic_gradient_stop_${colorInputsCount + 1}`);
    newColorInput
      .find(".stop-input-group input")
      .attr("id", `conic_gradient_stop_${colorInputsCount + 1}`)
      .on("input", setStyles);

    const removeColorButton = $(
      '<button class="icon-button stop-input-group__icon-button"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg></button>'
    );
    removeColorButton.on("click", function () {
      newColorInput.remove();
      setStyles();
    });
    newColorInput.find(".stop-input-group").append(removeColorButton);
    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#conic_gradient input").on("input", function () {
    setStyles();
  });
};
