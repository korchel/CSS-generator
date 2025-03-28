import $ from "jquery";
import {
  getNewColorInput,
  getColors,
  generateLinearGradientStyle,
} from "./utils";

const generateStyle = (linearGradientStyles) => {
  return `
    .gradient-text {
      color: black; /* set fallback color */
      background: white; /* set fallback color */
      background-image: ${linearGradientStyles}
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    };`;
};

const setStyles = () => {
  const isRepeating = $("#gradient_text_repeating").is(":checked");
  const angle = $("#gradient_text_angle").val();
  const stopInputs = $('[id^="gradient_text_stop"]');
  const colorsInputs = $('[id^="gradient_text_color"]');
  const hasHardStops = $("#gradient_text_hard_stops").is(":checked");

  const colors = getColors(stopInputs, colorsInputs, hasHardStops);
  const linearGradientStyles = generateLinearGradientStyle(
    angle,
    colors,
    isRepeating
  );

  $("#gradient_text_result").css("background-image", linearGradientStyles);
  $("#gradient_text_result_code").text(generateStyle(linearGradientStyles));
};

export const applyGradientText = () => {
  setStyles();
  $("#gradient_text button[data-id='delete-color']").prop("disabled", true);

  $("#gradient_text_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }

    if (colorInputsCount === 2) {
      $("#gradient_text button[data-id='delete-color']").prop(
        "disabled",
        false
      );
    }

    const newColorInput = getNewColorInput(
      colorInputs,
      "gradient_text",
      colorInputsCount,
      setStyles
    );

    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#gradient_text .result-vue").css(
    "background-color",
    $("#gradient_text_bg_color").val()
  );

  $("#gradient_text_bg_color").on("input", function () {
    $("#gradient_text .result-vue").css("background-color", $(this).val());
  });

  $("#gradient_text input").on("input", function () {
    setStyles();
  });
};
