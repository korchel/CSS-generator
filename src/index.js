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

applyTextShadow();
applyBoxShadow();
applyGradient();
applyRadialGradient();
applyConicGradient();
applyGradientBorder();
