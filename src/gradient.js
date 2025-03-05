import $ from "jquery";

const generateGradientStyle = (angle, colors, isRepeating) => {
  const colorString = colors
    .map(({ color, stop }) => `${color} ${stop}%`)
    .join(", ");
  return `${
    isRepeating ? "repeating-" : ""
  }linear-gradient(${angle}deg, ${colorString})`;
};

const setStyles = () => {
  const isRepeating = $("#gradient_repeating").is(":checked");
  const angle = $("#gradient_angle").val();
  const stopInputs = $('[id^="gradient_stop"]');
  const colors = $('[id^="gradient_color"]')
    .map((i, colorInput) => {
      return {
        color: $(colorInput).val(),
        stop: $(stopInputs[i]).val(),
      };
    })
    .get();

  const styles = generateGradientStyle(angle, colors, isRepeating);
  $("#gradient_result").css("background-image", styles);
  $("#gradient_result_code").val(`background-image: ${styles}`);
};

export const applyGradient = () => {
  setStyles();
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
      .attr("id", `gradient_color_${colorInputsCount + 1}`)
      .on("change", setStyles);
    newColorInput
      .find(".stop-input-group label")
      .attr("for", `gradient_stop_${colorInputsCount + 1}`);
    newColorInput
      .find(".stop-input-group input")
      .attr("id", `gradient_stop_${colorInputsCount + 1}`)
      .on("change", setStyles);

    const removeColorButton = $(
      '<button class="remove-color">&#10006;</button>'
    );
    removeColorButton.on("click", function () {
      newColorInput.remove();
      setStyles();
    });
    newColorInput.find(".color-input-group").append(removeColorButton);
    colorInputs.append(newColorInput);
  });

  $("#gradient input").on("change", function () {
    setStyles();
  });
};
