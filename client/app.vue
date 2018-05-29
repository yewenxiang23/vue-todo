<template>
    <div id="app">
        <div id="corver"></div>
        <Header/>
        <Todo/>
        <Footer/>
    </div>
</template>

<script>
import Header from './layout/header'
import Todo from './views/todo/todo'
import Footer from './layout/footer.jsx'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url('./assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
}
#corver {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #999;
  opacity: .5;
  z-index: -1;
}
</style>
