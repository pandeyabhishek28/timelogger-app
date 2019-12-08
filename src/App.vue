<template>
  <div id="app">
    <div class="navbar-header">
     <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand fluid>
      <b-button style="height: 50px;" @click="toggelMe()" variant="info" pill >
          <font-awesome-icon v-if="!isSidebarActive" icon="arrow-alt-circle-right" size="3x"/>
          <font-awesome-icon v-if="isSidebarActive" icon="arrow-alt-circle-left" size="3x"/>
      </b-button>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <img class="img-thumbnail" style="height: 50px;" src="./assets/logo.png" />
      </b-navbar-nav>

     </b-navbar>
    </div>
    <div>
       <b-container fluid class="bv-example-row">
         <b-row>
           <b-col v-if="isSidebarActive" cols="3"> <SideBarComponent/></b-col>
           <b-col class="md-12 sm-12"> <DashBoardComponent/></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import DashBoardComponent from "./components/DashBoardComponent.vue";
import SideBarComponent from "./components/SideBarComponent.vue";
import store from './store';

export default {
  name: "app",
  data: () => ({
  isLoading: false,
  isSidebarActive: false,  
  }),
  store,
  components: {
    DashBoardComponent,
    SideBarComponent
  },
  methods:{
    toggelMe(){
       this.isSidebarActive=!this.isSidebarActive;
    }    
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
.navbar {
  min-height: 60px;
}

.navbar-brand {
  padding: 0 15px;
  height: 60px;
  line-height: 60px;
}
</style>
