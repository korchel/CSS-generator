import $ from "jquery";
import { getConicColors } from "./utils/getConicColors.js";

const generateGradientStyle = (
  angle,
  thickness,
  borderRadius,
  colors,
  isRepeating
) => {
  const colorString = colors
    .map(({ color, stop }) => `${color} ${stop}`)
    .join(", ");
  return {
    box: {
      height: "450px",
      width: "300px",
      position: "relative",
      "border-radius": `${borderRadius}px`,
    },
    before: {
      content: '""',
      position: "absolute",
      inset: 0,
      "border-radius": "inherit",
      padding: `${thickness}px`,
      background: `${
        isRepeating ? "repeating-" : ""
      }conic-gradient(from ${angle}deg, ${colorString})`,
      mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      "mask-composite": "exclude",
    },
  };
  // return `.box {
  //   height: 450px; // adjust height
  //     // adjust width
  //   position: relative;
  //   border-radius: ${borderRadius}px;
  // }
  // .box::before {
  //   content: "";
  //   position: absolute;
  //   inset: 0;
  //   border-radius: inherit;
  //   padding: ${thickness}px;
  //   background: ${
  //     isRepeating ? "repeating-" : ""
  //   }conic-gradient(from ${angle}deg, ${colorString});
  //   mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  //   mask-composite: exclude;
  // }`;
};

const setStyles = () => {
  const angle = $("#gradient_border_angle").val();
  const isRepeating = $("#gradient_border_repeating").is(":checked");
  const hasHardStops = $("#gradient_border_hard_stops").is(":checked");
  const thickness = $("#gradient_border_thickness").val();
  const borderRadius = $("#gradient_border_radius").val();
  const stopInputs = $('[id^="gradient_border_stop"]');
  const colorInput = $('[id^="gradient_border_color"]');

  const colors = getConicColors(stopInputs, colorInput, hasHardStops);
  const colorString = colors
    .map(({ color, stop }) => `${color} ${stop}`)
    .join(", ");
  const styles = generateGradientStyle(
    angle,
    thickness,
    borderRadius,
    colors,
    isRepeating
  );

  $("#gradient_border_result")
    .css("--gradient-border-radius", `${borderRadius}%`)
    .css(
      "--gradient-border-colors",
      `${
        isRepeating ? "repeating-" : ""
      }conic-gradient(from ${angle}deg, ${colorString})`
    )
    .css("--gradient-border-thickness", `${thickness}%`);

  $("#gradient_border_result_code ").text(styles);
};

export const applyGradientBorder = () => {
  setStyles();
  $("[href='gradient_border']").on("click", () => {
    $("#gradient_border_position_y").width(
      $("#gradient_border_result").height()
    );
  });

  $(window).on("resize", function () {
    $("#gradient_border_position_y").width(
      $("#gradient_border_result").height()
    );
  });

  $("#gradient_border_add_color").on("click", function () {
    const colorInputs = $(this).parent().siblings(".color-inputs");
    const colorInputsCount = colorInputs.children().length;
    if (colorInputsCount === 7) {
      return;
    }
    const newColorInput = colorInputs.children().first().clone();
    newColorInput
      .find(".color-input-group label")
      .attr("for", `gradient_border_color_${colorInputsCount + 1}`)
      .text("Color");
    newColorInput
      .find(".color-input-group input")
      .attr("id", `gradient_border_color_${colorInputsCount + 1}`)
      .on("input", setStyles);
    newColorInput
      .find(".stop-input-group label")
      .attr("for", `gradient_border_stop_${colorInputsCount + 1}`);
    newColorInput
      .find(".stop-input-group input")
      .attr("id", `gradient_border_stop_${colorInputsCount + 1}`)
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

  $("#gradient_border .result-vue").css(
    "background-color",
    $("#gradient_border_bg_color").val()
  );

  $("#gradient_border_bg_color").on("input", function () {
    $("#gradient_border .result-vue").css("background-color", $(this).val());
  });

  $("#gradient_border input").on("input", function () {
    setStyles();
  });
};
