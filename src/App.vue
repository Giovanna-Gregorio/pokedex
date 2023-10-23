<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/Pokemon-Logo.png"
          transition="scale-transition"
          width="150"
        />
      </div>
    </v-app-bar>

    <v-main>
      <Index/>
    </v-main>
  </v-app>
</template>

<script>
import Index from './components/Index';

export default {
  name: 'App',

  components: {
    Index
  },

  data: () => ({
    //
  }),
};
</script>

<!-- <style>
#app {
  background-image: url("./assets/fundo.jpg");
  background-repeat: no-repeat;
}
</style> -->