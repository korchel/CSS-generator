import $ from "jquery";
import { HEXtoRGBA, getNewShadowColorInput, getRandomColor } from "./utils";

const fontSizeInput = $("#text_shadow_font_size");

const setStyles = () => {
  const fontSize = fontSizeInput.val();

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
    .join(", ");

  $("#text_shadow_result")
    .css("fontSize", `${fontSize}px`)
    .css("text-shadow", shadows);

  $("#text_shadow_resultHex").text(`text-shadow: ${shadows}`);
};

export const applyTextShadow = () => {
  $("#text_shadow button[data-id='delete-color']").prop("disabled", true);
  setStyles();

  $("#text_shadow_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-input-group");
    const colorInputsCount = colorInputs.length;

    if (colorInputsCount === 1) {
      $("#text_shadow button[data-id='delete-color']").prop("disabled", false);
    }
    const newColorInput = getNewShadowColorInput(
      colorInputs,
      "text_shadow",
      colorInputsCount,
      setStyles
    );

    $(this).closest(".colors").children().last().before(newColorInput);
    setStyles();
  });

  $("#text_shadow .result-vue").css(
    "background-color",
    $("#text_shadow_bg_color").val()
  );

  $("#text_shadow .result-vue").css(
    "color",
    $("#text_shadow_text_color").val()
  );

  $("#text_shadow_bg_color").on("input", function () {
    $("#text_shadow .result-vue").css("background-color", $(this).val());
  });

  $("#text_shadow_text_color").on("input", function () {
    $("#text_shadow .result-vue").css("color", $(this).val());
  });

  $("#text_shadow input").on("input", function () {
    setStyles();
  });
};
