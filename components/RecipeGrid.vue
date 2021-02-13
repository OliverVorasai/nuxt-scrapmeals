<template>
  <v-row justify="center">
    <!-- Grid for Recipe Cards -->
    <template v-for="(recipe, index) in recipeList">
      <recipe-card
        :key="recipe.id + `index${index}`"
        :recipe="recipe"
      ></recipe-card>
    </template>
    <!-- Button to show more recipes -->
    <v-col v-if="recipes.length > 0" cols="12" class="text-center">
      <v-btn
        v-show="displayCount < recipes.length"
        color="info"
        @click="loadMore"
      >
        See More Recipes
      </v-btn>
    </v-col>
    <!-- Plain card for no results -->
    <v-col v-if="showNoResults" cols="12" sm="8" md="6" lg="4">
      <v-card class="mx-auto">
        <v-card-title class="justify-center"> No Results Found </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      // Current max number of recipe cards to display
      displayCount: 10,
      // Show no results card
      showNoResults: false,
    }
  },
  computed: {
    // Keep recipe list limited from 0 to current max
    recipeList() {
      return this.recipes.slice(0, this.displayCount)
    },
  },
  watch: {
    // For each call, check whether no results card needs to be displayed
    recipes(val) {
      this.recipes.length === 0
        ? (this.showNoResults = true)
        : (this.showNoResults = false)
    },
  },
  methods: {
    // Increase current card display maximum
    loadMore() {
      this.displayCount += 10
    },
  },
}
</script>
