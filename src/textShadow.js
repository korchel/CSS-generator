import $ from "jquery";
import { HEXtoRGBA } from "./utils/HEXtoRGBA.js";

const fontSizeInput = $("#text_shadow_font_size");
const textColorInput = $("#text_shadow_text_color");

const setStyles = () => {
  const fontSize = fontSizeInput.val();
  const textColor = textColorInput.val();
  const offsetXInputs = $('[id^="text_shadow_offset_x"]');
  const offsetYInputs = $('[id^="text_shadow_offset_y"]');
  const blurRadiusInputs = $('[id^="text_shadow_blur_radius"]');
  const opacityInputs = $('[id^="text_shadow_opacity"]');
  const colorInputs = $('[id^="text_shadow_color"]');

  const shadows = colorInputs
    .map((i, colorInput) => {
      const offsetX = $(offsetXInputs[i]).val();
      const offsetY = $(offsetYInputs[i]).val();
      const blurRadius = $(blurRadiusInputs[i]).val();
      const color = $(colorInput).val();
      const opacity = $(opacityInputs).val();
      const rgbaColor = HEXtoRGBA(color, opacity);
      const shadow = `${offsetX}px ${offsetY}px ${blurRadius}px ${rgbaColor}`;
      return shadow;
    })
    .get()
    .join(",");

  $("#text_shadow_result")
    .css("fontSize", `${fontSize}px`)
    .css("text-shadow", shadows)
    .css("color", textColor);

  $("#text_shadow_resultHex").text(`text-shadow: ${shadows}`);
};

export const applyTextShadow = () => {
  setStyles();

  $("#text_shadow_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-input-group");
    const newColorInput = colorInputs.last().clone();
  });

  $("#text_shadow .result-vue").css(
    "background-color",
    $("#text_shadow_bg_color").val()
  );

  $("#text_shadow_bg_color").on("input", function () {
    $("#text_shadow .result-vue").css("background-color", $(this).val());
  });

  $("#text_shadow input").on("input", function () {
    setStyles();
  });
};
