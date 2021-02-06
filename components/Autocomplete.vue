<template>
  <v-col cols="12">
    <v-autocomplete
      v-model="selectedValues"
      :loading="isLoading"
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
  </v-col>
</template>

<script>
import { mdiDatabaseSearch } from '@mdi/js'

export default {
  data: () => ({
    isLoading: false,
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
      if (this.isLoading) return

      this.isLoading = true

      fetch(
        `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${this.$config.key}&query=${val}&number=5`,
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
          this.isLoading = false
        })
    },
  },
  methods: {
    remove(item) {
      const index = this.selectedValues.indexOf(item)
      if (index >= 0) this.selectedValues.splice(index, 1)
    },
  },
}
</script>
