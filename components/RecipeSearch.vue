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
      <v-btn color="info" :loading="recipesLoading" @click="getRecipes"
        >Search for Recipes</v-btn
      >
    </v-row>
    <error-dialog :error-message="errorMessage"></error-dialog>
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
    errorMessage: null,
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

      const params = new URLSearchParams({
        apiKey: this.$config.key,
        query: val,
        number: 5,
      })

      fetch(`${this.$config.autocompleteUrl}?${params.toString()}`, {
        cache: 'force-cache',
      })
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
          this.errorMessage = err
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
      const noCopyright = true

      if (this.selectedValues.length < 1) return

      if (this.recipesLoading) return

      this.recipesLoading = true

      const params = new URLSearchParams({
        apiKey: this.$config.key,
        ingredients: this.selectedValues.toString(),
        number: this.$config.recipeLimit,
        limitLicense: noCopyright.toString(),
        ranking: 1,
      })

      fetch(`${this.$config.findByIngredientsUrl}?${params.toString()}`, {
        cache: 'force-cache',
      })
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
          this.errorMessage = err
        })
        .finally(() => {
          this.recipesLoading = false
        })
    },
  },
}
</script>
