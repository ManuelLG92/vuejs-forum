<template>
  <div class="content">
    <div class="col-md-12" >
      <img class="w-100" src="../assets/main_banner.png" alt="Banner" >
    </div>
    <Navbar />
    <div class="container-fluid mb-5 mt-5">
      <div class="row">
        <div class="col-md-2">
          <Sections/>
        </div>
        <div class="col-md-10">
          <p>content</p>
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
  name: "About",
  components: {
    Navbar,
    Footer,
    Sections,

  }

}
</script>

<style scoped>

</style>