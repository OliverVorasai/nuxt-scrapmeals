<template>
  <v-row justify="center" align="center" class="mb-12">
    <v-col cols="12" sm="8" class="text-center">
      <h1 class="main-title">ScrapMeals</h1>
      <p class="subtitle">Turn Scraps into Scrumptious!</p>
    </v-col>
    <v-col cols="12" sm="8">
      <recipe-search></recipe-search>
    </v-col>
    <v-col cols="12" xl="8">
      <recipe-grid :recipes="$store.state.recipes"></recipe-grid>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.main-title {
  font-weight: 400;
  font-family: 'Dosis' !important;
  -webkit-text-fill-color: $primary;
  -webkit-text-stroke-color: black;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: 4rem;
    -webkit-text-stroke-width: 1px;
  }
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    font-size: 9rem;
    -webkit-text-stroke-width: 2px;
  }
}

.subtitle {
  font-size: 2rem;
}
</style>
