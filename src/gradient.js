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
  $("#gradient_result_code").text(`background-image: ${styles}`);
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
      .text("Color");
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
      .on("input", setStyles);

    const removeColorButton = $(
      '<button class="icon-button stop-input-group__icon-button"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg></button>'
    );
    removeColorButton.on("click", function () {
      newColorInput.remove();
      setStyles();
    });
    newColorInput.find(".stop-input-group").append(removeColorButton);
    colorInputs.append(newColorInput);
    setStyles();
  });

  $("#linear_gradient input").on("input", function () {
    setStyles();
  });
};
