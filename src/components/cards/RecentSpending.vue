<template>
  <div class="card shadow border-radius-7">
    <h3>{{ name }}</h3>
    <table v-if="recentSpending">
      <tbody>
        <tr v-for="(transaction, index) in formatedRecentSpending" :key="index">
          <td>{{ transaction.description }}</td>
          <td>{{ currency }} {{ transaction.amount }}</td>
          <td>{{ transaction.date }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>You have not spent any money🎊</p>
    <router-link
      to="/tables"
      v-if="recentSpending"
      class="border-radius-7 bg-green btn-sm shadow link-right"
    >
      Show more
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Recent Spending",
    };
  },
  props: {
    recentSpending: Array,
    currency: String,
  },
  methods: {
    ago: function (time) {
      let now = new Date();
      let difference = new Date(now.getTime() - time);
      let timeAgo = "";

      if (difference.getUTCHours() > 23) {
        return new Date(time).toDateString();
      }
      if (difference.getUTCHours() > 0) {
        timeAgo = `${difference.getUTCHours()} h ${difference.getMinutes()} min ago`;
        return timeAgo;
      }
      if (difference.getUTCHours() > 1) {
        timeAgo = `${difference.getUTCHours()} hours  ago`;
        return timeAgo;
      }
      if (difference.getMinutes() > 0) {
        timeAgo = `${difference.getMinutes()} min ago`;
        return timeAgo;
      }
      timeAgo = "now";
      return timeAgo;
    },
  },
  computed: {
    formatedRecentSpending: function () {
      let formated = new Array();
      this.recentSpending.map((val) => {
        formated.push({
          amount: val.amount,
          description: val.description,
          date: this.ago(val.date),
        });
      });
      return formated.reverse();
    },
  },
  mounted() {},
};
</script>

<style>
table {
  width: 100%;
  font-family: Quicksand;
  /* background: blue; */
}
table tbody tr td,
.card p {
  padding: 0.2em;
}
.card table tbody tr td:nth-child(3) {
  text-align: right;
}
.card .link-right {
  position: relative;
  display: block;
  margin: 2rem 1em 0.5em auto;
  width: fit-content;
  text-decoration: none;
}
</style>