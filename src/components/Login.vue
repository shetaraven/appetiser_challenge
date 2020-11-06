<template>
  <div id="login_page">
    <div class="middle_container">
      <div class="logo_container">
        <img :src="require('../assets/logo.png')" class="logo">
      </div>
      <div class="content">
        <center>
          <h3 class="title">Login Form</h3>
          <p class="subtitle">Welcome, please login your account.</p>
        </center>

        <form id="login_form">
          <div class="input_group">
            <input @change="unvalidated($event);" type="email" v-model="user.email" id="email" required/>
            <label for="email"><i class="fa fa-envelope-o"></i> Email Address: </label>
          </div>
          <div class="input_group">
            <input @change="unvalidated($event);" type="password" v-model="user.password" id="password" required/>
            <label for="password"><i class="fa fa-lock"></i> Password: </label>
          </div>
          <button type="submit" @click="validate_login($event)" class="proceed_login global_btn"></button>
          <center><router-link to="/registration" class="signup_btn">Create an Account <i class="fa fa-question"></i> </router-link></center>
        </form>
      </div>

      <div id="notification">Incorrect Username or Password.</div>
    </div>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user:{
        email: '',
        password: ''
      }
    }
  },
  methods:{
    validate_login(event){
      event.preventDefault();
      var checker = []
      Object.keys(this.user).forEach(key => {
        if(this.user[key] == ''){
          document.getElementById(key).classList.add('required');
          checker.push(1)
        }else{
          checker.push(0)
        }
      })
      setTimeout(()=>{
        if(!checker.includes(1)){
          event.target.classList.add('onclick')
          this.process(event)
        } 
      },250)
    },
    async process(event) {
      var formData = new FormData()
      formData.append('username',this.user.email)
      formData.append('password',this.user.password)

      this.axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/login',formData)
			.then(res => {
        console.log(res)
        setTimeout(()=>{
          event.target.classList.remove('onclick');
          this.$router.push('/success')
        }, 2250 );
      })
      .catch(error => {
        document.getElementById('notification').classList.add('active')
        event.target.classList.remove('onclick');
        setTimeout(()=>{
          document.getElementById('notification').classList.remove('active')
        },3000)
      })
    },
    unvalidated(event){
      event.target.classList.remove('required')
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
#login_page{
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
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 35%;
      min-height: 30%;
      background: $white;
      border-radius: 5px;
      z-index: 2;
      box-shadow: 10px 10px 0px 0px #efefef;

      .logo_container{
        position: relative;

        .logo{
          width: 25%;
          padding: 5px;
          position: absolute;
          left: 50%;
          top: -50%;
          transform: translate(-50%,-50%);
          background: #fff;
          border-radius: 50%;
        }
      }

      .content{
        margin-top: 15%;
        padding: 0 3vw 5vw;

        .title{
          font-size: 2vw;
          padding: 0;
          margin: 0;
          color: $violet;
        }
        .subtitle{
          margin: 0;
          font-size: 1vw;
          color: #888;
        }

        .input_group{
          span{
              color: #d42525;
              font-size: 1vw;
              display: none;

              &.validated{
                display: inline;
                animation: fadeIn ease 0.3s;
              }
            }
        }

        #login_form{
          margin-top: 4vw;

          .proceed_login{
            margin: 3vw auto 0;
            display: block;
            &:after{
              content:'Login';
            }
          }
          
        }

        .signup_btn{
          margin: 2vw auto 0;
          display: inline-block;
          text-decoration: none;
          font-size: 1.2vw;
          transition: all ease-in-out .2s;
          color: #333;
          &:hover{
            color: $violet;
          }
        }
      }
    }
}
</style>
