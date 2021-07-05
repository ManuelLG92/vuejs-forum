<template>
  <Layout>
    <template v-slot:content>
      <transition name="slide-fade">
      <div v-if="postsBySectionFetchError">
        <p>Has been a mistake loading lastest posts.. Try again later.</p>
      </div>

      <div v-else>

        <div v-if="!posts">Loading posts</div>
        <div v-else class="col-md-11 mx-auto">
          <h2 class="text-center">Section {{$route.params.section}} posts</h2>
          <div class="row mt-5 header-latest-posts pb-2">
            <div class="col text-center">Id</div>
            <div class="col text-center">Title</div>
            <div class="col text-center">Section</div>
            <div class="col text-center">Owner</div>
            <div class="col text-center">Date</div>
          </div>



          <div class="bg-light shadow postsRows" v-for="post in posts" :key="post.id">
            <div class="row">
              <div class="col text-center">
                <router-link class="text-decoration-none fs-5"
                             :to="{ name: 'post', params: { post: post.id } }"
                             title="Click to look this post">
                  <span ># {{ post.id }}</span>

                </router-link>
              </div>
              <div class="col text-center">{{ post.title }}</div>
              <div class="col text-center">{{ post.section_id.title }}</div>
              <div class="col text-center">{{ post.user_id.name }}</div>
              <div class="col text-center">{{ post.created_at }}</div>
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

        </div>

      </div>

      </transition>
    </template>
  </Layout>
</template>

<script>

import Layout from "./Layout";

export default {

  props: ["section"],
  name: 'Main',
  components: {
    Layout,
  },
  data: () => {
    return {
      posts: false,
      postsBySectionFetchError: false,
      pagination: [],
      firstPage: 1,
      lastPage: 1,
      totalPages: 1,
      itemsByPage: 1,
      totalItems: 1,
      links: [],
      isActive: 'page-item active no-allowed',
      isNoActive: 'page-item',
      urlPagination: '',
      urlFetchPosts: `http://0.0.0.0/api/posts-by-section/`,
      finalUrl: "",


    }
  },
  mounted() {
    this.finalUrl = this.urlFetchPosts + this.section
    this.fetchPosts()
  },
  methods: {
    fetchPosts: function () {
      fetch(this.finalUrl)
          .then(response => response.json())
          .then((data) => {
            this.posts = data.data
            this.pagination = data
            this.links = data.links
          })
          .catch((err) => {
            this.postsFetchError = true
            console.log(err)
          });
    }
  },
  watch: {
    urlPagination: function () {
      this.finalUrl = this.urlPagination
      this.fetchPosts();
    },
    section: function () {
      this.finalUrl = this.urlFetchPosts + this.section
      this.fetchPosts()


    }
  },
}
</script>

<style scoped>
.postsRows {
  background-color: aliceblue;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 1em;
  border-radius: 5px;
  border: 1px solid #0f3652;
}

.header-latest-posts {
  border-bottom: 2px solid #0f3652;;
}

.pagination .page-item {
  cursor: pointer;
}

.pagination .no-allowed {
  cursor: not-allowed !important;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>