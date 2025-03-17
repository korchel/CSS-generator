import $ from "jquery";
import { HEXtoRGBA } from "./utils/HEXtoRGBA.js";

const fontSizeInput = $("#text_shadow_font_size");
const offsetXInput = $("#text_shadow_offset_x");
const offsetYInput = $("#text_shadow_offset_y");
const blurRadiusInput = $("#text_shadow_blur_radius");
const opacityInput = $("#text_shadow_opacity");
const colorInput = $("#text_shadow_color");

const generateTextShadowStyles = (offsetX, offsetY, blurRadius, color) => {
  const styles = `${offsetX}px ${offsetY}px ${blurRadius}px ${color}`;
  return styles;
};

const setStyles = () => {
  const fontSize = fontSizeInput.val();
  const offsetX = offsetXInput.val();
  const offsetY = offsetYInput.val();
  const blurRadius = blurRadiusInput.val();
  const opacity = opacityInput.val();
  const color = colorInput.val();
  const rgba = HEXtoRGBA(color, opacity);
  const styles = generateTextShadowStyles(offsetX, offsetY, blurRadius, rgba);

  $("#text_shadow_result")
    .css("fontSize", `${fontSize}px`)
    .css("text-shadow", styles);

  $("#text_shadow_resultHex").text(
    `text-shadow: ${generateTextShadowStyles(
      offsetX,
      offsetY,
      blurRadius,
      color
    )}`
  );
  $("#text_shadow_resultRgba").text(`text-shadow: ${styles}`);
};

export const applyTextShadow = () => {
  setStyles();

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
