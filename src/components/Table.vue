<template>
  <div class="table">
    <table v-if="groupByDay.length">
      <thead>
        <tr>
          <!-- <td>ID</td> -->
          <td>Amount</td>
          <td>Time</td>
          <td>Description</td>
          <td></td>
        </tr>
      </thead>
      <tbody v-for="days in groupByDay" v-bind:key="days.day">
        <tr class="date">
          <td class="date" colspan="4">
            {{ new Date(days.transactions[0].date).toLocaleDateString() }}
          </td>
        </tr>
        <tr
          v-for="transaction in days.transactions"
          v-bind:key="transaction.date"
        >
          <td>
            {{ transaction.amount }}
          </td>
          <td>
            {{ new Date(transaction.date).toLocaleTimeString() }}
          </td>
          <td>{{ transaction.description }}</td>
          <td class="delete">
            <button
              class="btn-delete"
              @click="$emit('delete-row', transaction.date)"
            >
              x
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-else>
      <thead>
        <tr>
          <!-- <td>ID</td> -->
          <td>Amount</td>
          <td>Time</td>
          <td>Description</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <p class="no-data">No data...</p>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    transactions: Array,
    currency: String,
  },
  methods: {
    getDays: function (transactions) {
      let days = [];
      for (const transaction of transactions) {
        days.push(new Date(transaction.date).getDate());
      }
      days = this.filterDuplicates(days);
      return days;
    },
    filterDuplicates: function (array) {
      let filtered = [];
      for (let i = 0; i < array.length; i++) {
        if (!filtered.includes(array[i])) {
          filtered.push(array[i]);
        }
      }
      return filtered;
    },
  },
  computed: {
    groupByDay: function () {
      let groupedByDay = [];
      let days = this.getDays(this.transactions);

      for (const day of days) {
        groupedByDay.push({
          day: `${day}`,
          transactions: [],
        });
      }

      for (let i = 0; i < groupedByDay.length; i++) {
        for (const transaction of this.transactions) {
          if (
            new Date(transaction.date).getDate().toString() ===
            groupedByDay[i].day
          ) {
            groupedByDay[i].transactions.push(transaction);
          }
        }
      }
      return groupedByDay;
    },
  },
  mounted() {
    // console.log(this.groupByDay);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  position: relative;
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 80px;
  height: 80vh;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.302);
}

.no-data {
  position: absolute;
  width: 80%;
  margin: 0 10%;
  padding: 0.5em 1em;
  top: 3em;
  background-color: #0c5011;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
}
.date {
  text-align: center;
  font-size: 0.8em;
  background: #dee2e6;
  padding: 0.2em;
}
table {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  min-height: 6em;
  overflow-x: scroll;
}

table th,
table td {
  padding: 0.6rem;
  vertical-align: top;
  /* border-top: 1px solid #dee2e6; */
}

table thead {
  background: #212529;
  color: #fff;
  font-weight: 600;
}

table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.delete button {
  border: none;
  outline: none;
  color: var(--bright);
  background: red;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.delete button:hover {
  filter: brightness(120%);
  -webkit-filter: brightness(120%);
}

.delete button:focus {
  filter: brightness(80%);
  -webkit-filter: brightness(80%);
}

tbody tr:nth-child(even) {
  background: var(--light);
}
</style>
