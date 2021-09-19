<template>
  <div class="overlay center-items" v-if="displayAddModal === true">
    <div class="modal shadow add-modal border-radius-7">
      <span @click="toggleAddModal()" class="card-icon">
        <i class="fa fa-plus-circle"></i>
      </span>

      <div class="form-control">
        <label for="amount"> Amount </label>
        <span class="currency border-radius-7">{{ currency }}</span>
        <input
          class="border-radius-7"
          id="amount"
          v-model="amount"
          placeholder="125"
          type="number"
        />
      </div>
      <span></span>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          placeholder="e.g. 150g Coffee"
          rows="2"
          cols="18"
          class="border-radius-7"
          v-model="description"
        />
      </div>
      <div class="form-control-bottom">
        <button
          @click="$emit('add-transaction', amount, description)"
          class="border-radius-7 bg-green btn"
          :disabled="amount === ''"
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
      name: "AddModal",
      amount: "",
      description: "",
    };
  },
  props: {
    displayAddModal: Boolean,
    currency: String,
    toggleAddModal: Function,
  },
};
</script>
<style>
.add-modal {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.5em 1fr;
}
.add-modal .form-control {
  margin-top: 2em;
  position: relative;
}
.add-modal .form-control label {
  display: inline-block;
}
#amount {
  text-align: right;
}
.currency {
  color: rgb(114, 114, 114);
  display: block;
  position: absolute;
  top: 2em;
  left: 2px;
  padding: 0.4em;
  z-index: 5;
}
.add-modal .form-control-bottom {
  position: absolute;
  width: 50%;
  bottom: 0;
  padding: 1.3em 0.3em 1.3em 1em;
}
.add-modal .form-control-bottom button {
  width: 100%;
}
label,
.currency {
  font-size: 0.8rem;
}
.fa-plus-circle {
  transform: rotate(45deg);
}
textarea,
input {
  width: 100%;
}
textarea {
  height: 80px;
}
</style>
