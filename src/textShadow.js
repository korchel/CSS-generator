import $ from "jquery";

const fontSizeInput = $("#text_shadow_font_size");
const offsetXInput = $("#text_shadow_offset_x");
const offsetYInput = $("#text_shadow_offset_y");
const blurRadiusInput = $("#text_shadow_blur_radius");
const opacityInput = $("#text_shadow_opacity");
const colorInput = $("#text_shadow_color");

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
};

const HEXtoRGBA = (HEXcolor, opacity) => {
  const red16 = HEXcolor.substring(1, 3);
  const green16 = HEXcolor.substring(3, 5);
  const blue16 = HEXcolor.substring(5);
  const red10 = parseInt(red16, 16);
  const green10 = parseInt(green16, 16);
  const blue10 = parseInt(blue16, 16);
  return `rgba(${red10} ${green10} ${blue10} / ${opacity})`;
};

function generateTextShadowStyles(offsetX, offsetY, blurRadius, rgba) {
  const styles = `${offsetX}px ${offsetY}px ${blurRadius}px ${rgba}`;
  return styles;
}

setStyles();

$("#text_shadow input").change(function () {
  setStyles(
    fontSizeInput,
    offsetXInput,
    offsetYInput,
    blurRadiusInput,
    opacityInput,
    colorInput
  );
  $("#text_shadow_resultHex").val(`styles here`);
  $("#text_shadow_resultRgba").val(`styles here`);
});
