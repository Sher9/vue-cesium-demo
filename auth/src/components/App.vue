<template>
    <div class="wrap">
        <video-bg :sources="[require('../../../common/images/movie.mp4')]">
        </video-bg>
        <div class="logo_wrap">
            <img
                src="../../../common/images/login_logo.png"
                class="main_logo"
            />
        </div>
        <div class="form_wrap" @keyup.enter="login">
            <div class="form_title">
                <span>用户登录</span>
            </div>
            <div class="form_item">
                <i class="icon_username"></i>
                <input placeholder="请输入用户名" v-model="userName" />
            </div>
            <div class="form_item">
                <i class="icon_password"></i>
                <input
                    placeholder="请输入密码"
                    type="password"
                    v-model="password"
                />
            </div>
            <div class="login_check">
                <input name type="checkbox" v-model="checked" />
                <span>记住密码</span>
            </div>
            <div class="form_button" @click="login">
                <span>登 录</span>
            </div>
            <div class="form_wrap_bg"></div>
        </div>
    </div>
</template>
<script>
import VideoBg from 'vue-videobg'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            userName: '',
            password: '',
            checked: false,
        }
    },
    created() {
        this.passwordRemeber()
    },
    mounted() {
        document.body.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.login()
            }
        })
    },
    methods: {
        passwordRemeber() {
            const loginState = Cookies.getJSON('loginState')
            if (loginState) {
                this.userName = loginState.userName
                this.password = loginState.password
                this.checked = true
            }
        },
        login() {
            if (!this.userName) {
                this.$message.warning('用户名不能为空')
                return
            }
            if (!this.password) {
                this.$message.warning('密码不能为空')
                return
            }
            if (this.checked) {
                Cookies.set(
                    'loginState',
                    {
                        userName: this.userName,
                        password: this.password,
                    },
                    { expires: 30 }
                )
            }
            location.href = './index.html'
        },
    },
    components: {
        VideoBg,
    },
}
</script>
<style>
.VideoBg video {
    position: absolute;
    top: 50%;
    left: 50%;
    visibility: hidden;
    filter: blur(15px);
    /*加滤镜*/
    /*-webkit-filter:grayscale(100%);*/
    /*filter:grayscale(100%);//背景灰度设置*/
    z-index: -11;
}
</style>
<style scoped>
::-webkit-input-placeholder {
    color: #cbd2e6;
    font-size: 0.14rem;
}

::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #cbd2e6;
    font-size: 0.14rem;
}

:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #cbd2e6;
    font-size: 0.14rem;
}
.logo_wrap {
    position: absolute;
    top: 10%;
    left: 33%;
}
.main_logo {
    width: 4.8rem;
    height: 0.8rem;
    vertical-align: middle;
}
.form_wrap {
    padding: 0.2rem;
    height: 3.3rem;
    position: absolute;
    top: 33%;
    left: 37%;
    width: 4rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.form_wrap .form_wrap_bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: url('../../../common/images/nav_bg.png') center center;
    background-size: 100% 100%;
}
.form_title {
    text-align: center;
    font-size: 0.22rem;
    color: #fff;
    height: 0.56rem;
    line-height: 0.56rem;
    letter-spacing: 0.02rem;
    font-weight: 100;
    margin-top: 2%;
}

.form_item {
    width: 90%;
    margin: 0.2rem 5%;
    border: solid 1px #6395c8;
    border-radius: 0.04rem;
    background: #23429a;
    color: #fff;
}

.form_item i {
    color: #cbd2e6;
    height: 0.16rem;
    width: 0.16rem;
    font-size: 0.16rem;
    padding: 0.1rem;
    line-height: 0.16rem;
}
.form_item input {
    width: 80%;
    border: none;
    background: none;
    height: 0.3rem;
    font-size: 0.16rem;
    color: #fff;
}

.login_check {
    height: 0.25rem;
    padding: 0 0.13rem;
    margin-top: 0.15rem;
    line-height: 0.18rem;
    display: flex;
}
.login_check input {
    width: 0.14rem;
    height: 0.14rem;
    vertical-align: middle;
}
.login_check span {
    vertical-align: middle;
    color: #cbd2e6;
    font-size: 0.12rem;
}

.form_button {
    width: 90%;
    height: 0.32rem;
    margin: 0.2rem 5%;
    text-align: center;
    line-height: 0.32rem;
    background: url('../../../common/images/login_text_bg.png') no-repeat center
        center;
    background-size: 100% 100%;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.18rem;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
}

/* .login_btn span:hover {
    background-color: #fff;
    color: #213744;
} */
.login_copyright {
    font-size: 0.13rem;
    color: #fff;
    position: absolute;
    bottom: 0.1rem;
    right: 0.05rem;
}
</style>
