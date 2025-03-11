import $ from "jquery";

const generateGradientStyle = (
  shape,
  circleSize,
  ellipseSizeX,
  ellipseSizeY,
  positionX,
  positionY,
  colors,
  isRepeating
) => {
  const size =
    shape === "ellipse"
      ? `${ellipseSizeX}% ${ellipseSizeY}%`
      : `${circleSize}px`;
  console.log(size);
  const colorString = colors
    .map(({ color, stop }) => `${color} ${stop}%`)
    .join(", ");
  return `${
    isRepeating ? "repeating-" : ""
  }radial-gradient(${shape} at ${positionX}% ${positionY}%, ${colorString})`;
};

const setStyles = () => {
  const isRepeating = $("#radial_gradient_repeating").is(":checked");
  const shape = $("input:radio[name=radial_gradient_shape]:checked").val();
  const positionX = $("#radial_gradient_position_x").val();
  const positionY = $("#radial_gradient_position_y").val();
  const circleSize = $("#radial_gradient_size").val();
  const ellipseSizeX = $("#radial_gradient_size_x").val();
  const ellipseSizeY = $("#radial_gradient_size_y").val();
  const stopInputs = $('[id^="radial_gradient_stop"]');
  const colors = $('[id^="radial_gradient_color"]')
    .map((i, colorInput) => {
      return {
        color: $(colorInput).val(),
        stop: $(stopInputs[i]).val(),
      };
    })
    .get();

  const styles = generateGradientStyle(
    shape,
    circleSize,
    ellipseSizeX,
    ellipseSizeY,
    positionX,
    positionY,
    colors,
    isRepeating
  );
  $("#radial_gradient_result").css("background-image", styles);
  $("#radial_gradient_result_code").text(`background-image: ${styles}`);
};

export const applyRadialGradient = () => {
  setStyles();

  $("#radial_gradient_add_color").on("click", function () {
    const colorInputs = $(this).parent().siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }
    const newColorInput = colorInputs.children().first().clone();
    newColorInput
      .find(".color-input-group label")
      .attr("for", `radial_gradient_color_${colorInputsCount + 1}`)
      .text("Color");
    newColorInput
      .find(".color-input-group input")
      .attr("id", `radial_gradient_color_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find(".stop-input-group label")
      .attr("for", `radial_gradient_stop_${colorInputsCount + 1}`);
    newColorInput
      .find(".stop-input-group input")
      .attr("id", `radial_gradient_stop_${colorInputsCount + 1}`)
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

  $("#radial_gradient input").on("input", function () {
    setStyles();
  });
};
