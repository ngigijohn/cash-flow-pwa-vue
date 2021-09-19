<template>
  <div class="container tables">
    <Table
      class="border-radius-16"
      v-on:delete-row="deleteRow"
      :transactions="transactions()"
      :currency="currency"
    />
  </div>
</template>
<script>
import Table from "../components/Table.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      name: "Tables",
    };
  },
  props: {
    data: Object,
    deleteRow: Function,
    currency: String,
  },
  methods: {
    transactions: function () {
      const transactions = this.data.user.account.transactions;
      return transactions;
    },
  },
};
</script>

