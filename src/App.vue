<template>
  <div>
    <MainPage />
  </div>
</template>

<script>
import MainPage from '@/pages/MainPage/MainPage.vue'
import lessVars from '@/styles/vars.less?inline';

export default {
  components: {
    MainPage
  },
  created() {
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    onWindowResize() {
      this.$store.commit('setLessVars', lessVars);
    },
  },
};
</script>

<style scoped></style>
