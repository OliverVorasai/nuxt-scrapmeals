<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <h2>The Recipes</h2>
    </v-col>
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
