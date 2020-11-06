<template>
    <div id="registration_page">
        <div class="middle_container">
          <div class="left_half">
            <img :src="require('../assets/logo.png')">
            <div class="cover"></div>
          </div>
          <div class="right_half">
            <h3 class="title">Registration</h3>
            <p class="subtitle">Welcome to account creation, please fill up all the following fields.</p>

            <form id="registration_form">
              <div class="input_group">
                <input @change="unvalidate($event,'email')" type="email" v-model="user_details.email" id="email" required/>
                <label for="email"><i class="fa fa-envelope-o"></i> Email Address:  <span>Input a Valid Email Address.</span></label>
              </div>
              <div class="input_group">
                <input @change="unvalidate($event,'full_name')" type="text" v-model="user_details.full_name" id="full_name" required/>
                <label for="full_name"><i class="fa fa-user-o"></i> Full Name:  <span>Fill Up this blank Field.</span></label>
              </div>
              <div class="input_group">
                <input @change="unvalidate($event,'password')" type="password" v-model="user_details.password" id="password" required/>
                <label for="password"><i class="fa fa-lock"></i> Password:  <span>Password must be atleast 8 Characters.</span></label>
              </div>
              <div class="input_group">
                <input @change="unvalidate($event,'password_confirmation')" type="password" v-model="user_details.password_confirmation" id="password_confirmation" required/>
                <label for="password_confirmation"><i class="fa fa-lock"></i> Confirm Password:  <span>Password does not Match!</span></label>
              </div>
              <button type="submit" @click="validate_registration($event)" class="proceed_register global_btn"></button>
              <center><router-link to="/" class="login_btn">Have an Account <i class="fa fa-question"></i> </router-link></center>
            </form>

            <div id="notification" :class="err_msg != '' ? 'active' : ''">{{err_msg}}</div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'registration_page',
  data () {
    return {
      user_details:{
        email:'',
        full_name:'',
        password:'',
        password_confirmation:''
      },
      err_msg: ''
    }
  },
  methods: {
    validate_registration(event){
      event.preventDefault();
      var checker = []
      Object.keys(this.user_details).forEach(key => {
        if(this.user_details[key] == ''){
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
    process(event) {
      var formData = new FormData()
      formData.append('email',this.user_details.email)
      formData.append('full_name',this.user_details.full_name)
      formData.append('password',this.user_details.password)
      formData.append('password_confirmation',this.user_details.password_confirmation)

      this.axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/register',
        formData,
        {
          headers: {
            'Accept': `application/json`,
            'content-Type': `application/json`
          }
        })
        .then(res => {
          console.log(res.data)
          setTimeout(()=>{
            event.target.classList.remove('onclick');
            localStorage.setItem('access_token',res.data.data.access_token)
            this.$router.push('/verification')
          }, 2250 );
        })
        .catch(error => {
          console.log(error.response)
          this.err_msg = error.response.data.message
          setTimeout(()=>{
            this.err_msg = ''
          },3000)
          event.target.classList.remove('onclick');
        })
    },
    unvalidate(event,name) {
      if(name == 'email' || name == 'full_name'){
        if(this.user_details[name] == ''){
          event.target.nextElementSibling.getElementsByTagName('span')[0].classList.add('validated')
        }else{
          event.target.nextElementSibling.getElementsByTagName('span')[0].classList.remove('validated')
        }
      }else if (name == 'password'){
        if(this.user_details.password.length < 8){
          event.target.nextElementSibling.getElementsByTagName('span')[0].classList.add('validated')
        }else{
          event.target.nextElementSibling.getElementsByTagName('span')[0].classList.remove('validated')
        }
      }else if(name == 'password_confirmation'){
        if(this.user_details.password != this.user_details.password_confirmation){
          event.target.nextElementSibling.getElementsByTagName('span')[0].classList.add('validated')
        }else{
          event.target.nextElementSibling.getElementsByTagName('span')[0].classList.remove('validated')
        }
      }

      event.target.classList.remove('required');
    },
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;
$pink: #b06ab3;
$blue: #4568dc;
$violet: #430646;
#registration_page{
    background: linear-gradient(to bottom right,$pink,$blue 70%);
    height: 100vh;

    .middle_container{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 65%;
      min-height: 50%;
      background: $white;
      border-radius: 5px;
      display: inline-flex;

      .left_half{
        width: 50%;
        position: relative;
        background: url(../assets/reg_bg2.jpg)no-repeat;
        border-radius: 5px 0 0 5px;
        background-size: 100% 100%;

        .cover{
          background: linear-gradient(to bottom right,$blue,$violet 70%);
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: .45;
          z-index: 1;
        }

        img{
          width: 60%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          z-index: 2;
        }
      }
      .right_half{
        width: 50%;
        background: $white;
        padding: 40px;
        position: relative;

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

        .input_group span{
          color: #d42525;
          font-size: 1vw;
          display: none;
          &.validated{
            display: inline;
            animation: fadeIn ease 0.3s;
          }
        }

        #registration_form{
          margin-top: 5vw;

          .proceed_register{
            margin: 5vw auto 0;
            display: block;
            &:after{
              content:'Submit'
            }
          }
        }

        .login_btn{
          margin: 20px auto;
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
      #notification{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0;
        padding: 10px;
        font-size: 1.5vw;
      }
    }
}
</style>
