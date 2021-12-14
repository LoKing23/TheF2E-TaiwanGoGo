import { createStore } from "vuex";
import ScientSpot from "./Home/scientSpot";
import Restaurant from "./Home/restaurant";
import Activity from "./Home/activity";
export default createStore({
  modules: {
    Restaurant,
    ScientSpot,
    Activity,
  },
});
