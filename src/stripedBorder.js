import $ from "jquery";
import {
  getNewColorInput,
  generateLinearGradientStyle,
  getColors,
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
  const angle = $("#striped_border_angle").val();
  const isRepeating = $("#striped_border_repeating").is(":checked");
  const hasHardStops = $("#striped_border_hard_stops").is(":checked");
  const thickness = $("#striped_border_thickness").val();
  const borderRadius = $("#striped_border_radius").val();
  const stopInputs = $('[id^="striped_border_stop"]');
  const colorInput = $('[id^="striped_border_color"]');

  const colors = getColors(stopInputs, colorInput, hasHardStops);

  const gradient = generateLinearGradientStyle(angle, colors, isRepeating);

  const styles = generateStyle(thickness, borderRadius, gradient);

  $("#striped_border_result")
    .css("--gradient-border-radius", `${borderRadius}px`)
    .css("--gradient-border-colors", gradient)
    .css("--gradient-border-thickness", `${thickness}%`);

  $("#striped_border_result_code ").text(styles);
};

export const applyStripedBorder = () => {
  setStyles();

  $("#striped_border_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }

    if (colorInputsCount < 3) {
      $("#striped_border button[data-id='delete-color']").prop(
        "disabled",
        false
      );
    }

    const newColorInput = getNewColorInput(
      colorInputs,
      "striped_border",
      colorInputsCount,
      setStyles
    );

    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#striped_border .result-vue").css(
    "background-color",
    $("#striped_border_bg_color").val()
  );

  $("#striped_border_bg_color").on("input", function () {
    $("#striped_border .result-vue").css("background-color", $(this).val());
  });

  $("#striped_border input").on("input", function () {
    setStyles();
  });
};
