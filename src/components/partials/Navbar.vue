<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="text-decoration-none fw-bold" to="/">
        <span class="navbar-brand">ForoDogs</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link class="text-decoration-none" to="/about">
            <li class="nav-item">
              <span class="nav-link active">About</span>
            </li>
          </router-link>

          <router-link class="text-decoration-none" to="/contact">
            <li class="nav-item">
              <span class="nav-link active">Contact</span>
            </li>
          </router-link>
   

        </ul>
        <div>
          <div v-if="!isAuth">
            <RouterLink :to="{name : 'signUp'}">
              <button class="btn btn-primary me-3">Register</button>
            </RouterLink>
            <RouterLink :to="{name : 'signIn'}">
              <button class="btn btn-info ms-3 me-3">Login</button>
            </RouterLink>
          </div>
          <div v-else class="me-5">
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown" aria-expanded="false">
                {{ userName }}
              </button>
              <ul class="dropdown-menu">
                <li class="text-center">
                  <router-link class="text-decoration-none text-dark fs-6"
                               :to="{ name: 'user-profile', params: { user: userId } }"
                               title="Click to search this section's posts">
                    <span>Perfil</span>
                  </router-link>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li class="logout"><span @click="logout = true" class="dropdown-item text-center">Logout</span></li>
              </ul>
            </div>


          </div>

        </div>

      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "Navbar",
  data: () => {
    return {
      isAuth: false,
      cookies: '',
      token: '',
      userName: 'Default',
      userId: '0',
      logout: false,
      error : false,

    }

  },
  mounted() {
    this.getTokenCookie()
    this.setToken()
  },
  methods: {
    getTokenCookie: function () {
      this.cookies = document.cookie.split(';');
      //  this.cookies = document.cookie.split('=');
    },
    setToken: function () {

      try {
        this.token = this.getCookie('token').trim()
        this.userName = this.getCookie('username').trim()
        this.userId = this.getCookie('userid').trim()
      }catch (error) {
        this.token = ''
        this.userName =''
        this.userId =''
      }


      this.token.length > 30 ? this.isAuth = true : this.isAuth = false

    },
    getCookie: function (cookieName) {
      let cookie = {};
      document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
      })
      return cookie[cookieName];
    },
    logoutForm: function () {
      const url = 'http://0.0.0.0/api/logout';
      const data = { user_id : this.userId };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + this.token
        }
      }).then((res) => {
        res.status > 399 ? this.error = true : this.error = false
        return res.json()
      })
          .then((rep) => {
            console.log(rep)
            if (!this.error){
              document.cookie = "token="+" "
              document.cookie = "userid="+" "
              document.cookie = "username="+" "
              this.$router.push({ name: 'main'})
            }

          })
          .catch(error => console.error('Error:', error))
    }
  }, watch: {
    logout: function () {
      if (this.logout === true) {
        this.logoutForm()
        this.logout = false
      }
    }
  }
}
</script>

<style scoped>
.logout{
  cursor: pointer;
}
</style>