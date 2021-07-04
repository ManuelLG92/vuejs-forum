<template>
  <div>
    <div v-if="postsFetchError">
      <p>Has been a mistake loading lastest posts.. Try again later.</p>
    </div>
    <div v-else>
      <div v-if="!posts">Loading posts</div>
      <div v-else class="col-md-11 mx-auto">
        <h2 class="text-center">Latest posts &#128640;&#128640;</h2>
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
            @click="url = link.url">
              <span v-if="link.url" class="page-link">
                <span aria-hidden="true">{{ link.label }}</span>
              </span>
            </li>
          </ul>
        </nav>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LatestPosts",
  data: () => {
    return {
      posts: false,
      postsFetchError: false,
      pagination: [],
      firstPage: 1,
      lastPage: 1,
      totalPages: 1,
      itemsByPage: 1,
      totalItems: 1,
      links: [],
      isActive: 'page-item active no-allowed',
      isNoActive: 'page-item',
      url : 'http://0.0.0.0/api/newest-posts'
    }
  },
  mounted() {
   this.fetchPost()
  }, methods: {
    fetchPost: function () {
      fetch(this.url)
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
    url: function () {
    this.fetchPost();
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

.pagination .no-allowed{
  cursor: not-allowed !important;
}

</style>