<template>
    <div id="verification_page">
        <div class="middle_container">
          <div class="left_half">
            <img :src="require('../assets/logo.png')">
            <div class="cover"></div>
          </div>
          <div class="right_half">
            <h3 class="title">Verification</h3>
            <p class="subtitle">Please Check your Email for the Verification Code.</p>

            <form id="verification_form">
              <div class="input_group">
                <input type="tel" onkeypress='return event.charCode >= 48 && event.charCode <= 57' v-model="code" id="code" max="5"/>
                <label for="code"><i class="fa fa-code"></i> Verification Code:  <span>Invalid Code.</span></label>
              </div>
              <button type="submit" @click="validate_verification($event)" class="proceed_verify global_btn"></button>
            </form>

            <div id="notification" :class="err_msg != '' ? 'active' : ''">{{err_msg}}</div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'verification_page',
  data () {
    return {
      code:'',
      err_msg: ''
    }
  },
  watch:{
    'code'(val){
      document.getElementById('verification_form').getElementsByTagName('span')[0].classList.remove('validated')
      if (val.length > 5) {
        this.code = val.slice(0,5); 
      }
    }
  },
  methods: {
    validate_verification(event){
      event.preventDefault();
      if(this.code == ""){
        document.getElementById('verification_form').getElementsByTagName('span')[0].classList.add('validated')
      }else{
        event.target.classList.add('onclick')
        var formData = new FormData()
        formData.append('token',this.code)
        formData.append('via','email')

        this.axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
            }
          })
          .then(res => {
            console.log(res)
            setTimeout(()=>{
              event.target.classList.remove('onclick');
              this.$router.push('/')
            }, 2250 );
          })
          .catch(error => {
            console.log(error.response)
            this.err_msg = error.response.data.message
            setTimeout(()=>{
              this.err_msg = ''
            },5000)
            event.target.classList.remove('onclick');
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;
$pink: #b06ab3;
$blue: #4568dc;
$violet: #430646;
#verification_page{
    background: linear-gradient(to bottom right,$pink,$blue 70%);
    height: 100vh;

    .middle_container{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 60%;
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
        padding: 40px 40px 80px;
        position: relative;

        .title{
          font-size: 3vw;
          padding: 0;
          margin: 0;
          color: $violet;
        }
        .subtitle{
          margin: 0;
          font-size: 1.5vw;
          color: #888;
        }

        #verification_form{
          margin-top: 50px;

          .input_group{
            input{
              text-align: center;
            }

            span{
              color: #d42525;
              font-size: 1.2vw;
              display: none;

              &.validated{
                display: inline;
                animation: fadeIn ease 0.3s;
              }
            }
          }

          .proceed_verify{
            margin: 50px auto 0;
            display: block;
            &:after{
              content:'Submit'
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
}
</style>
