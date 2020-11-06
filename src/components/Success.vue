<template>
  <div id="success_page">
    <div class="middle_container">
      <div class="logo_container">
        <img :src="require('../assets/logo.png')" class="logo">
      </div>
      <div class="content">
        <center>
          <h3 class="title">{{msg}}</h3>
          <p class="subtitle">Welcome, to your Landing Page.</p>
        </center>
      </div>
    </div>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  name: 'success',
  data () {
    return {
      msg: 'Login Successful'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$white: #fff;
$pink: #b06ab3;
$blue: #4568dc;
$violet: #430646;
#success_page{
    height: 100vh;
    background: url('../assets/reg_bg2.jpg')no-repeat center center;
    background-size: 100% 100%;

    .cover{
      background: linear-gradient(to bottom right,$pink,$blue 70%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
      z-index: 1;
    }

    .middle_container{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 35%;
      min-height: 50%;
      // box-shadow: 10px 10px 0px 0px #efefef;
      background-color: $white;
      border-radius: 5px;
      z-index: 2;

      .logo_container{
        position: relative;

        .logo{
          width: 30%;
          padding: 5px;
          position: absolute;
          left: 50%;
          top: -50%;
          transform: translate(-50%,-50%);
          background: #bfe6b4;
          border-radius: 50%;
        }
      }

      .content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;

        .title{
          font-size: 3vw;
          padding: 0;
          margin: 0;
          color: $violet;
        }
        .subtitle{
          margin: 10px;
          font-size: 1.5vw;
          color: #888;
        }
      }

    }
}
</style>
