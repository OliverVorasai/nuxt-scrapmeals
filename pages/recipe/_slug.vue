<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" class="text-center">
      <h2>Recipe Information</h2>
    </v-col>
    <v-col cols="12" sm="8">
      <v-card>
        <v-row justify="center">
          <v-card-title
            class="recipe-title text-h4 text-md-h3 font-weight-light"
          >
            {{ recipe.title }}
          </v-card-title>
        </v-row>
        <v-row justify="center">
          <v-img
            :src="recipe.image"
            :lazy-src="require('@/assets/placeholder-image.jpg')"
            max-width="550"
            class="mx-4 mb-4"
            content-class="recipe-image"
          ></v-img>
        </v-row>

        <v-card-text>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-row justify="center">
                <v-col cols="6">
                  <div v-if="recipe.preparationMinutes">
                    <v-icon>{{ mdiKnife }}</v-icon>
                    <span>Prep Time</span>
                    <span>{{ recipe.preparationMinutes }}</span>
                  </div>
                  <div v-if="recipe.cookingMinutes">
                    <v-icon>{{ mdiStove }}</v-icon>
                    <span>Cook Time</span>
                    <span>{{ recipe.cookingMinutes }}</span>
                  </div>
                  <div v-if="recipe.readyInMinutes">
                    <v-icon>{{ mdiClockOutline }}</v-icon>
                    <span>Cook Time</span>
                    <span>{{ recipe.readyInMinutes }}</span>
                  </div>
                  <div v-if="recipe.servings">
                    <v-icon>{{ mdiSilverwareForkKnife }}</v-icon>
                    <span>Servings</span>
                    <span>{{ recipe.servings }}</span>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div v-if="recipe.aggregateLikes">
                    <v-icon>{{ mdiThumbUp }}</v-icon>
                    <span>Likes</span>
                    <span>{{ recipe.aggregateLikes }}</span>
                  </div>
                  <div v-if="recipe.vegetarian">
                    <v-icon>{{ mdiLeaf }}</v-icon>
                    <span>Vegetarian</span>
                  </div>
                  <div v-if="recipe.glutenFree">
                    <v-icon>{{ mdiBarleyOff }}</v-icon>
                    <span>Gluten Free</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-title>Summary</v-card-title>
        <v-card-text v-html="recipe.summary"></v-card-text>

        <v-card-title>Ingredients</v-card-title>
        <v-card-text>
          <v-row justify="start" align="end">
            <v-col
              v-for="ingredient in recipe.extendedIngredients"
              :key="ingredient.originalString"
              cols="6"
              sm="4"
              md="3"
              class="text-center"
            >
              <v-img
                :src="`${$config.imageUrl}/${ingredient.image}`"
                :lazy-src="require('@/assets/placeholder-image.jpg')"
                max-width="100"
                max-height="100"
                contain
                class="mx-auto"
              >
                <template #placeholder>
                  <v-img
                    :src="require('@/assets/placeholder-image.jpg')"
                    eager
                  ></v-img></template
              ></v-img>
              <span>{{ ingredient.originalString }}</span>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-title>Instructions</v-card-title>
        <v-card-text v-if="recipe.analyzedInstructions.length > 0">
          <v-row
            v-for="(instructionGroup, index) in recipe.analyzedInstructions"
            :key="index"
          >
            <v-col
              v-for="step in instructionGroup.steps"
              :key="step.number"
              cols="12"
            >
              <span>{{ step.number }}.</span>
              <span>{{ step.step }}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text
          v-else-if="recipe.instructions"
          class="recipe-instructions"
        >
          {{ recipe.instructions }}
        </v-card-text>
        <v-card-text v-else-if="recipe.sourceUrl">
          <v-btn :href="recipe.sourceUrl" target="_blank">
            Click Here For Instructions
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiTag,
  mdiKnife,
  mdiStove,
  mdiClockOutline,
  mdiThumbUp,
  mdiSilverwareForkKnife,
  mdiLeaf,
  mdiBarleyOff,
} from '@mdi/js'

export default {
  async asyncData({ $config, params }) {
    const queryString = new URLSearchParams({
      apiKey: $config.key,
      includeNutrition: false,
    })

    const recipe = await fetch(
      `${$config.recipeSearchUrl}/${
        params.slug
      }/information?${queryString.toString()}`,
      { cache: 'force-cache' }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(`${res.status} ${res.statusText}`)
        }
      })
      .then((res) => {
        // Replace links in summary with internal links
        const regex = /<a href=(".+?")/g
        res.summary = res.summary.replace(regex, (val) => {
          const recipeID = /\d{4,}/.exec(val)
          if (recipeID !== null) {
            val = `<a href="${window.location.origin}/recipe/${recipeID[0]}"`
          }
          return val
        })
        return res
      })
      .catch((err) => {
        // TODO: Replace this with popup message
        console.log(err)
      })

    return { recipe }
  },
  data() {
    return {
      mdiTag,
      mdiKnife,
      mdiStove,
      mdiClockOutline,
      mdiThumbUp,
      mdiSilverwareForkKnife,
      mdiLeaf,
      mdiBarleyOff,
    }
  },
}
</script>

<style>
.recipe-image {
  border: 2px solid black;
  width: unset !important;
}
</style>

<style scoped lang="scss">
.recipe-title {
  word-break: normal;
}
.recipe-instructions {
  white-space: pre-wrap;
}
</style>
