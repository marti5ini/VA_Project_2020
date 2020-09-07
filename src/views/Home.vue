<template>
  <div class="home">
    <div class="jumbotron card morpheus-den-gradient">
      <div class="text-white text-center px-4">
          <h2 class="card-title h2-responsive mb-5 font-bold">
            <strong>From statistical to causal explanations</strong>
          </h2>
          <p class="mx-3 mb-3">
            One of the main endeavours of many sciences is to identify causal relations.
            Given a phenomenon, researchers are interested in finding out which variables have causal influence on that phenomenon.
            Furthermore, scientists want to know how that phenomenon will change when one manipulates those variables.
            For instance, when a new drug is tested, it is examined whether it has a causal effect on improving the health of
            the patients. In these circumstances one uses randomized trials to assess the causal interaction. In this case
            that would amount to one group of test subjects receiving the drug and the other group receiving a placebo.
            Ideally, causal discovery is performed via these randomized trials. However, sometimes one cannot perform
            these type of experiments and one only has observational data, i.e. data obtained without any interventions.
            Observational data is where causal discovery algorithms come into play. Causal discovery algorithms are
            algorithms that try to derive causal relations from observational data. That is, given a set of data, a causal
            discovery algorithm returns a set of statements regarding the causal interactions between the measured
            variables.
          </p>
          <a class="btn btn-outline-white btn-md"><i class="fas fa-clone left"></i> View Binary</a>
          <a class="btn btn-outline-white btn-md"><i class="fas fa-clone right"></i> View Generalization</a>
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

        <p><strong>Why nonlinearities?</strong></p>
        <mdb-card class="model">
          <mdb-card-body>
            <p>
              There is an extensive body of literature on causal modeling and causal discovery that
              assumes that effects are linear functions of their causes plus independent, Gaussian noise.
              These models are known as <i>Structural Equation Models</i> (SEM) and are popular in econometrics, sociology,
              psychology and other fields. Although the assumptions of linearity and Gaussianity
              are mathematically convenient, they are not always realistic.
              <br>
              This approach attempts to show that the linear framework can be generalized to nonlinear models.
              In particular, <strong>nonlinearities</strong> in the data-generating process provide information on the underlying causal system and
              allow more aspects of the true data-generating mechanisms to be identified.
            </p>
          </mdb-card-body>
        </mdb-card>

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
