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
  const styles = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color} ${
    isInside ? "inset" : ""
  } `;
  return styles;
};

const setStyles = () => {
  const isInside = insideInput.is(":checked");
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

  $("#box_shadow_resultHex").text(
    `box-shadow: ${generateBoxShadowStyles(
      offsetX,
      offsetY,
      blurRadius,
      spreadRadius,
      color,
      isInside
    )}`
  );
  $("#box_shadow_resultRgba").text(`box-shadow: ${styles}`);
};

export const applyBoxShadow = () => {
  setStyles();

  $("#box_shadow .result-vue").css(
    "background-color",
    $("#box_shadow_bg_color").val()
  );

  $("#box_shadow_bg_color").on("input", function () {
    $("#box_shadow .result-vue").css("background-color", $(this).val());
  });

  $("#box_shadow input").on("input", function () {
    setStyles();
  });
};
