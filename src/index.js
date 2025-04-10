import $ from "jquery";
import { applyTextShadow } from "./textShadow.js";
import { applyBoxShadow } from "./boxShadow.js";
import { applyGradient } from "./gradient.js";
import { applyRadialGradient } from "./radialGradient.js";
import { applyConicGradient } from "./conicGradient.js";
import { applyGradientBorder } from "./gradientBorder.js";
import { applyGradientText } from "./gradietnText.js";
import { applyStripedBorder } from "./stripedBorder.js";

$("body").each(function () {
  $(".content").find(".content__item").not(":first").hide();
  $(".menu")
    .find(".menu__tab")
    .on("click", function (e) {
      e.preventDefault();
      const currentmenu__tab_activeTab = $(".menu__tab_active");
      const curretTabItem = $(".content").find(".content__item");
      const tabToOpen = $(".content")
        .find(".content__item")
        .eq($(this).index());
      if (!$(this).hasClass("menu__tab_active")) {
        curretTabItem.hide();
        tabToOpen.show();
        $(this).addClass("menu__tab_active");
        currentmenu__tab_activeTab.removeClass("menu__tab_active");
      }
    });
});

$('[title="copy"]').on("click", function () {
  const text = $(`#${$(this).attr("data-id")}`);
  text.select();
  navigator.clipboard.writeText(text.text());
});

$("[data-id='delete-color']").on("click", function () {
  const colorInputsCount = $(this).closest(".color-inputs").children().length;
  $(this).closest(".color-input-group").remove();
  if (colorInputsCount <= 3) {
    $("[data-id='delete-color']").prop("disabled", true);
  }
});

$('[data-id="open-menu"]').on("click", function () {
  $(".sidebar").animate({ left: "0" });
});

$('[data-id="close-menu"]').on("click", function () {
  $(".sidebar").animate({ left: "-150px" });
});

$("input[type='number']").on("input", function () {
  $(this).prev('input[type="range"]').val($(this).val());
});

$("input[type='range']").on("input", function () {
  $(this).next('input[type="number"]').val($(this).val());
});

applyTextShadow();
applyBoxShadow();
applyGradient();
applyRadialGradient();
applyConicGradient();
applyGradientBorder();
applyGradientText();
applyStripedBorder();
