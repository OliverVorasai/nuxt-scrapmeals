<template>
  <v-card class="pa-2" color="primary" dark>
    <!-- Button for Advanced Settings -->
    <v-row justify="end" class="mb-2" no-gutters>
      <v-switch
        v-model="advancedSearch"
        :label="advancedSearch ? 'Advanced Search On' : 'Advanced Search Off'"
      ></v-switch>
    </v-row>
    <!-- Autocomplete Component -->
    <v-autocomplete
      v-model="selectedValues"
      :loading="autocompleteLoading"
      :items="seenItems"
      :search-input.sync="search"
      hide-no-data
      hide-selected
      label="Enter ingredients"
      :prepend-inner-icon="mdiDatabaseSearch"
      chips
      multiple
      filled
      clearable
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
    <!-- Advanced Settings, positioned below autocomplete -->
    <v-expand-transition>
      <div v-show="advancedSearch">
        <v-row>
          <v-col
            v-for="(preference, index) in $foodPreferences"
            :key="index"
            cols="6"
          >
            <v-select
              v-model="foodPreferences[index]"
              :items="preference"
              :label="index.charAt(0).toUpperCase() + index.slice(1)"
              outlined
              chips
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <p>
              Disclaimer: Advanced searching may change and reduce the number of
              results.
            </p>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <!-- Search Button -->
    <v-row justify="center" class="my-6" no-gutters>
      <v-btn color="info" :loading="recipesLoading" @click="getRecipes"
        >Search for Recipes</v-btn
      >
    </v-row>
    <!-- Popup Message, position in html doesn't matter -->
    <error-dialog :error-message="errorMessage"></error-dialog>
  </v-card>
</template>

<script>
import { mdiDatabaseSearch } from '@mdi/js'

export default {
  data: () => ({
    // Loaders
    autocompleteLoading: false,
    recipesLoading: false,
    // Autocomplete
    entries: [],
    search: null,
    selectedValues: [],
    // Advanced Settings
    advancedSearch: false,
    foodPreferences: {},
    // Popup Message
    errorMessage: null,
    // Icons
    mdiDatabaseSearch,
  }),
  computed: {
    // Autocomplete items selected by user
    seenItems() {
      // Add latest item to tracked selections
      return this.selectedValues.concat(
        this.entries.map((entry) => {
          return entry.name
        })
      )
    },
  },
  watch: {
    // Search API when user types in Autocomplete
    search(val) {
      // Return if no text provided
      if (!val) return
      // Return if currently doing a search
      if (this.autocompleteLoading) return
      // Set loading state
      this.autocompleteLoading = true

      // Create query string
      // NOTE: params are case-sensitive
      const params = new URLSearchParams({
        apiKey: this.$config.key,
        query: val,
        number: 5,
      })

      // Search for ingredients
      this.$http
        .$get(`${this.$config.autocompleteUrl}?${params.toString()}`, {
          cache: 'force-cache',
        })
        .then((res) => {
          this.entries = res
        })
        .catch((err) => {
          this.errorMessage = err
        })
        .finally(() => {
          this.autocompleteLoading = false
        })
    },
  },
  methods: {
    // Allow user to remove items from selection
    remove(item) {
      const index = this.selectedValues.indexOf(item)
      if (index >= 0) this.selectedValues.splice(index, 1)
    },
    // Search API for recipes
    getRecipes() {
      // Return if no ingredients provided
      if (this.selectedValues.length < 1) return
      // Return if currently doing a search
      if (this.recipesLoading) return
      // Set loading state
      this.recipesLoading = true

      let params, url

      if (this.advancedSearch) {
        // Create query string
        // NOTE: params are case-sensitive
        params = new URLSearchParams({
          apiKey: this.$config.key,
          includeIngredients: this.selectedValues.toString(),
          number: this.$config.recipeLimit,
          limitLicense: true,
          fillIngredients: true,
          ...this.foodPreferences,
        })
        url = this.$config.complexSearchUrl
      } else {
        params = new URLSearchParams({
          apiKey: this.$config.key,
          ingredients: this.selectedValues.toString(),
          number: this.$config.recipeLimit,
          limitLicense: true,
          ranking: 1,
        })
        url = this.$config.findByIngredientsUrl
      }

      // Search for recipes
      this.$http
        .$get(`${url}?${params.toString()}`, {
          cache: 'force-cache',
        })
        .then((res) => {
          this.advancedSearch
            ? this.$store.commit('SET_RECIPES', res.results)
            : this.$store.commit('SET_RECIPES', res)
        })
        .catch((err) => {
          this.errorMessage = err
        })
        .finally(() => {
          this.recipesLoading = false
        })
    },
  },
}
</script>

<style>
.theme--dark.v-label {
  color: white !important;
}
</style>
