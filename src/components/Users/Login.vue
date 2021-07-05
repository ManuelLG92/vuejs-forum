<template>
  <Layout>
    <template v-slot:content>
      <div class="container col-md-8 mx-auto">
        <div v-if="error">
          <h3 class="text-danger">{{errorMessage}}</h3>
        </div>
        <h1 class="text-center">Login</h1>
          <div class="mb-3">
            <label for="email" class="form-label">Email address <span class="text-danger">*</span></label>
            <input v-model="email" type="email" class="form-control" id="email" name="email">
            <span>Enter a valid email address.</span>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
            <input v-model="password" type="password" class="form-control" id="password" name="password">
            <span>Min 8 characters</span>
          </div>
          <div class="text-center">

          <button type="button" @click="send = true" class="btn btn-primary w-50">Login</button>
          </div>


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
  name: "Login",
  data: () => {
    return {
      email : '',
      password : '',
      send: false,
      errorMessage : 'There is/are error/s in the fields, fix them and send the request again.',
      error : false,

    }

  },
  components: {
    Layout,
  },
  methods: {
    sendLoginForm : function () {
      const url = 'http://0.0.0.0/api/login';
      const data = { email: this.email, password : this.password};
      console.log(data)
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
     res.status > 399 ? this.error = true : this.error = false
        return res.json()
        })
          .then((rep) => {
            if (!this.error){

              let user = rep[0]
              let token = rep[1]

              document.cookie = 'token='+token
              document.cookie = 'userid='+user.id
              document.cookie = 'username='+user.name
              this.$router.push({ name: 'user-profile', params: { user: user.id } })

            }

          })
          .catch(error => console.error('Error:', error))

    }
  }, watch: {
    send: function () {
      if (this.send === true) {
        this.sendLoginForm()
        this.send = false
      }
    }
  }
}
</script>

<style scoped>

</style>