<template>
  <div class="container contribute">
    <form class="form card border-radius-16 shadow">
      <h3>{{ name }}</h3>
      <div class="form-control">
        <label for="">First name</label>
        <input type="text" placeholder="John" />
      </div>
      <div class="form-control">
        <label for="">Last name</label>
        <input type="text" placeholder="John" />
      </div>
      <div class="form-control">
        <label for="">Email </label>
        <input type="text" placeholder="email@example.com" />
      </div>
      <div class="form-control">
        <label for="">Message</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>

      <div class="form-control">
        <button class="bg-green btn border-radius-7 full-width-btn">
          Send
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Contribute & Feedback",
    };
  },
};
</script>
