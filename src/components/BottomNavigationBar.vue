<template>
  <div>
    <router-link to="/">
      <font-awesome-icon class="nav-icon" :icon="['fas', 'home']" />
    </router-link>

    <router-link to="/tables">
      <font-awesome-icon class="nav-icon" :icon="['fas', 'list']" />
    </router-link>

    <span
      class="add-btn bg-color circle-round shadow"
      @click="$emit('toggle-add-modal')"
    >
      +
    </span>
    <router-link to="/charts">
      <font-awesome-icon class="nav-icon" :icon="['fa', 'chart-bar']" />
    </router-link>

    <router-link to="/about">
      <font-awesome-icon class="nav-icon" :icon="['fa', 'info-circle']" />
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "BottomNavigationBar",
    };
  },
  props: {},
  methods: {},
};
</script>
<style scoped>
div {
  position: fixed;
  z-index: 8;
  bottom: 0;
  width: var(--screen-width);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5em;
  background-color: var(--light);
}
div a {
  color: var(--dark);
}
div .router-link-exact-active {
  color: var(--bg-color);
}
div .nav-icon {
  font-size: 1.5em;
}
.add-btn {
  border: none;
  position: relative;
  bottom: 20px;
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0;
  font-size: 2em;
  text-align: center;
  font-weight: 900;
  line-height: 50px;
  transition: 300ms ease-in-out;
  box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.274);
}
.add-btn:hover {
  filter: brightness(80%);
}
.add-btn:active {
  transform: rotate(360deg);
}
</style>
