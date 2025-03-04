import $ from "jquery";

const repeatingInput = $("#gradient_repeating");
const angleInput = $("#gradient_angle");

export const applyGradient = () => {
  const colorInputs = $(".color-inputs");

  $("#gradient_add_color").on("click", function () {
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }
    const newColorInput = colorInputs.children().first().clone();
    newColorInput
      .find(".color-input-group label")
      .attr("for", `gradient_color_${colorInputsCount + 1}`)
      .text(`Color ${colorInputsCount + 1}`);
    newColorInput
      .find(".color-input-group input")
      .attr("id", `gradient_color_${colorInputsCount + 1}`);
    newColorInput
      .children("label")
      .attr("for", `gradient_stop_${colorInputsCount + 1}`);
    newColorInput
      .children("input")
      .attr("id", `gradient_stop_${colorInputsCount + 1}`);
    const removeColorButton = $(
      '<button class="remove-color">&#10006;</button>'
    );
    removeColorButton.on("click", function () {
      newColorInput.remove();
    });
    newColorInput.find(".color-input-group").append(removeColorButton);
    colorInputs.append(newColorInput);
  });
};
