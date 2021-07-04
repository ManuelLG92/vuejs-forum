<template>
  <Layout>
    <template v-slot:content>
      <div class="container">

        <h1 class="text-center mb-3">Create new post</h1>
        <div v-if="error">
          <h3 class="text-danger">{{errorMessage}}</h3>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input v-model="title" type="text" class="form-control shadow" id="title" placeholder="Title post here">
              <label for="title">Title <span class="text-danger">*</span></label>
              <span>Min 5 characters and max 100.</span>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <select v-model="sectionId" class="form-select shadow" id="section" name="section" aria-label="Choose a section">
                <option v-for="section in sections" :value="section.id" :key="section.id">
                  {{section.title}}
                </option>
              </select>
              <label for="section">Section <span class="text-danger">*</span></label>
              <span>It's mandatory select an section.</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating">
              <textarea v-model="description" class="form-control shadow" placeholder="Post description" id="description" name="description"
                        style="height: 200px"></textarea>
              <label for="description">Description</label>
              <span>Min 10 characters and max 255.</span>
            </div>
          </div>
        </div>
        <input type="hidden" v-model="userId">
        <div class="text-center">
          <button  @click="send = true" type="button" class="btn btn-lg btn-primary mt-3 w-50">
            Create
          </button>
        </div>
      </div>

    </template>
    <template v-slot:newPost>
     <p></p>
    </template>

  </Layout>
</template>

<script>

import Layout from "./Layout";

export default {
  name: "NewPost",
  components: {
    Layout,
  },
  data: () => {
    return {
      title : "",
      userId : "",
      sectionId : "",
      description : "",
      sections: false,
      sectionFetchError: false,
      show: true,
      error : false,
      errorMessage: "Ha habido un error creando el post",
      send: false,

    }

  },
  mounted() {
    this.userId = this.getCookie('userid');
    this.fetchSections();

  },
  methods: {
    sendCreatePostForm : function () {
      const url = 'http://0.0.0.0/api/post';
      const data = {
        title: this.title, description : this.description,
        user_id : this.userId, section_id : this.sectionId };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getCookie('token').trim()
        }
      }).then((res) => {
        res.status > 399 ? this.error = true : this.error = false
        return res.json()
      })
          .then((rep) => {

              if (!this.error){
                 this.$router.push({ name: 'post', params: { post: rep.id } })
               }

          })
          .catch(error => console.error('Error:', error))

    },
    fetchSections:function () {
      fetch('http://0.0.0.0/api/section')
          .then(response => response.json())
          .then(data => this.sections = data)
          .catch((err) => {
            this.sectionFetchError = true
            console.log(err)
          });
    },
    getCookie: function (cookieName) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
      })
      return cookie[cookieName];
    }

  }, watch: {
    send: function () {
      if (this.send === true) {
        this.sendCreatePostForm()
        this.send = false
      }
    }
  }


}

</script>


<style scoped>

</style>