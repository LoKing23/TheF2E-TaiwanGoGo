import { createStore } from "vuex";
import ScientSpot from "./Home/scientSpot";
import Restaurant from "./Home/restaurant";
import Activity from "./Home/activity";
import Lv2Activity from "./Lv2/activity";
import Lv2Restaurant from "./Lv2/restaurant";
import Lv2ScientSpot from "./Lv2/scientSpot";

export default createStore({
  modules: {
    Restaurant,
    ScientSpot,
    Activity,
    Lv2Activity,
    Lv2Restaurant,
    Lv2ScientSpot,
  },
});
