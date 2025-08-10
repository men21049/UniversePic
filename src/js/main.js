import { loadHeaderFooter } from "./utils.mjs";
import { displayMainPic } from "./utils.mjs";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons.min.js";
UIkit.use(Icons);

loadHeaderFooter();
displayMainPic("dayImage");
