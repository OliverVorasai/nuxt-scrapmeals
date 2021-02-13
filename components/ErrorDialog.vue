<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Error Detected
      </v-card-title>
      <v-card-text>
        <p>We're sorry. There seems to be some bugs in our servers.</p>
        <p>Error Message:</p>
        <code>{{ parsedError }}</code>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Close This</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: Error,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    parsedError() {
      if (this.errorMessage === null) return
      if (this.errorMessage.response) {
        return this.errorMessage.response.data.message
      } else if (this.errorMessage.response) {
        return this.errorMessage.message
      } else {
        return this.errorMessage
      }
    },
  },
  watch: {
    errorMessage(val) {
      this.dialog = true
    },
  },
}
</script>
