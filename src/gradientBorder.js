import $ from "jquery";
import { getConicColors } from "./utils/getConicColors.js";
import { getNewColorInput } from "./utils/getNewColorInput.js";

const generateGradientStyle = (
  angle,
  thickness,
  borderRadius,
  colors,
  isRepeating
) => {
  return `
    .box {
      height: 450px,
      width: 300px,
      position: relative,
      border-radius: ${borderRadius}px,
    }
    .box::before {
      content: '',
      position: absolute,
      inset: 0,
      border-radius: inherit,
      padding: ${thickness}px,
      background: ${
        isRepeating ? "repeating-" : ""
      }conic-gradient(from ${angle}deg, ${colors}),
      mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0),
      mask-composite: exclude,
    }`;
};

const setStyles = () => {
  const angle = $("#gradient_border_angle").val();
  const isRepeating = $("#gradient_border_repeating").is(":checked");
  const hasHardStops = $("#gradient_border_hard_stops").is(":checked");
  const thickness = $("#gradient_border_thickness").val();
  const borderRadius = $("#gradient_border_radius").val();
  const stopInputs = $('[id^="gradient_border_stop"]');
  const colorInput = $('[id^="gradient_border_color"]');

  const colors = getConicColors(stopInputs, colorInput, hasHardStops);

  const styles = generateGradientStyle(
    angle,
    thickness,
    borderRadius,
    colors,
    isRepeating
  );

  const gradientBorderColors = `${
    isRepeating ? "repeating-" : ""
  }conic-gradient(from ${angle}deg, ${colors})`;

  $("#gradient_border_result")
    .css("--gradient-border-radius", `${borderRadius}px`)
    .css("--gradient-border-colors", gradientBorderColors)
    .css("--gradient-border-thickness", `${thickness}%`);

  $("#gradient_border_result_code ").text(styles);
};

export const applyGradientBorder = () => {
  setStyles();

  $("[href='gradient_border']").on("click", () => {
    $("#gradient_border_position_y").width(
      $("#gradient_border_result").height()
    );
  });

  $(window).on("resize", function () {
    $("#gradient_border_position_y").width(
      $("#gradient_border_result").height()
    );
  });

  $("#gradient_border_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }

    if (colorInputsCount < 3) {
      $("#gradient_border button[data-id='delete-color']").prop(
        "disabled",
        false
      );
    }

    const newColorInput = getNewColorInput(
      colorInputs,
      "gradient_border",
      colorInputsCount,
      setStyles
    );

    colorInputs.children().last().before(newColorInput);
    setStyles();
  });

  $("#gradient_border .result-vue").css(
    "background-color",
    $("#gradient_border_bg_color").val()
  );

  $("#gradient_border_bg_color").on("input", function () {
    $("#gradient_border .result-vue").css("background-color", $(this).val());
  });

  $("#gradient_border input").on("input", function () {
    setStyles();
  });
};
