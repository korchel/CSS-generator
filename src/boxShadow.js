import $ from "jquery";
import { getNewShadowColorInput, HEXtoRGBA } from "./utils";

const setStyles = () => {
  const isInsideInputs = $('[id^="box_shadow_inside"]');
  const offsetXInputs = $('[id^="box_shadow_offset_x"]');
  const offsetYInputs = $('[id^="box_shadow_offset_y"]');
  const blurRadiusInputs = $('[id^="box_shadow_blur_radius"]');
  const opacityInputs = $('[id^="box_shadow_opacity"]');
  const colorInputs = $('[id^="box_shadow_color"]');
  const spreadRadiusInputs = $('[id^="box_shadow_spread_radius"]');

  const shadows = colorInputs
    .map((i, colorInput) => {
      const isInside = $(isInsideInputs[i]).is(":checked");
      const offsetX = $(offsetXInputs[i]).val();
      const offsetY = $(offsetYInputs[i]).val();
      const blurRadius = $(blurRadiusInputs[i]).val();
      const spreadRadius = $(spreadRadiusInputs[i]).val();
      const color = $(colorInput).val();
      const opacity = $(opacityInputs[i]).val();
      const rgbaColor = HEXtoRGBA(color, opacity);
      const shadow = `${
        isInside ? "inset" : ""
      } ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
      return shadow;
    })
    .get()
    .join(", ");

  $("#box_shadow_result").css("box-shadow", shadows);

  $("#box_shadow_resultRgba").text(`box-shadow: ${shadows}`);
};

export const applyBoxShadow = () => {
  setStyles();

  $("#box_shadow_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-input-group");
    const colorInputsCount = colorInputs.length;

    if (colorInputsCount === 1) {
      $("#box_shadow button[data-id='delete-color']").prop("disabled", false);
    }
    const newColorInput = getNewShadowColorInput(
      colorInputs,
      "box_shadow",
      colorInputsCount,
      setStyles
    );

    $(this).closest(".colors").children().last().before(newColorInput);
    setStyles();
  });

  $("#box_shadow .result-vue").css(
    "background-color",
    $("#box_shadow_bg_color").val()
  );

  $("#box_shadow_result").css(
    "background-color",
    $("#box_shadow_div_color").val()
  );

  $("#box_shadow_bg_color").on("input", function () {
    $("#box_shadow .result-vue").css("background-color", $(this).val());
  });

  $("#box_shadow_div_color").on("input", function () {
    $("#box_shadow_result").css("background-color", $(this).val());
  });

  $("#box_shadow input").on("input", function () {
    setStyles();
  });
};
