<template>
  <v-app>
    <v-app-bar fixed flat app color="secondary">
      <v-row justify="center" align="center">
        <v-btn
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          :aria-label="item.title"
          color="primary"
          class="mx-2"
          depressed
          exact
          nuxt
        >
          {{ item.title }}
        </v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'About',
          to: '/about',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Contact',
          to: '/contact',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
#app {
  background-color: $secondary;
  background-image: url('~@/assets/svg/confetti-doodles.svg');
}
</style>
