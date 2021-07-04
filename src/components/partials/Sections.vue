<template>
  <div class="header-sections">
    <div class="sections-show bg-light">
      <div class="title" @click="show = !show" title="Click to open/close">
        <h5 class="p-3 fw-bold">Sections</h5>
      </div>


      <div v-if="sectionFetchError">
        <p>Has been a mistake loading sections data.. Try again later.</p>
      </div>
      <div v-else>

        <div v-if="!sections">Loading sections</div>
        <div v-else>
          <transition name="fade">
            <div v-if="show">
              <div class="text-center section p-1 " v-for="section in sections" :key="section.id">
                <router-link class="text-decoration-none fs-5"
                             :to="{ name: 'post-by-section', params: { section: section.id } }"
                             title="Click to search this section's posts">
                  <span >{{ section.title }}</span>
                </router-link>
              </div>
            </div>
          </transition>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "sections",
  data: () => {
    return {
      sections: false,
      sectionFetchError: false,
      show: true,
    }

  },
  mounted() {
    fetch('http://0.0.0.0/api/section')
        .then(response => response.json())
        .then(data => this.sections = data)
        .catch((err) => {
          this.sectionFetchError = true
          console.log(err)
        });


    fetch('http://0.0.0.0/api/post/1')
        .then(response => response.json())
        .catch((err) => {
          this.sectionFetchError = true
          console.log(err)
        });
  },
}

</script>

<style scoped>
.header-sections {
  /*background-color: #0f3652;*/
  width: 100%;

}

.sections-show {
  border-right: 1px solid #0f3652;
  border-left: 1px solid #0f3652;

}

.title {
  /*background-color: #1a3040;*/
  background-color: #212529;
  color: white;
  text-align: center;
  cursor: pointer;
}

.section {
  border-bottom: 1px solid #0f3652;

}

.section a {
  color: #0f3652;

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>