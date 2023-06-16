import { createStore } from "vuex";
import { clone } from '@/lib/tools';

export default createStore({
  state() {
    return {
      lessVars: null,
    };
  },
  mutations: {
    setLessVars(state, vars) {
      state.lessVars = clone(vars);
    },
  },
  getters: {
    isDesktopOnly(state) {
      return !!window.matchMedia(state.lessVars.desktopOnly).matches;
    },
    isTablet(state) {
      return !!window.matchMedia(state.lessVars.tablet).matches;
    },
    isMobile(state) {
      return !!window.matchMedia(state.lessVars.mobile).matches;
    },
    isMobileSmall(state) {
      return !!window.matchMedia(state.lessVars.mobileSmall).matches;
    },
  },
});
