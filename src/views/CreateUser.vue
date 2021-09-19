<template>
  <div class="container create-user">
    <form class="card border-radius-16 shadow">
      <h3>{{ name }}</h3>
      <div class="form-control">
        <label for="">Full name</label>
        <input type="text" v-model="username" placeholder="John" />
      </div>
      <div class="form-control">
        <label for="">Email </label>
        <input type="email" v-model="email" placeholder="email@example.com" />
      </div>
      <div class="form-control">
        <label for="accountType">Account type </label>
        <input
          type="text"
          v-model="accountType"
          name="accountType"
          id="accountType"
          list="accounts"
        />
        <datalist id="accounts">
          <option value="Cash">Cash</option>
          <option value="Personal">Personal</option>
          <option value="Saving">Saving</option>
          <option value="Mobile Money">Mobile Money</option>
        </datalist>
      </div>
      <div class="form-control">
        <label for="">Currency $, Ksh, etc</label>
        <input
          type="text"
          id="currency-input"
          list="currency-list"
          v-model="currency"
          placeholder="$"
        />
        <datalist id="currency-list"> </datalist>
      </div>
      <div class="form-control">
        <label for="">Initial Balance </label>
        <input type="number" v-model="initialBalance" placeholder="2000" />
      </div>
      <div class="form-control">
        <input
          @click="submitForm"
          type="submit"
          value="Submit"
          class="bg-green btn border-radius-7 full-width-btn"
        />
      </div>
    </form>
  </div>
</template>
<script>
import currencies from "../../public/worldCurrencies.js";
// import useValidate from "@vue/vulidate/core";
// import { required } from "@vulidate/validators";
export default {
  data() {
    return {
      // v$: useValidate(),
      name: "Create Account",
      username: "",
      email: "",
      accountType: "",
      currency: "",
      initialBalance: 0,
      currencies: {},
    };
  },
  props: {
    updateMemory: Function,
    data: Object,
  },
  // validations() {
  //   return {
  //     firstName: { required },
  //     email: { required },
  //   };
  // },
  methods: {
    createUser: function () {
      let newData;
      let user = this.data.user;
      let preferences = this.data.preferences;
      user.name = this.username;
      user.email = this.email;
      user.account.type = this.accountType;
      console.log(user.account.type);
      user.account.balance = this.initialBalance;
      preferences.currency = this.currency;
      //set transactions to existing transactions
      user.account.transactions = this.data.user.account.transactions;

      newData = {
        user,
        preferences,
      };
      this.updateMemory(newData);
    },
    displayExistingData: function () {
      this.username = this.data.user.name;
      this.email = this.data.user.email;
      this.accountType = this.data.user.account.type;
      this.currency = this.data.preferences.currency;
      this.initialBalance = this.data.user.account.balance;
    },
    submitForm: function (e) {
      e.preventDefault();
      //if data is valid
      this.createUser();
      alert("Data update succesful.");
    },
    makeCurrencyOptions() {
      let currencyList = document.getElementById("currency-list");
      this.currencies = currencies;
      for (let currency in this.currencies) {
        let option = document.createElement("option");
        option.setAttribute("value", this.currencies[currency].symbol);
        option.innerText = currency;
        currencyList.appendChild(option);
      }
    },
  },
  mounted() {
    this.displayExistingData();
    this.makeCurrencyOptions();
  },
};
</script>

<style>
</style>