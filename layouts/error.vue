<template>
  <v-row justify="center">
    <v-col v-if="error.statusCode === 404" cols="12">
      <v-card max-width="400" class="pa-6 mx-auto">
        <v-img
          :src="require('@/assets/svg/error-404-colour.svg')"
          max-height="400"
          max-width="400"
          contain
        ></v-img>
        <v-card-text class="test--primary text-h6">
          <span v-if="error.message">
            {{ error.message }}
          </span>
          <span v-else>
            {{ pageNotFoundMessage }}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-btn class="mx-auto" color="primary" to="/" nuxt>Return Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-else cols="12">
      {{ otherError }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      pageNotFoundMessage: "We're sorry, that page does not seem to exist.",
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
