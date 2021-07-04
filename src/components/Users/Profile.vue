<template>
  <Layout>
    <template v-slot:content>
      <div class="container col-md-8 mx-auto">

       <h1>Welcome {{userFetched.name}}!</h1>
      </div>
    </template>


  </Layout>
</template>

<script>
import Layout from "../Layout";


export default {
  props: ["user"],
  name: "Profile",
  data: () => {
    return {
      name : '',
      posts : '',
      userFetched : ''
    }
  },

  components: {
    Layout,
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile : function () {
      fetch( 'http://0.0.0.0/api/user/'+this.user)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.userFetched = data[0]

          })
          .catch((err) => {
            this.sectionFetchError = true
            console.log(err)
          });
    }
  }
}
</script>

<style scoped>

</style>