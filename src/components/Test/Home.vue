<template>
<div class="container-fluid" style="padding: 0px">
<b-navbar toggleable="lg"  variant="info" style="position: absolute; width: 100% !important; background-color : #17a2b800 !important">
    <b-navbar-brand href="#" style="color: rgb(207 255 255); font-size: 40px; font-weight: bold;">Stairway</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav >
      <b-navbar-nav class="ml-auto" >
        <b-nav-item href="/Informacion" right style=" font-size: 30px; font-weight: bold;"> 
            Info       
      </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
<div class="jumbotron" style="margin: 0; font-weight: bold; color: white; text-align: -webkit-left">
  <div class="Title">
    <!--<h1 class="display-4" style="font-size: 150px;font-weight: bold;">Iniciar Test</h1>
    <p class="lead">Este test no es de caracter evaluativo</p>
    <hr class="my-4">
    <p>Debe seguir las instrucciones</p> lead  v-on:click="onSubmit"-->
    <p class=" BotonPadding" >
      <a  class="btn btn-primary btn-lg Boton" href="/Test/Cuestionario" role="button" 
      style=""
     v-on:click="onSubmit">GO!</a>
    </p>
  </div>
  
  <div v-if="loading">
  <div class="modalx">
    <div class="container" style="margin-left: 43%;margin-right: 20%;margin-top: 20%;">
      <pacman-loader :loading = "loading " :color = "color"></pacman-loader>
    </div>
  </div>
  </div>
</div>
</div>

</template>
<script>
import  PacmanLoader  from  'vue-spinner/src/PacmanLoader.vue';

export default  { 
  components : {
    PacmanLoader
  },
  data() {
        return{
          color: "#fff",
          size : "500px",
          loading: false


        }
  },
        methods: {
        onSubmit(evt){
            //evt.preventDefault()
            this.loading = true
            //window.location.href("/Test/Cuestionario")
        }
        
      }
        

}

</script>

<style lang="css" scoped>
    @import '../../assets/Home.css';
</style>