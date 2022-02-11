import { setIconsHoverBehavior } from "./helpers";

const stackList = document.querySelector(".stack-list");
const stackTitle = document.querySelector(".stack .info-title");
const items = document.querySelectorAll(".stack-item a i");

setIconsHoverBehavior(items, stackList, stackTitle, "technologies");
