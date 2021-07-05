<template>
  <Layout>
    <template v-slot:content>
      <div class="container col-md-8 mx-auto">
        <form action="" autocomplete="off">
          <div v-if="error">
            <h3 class="text-danger">{{ errorMessage }}</h3>
          </div>
          <h1 class="text-center">Sign up!</h1>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="name" type="text" class="form-control" id="name" name="name">
            <span>Min 8 characters</span>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" name="email">
            <span>Enter a valid email address.</span>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" name="password">
            <span>Min 8 characters</span>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password Confirmation</label>
            <input v-model="passwordConfirmation" type="password" class="form-control" id="password_confirmation"
                   name="password_confirmation">
            <span>This field should match with the before field.</span>
          </div>
          <div class="text-center">
            <button @click="send = true" type="button" class="btn btn-info w-50">Sign up!</button>
          </div>

        </form>
      </div>
    </template>
    <template v-slot:newPost>
      <p></p>
    </template>

  </Layout>
</template>

<script>
import Layout from "../Layout";


export default {
  name: "Register",
  components: {
    Layout,
  }, data: () => {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      sections: false,
      sectionFetchError: false,
      show: true,
      error: false,
      errorMessage: "There has been a mistake signing up. Try again later",
      send: false,

    }
  },
  methods: {
    sendRegistration: function () {
      const url = 'http://0.0.0.0/api/user';
      const data = {
        name: this.name, email: this.email,
        password: this.password, password_confirmation: this.passwordConfirmation
      };
      console.log(data)
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        res.status > 399 ? this.error = true : this.error = false
        if (!this.error) {
          this.$router.push({name: 'signIn'})
        }

      }).catch(error => console.error('Error:', error))
    }
  }, watch: {
    send: function () {
      if (this.send === true) {
        this.sendRegistration()
        this.send = false
      }
    }
  }
}

</script>

<style scoped>

</style>