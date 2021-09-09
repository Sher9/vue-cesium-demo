<template>
    <div class="left_box">
        <div class="date">
            <font>{{ curDate }}</font>
            <span>{{ curTime }}</span>
        </div>
        <div class="info_main_div">
            <div class="info_div">
                <div class="info_title">今日预警</div>
                <div class="info_num">
                    <div class="info_today_item">1</div>
                    <div class="info_today_item">3</div>
                </div>
            </div>
            <div class="info_split_line"></div>
            <div class="info_div">
                <div class="info_title">历史预警</div>
                <div class="info_num">
                    <div class="info_history_item">2</div>
                    <div class="info_history_item">7</div>
                    <div class="info_history_item">5</div>
                </div>
            </div>
        </div>
        <div class="split_line"></div>
        <div class="table_box_div">
            <div class="table_box">
                <transition-group
                    name="custom-classes-transition"
                    tag="ul"
                    class="table_list"
                    enter-active-class="animated fadeInLeft"
                >
                    <li v-for="log in logList" :key="log.name">
                        <div class="table_title">
                            <img src="../../../static/images/table_title.png" />
                        </div>
                        <div class="table_info">
                            <font class="w_50">{{ log.name }}</font>
                            <font class="w_50" v-if="log.type === 0"
                                >温度预警：{{ log.value }} ℃</font
                            >
                            <font class="w_50" v-if="log.type === 1"
                                >液位预警：
                                {{ log.value }}
                                cm</font
                            >
                        </div>
                        <div class="table_time">
                            <font class="w_50">{{ log.time }}</font>
                        </div>
                    </li>
                </transition-group>
            </div>
        </div>
        <div class="split_bg">
            <div class="split_bg_text">
                <font>实时指标监控</font>
            </div>
            <div class="search_div">
                <el-autocomplete
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    style="width:94%"
                ></el-autocomplete>
                <i class="icon_search"></i>
            </div>
        </div>
        <div class="monitor_div" v-if="!isShowDetail">
            <vue-seamless-scroll
                :data="recList"
                :class-option="classOption"
                class="search_div"
            >
                <ul>
                    <li
                        v-for="rec in recList"
                        :key="rec.recID"
                        style="display: flex;"
                        @click="showDetail(rec)"
                    >
                        <div class="search_left_div">
                            <font class="w_100 name">{{ rec.name }}</font>
                            <font class="w_100">储存介质：{{ rec.type }}</font>
                            <font class="w_100">区域：{{ rec.area }}</font>
                        </div>
                        <div class="search_middle_div">
                            <progress-bar
                                :options="rec.options ? rec.options : options"
                                :value="rec.percent"
                            />
                            <div class="search_middle_text">
                                <font
                                    class="content arlarm_color"
                                    v-if="rec.isAlarm"
                                    >{{ rec.value }}cm</font
                                >
                                <font class="content" v-else
                                    >{{ rec.value }}cm</font
                                >
                                <font
                                    class="title arlarm_color"
                                    v-if="rec.isAlarm"
                                    >预警</font
                                >
                                <font class="title" v-else>液位</font>
                            </div>
                        </div>
                        <div class="search_right_div">
                            <vue-thermometer
                                :value="rec.temperature"
                                :min="0"
                                :max="60"
                                :options="
                                    rec.thermometerOptions
                                        ? rec.thermometerOptions
                                        : thermometerOptions
                                "
                            />
                            <div class="search_right_text">
                                <font
                                    class="content arlarm_color"
                                    v-if="rec.temperature > 50"
                                    >{{ rec.temperature }}℃</font
                                >
                                <font class="content" v-else
                                    >{{ rec.temperature }}℃</font
                                >
                                <font
                                    class="title arlarm_color"
                                    v-if="rec.temperature > 50"
                                    >预警</font
                                >
                                <font class="title" v-else>正常</font>
                            </div>
                        </div>
                    </li>
                </ul>
            </vue-seamless-scroll>
        </div>
        <div
            class="monitor_back_div"
            @click="isShowDetail = false"
            v-if="isShowDetail"
        >
            <img src="../../../static/images/left_arrow.png" />
            <div class="monitor_back_title"><font>返回油罐列表</font></div>
        </div>
        <div class="monitor_detail_div" v-if="isShowDetail">
            <div class="monitor_info_div">
                <div class="monitor_left_info">
                    <div class="monitor_item">
                        <font class="name_color">{{ detailInfo.name }}</font>
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">储存介质：</font
                        ><font class="text_color">{{ detailInfo.type }}</font>
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">区域：</font
                        ><font class="text_color">{{ detailInfo.area }}</font>
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">最高温度：</font
                        ><font
                            :class="
                                detailInfo.temperature > 50
                                    ? 'arlarm_color'
                                    : 'text_color'
                            "
                            >{{ detailInfo.temperature }}℃</font
                        >
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">最高液位：</font
                        ><font class="text_color">{{ detailInfo.top }}m</font>
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">油罐顶高：</font
                        ><font class="text_color"
                            >{{ detailInfo.height }}m</font
                        >
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">油罐直径：</font
                        ><font class="text_color">{{ detailInfo.r }}m</font>
                    </div>
                    <div class="monitor_item">
                        <font class="title_color">管压：</font
                        ><font class="text_color">{{ detailInfo.p }}Pa</font>
                    </div>
                </div>
                <div class="monitor_right_info">
                    <div class="progress_div">
                        <progress-bar
                            :options="
                                detailInfo.options
                                    ? detailInfo.options
                                    : options
                            "
                            :value="detailInfo.percent"
                        />
                        <div class="top_text">
                            <font
                                class="content arlarm_color"
                                v-if="detailInfo.isAlarm"
                                >{{ detailInfo.value }}cm</font
                            >
                            <font class="content" v-else
                                >{{ detailInfo.value }}cm</font
                            >
                            <font
                                class="title arlarm_color"
                                v-if="detailInfo.isAlarm"
                                >预警</font
                            >
                            <font class="title" v-else>液位</font>
                        </div>
                    </div>
                    <div class="thermometer_div">
                        <vue-thermometer
                            :value="detailInfo.temperature"
                            :min="0"
                            :max="60"
                            :options="
                                detailInfo.thermometerOptions
                                    ? detailInfo.thermometerOptions
                                    : thermometerOptions
                            "
                        />
                        <div class="bottom_text">
                            <font
                                class="content arlarm_color"
                                v-if="detailInfo.temperature > 50"
                                >{{ detailInfo.temperature }}℃</font
                            >
                            <font class="content" v-else
                                >{{ detailInfo.temperature }}℃</font
                            >
                            <font
                                class="title arlarm_color"
                                v-if="detailInfo.temperature > 50"
                                >预警</font
                            >
                            <font class="title" v-else>正常</font>
                        </div>
                    </div>
                </div>
            </div>

            <div class="monitor_video_div">
                <video autoplay loop muted>
                    <source
                        src="../../../static/video/show.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    </div>
</template>
<script>
let alarmTimer = null
import vueThermometer from './Thermometer'
import progressBar from './ProgressBar'
import moment from 'moment'
import vueSeamlessScroll from 'vue-seamless-scroll'
import _ from 'lodash'
export default {
    components: {
        vueThermometer,
        progressBar,
        vueSeamlessScroll,
    },
    created() {
        alarmTimer = setInterval(() => {
            let obj = {
                type: Math.round(Math.random()),
                name: Math.round(Math.random() * 200) + '#作业罐',
                value: Math.round(Math.random() * 80 + 30),
                time: moment(
                    this.randomDate(new Date('2010-01-01 00:00:00'), new Date())
                ).format('YYYY-MM-DD HH:mm:ss'),
            }
            this.logList.splice(this.logList.length - 1, 1)
            this.logList.splice(0, 0, obj)
        }, 3000)
        setInterval(() => (this.curTime = moment().format('HH:mm:ss')), 1000)
    },
    mounted() {
        this.restaurants = this.loadAll()
    },
    data() {
        return {
            curTime: moment().format('HH:mm:ss'),
            curDate: moment().format('YYYY年MM月DD日'),
            isShowDetail: false,
            state1: '',
            value: 50,
            thermometerOptions: {
                text: {
                    color: 'black',
                    fontSize: 10,
                    textAdjustmentY: 2,
                    fontFamily: 'Arial',
                    textEnabled: true,
                },
                thermo: {
                    color: '#00FFDD',
                    backgroundColor: '#163267',
                    frameColor: '#163267',
                    ticks: 10,
                    ticksEnabled: true,
                    tickColor: '#FFFFFF',
                    tickWidth: '1',
                },
                layout: {
                    height: 75,
                    width: 45,
                },
            },
            options: {
                text: {
                    color: '#FFFFFF',
                    shadowEnable: true,
                    shadowColor: '#000000',
                    fontSize: 14,
                    fontFamily: 'Helvetica',
                    dynamicPosition: false,
                    hideText: false,
                },
                progress: {
                    color: '#FFC800',
                    backgroundColor: '#163267',
                    inverted: false,
                },
                layout: {
                    height: 50,
                    width: 5,
                    //verticalTextAlign: 30,
                    //horizontalTextAlign: 33,
                    zeroOffset: 0,
                    strokeWidth: 0,
                    progressPadding: 0,
                    type: 'cylinder',
                },
            },
            recList: [
                {
                    recID: 1,
                    type: '燃油',
                    name: '1# 作业罐',
                    area: '储油区',
                    temperature: 58,
                    value: 23.292,
                    percent: 10,
                    isAlarm: true,
                    top: 89.22,
                    height: 120,
                    r: 36,
                    p: 108,
                    options: {
                        text: {
                            color: '#FFFFFF',
                            shadowEnable: true,
                            shadowColor: '#000000',
                            fontSize: 14,
                            fontFamily: 'Helvetica',
                            dynamicPosition: false,
                            hideText: false,
                        },
                        progress: {
                            color: '#FF0000',
                            backgroundColor: '#163267',
                            inverted: false,
                        },
                        layout: {
                            height: 50,
                            width: 5,
                            //verticalTextAlign: 30,
                            //horizontalTextAlign: 33,
                            zeroOffset: 0,
                            strokeWidth: 0,
                            progressPadding: 0,
                            type: 'cylinder',
                        },
                    },
                    thermometerOptions: {
                        text: {
                            color: 'black',
                            fontSize: 10,
                            textAdjustmentY: 2,
                            fontFamily: 'Arial',
                            textEnabled: true,
                        },
                        thermo: {
                            color: '#FF0000',
                            backgroundColor: '#163267',
                            frameColor: '#163267',
                            ticks: 10,
                            ticksEnabled: true,
                            tickColor: '#FFFFFF',
                            tickWidth: '1',
                        },
                        layout: {
                            height: 75,
                            width: 45,
                        },
                    },
                },
                {
                    recID: 2,
                    type: '燃油',
                    name: '8# 作业罐',
                    area: '储油区',
                    isAlarm: false,
                    temperature: 23,
                    value: 23.292,
                    top: 50.22,
                    percent: 50,
                    height: 120,
                    r: 36,
                    p: 108,
                },
                {
                    recID: 3,
                    type: '燃油',
                    name: '4# 作业罐',
                    area: '储油区',
                    temperature: 36,
                    isAlarm: false,
                    value: 80.292,
                    percent: 70,
                    top: 89.22,
                    height: 120,
                    r: 36,
                    p: 108,
                },
                {
                    recID: 4,
                    type: '燃油',
                    name: '6# 作业罐',
                    area: '储油区',
                    temperature: 40,
                    isAlarm: false,
                    value: 89.291,
                    percent: 80,
                    top: 80.22,
                    height: 120,
                    r: 36,
                    p: 108,
                },
            ],
            logList: [
                {
                    name: '5#作业罐',
                    type: 1,
                    value: 12,
                    time: '2020-05-11 12:56:53',
                },
                {
                    name: '18#作业罐',
                    type: 0,
                    value: 12,
                    time: '2020-05-10 12:56:53',
                },
                {
                    name: '18#作业罐',
                    type: 1,
                    value: 12,
                    time: '2020-05-16 12:56:53',
                },
            ],
            detailInfo: {},
        }
    },
    computed: {
        classOption() {
            return {
                step: 0.5, // 数值越大速度滚动越快
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 1, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
            }
        },
    },
    methods: {
        randomDate(startDate, endDate) {
            let date = new Date(
                +startDate + Math.random() * (endDate - startDate)
            )
            let hour = (0 + Math.random() * (23 - 0)) | 0
            let minute = (0 + Math.random() * (59 - 0)) | 0
            let second = (0 + Math.random() * (59 - 0)) | 0
            date.setHours(hour)
            date.setMinutes(minute)
            date.setSeconds(second)
            return date
        },
        showDetail(data) {
            this.detailInfo = data
            this.isShowDetail = true
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants
            var results = queryString
                ? restaurants.filter(this.createFilter(queryString))
                : restaurants
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        loadAll() {
            return [
                { value: '1# 作业罐', address: '1# 作业罐' },
                {
                    value: '8# 作业罐',
                    address: '8# 作业罐',
                },
                {
                    value: '4# 作业罐',
                    address: '4# 作业罐',
                },
                { value: '6# 作业罐', address: '6# 作业罐' },
            ]
        },
        handleSelect(item) {
            let index = _.findIndex(this.recList, { name: item.value })
            if (index > -1) {
                this.detailInfo = this.recList[index]
                this.isShowDetail = true
            }
        },
    },
    destroyed() {
        alarmTimer = null
        window.clearInterval(alarmTimer)
    },
}
</script>
<style>
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    background: url('../../../static/images/input_bg.png') center center;
    background-size: 100% 100%;
}

.el-autocomplete-suggestion__wrap {
    max-height: 280px;
    padding: 10px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    background-color: #021231;
    border: 1px solid #021231;
    border-radius: 4px;
}

.el-autocomplete-suggestion li {
    padding: 0 20px;
    margin: 0;
    line-height: 34px;
    cursor: pointer;
    color: #a0b8ba;
    font-size: 14px;
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
    background-color: #0056df;
}

.el-popper[x-placement^='bottom'] .popper__arrow {
    /* top: -6px; */
    /* left: 50%; */
    /* margin-right: 3px; */
    /* border-top-width: 0; */
    /* border-bottom-color: #ebeef5; */
    /* color: red; */
    display: none;
}
.el-popper[x-placement^='top'] .popper__arrow {
    display: none;
}
</style>
<style scoped>
.left_box {
    width: 20%;
    position: absolute;
    left: 0.1rem;
    top: 0.5rem;
    bottom: 0;
    z-index: 9;
    background: url('../../../static/images/leftbox_bg.png') center center;
    background-size: 100% 100%;
}

.left_box_bg {
    position: absolute;
    left: 0;
    top: 0;
    background: #0056df;
    z-index: 8;
}

.left_box .date {
    position: absolute;
    color: #0091f6;
    font-weight: 600;
    top: -0.15rem;
}
.left_box .split_line {
    background: url('../../../static/images/split_line.png') center center;
    background-size: 100% 100%;
    width: 94%;
    height: 0.06rem;
}

.left_box .split_bg {
    background: url('../../../static/images/split_bg.png') center center;
    background-size: 100% 100%;
    width: 94%;
    height: 0.7rem;
}

.left_box .split_bg .split_bg_text {
    margin-left: 6%;
    line-height: 0.3rem;
    color: #d07d00;
    font-weight: 600;
    font-size: 0.15rem;
}

.left_box .split_bg .search_div {
    margin-left: 0.15rem;
    margin-top: 0.06rem;
}

.left_box .split_bg .search_div i {
    position: absolute;
    right: 15%;
    color: #0047a3;
    margin-top: 0.08rem;
}

.left_box .info_main_div {
    width: 90%;
    height: calc(12% - 0.15rem);
    margin-bottom: 5%;
    padding-top: 10%;
    position: relative;
    display: flex;
}

.left_box .info_main_div .info_div {
    width: 50%;
    display: flex;
    flex-direction: column;
    height: calc(30% - 0.15rem);
}

.left_box .info_main_div .info_div {
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
}

.left_box .info_main_div .info_split_line {
    background: url('../../../static/images/info_split_line.png') center center;
    background-size: 100% 100%;
    width: 0.02rem;
    margin-top: 0.2%;
}

.left_box .info_main_div .info_div .info_title {
    font-size: 0.14rem;
    text-align: center;
    color: #fff;
}
.left_box .info_main_div .info_div .info_num {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5% 0;
}

.left_box .info_main_div .info_div .info_today_item {
    background: #ff5b56;
    padding: 5%;
    font-size: 0.3rem;
    margin: 3%;
    color: #fff;
}

.left_box .info_main_div .info_div .info_history_item {
    background: #0056df;
    padding: 5%;
    font-size: 0.3rem;
    margin: 3%;
    color: #fff;
}
.left_box .table_box_div {
    width: 94%;
    height: calc(35% - 0.15rem);
    position: relative;
}
.left_box .table_box {
    height: 100%;
    width: 100%;
}

.left_box .table_box .table_title {
    width: 0.6rem;
    height: 35%;
    margin-top: -0.06rem;
}

.left_box .table_box .table_time {
    width: 100%;
    height: 30%;
}

.left_box .table_box .table_time font {
    color: #a0b8ba;
    font-size: 0.13rem;
}

.left_box .table_box .table_info {
    height: 28%;
    line-height: 28%;
    color: #ed2329;
    font-weight: 800;
    font-size: 0.14rem;
    margin-top: 1%;
}

.left_box .table_box li font.w_50 {
    width: 50%;
}

.left_box .table_box li font.w_100 {
    width: 100%;
}

.left_box .table_box li font.w_20 {
    width: 20%;
}

.left_box .table_box li font.w_25 {
    width: 25%;
}

.left_box .table_box .table_list {
    height: 100%;
    width: 94%;
    overflow-y: auto;
    overflow-x: hidden;
}

.left_box .table_box .table_list li {
    width: 90%;
    /* //height: 0.56rem; */
    height: 29%;
    padding: 0 0.05rem;
    margin: 0.1rem 0.15rem;
    background: url('../../../static/images/border.png') center center;
    background-size: 100% 100%;
}

/* .left_box .table_box .table_list li font {
    line-height: 0.45rem;
    font-size: 0.14rem;
    text-align: center;
    color: #a0dbff;
} */

.left_box .monitor_div {
    width: 90%;
    height: calc(37% - 0.15rem);
    margin-bottom: 0.2rem;
    padding-top: 0.2rem;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
}

.left_box .monitor_div .search_div {
    height: calc(35% - 0.15rem);
    width: 100%;
}

.left_box .monitor_div .search_div ul {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.left_box .monitor_div .search_div li {
    width: 90%;
    height: 1.2rem;
    /* border: 1px solid #121970; */
    margin: 0.06rem 0.15rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: url('../../../static/images/border.png') center center;
    background-size: 100% 100%;
    cursor: pointer;
}

.left_box .monitor_div .search_div .content {
    padding-left: 0.08rem;
}

.left_box .monitor_div .search_div .title {
    padding-left: 0.1rem;
    padding-top: 0.05rem;
}

.left_box .monitor_div .search_div .search_left_div {
    width: 45%;
    padding: 0.06rem 0.06rem;
    display: flex;
    flex-direction: column;
}

.left_box .monitor_div .search_div .search_left_div .name {
    color: #00fdfa;
}

.left_box .monitor_div .search_div .search_left_div font {
    padding: 0.06rem 0;
    color: #fffffa;
}

.left_box .monitor_div .search_div .search_middle_div {
    width: 25%;
}

.left_box .monitor_div .search_div .search_middle_text {
    position: relative;
    bottom: 0.1rem;
    color: #fff;
    font-size: 0.13rem;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
}

.left_box .monitor_div .search_div .search_right_div {
    width: 25%;
    padding-left: 5%;
}

.left_box .monitor_div .search_div .search_right_text {
    position: relative;
    bottom: 0.13rem;
    color: #fff;
    font-size: 0.13rem;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
}

.left_box .monitor_div .search_div .search_right_text font {
    padding-left: 20% !important;
}

.left_box .monitor_back_div {
    width: 83%;
    background: #002e66;
    padding: 0.01rem;
    border-radius: 0.06rem;
    /* margin: 0.08rem 0.15rem; */
    color: #00edea;
    display: flex;
    cursor: pointer;
    height: 0.26rem;
    margin-top: 0.15rem;
    margin-left: 0.15rem;
}

.left_box .monitor_back_div img {
    margin-top: 0.06rem;
    margin-right: 0.1rem;
    margin-left: 0.06rem;
    width: 6%;
    height: 50%;
}

.left_box .monitor_back_title {
    line-height: 0.26rem;
}

.left_box .monitor_detail_div {
    width: 94%;
    height: calc(37% - 0.15rem);
    margin-bottom: 0.2rem;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
}
.left_box .monitor_detail_div .monitor_info_div {
    background: url('../../../static/images/border.png') center center;
    background-size: 100% 100%;
    width: 78%;
    padding: 0.06rem 0.15rem;
    display: flex;
    margin: 0.1rem 0.15rem;
}

.left_box .monitor_detail_div .monitor_left_info {
    width: 65%;
}

.left_box .monitor_detail_div .monitor_right_info {
    width: 35%;
}

.left_box .monitor_detail_div .monitor_right_info .top_text {
    position: relative;
    bottom: 0.1rem;
    color: #fff;
    font-size: 0.13rem;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
}

.left_box .monitor_detail_div .monitor_right_info .top_text font {
    padding-left: 0.1rem;
    line-height: 0.16rem;
}

.left_box .monitor_detail_div .monitor_right_info .bottom_text {
    position: relative;
    bottom: 0.13rem;
    color: #fff;
    font-size: 0.13rem;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
}

.left_box .monitor_detail_div .monitor_right_info .bottom_text font {
    padding-left: 20%;
    line-height: 0.16rem;
}
.left_box .monitor_detail_div .monitor_right_info .thermometer_div {
    margin-top: -18%;
}
.left_box .monitor_detail_div .monitor_item {
    padding: 0.06rem 0;
    color: #fff;
}

.left_box .monitor_detail_div .name_color {
    color: #00edea;
    font-size: 0.16rem;
}
.left_box .monitor_detail_div .title_color {
    color: #00beff;
}

.left_box .monitor_detail_div .monitor_video_div {
    width: 86%;
    padding: 0.06rem 0.15rem;
    margin-bottom: 0.15rem;
}

.left_box .monitor_detail_div .monitor_video_div video {
    height: 100%;
    width: 100%;
}

.left_box .arlarm_color {
    color: #ed2329;
}

.left_box .monitor_div .text_color {
    color: #fff;
}
</style>
