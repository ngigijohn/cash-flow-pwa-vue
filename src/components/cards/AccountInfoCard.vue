<template>
  <div class="card shadow border-radius-7">
    <h3>{{ accountInfo.type + " Account" }}</h3>
    <p>Balance:{{ currency }} {{ accountBalance() }}</p>
    <router-link class="card-icon" to="/user"
      ><i class="fa fa-cog"></i>
    </router-link>
    <button
      class="border-radius-7 bg-green btn shadow center"
      @click="$emit('show-balance-modal')"
    >
      Increase Balance
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "AccountInfoCard",
    };
  },
  props: {
    accountInfo: Object,
    currency: String,
    accountBalance: Function,
  },
  created() {},
  mounted() {},
};
</script>
<style >
.card button {
  position: relative;
  display: block;
}
.card button.center {
  margin: 2rem auto 0.5em auto;
}
</style>
