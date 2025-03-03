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

  $("#text_shadow_resultHex").val(
    generateTextShadowStyles(offsetX, offsetY, blurRadius, color)
  );
  $("#text_shadow_resultRgba").val(styles);
};

export const applyTextShadow = () => {
  setStyles();

  $("#text_shadow input").on("change", function () {
    setStyles();
  });
};
