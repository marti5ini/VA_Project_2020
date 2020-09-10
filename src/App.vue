<template>
  <div id="app">
    <mdb-navbar position="top" dark color="indigo" scrolling>
      <mdb-navbar-brand>
        <router-link class="navbar-brand" to="/" ><strong>Nonlinear Causal Discovery with ANM</strong></router-link>
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item>
            <router-link class="nav-link" to="/binary">Bivariate Case</router-link>
          </mdb-nav-item>
          <mdb-nav-item>
            <router-link class="nav-link" to="/general">Multivariate Case</router-link>
          </mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <transition name="moveInUp">
      <router-view/>
    </transition>
    <footer class="page-footer font-small indigo">
      <div class="footer-copyright text-center py-3 white-text">
        <p>© 2020 VA Project | Martina Cinquini</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand
  } from "mdbvue";
  export default {
    name: 'App',
    components: {
      mdbNavbar,
      mdbNavItem,
      mdbNavbarNav,
      mdbNavbarToggler,
      mdbNavbarBrand
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

$image-path: '~@/../mdb/mdbvue/img';
@import "~@/../mdb/mdbvue/scss/mdb-free.scss";


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
    background-color: #4285f4 !important;
  }
  footer p {
    margin: 0;
  }
  #app {
    margin-top: 78px;
  }
</style>
