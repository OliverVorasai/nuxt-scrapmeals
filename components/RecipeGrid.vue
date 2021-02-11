<template>
  <v-row justify="center">
    <template v-for="(recipe, index) in recipeList">
      <recipe-card
        :key="recipe.id + `index${index}`"
        :recipe="recipe"
      ></recipe-card>
    </template>
    <v-col v-if="recipes.length > 0" cols="12" class="text-center">
      <v-btn
        v-show="displayCount < recipes.length"
        color="info"
        @click="loadMore"
      >
        See More Recipes
      </v-btn>
    </v-col>
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
  data() {
    return {
      displayCount: 10,
    }
  },
  computed: {
    recipeList() {
      return this.recipes.slice(0, this.displayCount)
    },
  },
  methods: {
    loadMore() {
      this.displayCount += 10
    },
  },
}
</script>
