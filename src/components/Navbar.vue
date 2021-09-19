<template>
  <div class="nav-bar">
    <div class="hamburger">
      <input
        @click="$emit('nav-open')"
        type="checkbox"
        class="nav-toggle"
        name="nav-toggle"
        id="nav-toggle"
      />
      <label for="nav-toggle" class="nav-toggle-button"><span></span> </label>
      <label for="nav-toggle" class="nav-overlay"></label>
      <nav>
        <ul class="drop-down">
          <li class="menu-item">
            <div class="user-image">
              <picture>pic</picture>
            </div>
            <div class="user-name">
              <router-link to="/user">{{ userName() }}</router-link>
            </div>

            <hr />
            <div class="menu-user-info">
              <small>Balance: {{ currency }} {{ accountBalance() }}</small>
              <small
                >Total spending: {{ currency }} {{ totalSpending() }}</small
              >
            </div>
          </li>

          <li class="menu-item">
            <hr />
            <router-link to="/">
              <i class="fa fa-home"></i>
              Home
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/charts">Charts</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/tables">Tables</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/contribute">Contribute</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/about">About</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="nav-brand">
      <h1>Cash Flow💰</h1>
    </div>
    <router-link name="user" class="nav-user-icon circle-round" to="/user">
      <font-awesome-icon class="icon-bg-color" :icon="['fas', 'user']" />
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Navbar",
    };
  },
  props: {
    accountBalance: Function,
    totalSpending: Function,
    userName: Function,
    currency: String,
  },
};
</script>
<style>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2em 1em;
  width: 100%;
  background-color: var(--bg-color);
  color: var(--bright);
  text-align: center;
  position: relative;
  z-index: 10;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
}
.nav-bar a {
  color: var(--dark);
}

.nav-bar a.router-link-exact-active {
  color: var(--bg-color);
  font-weight: bold;
}

.nav-brand {
  padding: 0.5em;
  text-align: center;
}

.nav-toggle {
  display: none;
}

.nav-toggle-button {
  height: 100%;
  top: 0;
  left: 1em;
  /* align-items: center; */
}

.nav-toggle-button span,
.nav-toggle-button span::before,
.nav-toggle-button span::after {
  position: relative;
  height: 3px;
  width: 1.8em;
  background: var(--bright);
  display: block;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  -ms-border-radius: 2px;
  -o-border-radius: 2px;
  -webkit-border-radius: 2px;
  z-index: 15;
  transition: transform 0.4s ease;
}

.nav-toggle-button span::before,
.nav-toggle-button span::after {
  content: "";
  position: absolute;
}

.nav-toggle-button span::after {
  bottom: 0.5em;
}

.nav-toggle-button span::before {
  content: "";
  top: 0.5em;
}
.user-name {
  padding: 1em 0;
  text-align: center;
}
.menu-user-info {
  padding-top: 0.5em;
}
.menu-user-info small {
  display: block;

  text-align: right;
}

nav {
  margin-left: -1rem;
  position: absolute;
  top: 100%;
  background: var(--bright);
  z-index: 10;
  text-align: left;
  width: 70%;
  color: var(--gray);
  height: calc(100vh - 3.7em);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.26);
  transition: transform 400ms ease-in-out;
  transform-origin: left;
  transform: scale(0, 1);
  -webkit-transition: transform 400ms ease-in-out;
  -moz-transition: transform 400ms ease-in-out;
  -ms-transition: transform 400ms ease-in-out;
  -o-transition: transform 400ms ease-in-out;
  -webkit-transition: transform 400ms ease-in-out;
  -webkit-transform: scale(0, 1);
  -moz-transform: scale(0, 1);
  -ms-transform: scale(0, 1);
  -o-transform: scale(0, 1);
}

nav ul li {
  padding: 0.5em 1em;
  list-style: none;
  transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -ms-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

nav ul li:hover {
  background-color: var(--light);
}

nav a {
  text-decoration: none;

  opacity: 0;
  transition: opacity 150ms ease-in-out;
  -webkit-transition: opacity 150ms ease-in-out;
  -moz-transition: opacity 150ms ease-in-out;
  -ms-transition: opacity 150ms ease-in-out;
  -o-transition: opacity 150ms ease-in-out;
}

.nav-toggle:checked ~ nav {
  transform: scale(1, 1);
  -webkit-transform: scale(1, 1);
  -moz-transform: scale(1, 1);
  -ms-transform: scale(1, 1);
  -o-transform: scale(1, 1);
}

.nav-overlay {
  left: 100%;
  background-color: #00000087;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  padding: 1em;
}

.nav-toggle:checked ~ .nav-overlay {
  left: 0;
}
.nav-toggle:checked ~ .nav-toggle-button span {
  transform: rotate(45deg);
}
.nav-toggle:checked ~ .nav-toggle-button span::before {
  transform: rotate(360deg);
  opacity: 0;
}
.nav-toggle:checked ~ .nav-toggle-button span::after {
  top: 0;
  transform: rotate(-90deg);
}

.nav-toggle:checked ~ nav a {
  opacity: 1;
  transition: opacity 350ms ease-in-out 200ms;
  -webkit-transition: opacity 350ms ease-in-out 200ms;
  -moz-transition: opacity 350ms ease-in-out 200ms;
  -ms-transition: opacity 350ms ease-in-out 200ms;
  -o-transition: opacity 350ms ease-in-out 200ms;
}
.user-image {
  margin: 0 auto;
  width: 4rem;
  height: 4rem;
  background-color: #17191b;
  text-align: center;
  border-radius: 50%;
  line-height: 4rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

hr {
  border: 1px solid var(--light);
}
.nav-user-icon {
  background-color: rgba(255, 255, 255, 0.768);
  width: 30px;
  height: 30px;
}
.nav-brand h1 {
  font-size: 1.4em !important;
}
</style>
