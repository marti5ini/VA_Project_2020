<template>
  <div id="app">
    <!-- navbar -->
    <div class="navbar fixed-top navbar-expand-lg navbar-dark indigo">
      <router-link class="navbar-brand" to="/" ><strong>NonLinear Causal Graph</strong></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <nav class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/binary">Binary</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/general">Generalization</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <transition name="moveInUp">
      <router-view/>
    </transition>
    <!-- navbar -->
    <!-- Footer -->
    <footer class="page-footer font-small indigo">
      <!-- Copyright -->
      <div class="footer-copyright text-center py-3 white-text">© 2020 VA Project | Martina Cinquini </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';


.moveInUp-enter-active{
    animation: fadeIn 2s ease-in;
  }
  @keyframes fadeIn{
    0%{
      opacity: 0;
    }
    50%{
      opacity: 0.5;
    }
    100%{
      opacity: 1;
    }
  }
  .moveInUp-leave-active{
    animation: moveInUp .3s ease-in;
  }
  @keyframes moveInUp{
    0%{
      transform: translateY(0);
    }
    100%{
      transform: translateY(-400px);
    }
  }
  .top-nav-collapse {
    background-color: #f8bbd0 !important;
  }
</style>
