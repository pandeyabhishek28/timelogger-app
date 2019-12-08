import Vue from "vue";
import Vuex from "vuex";

// import getters from "./vuex/getters"; (in progress)

Vue.use(Vuex);

const state = {
  Projects: [{}],
  DefaultVueCalViewDays: 7,
  SelectedStartDate: new Date(),
  DefaultDateTimeFormat: "DD-MM-YYYY HH:mm",
  VueCalDateTimeFormat: "YYYY-MM-DD HH:mm"
};

export default new Vuex.Store({
  name:"store",
  state
 });
