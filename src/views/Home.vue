<template>
  <div class="home">
    <div class="jumbotron card morpheus-den-gradient">
      <div class="text-white text-center py-5 px-4">
        <div>
          <h2 class="card-title h2-responsive pt-3 mb-5 font-bold"><strong>Why nonlinearities?</strong></h2>
          <p class="mx-3 mb-3">The discovery of causal relationships between a set of observed variables is a fundamental
            problem in science. <br/> We
            show that the basic linear framework can be generalized to nonlinear models. In
            this extended framework, nonlinearities in the data-generating process are in fact a
            blessing rather than a curse, as they typically provide information on the underlying
            causal system and allow more aspects of the true data-generating mechanisms
            to be identified. In addition to theoretical results we show simulations and some
            simple real data experiments illustrating the identification power provided by nonlinearities.
          </p>
          <a class="btn btn-outline-white btn-md"><i class="fas fa-clone left"></i> View Binary</a>
          <a class="btn btn-outline-white btn-md"><i class="fas fa-clone right"></i> View Generalization</a>
        </div>
      </div>
    </div>

    <div class="container my-5 p-5 z-depth-1">
      <section class="dark-grey-text">
        <h2 class="text-center font-weight-bold mb-4 pb-2">
          From statistical to causal explanations
        </h2>
        <p class="text-center lead grey-text mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>


        <div class="row">
          <div class="col-lg-5 text-center text-lg-left">
            <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/screens-section.jpg" alt="Sample image">
          </div>
          <div class="col-lg-7">

            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-share fa-lg indigo-text"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p class="grey-text">Avoiding unethical, too expensive or technically impossible experiments
                </p>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-share fa-lg indigo-text"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p class="grey-text">Enabling to classify under changing distribution, e.g. they would allow to perform
                  what-if reasoning under realistic dynamic scenarios
                </p>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-share fa-lg indigo-text"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p class="grey-text">Driving the audit of a black box in the local explanation discovery
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-1">
                <i class="fas fa-share fa-lg indigo-text"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p class="grey-text mb-0">Achieving more informative and robust explanations </p>
              </div>
            </div>

          </div>
        </div>

      </section>


    </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
  }
</script>

<style>
  .home h1{
    margin-top: 2em;
    font-weight: bold;
  }
</style>
