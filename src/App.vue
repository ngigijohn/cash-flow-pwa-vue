<template>
  <div id="app">
    <Navbar
      :userName="userName"
      :accountBalance="accountBalance"
      :totalSpending="totalSpending"
      :currency="currency"
    />
    <div class="container" v-if="!data">
      <div class="init shadow border-radius-16 card">
        <h3>Thanks for installing the Cash Flow web app</h3>
        <ul class="note">
          Note
          <li><p>All data is stored locally on your device</p></li>
          <li>
            <p>
              Uninstalling or reseting your browser will lead to loss of data
            </p>
          </li>
          <li>
            <p>The app is under development and some features may not work</p>
          </li>
          <li>
            <p>
              To create an account tap the user icon on the top right corner
            </p>
          </li>
        </ul>
        <p class="tip">To get started</p>
        <a href="" class="bg-green center-text border-radius-7 refresh"
          >Get started</a
        >
      </div>
    </div>

    <router-view
      :accountBalance="accountBalance"
      :resetMemory="resetMemory"
      :updateMemory="updateMemory"
      :currency="currency"
      :deleteRow="deleteRow"
      v-bind="{ data }"
      v-on:show-balance-modal="toggleBalanceModal"
    />
    <BottomNavigationBar v-on:toggle-add-modal="toggleAddModal()" />
    <AddModal
      :currency="currency"
      :displayAddModal="displayAddModal"
      :toggleAddModal="toggleAddModal"
      v-on:add-transaction="addTransaction"
    />
    <IncreaseBalanceModal
      :displayBalanceModal="displayBalanceModal"
      :toggleBalanceModal="toggleBalanceModal"
      v-on:add-to-balance="addToBalance"
    />
  </div>
</template>
<script>
import BottomNavigationBar from "@/components/BottomNavigationBar";
import AddModal from "@/components/AddModal";
import Navbar from "@/components/Navbar.vue";
import IncreaseBalanceModal from "@/components/IncreaseBalanceModal";
// import Home from "./views/Home.vue";
export default {
  components: { BottomNavigationBar, AddModal, Navbar, IncreaseBalanceModal },
  data() {
    return {
      name: "App",
      data: this.readMemory(),
      existingMemory: false,
      displayAddModal: false,
      displayBalanceModal: false,
      currency: "",
    };
  },
  methods: {
    log() {
      console.log("You called!!");
    },
    readMemory: () => {
      const data = JSON.parse(localStorage.getItem("memoryString"));
      return data;
    },
    createMemory: function () {
      if (localStorage.getItem("memoryString") !== null) {
        this.existingMemory = true;
      } else {
        //create
        console.log("data not found: creating new memory....");
        localStorage.setItem(
          "memoryString",
          JSON.stringify({
            user: {
              name: "",
              email: "",
              account: {
                type: "Cash",
                balance: "0",
                transactions: [],
              },
            },
            preferences: {
              primaryColor: "#5600ac",
              secondaryColor: "#1fd837",
              backgroundColor: "#f3f3f3",
              currency: "Ksh",
              maximumValue: "999999",
            },
          })
        );
      }
    },
    updateMemory: function (data) {
      if (this.existingMemory == true) {
        localStorage.setItem("memoryString", JSON.stringify(data).toString());
      }
    },
    resetMemory: function () {
      localStorage.removeItem("memoryString");
      localStorage.setItem(
        "memoryString",
        JSON.stringify({
          user: {
            name: "",
            email: "",
            account: {
              type: "Cash",
              balance: "0",
              transactions: [],
            },
          },
          preferences: {
            primaryColor: "#5600ac",
            secondaryColor: "#1fd837",
            backgroundColor: "#f3f3f3",
            currency: "Ksh",
            maximumValue: "999999",
          },
        })
      );
    },
    toggleAddModal: function () {
      this.displayAddModal = !this.displayAddModal;
    },
    toggleBalanceModal: function () {
      this.displayBalanceModal = !this.displayBalanceModal;
    },
    deleteRow: function (date) {
      let {
        user: {
          account: { transactions: transactions },
        },
      } = this.data;

      this.data.user.account.transactions = transactions.filter(
        (transaction) => transaction.date !== date
      );
      this.updateMemory(this.data);
    },
    addToBalance: function (amount) {
      let currentBalance = parseFloat(this.data.user.account.balance);
      if (parseFloat(amount).toString() === "NaN") {
        return;
      }
      if (parseFloat(amount) < 0) {
        return;
      }
      currentBalance += parseFloat(amount);
      this.data.user.account.balance = currentBalance;
      this.updateMemory(this.data);
      this.toggleBalanceModal();
    },
    addTransaction: function (amount, description) {
      let transactions = this.data.user.account.transactions;

      let newTransaction = {
        amount: parseFloat(amount),
        date: new Date().getTime(),
        description: description,
      };

      transactions = [...transactions, newTransaction];
      this.data.user.account.transactions = transactions;
      this.updateMemory(this.data);
      this.toggleAddModal();
    },
    accountBalance: function () {
      let balance = parseInt(this.data.user.account.balance);
      const spending = this.totalSpending();
      balance -= 0;
      return balance - spending;
    },
    totalSpending: function () {
      let totalSpending = 0;
      this.data.user.account.transactions.forEach((transaction) => {
        totalSpending += transaction.amount;
      });
      return totalSpending;
    },
    userName: function () {
      return this.data.user.name;
    },
  },
  created() {
    // console.log(this.existingMemory);
    // localStorage.removeItem("memoryString");
  },

  mounted() {
    this.createMemory();
    this.currency = this.data.preferences.currency;
  },
};
</script>
<style>
:root {
  --screen-width: 100vw;
  --bg-color: rgb(86, 0, 172);
  --bg-green: #1fd837;
  --dark: #232029;
  --gray: #484848;
  --light: #f3f3f3;
  --bright: #fcfcfc;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Century, sans-serif, "Times New Roman", Times, serif;
}
p,
input,
label,
a {
  font-family: Quicksand, Arial, Helvetica, sans-serif;
}
.container {
  z-index: 1;
  position: relative;
  padding: 1em 1em 80px 1em;
  background: var(--light);
  min-height: 90vh;
}
#app {
  position: relative;
  margin: 0 auto;
  min-width: 200px;
  width: var(--screen-width);
  font-family: "Times New Roman", Times, Quicksand, Avenir, Helvetica, Arial,
    sans-serif;
  color: #131313;
  background-color: #fff;
  min-height: 100vh;
}
.bg-color {
  background-color: var(--bg-color);
  color: #fff;
}
.bg-green {
  background-color: var(--bg-green);
  color: #fff;
}
.bg-red {
  background-color: var(--bg-red);
  color: #fff;
}
.bg-light {
  background-color: var(--bg-light);
  color: var(--gray);
}
.icon-bg-color {
  color: var(--bg-color);
  height: 100%;
  font-size: 1.5em;
}
.circle-round {
  border-radius: 50%;
}
.shadow {
  box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.171);
}
button,
input,
textarea,
select {
  outline: none;
  border: none;
  font-family: Quicksand;
  font-weight: 900;
}
input,
textarea,
select {
  border: 2px solid rgba(92, 0, 128, 0.219);
}
textarea:hover,
textarea:focus,
button:hover,
button:focus,
input:hover,
input:focus,
select:hover,
select:focus {
  border: 2px solid var(--bg-color);
}
/* modal-syles */
.overlay {
  background-color: #000000a4;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  width: var(--screen-width);
  padding: 1em;
}
.center-items {
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-text {
  text-align: center;
}
/* cards and modal popups */
.modal,
.card {
  background: var(--bright);
  padding: 1em;
  width: 100%;
  font-weight: 400;
}
.card {
  position: relative;
  margin-bottom: 1em;
}
.card h3 {
  color: var(--dark);
  margin-bottom: 0.3em;
}
.modal input,
textarea {
  padding: 0.5em;
}
.card-icon {
  position: absolute;
  top: 1em;
  right: 1em;
}
.form-control label {
  color: rgb(148, 148, 148);
  margin-bottom: 0.5em;
}
/* border-radius */
.border-radius-7 {
  border-radius: 7px;
}
.border-radius-16 {
  border-radius: 16px;
}
/* card buttons */
.btn {
  padding: 0.3em 1em;
  font-size: 1em;
}
.btn.bg-green {
  border: 2px solid rgba(40, 173, 0, 0.445);
}
.btn.bg-light {
  border: 2px solid rgba(31, 31, 31, 0.152);
}
.btn.bg-color {
  border: 2px solid rgba(66, 0, 173, 0.445);
}
.btn-delete {
  background: rgb(177, 0, 0);
}
.fa {
  color: var(--bg-color) !important;
  background-color: var(--bg-color) !important;
}
/* form styles */
form .form-control {
  padding: 1em 0;
}
form .form-control input,
form .form-control select,
form .form-control textarea {
  padding: 0.5em;
  border-radius: 7px;
}
.full-width-btn {
  width: 100%;
}
form .form-control select {
  width: 100%;
  padding: 0.5em;
}
.note {
  margin: 2em;
}
.tip {
  margin-top: 2em;
}
a.refresh {
  display: block;
  text-decoration: none;
  padding: 0.5em;
}

@media screen and (min-width: 600px) {
  #app {
    min-width: 200px;
    --screen-width: 440px;
    width: var(--screen-width);
  }
}
</style>
