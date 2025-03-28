import $ from "jquery";
import {
  getConicColors,
  getNewColorInput,
  generateConicGradientStyle,
} from "./utils";

const setStyles = () => {
  const angle = $("#conic_gradient_angle").val();
  const isRepeating = $("#conic_gradient_repeating").is(":checked");
  const hasHardStops = $("#conic_gradient_hard_stops").is(":checked");
  const positionX = $("#conic_gradient_position_x").val();
  const positionY = $("#conic_gradient_position_y").val();
  const stopInputs = $('[id^="conic_gradient_stop"]');
  const colorInput = $('[id^="conic_gradient_color"]');

  const colors = getConicColors(stopInputs, colorInput, hasHardStops);
  const gradient = generateConicGradientStyle(
    angle,
    colors,
    isRepeating,
    positionX,
    positionY
  );

  $("#conic_gradient_result").css("background-image", gradient);
  $("#conic_gradient_result_code").text(`background-image: ${gradient}`);
};

export const applyConicGradient = () => {
  setStyles();
  $("#conic_gradient button[data-id='delete-color']").prop("disabled", true);

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
    const colorInputs = $(this).siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }

    if (colorInputsCount === 2) {
      $("#conic_gradient button[data-id='delete-color']").prop(
        "disabled",
        false
      );
    }

    const newColorInput = getNewColorInput(
      colorInputs,
      "conic_gradient",
      colorInputsCount,
      setStyles
    );

    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#conic_gradient input").on("input", function () {
    setStyles();
  });
};
