<template>
  <div class="container home">
    <AccountInfoCard
      :currency="currency"
      :accountInfo="accountInfo()"
      :accountBalance="accountBalance"
      v-on:show-balance-modal="$emit('show-balance-modal')"
    />
    <RecentSpending :currency="currency" :recentSpending="recentSpending()" />
    <Summary
      :currency="currency"
      :weeklySummary="weeklySummary"
      :monthlySummary="monthlySummary"
    />
  </div>
</template>

<script>
import AccountInfoCard from "@/components/cards/AccountInfoCard";
import RecentSpending from "@/components/cards/RecentSpending";
import Summary from "@/components/cards/Summary";
export default {
  name: "Home",
  data() {
    return {
      weeklySummary: "",
      monthlySummary: "",
    };
  },
  components: {
    AccountInfoCard,
    RecentSpending,
    Summary,
  },
  props: {
    data: Object,
    currency: String,
    accountBalance: Function,
  },
  methods: {
    accountInfo: function () {
      const accountInfo = this.data.user.account;
      return accountInfo;
    },
    recentSpending: function () {
      let recentSpending = this.data.user.account.transactions;
      return recentSpending.slice(
        recentSpending.length - 5,
        recentSpending.length
      );
    },
    getWeeklySummary: function () {
      let weeklySum = 0;
      let data = this.data.user.account.transactions;
      let checking = true;
      let index = data.length;
      while (checking && index !== -1) {
        let prev = Infinity;
        let current = 0;
        if (data[index + 1] !== undefined) {
          prev = new Date(data[index + 1].date).getDay();
        }
        if (data[index] !== undefined) {
          current = new Date(data[index].date).getDay();
        }
        if (prev < current) {
          checking = false;
        } else {
          if (data[index] !== undefined) weeklySum += data[index].amount;
        }
        index--;
      }
      return weeklySum;
    },
    getMonthlySummary: function () {
      let monthlySum = 0;
      let data = this.data.user.account.transactions;
      let checking = true;
      let index = data.length;
      while (checking && index !== -1) {
        let prev = Infinity;
        let current = 0;
        if (data[index + 1] !== undefined) {
          prev = new Date(data[index + 1].date).getDate();
        }
        if (data[index] !== undefined) {
          current = new Date(data[index].date).getDate();
        }
        if (prev < current) {
          checking = false;
        } else {
          if (data[index] !== undefined) monthlySum += data[index].amount;
        }
        index--;
      }
      return monthlySum;
    },
  },
  mounted() {
    this.weeklySummary = this.getWeeklySummary().toString();
    this.monthlySummary = this.getMonthlySummary().toString();
  },
  updated() {
    this.weeklySummary = this.getWeeklySummary().toString();
    this.monthlySummary = this.getMonthlySummary().toString();
  },
};
</script>
<style>
.home {
  padding: 1em;
  margin-bottom: 3em;
}
.card .btn-sm {
  padding: 0.3em 0.5em;
}
</style>
 