<template>
  <div class="container user">
    <div class="border-radius-16 shadow">
      <div class="user-info">
        <span class="card-icon">
          <router-link to="/create-user">
            <font-awesome-icon :icon="['fa', 'edit']" />
          </router-link>
        </span>
        <div class="user-image"></div>
        <h4>{{ data.user.name }}</h4>
        <h2>{{ data.user.account.type }} account</h2>
        <p>
          Account Balance:
          {{ data.preferences.currency }}
          {{ accountBalance() }}
        </p>
        <div class="form-control">
          <button @click="reset" class="bg-light btn border-radius-7">
            Reset
          </button>
        </div>
      </div>
    </div>
    <div class="border-radius-16 shadow">
      <div class="preferences">
        <h2>preferences</h2>
        <div class="form-control">
          <input type="color" name="" id="" v-model="primaryColor" />
          <label>Primary Color</label>
        </div>
        <div class="form-control">
          <input type="color" name="" id="" v-model="secondaryColor" />
          <label>Secondary Color</label>
        </div>
        <div class="form-control">
          <input type="color" name="" id="" v-model="backgroundColor" />
          <label>Background Color</label>
        </div>
        <!-- <span>cashDenomination</span
        ><span>{{ data.preferences.currency }}</span> <span>Maximum Value</span
        ><span> {{ data.preferences.maximumValue }}</span> -->
        <br />
        <div class="form-control">
          <button @click="reset" class="bg-light btn border-radius-7">
            Reset
          </button>
          <button
            @click="updatePreferences"
            class="bg-color btn border-radius-7"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "User",
      backgroundColor: "",
      primaryColor: "",
      secondaryColor: "",
    };
  },
  props: {
    data: Object,
    updateMemory: Function,
    resetMemory: Function,
    accountBalance: Function,
  },
  methods: {
    reset: function () {
      if (
        confirm("This will delete All your data!\n Do you wish to continue?")
      ) {
        this.resetMemory();
      }
    },
    updatePreferences: function () {
      let newData;
      let user = this.data.user;
      let preferences = this.data.preferences;
      preferences.backgroundColor = this.backgroundColor;
      preferences.primaryColor = this.primaryColor;
      preferences.secondaryColor = this.secondaryColor;
      newData = {
        user: user,
        preferences: preferences,
      };
      this.updateMemory(newData);
    },
  },
  mounted() {
    let {
      preferences: {
        backgroundColor: backgroundColor,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
      },
    } = this.data;

    (this.backgroundColor = backgroundColor),
      (this.primaryColor = primaryColor),
      (this.secondaryColor = secondaryColor);
  },
};
</script>

<style>
.user-info {
  text-align: center;
  position: relative;
}
.user-info .form-control {
  margin: 2em;
}
div.border-radius-16 {
  /* margin: 1em; */
  padding: 2em 1em;
}
div.border-radius-16 h2 {
  margin: 0.3em;
}
div.border-radius-16 h2,
.user-image {
  margin-bottom: 0.3em;
  text-align: center;
}
div.border-radius-16 hr {
  margin: 3em 0;
}
input[type="color"] {
  position: relative;
  left: 0;
  border: none;
  width: 30px;
  height: 30px;
}
.preferences .form-control {
  display: flex;
  padding: 0.5em;
}
.preferences .form-control button {
  margin: 2em;
}
</style>
