<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
$blue: #430646;
$gray: #bbbbbb;
$white: #fff;
$pink: #b06ab3;
$blue: #4568dc;
$violet: #430646;

body{
  margin: 0;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button.global_btn {
    outline:none;
    height:4vw;
    text-align: center;
    width: 12vw;
    border-radius:40px;
    background: #fff;
    border: 2px solid $blue;
    color:$blue;
    letter-spacing:1px;
    text-shadow:0;
    cursor: pointer;
    transition: all 0.25s ease;
    font-size: 1.5vw;

    &:hover {
      color:white;
      background: $blue;
    }
    &:active {
      letter-spacing: 2px ;
    }
  }
  .global_btn.onclick {
    width: 4vw;
    border-color:$gray!important;
    border-width:3px!important;
    font-size:0!important;
    border-left-color:$blue!important;
    animation: rotating 2s 0.25s linear infinite;
    border-radius: 50%;

    &:after {
      content:""!important;
    }
    &:hover {
      color:$blue!important;
      background: white!important;
    }
  }
  .global_btn.validate {
    font-size:13px;
    color: white;
    background: $blue;
    
    &:after {
      font-family:'FontAwesome';
      content:"\f00c";
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .input_group{
    position: relative;
    width: 100%;
    line-height: 44px;
    margin-top: 2.5vw;

    label {
      position: absolute;
      left: 0;
      width: 100%;
      color: #333;
      font-size: 1vw;
      top: -24px;
      cursor: text;
      transition: all ease-in-out .1s;
    }

    input {
      width: 100%;
      border: 0;
      outline: 0;
      padding: 0.5vw 0;
      border-bottom: 2px solid #d3d3d3;
      box-shadow: none;
      color: #111;
      transition: all ease-in-out .3s;
      font-size: 1.2vw;
      &.required{
        border-color: #d42525;
      }
    }

    input:invalid {
      outline: 0;
    }

    input:focus{
      border-color: $pink;
    }

    input:focus~label{
      font-size: 1.2vw;
      top: -24px;
      color: $pink;
    }
  }

  @keyframes fadeIn {
    0%{
      display: inline;
      opacity: 0;
    }
    100%{
      display: inline;
      opacity: 1;
    }
  }

  #notification{
    background: #be4646;
    color: #fff;
    padding: 15px;
    text-align: center;
    border-radius: 0 0 5px 5px;
    display: none;

    &.active{
      display: block;
      animation: fadeIn ease-in-out .3s;
    }
  }
}

@import 'assets/responsive.scss';
</style>
