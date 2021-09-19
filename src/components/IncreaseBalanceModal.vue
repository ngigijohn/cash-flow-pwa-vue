<template>
  <div class="overlay center-items" v-if="displayBalanceModal === true">
    <div class="increase-balance modal shadow border-radius-7">
      <span @click="toggleBalanceModal()" class="card-icon">
        <i class="fa fa-plus-circle"></i>
      </span>

      <div class="form-control">
        <label for="amount"> Add to current balance </label>
        <span class="currency border-radius-7">{{ currency }}</span>
        <input class="border-radius-7" id="amount" v-model="amount" />
      </div>
      <div class="form-control-bottom">
        <button
          @click="$emit('add-to-balance', amount)"
          class="border-radius-7 bg-green btn"
          :disabled="amount === null"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Add to Balance",
      amount: "",
    };
  },
  props: {
    toggleBalanceModal: Function,
    displayBalanceModal: Boolean,
    currency: String,
  },
};
</script>
<style>
.increase-balance {
  position: relative;
}
.increase-balance .form-control,
.increase-balance .form-control-bottom {
  margin-top: 1em;
}
</style>
