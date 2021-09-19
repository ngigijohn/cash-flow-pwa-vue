<template>
  <div class="container charts">
    <div class="card shadow border-radius-16">
      <div class="control">
        <button>prev</button>
        <span>week 1</span>
        <button>next</button>
      </div>
      <div class="field is-grouped">
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
      </div>

      <line-chart
        :width="500"
        :height="300"
        :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
        :datasets="displayedDatasets"
        :options="$options.options"
      ></line-chart>
      <bar-chart
        :width="500"
        :height="300"
        :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
        :datasets="displayedDatasets"
        :options="$options.options"
      >
      </bar-chart>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import LineChart from "../components/charts/LineChart.vue";
import BarChart from "../components/charts/BarChart.vue";

const datasets = {
  2018: {
    label: "2018 Sales",
    borderColor: "rgba(50, 115, 220, 0.5)",
    backgroundColor: "rgba(50, 115, 220, 0.5)",
    data: [300, 700, 450, 750, 450],
  },
  2017: {
    label: "2017 Sales",
    borderColor: "rgba(255, 56, 96, 0.5)",
    backgroundColor: "rgba(255, 56, 255, 0.6)",
    data: [600, 550, 750, 250, 700],
  },
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: (value) => numeral(value).format("$0,0"),
        },
      },
    ],
  },
  tooltips: {
    mode: "index",
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format("$0,0");

        return `${label}: ${value}`;
      },
    },
  },
};

export default {
  name: "Charts",
  datasets,
  options,
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      selectedYears: [2018, 2017],
    };
  },
  props: {
    data: Object,
    currency: String,
  },
  computed: {
    displayedDatasets() {
      return this.selectedYears.map((year) => datasets[year]);
    },
    weeklyData() {
      let weeklyData = [];
      let today = new Date().getDay();
      console.log(today);
      return weeklyData;
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
  },
  mounted() {
    console.log(this.weeklyData());
    console.log("mounted");
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