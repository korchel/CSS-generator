import $ from "jquery";
import { applyTextShadow } from "./textShadow.js";
import { applyBoxShadow } from "./boxShadow.js";
import { applyGradient } from "./gradient.js";
import { applyRadialGradient } from "./radialGradient.js";
import { applyConicGradient } from "./conicGradient.js";
import { applyGradientBorder } from "./gradientBorder.js";

$(".container").each(function () {
  let tabs = $(this);
  tabs.find(".content__item").not(":first").hide();
  tabs.find(".menu__tab").click(function (e) {
    e.preventDefault();
    const currentmenu__tab_activeTab = $(".menu__tab_active");
    const curretTabItem = tabs.find(".content__item");
    const tabToOpen = tabs.find(".content__item").eq($(this).index());
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
