<template>
  <Layout>
    <template v-slot:content>
      <div class="container col-md-8 mx-auto">
        <form action="" autocomplete="off">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password">
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password Confirmation</label>
            <input type="password" class="form-control" id="password_confirmation" name="password_confirmation">
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info w-50">Sign up!</button>
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
  },
}

</script>

<style scoped>

</style>