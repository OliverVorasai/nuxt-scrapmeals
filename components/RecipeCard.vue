<template>
  <v-card width="300" class="ma-6" height="100%">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="recipe.image"
      :lazy-src="require('@/assets/placeholder-image.jpg')"
    >
      <v-card-title class="card-title">{{ recipe.title }}</v-card-title>
    </v-img>
    <template v-if="recipe.missedIngredients.length">
      <v-card-text class="text--primary">{{
        recipe.missedIngredients.length + ' more ingredients needed:'
      }}</v-card-text>
      <v-list-item
        v-for="(missedIngredient, index) in recipe.missedIngredients.slice(
          0,
          3
        )"
        :key="missedIngredient.id + `index${index}`"
      >
        <v-list-item-avatar>
          <v-img :src="missedIngredient.image">
            <template #placeholder>
              <v-img
                :src="require('@/assets/placeholder-image.jpg')"
                eager
              ></v-img>
            </template>
          </v-img>
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
    <template v-if="recipe.missedIngredients.length > 3">
      <v-card-actions>
        <v-btn :to="`recipe/${recipe.id}`" depressed nuxt>Recipe</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="text-caption" depressed @click="show = !show">
          Ingredients
          <v-icon right>
            {{ show ? mdiChevronUp : mdiChevronDown }}
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-list-item
            v-for="(missedIngredient, index) in recipe.missedIngredients.slice(
              3
            )"
            :key="missedIngredient.id + `index${index}`"
          >
            <v-list-item-avatar>
              <v-img :src="missedIngredient.image">
                <template #placeholder>
                  <v-img
                    :src="require('@/assets/placeholder-image.jpg')"
                    eager
                  ></v-img> </template
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ missedIngredient.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-expand-transition>
    </template>
    <template v-else>
      <v-card-actions>
        <v-btn :to="`recipe/${recipe.id}`" depressed nuxt>Recipe</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'

export default {
  props: {
    recipe: {
      type: Object,
      required: true,
      default: () => null,
    },
  },
  data() {
    return {
      show: false,
      mdiChevronUp,
      mdiChevronDown,
    }
  },
}
</script>

<style scoped>
.card-title {
  background-color: rgba(0, 0, 0, 0.5);
  word-break: normal;
}
</style>
