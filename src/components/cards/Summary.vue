<template>
  <div class="card shadow border-radius-7 summary">
    <div>
      <h4>This month</h4>
      <p>{{ currency }} {{ monthlySummary }}</p>
    </div>
    <div>
      <h4>This week</h4>
      <p>{{ currency }} {{ weeklySummary }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Summary",
  data() {
    return {};
  },
  props: {
    weeklySummary: String,
    monthlySummary: String,
    currency: String,
  },
};
</script>
<style>
.summary {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
