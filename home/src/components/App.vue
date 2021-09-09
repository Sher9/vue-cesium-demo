<template>
    <div class="index_wrap">
        <video-bg :sources="[require('../../../common/images/movie.mp4')]">
        </video-bg>
        <div class="logo_wrap">
            <img
                src="../../../common/images/login_logo.png"
                class="main_logo"
            />
        </div>
        <div class="user_info">
            <ul>
                <li @click="logout">
                    <i class="icon_signout "></i><span>退出</span>
                </li>
            </ul>
        </div>
        <div class="nav_info">
            <ul>
                <li
                    class="bc_1"
                    v-for="item in navItemList"
                    :key="item.id"
                    @click="openSystem(item.url)"
                >
                    <div class="bc_icon">
                        <i :class="item.icon"></i>
                    </div>
                    <div class="bg_icon"></div>
                    <div class="bc_name">
                        <font>{{ item.label }}</font>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import VideoBg from 'vue-videobg'
export default {
    data() {
        return {
            userInfo: '',
            navItemList: [
                {
                    id: 1,
                    url: 'screen',
                    label: '大屏幕',
                    icon: 'icon_monitor2',
                },
            ],
        }
    },
    created() {},
    methods: {
        logout() {
            window.location.href = './login.html'
        },
        openSystem(url) {
            window.open(url)
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
    z-index: -11;
}
</style>
<style scoped>
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
/*--导航页 用户信息-------------------------*/
.user_info {
    position: absolute;
    top: 4%;
    right: 1%;
    z-index: 2;
}
.user_info ul {
    float: right;
}
.user_info ul li {
    margin-right: 0.3rem;
    float: left;
    cursor: pointer;
}
.user_info ul li i {
    line-height: 0.2rem;
    font-size: 0.16rem;
    color: #3176b8;
    float: left;
}
.user_info ul li span {
    line-height: 0.2rem;
    font-size: 0.14rem;
    margin-left: 0.05rem;
    float: left;
    color: #3176b8;
}
.user_info ul li.sign_out {
    cursor: pointer;
}
.user_info ul li.sign_out:hover {
    color: #3176b8;
}
.nav_info {
    position: absolute;
    top: 30%;
    left: 15%;
    right: 15%;
    bottom: 10%;
    box-sizing: border-box;
    padding: 2% 5% 2% 5%;
    background: url('../../../common/images/login_bg.png') center center;
    background-size: 100% 100%;
}
.nav_info ul {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
}
.nav_info ul li {
    width: 1.8rem;
    height: 2rem;
    cursor: pointer;
}
.nav_info ul li .bc_icon {
    background: url(../../static/images/nav_icon_bg.png) center center;
    background-size: 100% 100%;
    text-align: center;
    height: 0.7rem;
    width: 0.7rem;
    line-height: 0.8rem;
    margin-left: 0.2rem;
    z-index: 9;
    position: absolute;
}

.nav_info ul li .bg_icon {
    background: url(../../static/images/nav_icon_bg1.png) center center;
    background-size: 100% 100%;
    width: 1.1rem;
    height: 0.7rem;
    margin-top: 0.3rem;
}

.nav_info ul li i {
    font-size: 0.28rem;
    color: #00eeff;
}
.nav_info ul li .bc_name {
    margin: 0.1rem 0.36rem;
}
.nav_info ul li .bc_name font {
    font-size: 0.14rem;
    color: #fff;
}
</style>
