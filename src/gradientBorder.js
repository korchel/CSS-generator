import $ from "jquery";
import {
  getConicColors,
  getNewColorInput,
  generateConicGradientStyle,
} from "./utils";

const generateStyle = (thickness, borderRadius, gradient) => {
  return `
    .box {
      height: 450px;
      width: 300px;
      position: relative;
      border-radius: ${borderRadius}px;
    }
    .box::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: ${thickness}px;
      background: ${gradient};
      mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      mask-composite: exclude;
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

  const gradient = generateConicGradientStyle(angle, colors, isRepeating);

  const styles = generateStyle(thickness, borderRadius, gradient);

  $("#gradient_border_result")
    .css("--gradient-border-radius", `${borderRadius}px`)
    .css("--gradient-border-colors", gradient)
    .css("--gradient-border-thickness", `${thickness}%`);

  $("#gradient_border_result_code ").text(styles);
};

export const applyGradientBorder = () => {
  setStyles();

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
