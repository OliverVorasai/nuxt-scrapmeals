<template>
  <v-card class="pa-6" color="primary" dark>
    <v-row justify="center">
      <v-autocomplete
        v-model="selectedValues"
        :loading="autocompleteLoading"
        :items="seenItems"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        label="Search for ingredients"
        :prepend-inner-icon="mdiDatabaseSearch"
        chips
        small-chips
        multiple
      >
        <template #selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            {{ data.item }}
          </v-chip>
        </template>
      </v-autocomplete>
    </v-row>
    <v-row justify="center">
      <v-btn color="success" :loading="recipesLoading" @click="getRecipes"
        >Search for Recipes</v-btn
      >
    </v-row>
  </v-card>
</template>

<script>
import { mdiDatabaseSearch } from '@mdi/js'

export default {
  data: () => ({
    autocompleteLoading: false,
    recipesLoading: false,
    entries: [],
    search: null,
    selectedValues: [],
    mdiDatabaseSearch,
  }),
  computed: {
    // all the ingredients relevant to the user (currently selected / recently search)
    seenItems() {
      return this.selectedValues.concat(
        this.entries.map((entry) => {
          return entry.name
        })
      )
    },
  },
  watch: {
    search(val) {
      // Do nothing if search is triggered with empty search
      if (!val) return

      // TODO: Remove if cache policy is working correctly
      if (this.autocompleteLoading) return

      this.autocompleteLoading = true

      fetch(
        `${this.$config.baseUrl}/food/ingredients/autocomplete?apiKey=${this.$config.key}&query=${val}&number=5`,
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
          this.entries = res
        })
        .catch((err) => {
          // TODO: Replace this with popup message
          console.log(err)
        })
        .finally(() => {
          this.autocompleteLoading = false
        })
    },
  },
  methods: {
    remove(item) {
      const index = this.selectedValues.indexOf(item)
      if (index >= 0) this.selectedValues.splice(index, 1)
    },
    getRecipes() {
      const ingredients = this.selectedValues.toString()
      const recipeLimit = 10
      const noCopyright = true

      if (!this.selectedValues) return

      if (this.recipesLoading) return

      this.recipesLoading = true

      fetch(
        `${this.$config.baseUrl}/recipes/findByIngredients?apiKey=${this.$config.key}&ingredients=${ingredients}&number=${recipeLimit}&limitLicense=${noCopyright}&ranking=1`,
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
          this.$store.commit('SET_RECIPES', res)
        })
        .catch((err) => {
          // TODO: Replace this with popup message
          console.log(err)
        })
        .finally(() => {
          this.recipesLoading = false
        })
    },
  },
}
</script>
