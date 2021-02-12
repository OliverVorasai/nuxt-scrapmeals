export const state = () => ({
  recipes: [],
})

export const mutations = {
  SET_RECIPES(state, value) {
    state.recipes = value.results
  },
}
