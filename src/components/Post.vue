<template>
  <Layout>
    <template v-slot:content>
      <div v-if="!postRequest">
        <p>Loading..</p>
      </div>
      <div v-else class="bg-light shadow  mb-1">
        <div class="post rounded">
          <div class="post-title">
            <h2 class="ps-3 pt-2 pb-2  text-white">
              # {{ postRequest.id }} {{ postRequest.title }}
            </h2>
          </div>
          <div class="pb-2 ps-4 pe-4">
            <div class="row pb-1">
              <div class="col text-start text-decoration-underline">Owner</div>
              <div class="col text-center text-decoration-underline">Section</div>
              <div class="col text-end text-decoration-underline">Date</div>
            </div>
            <div class="row">
              <div class="col text-start">{{ postRequest.user_id.name }}</div>
              <div class="col text-center">{{ postRequest.section_id.title }}</div>
              <div class="col-4 text-end">{{ postRequest.created_at }}</div>
            </div>
            <hr>
            <div class=" ">
              <p class="text-start text-decoration-underline mb-2">Content:</p>
              <p>{{postRequest.description}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 mb-3">
        <h3 >Responses</h3>
      </div>


      <div class="bg-light mb-3 shadow post rounded" v-for="message in messages" :key="message.id">
        <div class="pb-2 ps-4 pe-4 pt-2">
          <div class="row pb-1">
            <div class="col text-start text-decoration-underline">User</div>
            <div class="col text-end text-decoration-underline">Date</div>
          </div>
          <div class="row">
            <div class="col text-start">{{ message.user_id.name }}</div>
            <div class="col-4 text-end">{{ message.created_at }}</div>
          </div>
          <hr>
          <div class=" ">
            <div class="text-start text-decoration-underline mb-2">Content:</div>
            <p>{{message.description}}</p>
          </div>
        </div>

      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li v-for="link in links" :key="link.id" :class="(link.active) ? isActive : isNoActive"
              @click="urlPagination = link.url">
              <span v-if="link.url" class="page-link">
                <span aria-hidden="true">{{ link.label }}</span>
              </span>
          </li>
        </ul>
      </nav>
    </template>
  </Layout>
</template>

<script>
import Layout from "./Layout";

export default {
  props: ["post"],
  name: "Post",
  components: {
    Layout,
  },
  data: () => {
    return {
      postRequest: false,
      messages: false,
      postFetchError: false,
      isActive: 'page-item active no-allowed',
      isNoActive: 'page-item',
      links : "",
      url: 'http://0.0.0.0/api/post/',
      finalUrl : "",
      urlPagination : "",

    }

  },
  mounted() {
    this.finalUrl = this.url + this.post;
    this.fetchPosts()
  },
  methods: {
    fetchPosts: function () {
      fetch(this.finalUrl)
          .then(response => response.json())
          .then((data) => {
                this.postRequest = data[0];
                this.messages = data[1].data
                this.links = data[1].links

              }
          )
          .catch((err) => {
            this.sectionFetchError = true
            console.log(err)
          });
    }
  },
  watch: {
    urlPagination: function () {
      this.finalUrl = this.urlPagination
      this.fetchPosts();
    }
  }
}

</script>

<style scoped>
.post-title {
  background-color: #212529;

}

.post {
  border: 1px solid #212529;
}

.post-header {
  border-bottom: 1px solid black;
}

.pagination .page-item {
  cursor: pointer;
}

.pagination .no-allowed {
  cursor: not-allowed !important;
}

</style>