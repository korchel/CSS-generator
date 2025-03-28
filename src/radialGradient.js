import $ from "jquery";
import {
  getColors,
  getNewColorInput,
  generateRadialGradientStyle,
} from "./utils";

const setStyles = () => {
  const isRepeating = $("#radial_gradient_repeating").is(":checked");
  const hasHardStops = $("#radial_gradient_hard_stops").is(":checked");
  const shape = $("input:radio[name=radial_gradient_shape]:checked").val();
  const positionX = $("#radial_gradient_position_x").val();
  const positionY = $("#radial_gradient_position_y").val();
  const stopInputs = $('[id^="radial_gradient_stop"]');
  const colorsInputs = $('[id^="radial_gradient_color"]');

  const colors = getColors(stopInputs, colorsInputs, hasHardStops);
  const gradient = generateRadialGradientStyle(
    shape,
    colors,
    isRepeating,
    positionX,
    positionY
  );

  $("#radial_gradient_result").css("background-image", gradient);
  $("#radial_gradient_result_code").text(`background-image: ${gradient}`);
};

export const applyRadialGradient = () => {
  setStyles();
  $("#radial_gradient button[data-id='delete-color']").prop("disabled", true);

  $("[href='radial_gradient']").on("click", () => {
    $("#radial_gradient_position_y").width(
      0.95 * $("#radial_gradient_result").height()
    );
  });

  $(window).on("resize", function () {
    $("#radial_gradient_position_y").width(
      0.95 * $("#radial_gradient_result").height()
    );
  });

  $("#radial_gradient_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }

    if (colorInputsCount === 2) {
      $("#radial_gradient button[data-id='delete-color']").prop(
        "disabled",
        false
      );
    }

    const newColorInput = getNewColorInput(
      colorInputs,
      "radial_gradient",
      colorInputsCount,
      setStyles
    );

    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#radial_gradient input").on("input", function () {
    setStyles();
  });
};
