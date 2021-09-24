<template>
  <div class="container about">
    <div class="card shadow border-radius-16">
      <div class="info">
        <!-- <h2>About</h2> -->
        <div class="user-image"></div>
        <p>Version 1.0.0</p>
        <h2>Cash Flow</h2>
        <h4>Description</h4>
        <p class="description">
          This is an app to enable you to easily manage your finances by showing
          you your spending habits.<br />The app is made by
          <a href="https://www.nigigjohn.tk/">John Ngigi</a> in vue js and other
          javascript libraries
        </p>
        <h4>Author</h4>
        <p class="description">John Ngigi</p>
        <h4>Licence</h4>
        <p class="description">LSC: !23GhytsC</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.about {
  display: grid;
  place-items: center;
}
.about .card.shadow.border-radius-16 {
  min-height: 80vh;
}
.container.about .info .user-image {
  margin: 1em auto;
}
.container.about .info {
  padding-bottom: 1em;
}
div h2,
p {
  text-align: center;
}
h4 {
  margin-top: 2em;
}
p.description {
  margin-top: 0.5em;
  text-align: left;
  font-family: quicksand;
  color: rgb(58, 58, 58);
}
</style>
