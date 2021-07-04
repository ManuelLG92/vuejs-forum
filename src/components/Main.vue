<template>
        <Layout >
          <template v-slot:content>
            <LatestPosts/>
          </template>
        </Layout>

</template>

<script>

import LatestPosts from "./LatestPosts";
import Layout from "./Layout";

export default {
  name: 'Main',
  components: {
    Layout,
    LatestPosts

  }
}
</script>

<style>

</style>