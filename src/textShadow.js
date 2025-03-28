import $ from "jquery";
import { HEXtoRGBA, getRandomColor } from "./utils";

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
    .join(", ");

  $("#text_shadow_result")
    .css("fontSize", `${fontSize}px`)
    .css("text-shadow", shadows)
    .css("color", textColor);

  $("#text_shadow_resultHex").text(`text-shadow: ${shadows}`);
};

export const applyTextShadow = () => {
  $("#text_shadow button[data-id='delete-color']").prop("disabled", true);
  setStyles();

  $("#text_shadow_add_color").on("click", function () {
    const colorInputs = $(this).siblings(".color-input-group");
    const colorInputsCount = colorInputs.length;
    const newColorInput = colorInputs.last().clone();
    if (colorInputsCount === 1) {
      $("#text_shadow button[data-id='delete-color']").prop("disabled", false);
    }
    newColorInput
      .find("[for*='offset_x']")
      .attr("for", `text_shadow_offset_x_${colorInputsCount + 1}`);
    newColorInput
      .find("[id*='offset_x']")
      .attr("id", `text_shadow_offset_x_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find("[for*='offset_y']")
      .attr("for", `text_shadow_offset_y_${colorInputsCount + 1}`);
    newColorInput
      .find("[id*='offset_y']")
      .attr("id", `text_shadow_offset_y_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find("[for*='blur_radius']")
      .attr("for", `text_shadow_blur_radius_${colorInputsCount + 1}`);
    newColorInput
      .find("[id*='blur_radius']")
      .attr("id", `text_shadow_blur_radius_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find("[for*='opacity']")
      .attr("for", `text_shadow_opacity_${colorInputsCount + 1}`);
    newColorInput
      .find("[id*='opacity']")
      .attr("id", `text_shadow_opacity_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find("[type='color']")
      .attr("id", `text_shadow_color_${colorInputsCount + 1}`)
      .val(getRandomColor())
      .on("input", setStyles);
    newColorInput
      .find("[data-id='delete-color']")
      .prop("disabled", false)
      .on("click", function () {
        const colorInputsCount = $(this)
          .closest(".color-inputs")
          .children().length;
        newColorInput.remove();
        if (colorInputsCount <= 2) {
          $("[data-id='delete-color']").prop("disabled", true);
        }
        setStyles();
      });
    newColorInput.find('input[type="number"]').on("input", function () {
      $(this).prev('input[type="range"]').val($(this).val());
    });
    newColorInput.find('input[type="range"]').on("input", function () {
      $(this).next('input[type="number"]').val($(this).val());
    });

    $(this).closest(".colors").children().last().before(newColorInput);
    setStyles();
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
