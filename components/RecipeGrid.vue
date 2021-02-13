<template>
  <div>
    <!-- Grid for Recipe Cards -->
    <transition-group appear name="slide-in" tag="v-row" class="justify-center">
      <recipe-card
        v-for="(recipe, index) in recipeList"
        :key="recipe.id + `index${index}`"
        :recipe="recipe"
        :style="{ '--i': index % 10 }"
      ></recipe-card>
    </transition-group>
    <!-- Button to show more recipes -->
    <v-row>
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
    <!-- Plain card for no results -->
    <v-row>
      <v-col v-if="showNoResults" cols="12" sm="8" md="6" lg="4">
        <v-card class="mx-auto">
          <v-card-title class="justify-center"> No Results Found </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
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

<style scoped lang="scss">
.slide-in {
  &-move {
    transition: opacity 0.5s linear, transform 0.5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.4s linear,
      transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4);
    transition-delay: calc(0.5s * (0.1s * var(--i)));
  }

  &-enter-active {
    transition: opacity 0.5s linear,
      transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
    transition-delay: calc(0.5s + (0.1s * var(--i)));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    transform: translateY(-1em);
  }
  &-leave-to {
    transform: translateY(1em);
  }
}
</style>
