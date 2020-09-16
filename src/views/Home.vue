<template>
  <div class="home">
    <!--Introduction-->
    <div class="jumbotron card morpheus-den-gradient">
      <div class="text-white text-center px-4">
          <h1 class="card-title h1-responsive mt-0 font-weight-bold">
            Causal Discovery
          </h1>
          <h5 class="card-subtitle h5-responsive mb-4">A New Way of Thinking</h5>
          <p class="mb-3" style="line-height: 2">
            Causal discovery is an important analysis task
            used to obtain insight into the underlying mechanisms of a whole
            system. <br> It helps to interpret data, formulate and test hypotheses
            and build or improve the theories of modeling.
            <br> Causal discovery
            also is crucial for the rapidly evolving field of Explainable Artificial
            Intelligence which aims to construct interpretable and
            transparent algorithms that also can explain how they model the
            data.
          </p>
      </div>
    </div>

    <!--Experimental setting -->
    <div class="container mb-1 p-5 z-depth-1">
      <section>
        <h2 class="text-center font-weight-bold mb-4 pb-2" style="font-size: 1.8rem">Experimental Setting</h2>
        <div class="row">
          <div class="col-lg-6 text-center text-lg-left" style="font-size: 0.9rem">
            <img class="img-fluid" src="./icons/network3.png" style="width: 480px" alt="Sample image">
          </div>

          <div class="col-lg-6">
            <p>
              The most effective way of inferring causality is to conduct a <strong>randomized controlled trial (RTC)</strong>
              which randomly assigns participants into a treatment group or a control group.
              However, in reality, such experiments:
            </p>

            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-times-circle fa-lg dark-text"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p>Are unethical, too expensive or technically impossible (e.g.
                  trying to discover the long term effects of an illicit substance)</p>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-times-circle fa-lg dark-text"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p>Don't allow to perform what-if reasoning under realistic dynamic scenarios
                </p>
              </div>
            </div>

            <p>Therefore, identifying causation <strong>directly from human observational data</strong>,
              or data collected from human subjects without the need for randomized
              assignment, constitutes the recommended method.
              <br> In particular, infer causal relationships from
              uncontrolled data allows:
            </p>
            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-check fa-lg" style="color: #0d47a1"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p>To achieve more informative and robust explanations</p>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-1">
                <i class="fas fa-check fa-lg" style="color: #0d47a1"></i>
              </div>
              <div class="col-xl-10 col-md-11 col-10">
                <p>To classify under changing distribution
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    <!--Learn Causal Model-->
    <div class="container pt-5 pb-4 px-5 z-depth-1">
      <section>
        <div class="row">
          <div class="col-lg-8">
            <h3 class=" h3-responsive font-weight-bold">Learn a Causal Model</h3>
              <p>A causal model is graphically represented by a directed acyclic graph (DAG).<br>
                Learning a DAG from data is an <strong>highly challenging task</strong> because
                of:</p>
                <ol style="line-height: 2">
                  <li>the unknown and complex relationships</li>
                  <li>noise in the dataset</li>
                  <li>scalability problem stemming from the large number of nodes</li>
                </ol>
          </div>
          <div class="col-lg-4">
            <img class="img-fluid" src="./icons/problem.png" style="width: 260px" alt="problem">
          </div>
        </div>
        <p class="pt-2">
          There is an extensive body of literature for recovering the underlying directed graph from observational data.
          Many methods assumes that effects are linear functions of their causes plus independent, Gaussian noise.
          <br><strong>Although the assumptions of linearity and Gaussianity are mathematically convenient,
          they are not always realistic.</strong>
        </p>
        <h3 class="pt-2 h3-responsive font-weight-bold">Additive Noise Models (ANM) </h3>

        <p class="pt-2 pb-2">
          This approach attempts to show that the linear framework can be <i>generalized</i> to nonlinear models. <br>
          In particular, <strong>nonlinearities in the data-generating process</strong> provide information on the underlying causal system
          and           allow more aspects of the true data-generating mechanisms to be identified.
        </p>
      </section>
    </div>

    <!--Visual Interface-->
    <div class="container my-1 p-5 z-depth-1">
      <h2 class="text-center h2-responsive font-weight-bold" style="color: #0d47a1">A Framework for Causal Visualization</h2>
      <!--subtitle-->
      <p class="text-center px-5 pt-3" style="line-height: 1.8">
        This framework offers <strong>an interactive and automatic tool for exploring step-by-step the algorithm <br>
        "Nonlinear Causal Discovery with additive noise models" originally proposed by Prof. Hoyer of Helsinki University, Finland.</strong> <br>
      </p>
      <!--img + key points-->
      <div class="row px-5 justify-content-center">
        <div class="col-md-4 px-1">
          <div class="row p-4">
            <p>It visualizes the causal relations as an interactive spatial 2D layout in which each edge connecting two variables implies a causal relation
              and the direction of an edge identifies the effect from the cause.</p>
          </div>
          <div class="row p-4">
            <p>Mathematical measurements of causal relations in the form of regression analysis (targeting categorical variables) are calculated
              for enabling users to examine potential causalities with statistical proof.
            </p>
          </div>
        </div>
        <div class="col-md-3 text-center p-2" style="margin-top: 40px;">
          <img src="./icons/network_blu.png" class="img-fluid" alt="network">
        </div>
        <div class="col-md-4 px-1">
          <div class="row px-4 pt-4 pb-5">
            <p>To show the ability of ANM method to find the correct model when all the assumptions hold,
            we have applied it to a variety of real-world datasets.</p>
          </div>
          <div class="row p-4">
            <p> We also studied the performance of the method on simulated data where we can control the data-generating
              process and therefore can be certain about the ground truth. </p>
          </div>
        </div>
      </div>
      <!--Navigation Buttons-->
      <div class="row mt-3 justify-content-center">
        <a class="btn btn-outline btn-md" style="color: #0d47a1; border: 2px solid #0d47a1">
          <i class="fas fa-clone left"></i>
          <router-link to="/binary">Learn more about Bivariate Case</router-link></a>
        <a class="btn btn-outline btn-md" style="color: #0d47a1; border: 2px solid #0d47a1">
          <i class="fas fa-clone right"></i>
          <router-link to="/general"> Learn more about Multivariate Case</router-link></a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style>
  .jumbotron p {
    margin-right: 120px;
    margin-left: 120px;
  }
a {
  text-decoration: none;
}
a:visited {
  color: #0d47a1;
}
</style>
