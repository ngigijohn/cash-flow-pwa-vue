<template>
  <div class="container charts">
    <div class="card shadow border-radius-16">
      <div class="control">
        <button>prev</button>
        <span>week 1</span>
        <button>next</button>
      </div>
      <!-- <div class="field is-grouped">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" :value="2018" v-model="selectedYears" />
            2018 Sales
          </label>
        </div>
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" :value="2017" v-model="selectedYears" />
            2017 Sales
          </label>
        </div>
      </div> -->

      <!-- <line-chart
        :width="500"
        :height="300"
        :labels="getDays"
        :datasets="getWeeklyData"
        :options="$options.options"
      ></line-chart> -->
      <bar-chart
        :width="500"
        :height="300"
        :labels="getDays"
        :datasets="getWeeklyData"
        :options="$options.options"
      >
      </bar-chart>
    </div>
    <div class="card shadow border-radius-16">
      <div v-for="(group, index) in groupByDay" :key="index">
        <div v-for="(tr, index) in group.transactions" :key="index">
          <small>{{ new Date(tr.date).toLocaleString() }}</small>
          <p>{{ currency }} {{ tr.amount }}</p>
          <p>{{ tr.description }}</p>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
// import LineChart from "../components/charts/LineChart.vue";
import BarChart from "../components/charts/barChart.vue";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: (value) => numeral(value).format("0,0"),
        },
      },
    ],
  },
  tooltips: {
    mode: "index",
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format("0,0");

        return `${label}: ${value}`;
      },
    },
  },
};

export default {
  name: "Charts",
  options,
  components: {
    // LineChart,

    BarChart,
  },
  data() {
    return {
      // weeklyData: this.getWeeklyData,
      // labels: [],
    };
  },
  props: {
    data: Object,
    currency: String,
  },
  methods: {
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
    transactions() {
      return this.data.user.account.transactions;
    },
    displayedDatasets() {
      return this.weeklyData;
      // return this.selectedYears.map((year) => datasets[year]);
    },
    groupByDay: function () {
      let groupedByDay = [];
      let days = this.getDays;

      for (const day of days) {
        groupedByDay.unshift({
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
    // displayedWeeklyData() {
    //   for (let index = 0; index < this.groupByDay.length; index++) {
    //     const day = this.displayedWeeklyData[index];
    //     console.log(day);
    //   }
    //   return 0;
    // },
    getDays: function () {
      let days = [];
      let limit = 7;
      let today = new Date().getDate();
      for (let index = today; index > today - limit; index--) {
        days.push(index);
      }
      return days.reverse();
    },
    getWeeklyData() {
      let dailyData = [];
      this.groupByDay.forEach((day) => {
        console.log(day.transactions);
        if (day.transactions) {
          let sum = 0;
          for (const transaction of day.transactions) {
            sum += parseFloat(transaction.amount);
          }
          dailyData.push(sum);
        } else {
          dailyData.push(0);
        }
      });
      return [
        {
          // label: "daily spending",
          label: "Daily spending in " + this.currency,
          borderColor: "rgba(86, 0, 220, 0.5)",
          backgroundColor: "rgba(86, 0, 172, 0.8)",
          data: dailyData.reverse(),
        },
      ];
    },
  },
  mounted() {
    // console.log(this.groupByDay);
  },
};
</script>
<style >
.control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>