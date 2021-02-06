<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <h2>The Recipes</h2>
    </v-col>
    <v-card
      v-for="recipe in recipes"
      :key="recipe.id"
      max-width="350"
      class="ma-6"
      height="100%"
    >
      <v-img class="white--text align-end" height="200px" :src="recipe.image">
        <v-card-title class="card-title">{{ recipe.title }}</v-card-title>
      </v-img>
      <template v-if="recipe.missedIngredients.length">
        <v-card-text class="text--primary">Ingredients Needed:</v-card-text>
        <v-list-item
          v-for="missedIngredient in recipe.missedIngredients"
          :key="missedIngredient.id"
        >
          <v-list-item-avatar>
            <v-img :src="missedIngredient.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ missedIngredient.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-else>
        <v-card-text class="text--primary">
          You have all the ingredients!
        </v-card-text>
      </template>
    </v-card>
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
}
</script>

<style scoped>
.card-title {
  background-color: rgba(0, 0, 0, 0.5);
  word-break: normal;
}
</style>
