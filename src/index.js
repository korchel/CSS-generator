import "./main.css";
import $ from "jquery";
import { applyTextShadow } from "./textShadow.js";
import { applyBoxShadow } from "./boxShadow.js";

$(".tabs-wrapper").each(function () {
  let tabs = $(this);
  tabs.find(".tab-item").not(":first").hide();
  tabs.find(".tab").click(function (e) {
    e.preventDefault();
    const currentActiveTab = $(".active");
    const curretTabItem = tabs.find(".tab-item");
    const tabToOpen = tabs.find(".tab-item").eq($(this).index());
    if (!$(this).hasClass("active")) {
      curretTabItem.hide();
      tabToOpen.show();
      $(this).addClass("active");
      currentActiveTab.removeClass("active");
    }
  });
});

applyTextShadow();
applyBoxShadow();
