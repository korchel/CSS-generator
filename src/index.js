import "./main.css";
import $ from "jquery";
import { applyTextShadow } from "./textShadow.js";
import { applyBoxShadow } from "./boxShadow.js";
import { applyGradient } from "./gradient.js";

$(".tabs-wrapper").each(function () {
  let tabs = $(this);
  tabs.find(".tab-item").not(":first").hide();
  tabs.find(".tab").click(function (e) {
    e.preventDefault();
    const currenttab_activeTab = $(".tab_active");
    const curretTabItem = tabs.find(".tab-item");
    const tabToOpen = tabs.find(".tab-item").eq($(this).index());
    if (!$(this).hasClass("tab_active")) {
      curretTabItem.hide();
      tabToOpen.show();
      $(this).addClass("tab_active");
      currenttab_activeTab.removeClass("tab_active");
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
