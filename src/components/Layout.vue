<template>
  <div class="content">
    <div class="col-md-12" >
      <img class="w-100" src="../assets/main_banner.png" alt="Banner" >
    </div>
    <Navbar />
    <div class="container-fluid mb-5 mt-5 content">
      <div class="row">
        <div class="col-md-2">
          <Sections />
          <slot name="newPost">
            <div v-if="isAuth" class="text-center mt-4">
              <router-link :to="{name : 'NewPost'}">
                <p class="btn btn-new-post fw-bold w-100">Create Post  </p>
              </router-link>
            </div>
            <div v-else>
              <span></span>
            </div>
          </slot>


        </div>
        <div class="col-md-10">
          <slot name="content">

          </slot>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Sections from "./partials/Sections";

export default {
  name: "Layout",
  data: () => {
    return {
      isAuth: false,

    }

  },
  components: {
    Navbar,
    Footer,
    Sections,

  },
  mounted() {
    try {
      this.isAuth = this.getCookie('token').trim()
      this.token.length > 30 ? this.isAuth = true : this.isAuth = false
    }catch (error) {
      this.token = ''

    }
  },
  methods: {
    getCookie: function (cookieName) {
      let cookie = {};
      document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
      })
      return cookie[cookieName];
    }
  }
}
</script>

<style scoped>
.content {
  min-height: 50vh;
  background-color: rgb(235, 243, 243);

}

.btn-new-post {
  background-color: #212529;
  color: white;
  text-align: center;
  cursor: copy;
}
</style>