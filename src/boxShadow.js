import $ from "jquery";
import { HEXtoRGBA } from "./utils/HEXtoRGBA.js";

const insideInput = $("#box_shadow_inside");
const offsetXInput = $("#box_shadow_offset_x");
const offsetYInput = $("#box_shadow_offset_y");
const blurRadiusInput = $("#box_shadow_blur_radius");
const spreadRadiusInput = $("#box_shadow_spread_radius");
const opacityInput = $("#box_shadow_opacity");
const colorInput = $("#box_shadow_color");

const generateBoxShadowStyles = (
  offsetX,
  offsetY,
  blurRadius,
  spreadRadius,
  color,
  isInside
) => {
  const styles = `${
    isInside ? "inset" : ""
  } ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
  return styles;
};

const setStyles = () => {
  const isInside = insideInput.attr("checked");
  const offsetX = offsetXInput.val();
  const offsetY = offsetYInput.val();
  const blurRadius = blurRadiusInput.val();
  const spreadRadius = spreadRadiusInput.val();
  const opacity = opacityInput.val();
  const color = colorInput.val();
  const rgba = HEXtoRGBA(color, opacity);
  const styles = generateBoxShadowStyles(
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    rgba,
    isInside
  );
  $("#box_shadow_result").css("box-shadow", styles);

  $("#box_shadow_resultHex").val(
    generateBoxShadowStyles(offsetX, offsetY, blurRadius, color, isInside)
  );
  $("#box_shadow_resultRgba").val(styles);
};

export const applyBoxShadow = () => {
  setStyles();

  $("#box_shadow input").on("change", function () {
    console.log("!!!!");
    setStyles();
  });
};
