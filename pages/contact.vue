<template>
  <v-row justify="center" align="center" class="mb-12 mt-12">
    <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
      <v-card class="pa-6">
        <v-card-title class="justify-center text-h2">Contact Us</v-card-title>
        <v-divider class="my-6"></v-divider>
        <v-form
          id="scrapmeals-form"
          ref="form"
          v-model="valid"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
          data-netlify-honeypot="bot-field"
          lazy-validation
        >
          <input type="hidden" name="form-name" value="contact" />
          <p class="hidden d-none">
            <label
              >Don’t fill this out if you're human: <input name="bot-field"
            /></label>
          </p>
          <v-container>
            <v-row>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                name="name"
                label="Name"
                aria-label="Name field"
                required
                solo
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                name="email"
                label="E-mail"
                aria-label="E-mail field"
                required
                solo
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                v-model="message"
                :rules="messageRules"
                name="message"
                label="Message"
                aria-label="Message text area field"
                required
                solo
                outlined
              ></v-textarea>
            </v-row>
            <v-row class="mb-6">
              <div class="g-recaptcha" :data-sitekey="recaptchaKey"></div>
            </v-row>
            <v-row>
              <v-btn
                :disabled="!valid"
                color="info"
                aria-label="Submit Form"
                @click="validate"
              >
                Submit
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [(v) => !!v || 'Name is required'],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      message: '',
      messageRules: [(v) => !!v || 'Message is required'],
      recaptchaKey: this.$config.recaptchaKey,
    }
  },
  head() {
    return {
      script: [{ src: 'https://www.google.com/recaptcha/api.js' }],
      title: 'Contact Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Contact the minds behind the ScrapMeals project.',
        },
      ],
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        document.getElementById('scrapmeals-form').submit()
      }
    },
  },
}
</script>
