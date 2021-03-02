<template>
  <v-row justify="center" align="center" class="mb-12 mt-12">
    <v-col cols="12" sm="8" class="text-center">
      <v-card class="pa-6">
        <v-card-title class="justify-center text-h4 text-md-h2"
          >About ScrapMeals</v-card-title
        >
        <v-divider class="my-6"></v-divider>
        <v-card-title class="justify-center text-h5 text-md-h4"
          >What Is ScrapMeals?</v-card-title
        >
        <v-card-text
          >ScrapMeals is a search engine that finds recipes by allowing users to
          search using ingredients. Users can enter ingredients that are already
          available at their homes and ScrapMeals will find the best and most
          relevant recipes. Some recipes may required more ingredients and in
          this case ScrapMeals serves as a handy grocery list.</v-card-text
        >
        <v-divider class="my-6"></v-divider>
        <v-card-title class="justify-center text-h5 text-md-h4"
          >Why We Made ScrapMeals</v-card-title
        >
        <v-card-text
          >We made ScrapMeals so that people can have a starting point in their
          daily cooking needs. Often it is the case when someone is unsure of
          what to cook or what kind of meals they can make with the ingredients
          they have at home. With ScrapMeals, all one needs to do is input what
          one has, and a wide array of meals will simply show up!</v-card-text
        >
        <v-divider class="my-6"></v-divider>
        <v-card-title class="justify-center text-h5 text-md-h4"
          >Who Made ScrapMeals?</v-card-title
        >
        <v-card-text>
          ScrapMeals was designed and implemented by Blossom Web Designs. Visit
          their website at
          <a
            href="https://blossomwebdesigns.com/"
            rel="noopener"
            target="_blank"
            aria-label="Link to designer website"
            >blossomwebdesigns.com</a
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: 'About Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Learn about the ScrapMeals project.',
        },
      ],
    }
  },
}
</script>
