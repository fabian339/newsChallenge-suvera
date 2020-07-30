<template>
  <v-app>
    <v-navigation-drawer app>
      <div class="left-grid">
        <h2>Categories: </h2>
        <a href="#">Health</a>
        <a href="#">Finances</a>
        <a href="#">Business</a>
        <a href="#">Tech</a>
        <a href="#">Sports</a>
        <a href="#">Weather</a>
        <a href="#">Economy</a>
      </div>
      <div class="left-grid">
        <h2>Country: </h2>
        <a href="#">United Kingdom</a>
        <a href="#">United States</a>
        <a href="#">Spain</a>
        <a href="#">Greece</a>
        <a href="#">Rusia</a>
        <a href="#">France</a>
        <a href="#">Italy</a>
        <a href="#">Germany</a>
      </div>
      <div class="left-grid">
        <h2>Language: </h2>
        <a href="#">English</a>
        <a href="#">Spanish</a>
        <a href="#">Italian</a>
        <a href="#">Russian</a>
        <a href="#">French</a>
        <a href="#">Japanese</a>
        <a href="#">Chinese</a>
        <a href="#">German</a>
      </div>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn to="/" flat>
          <span>News API</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/about" flat>About</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- <v-footer app>
      <p>News API app</p>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      //
    }
  }
}

</script>

<style scoped>
  .left-grid {
    text-align: center;
    display: grid;
    margin: 15px;
  }
</style>
