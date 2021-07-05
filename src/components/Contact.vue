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
          <h1 class="text-center">Contact form</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aspernatur autem culpa cupiditate deleniti, deserunt dolor, doloremque dolorum eaque fugit harum in incidunt itaque iure maiores minus quam quasi quis sapiente. Accusamus accusantium error fuga neque quae quia saepe sint veritatis! Accusantium amet aperiam aspernatur, consequuntur, corporis eos error impedit inventore ipsam laborum minima molestias nam optio placeat quae, quaerat saepe tempora tenetur velit voluptate. Accusantium ad asperiores dolorem doloribus, earum eveniet laudantium, nostrum officiis optio quis quo repudiandae unde ut veniam voluptatum? Alias debitis, iusto molestias natus nesciunt quas quidem quo soluta suscipit, vitae voluptas voluptate voluptatem voluptatum.</p>
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
  name: "Contact",
  components: {
    Navbar,
    Footer,
    Sections,

  }

}
</script>

<style scoped>

</style>