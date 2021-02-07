<template>
  <v-row justify="center">
    <template v-for="recipe in recipes">
      <recipe-card :key="recipe.id" :recipe="recipe"></recipe-card>
    </template>
  </v-row>
</template>

<script>
import RecipeCard from './RecipeCard.vue'
export default {
  components: { RecipeCard },
  props: {
    recipes: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>
