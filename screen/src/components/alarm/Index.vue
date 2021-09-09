<template>
    <div class="main_box">
        <div class="alarm_box">
            <ul class="alert_search_form">
                <li style="width: 30%;">
                    <el-date-picker
                        v-model="params.occurTime"
                        type="datetimerange"
                        style="width: 100%;"
                        range-separator="至"
                        start-placeholder="请选择警情开始日期"
                        end-placeholder="请选择警情结束日期"
                    >
                    </el-date-picker>
                </li>
                <li style="width: 20%;">
                    <el-select
                        style="width: 100%;"
                        placeholder="请选择警情级别"
                        value=""
                        multiple
                        v-model="params.subTypes"
                    >
                        <el-option value="01" label="温度预警"></el-option>
                        <el-option value="02" label="液位预警"></el-option>
                    </el-select>
                </li>
                <li style="width: 20%;">
                    <el-select
                        style="width: 100%;"
                        placeholder="请选择警情级别"
                        value=""
                        multiple
                        v-model="params.caseLevels"
                    >
                        <el-option value="01" label="一级"></el-option>
                        <el-option value="02" label="二级"></el-option>
                        <el-option value="03" label="三级"></el-option>
                        <el-option value="04" label="四级"></el-option>
                        <el-option value="04" label="五级"></el-option>
                    </el-select>
                </li>
                <li style="width: 20%;">
                    <input
                        v-model="params.keywords"
                        placeholder="请输入查询关键字"
                        @keyup.native.enter="query"
                    />
                </li>
                <li @click="query" class="search_btn">
                    <i class="icon_search"></i>搜索
                </li>
            </ul>
            <ul class="alert_search_con">
                <li class="alert_search_title">
                    <p class="dot"></p>
                    <p class="w10 text_center">报警时间</p>
                    <p class="w10 text_center">警情类型</p>
                    <p class="w5 text_center">警情级别</p>
                    <p class="w10 text_center">报警设备名称</p>
                    <p class="w24">警情描述</p>
                    <p class="w15 text_center">处理时间</p>
                </li>
                <li
                    class="alert_search_list"
                    v-for="item in caseList"
                    :key="item.caseID"
                >
                    <p class="dot"></p>
                    <p class="w10 text_center">{{ item.createTime }}</p>
                    <p
                        class="w10 text_center type_1"
                        v-if="item.caseTypeValue === '温度预警'"
                    >
                        {{ item.caseTypeValue }}
                    </p>
                    <p class="w10 text_center type_2" v-else>
                        {{ item.caseTypeValue }}
                    </p>
                    <p
                        class="w5 text_center c_1"
                        v-if="item.caseLevelValue === '一级'"
                    >
                        {{ item.caseLevelValue }}
                    </p>
                    <p
                        class="w5 text_center c_2"
                        v-else-if="item.caseLevelValue === '二级'"
                    >
                        {{ item.caseLevelValue }}
                    </p>
                    <p
                        class="w5 text_center c_3"
                        v-else-if="item.caseLevelValue === '三级'"
                    >
                        {{ item.caseLevelValue }}
                    </p>
                    <p
                        class="w5 text_center c_4"
                        v-else-if="item.caseLevelValue === '四级'"
                    >
                        {{ item.caseLevelValue }}
                    </p>
                    <p class="w5 text_center c_5" v-else>
                        {{ item.caseLevelValue }}
                    </p>
                    <p class="w10 text_center">
                        {{ item.sensorName }}
                    </p>
                    <p class="w24" :title="item.caseDesc">
                        {{ item.caseDesc }}
                    </p>
                    <p class="w15 text_center">{{ item.dealTime }}</p>
                </li>
                <div class="alert_search_page">
                    <el-pagination
                        :page-size="7"
                        :current-page.sync="params.pageNo"
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="totalCount"
                    >
                    </el-pagination>
                </div>
            </ul>
        </div>
        <el-dialog
            :close-on-click-modal="false"
            top="0.4rem"
            width="70%"
            custom-class="ele-modal"
            :visible.sync="showCaseModal"
        >
            <div class="float_close" @click="showCaseModal = false">
                <i class="icon_error"></i>
            </div>
            <detail
                class="alarm-modal"
                v-if="showCaseModal"
                :case-id="curCaseID"
            >
            </detail>
        </el-dialog>
    </div>
</template>
<script>
import detail from './Detail.vue'

export default {
    data() {
        return {
            params: {
                caseSrcs: [],
                occurTime: [],
                subTypes: [],
                caseLevels: [],
                caseStatus: [],
                keywords: '',
                pageNo: 1,
            },
            caseList: [
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '温度预警',
                    caseLevelValue: '一级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '液位预警',
                    caseLevelValue: '一级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '液位预警',
                    caseLevelValue: '二级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '温度预警',
                    caseLevelValue: '五级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '温度预警',
                    caseLevelValue: '一级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '液位预警',
                    caseLevelValue: '四级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '液位预警',
                    caseLevelValue: '三级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
                {
                    createTime: '2015-09-12 09:28:12',
                    caseTypeValue: '温度预警',
                    caseLevelValue: '三级',
                    sensorName: 'WHUN_M005',
                    caseDesc:
                        '昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理',
                    dealTime: '2015-09-13 09:28:12',
                },
            ],
            totalCount: 10,
            showCaseModal: false,
            curCaseID: -1,
            caseTypes: [],
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        getCaseList() {},
        handleCurrentChange() {},
        query() {
            this.params.pageNo = 1
        },
        exportExcel() {},
        viewDetail(caseID) {
            this.curCaseID = caseID
            this.showCaseModal = true
        },
    },
    components: {
        detail,
    },
}
</script>
<style>
.el-scrollbar__wrap {
    background: #0e3278;
    overflow-x: hidden;
    overflow-y: auto;
}
/* 文本框 */
.el-range-editor .el-range-input {
    background: none;
    color: #fff;
}

/*!* 下拉文本框 *!*/
.el-select .el-input__inner {
    color: #fff;
    border-radius: 4px;
    height: 0.32rem !important;
    line-height: 24px;
    background: #0e3278;
    border: 1px solid #004ffe;
}

.el-select-dropdown__item {
    color: #fff;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
    background-color: #004eff;
}

/* 多选下拉选择 */
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    background: #004ffe;
    color: #fff;
}

.el-select .el-tag {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-color: transparent;
    margin: 2px 0 2px 6px;
    background: #004ffe;
    color: #fff;
}

/* 日历插件 */

.el-date-editor .el-range__icon {
    font-size: 14px;
    margin-left: -5px;
    color: #c0c4cc;
    float: left;
    line-height: 24px;
}
.el-picker-panel {
    z-index: 3003 !important;
}

.el-input--small .el-input__inner {
    height: 0.32rem !important;
    line-height: 32px;
    background: none;
    border: 1px solid #004ffe;
}
.el-date-editor .el-range-separator {
    color: #004ffe;
    line-height: 24px;
}

.el-date-editor.el-input {
    width: 100%;
}

.el-picker-panel,
.el-picker-panel__footer,
.el-date-picker,
.el-time-panel {
    background: #0e3278;
    color: #00a8ff;
    border: 1px solid #0084ce;
}

.el-picker-panel__btn {
    color: #20a0ff;
    border: 1px solid #0084ce;
}

.el-year-table td .cell,
.el-month-table td .cell {
    color: #00a8ff;
}

.el-time-panel__btn,
.el-picker-panel__link-btn:hover {
    color: #20a0ff;
}

.el-date-table td.available:hover {
    background-color: #20a0ff;
    color: #fff;
}
/* 时间选择器 */
.el-picker-panel.time-select {
    background: #0e3278;
    border: 1px solid #0084ce;
    color: #fff;
}

.el-range-editor.el-input__inner {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 3px 10px;
    background: #0e3278;
    border: 1px solid #0084ce;
    height: 0.32rem !important;
}

.el-date-range-picker__time-header {
    position: relative;
    border-bottom: 1px solid #0084ce;
    font-size: 12px;
    padding: 8px 5px 5px;
    display: table;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.time-select-item:hover {
    background: #20a0ff;
}

.time-select-item.disabled {
    color: #97a8be;
}

/* 分页插件 */
.el-pagination__jump,
.el-pagination__total {
    color: #00f6ff;
}

.el-pagination .btn-next,
.el-pagination .btn-prev,
.el-pager li {
    background: none;
    border-color: #20a0ff;
    color: #00f6ff;
    color: #fff;
}

.el-pagination__editor.el-input .el-input__inner {
    height: 28px;
    color: #fff;
    background: #004ffe;
    border: 1px solid #0084ce;
}

.el-pagination button:disabled {
    background: none;
    border-color: #20a0ff;
}

.el-pager li.active {
    background: #004ffe;
    color: fff;
}

.el-pagination__editor {
    background: none;
    border-color: #20a0ff;
    color: #00f6ff;
}

.el-pager li.btn-quicknext,
.el-pager li.btn-quickprev {
    line-height: 28px;
    color: #00f6ff;
}
</style>
<style lang="css" scoped>
.c_1 {
    color: #00e480 !important;
}
.c_2 {
    color: #e7ff2a !important;
}
.c_3 {
    color: #ff9c00 !important;
}
.c_4 {
    color: #f64300 !important;
}
.c_5 {
    color: #de0000 !important;
}
.type_1 {
    color: #de2531 !important;
}

.type_2 {
    color: #ffbe41 !important;
}
::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size: 0.13rem;
}

::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c0c4cc;
    font-size: 0.13rem;
}

:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c0c4cc;
    font-size: 0.13rem;
}
.main_box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #011133;
    z-index: -1;
}
.alarm_box {
    width: 100%;
    margin-top: 0.7rem;
}

.alarm-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.2rem;
    background: #00234d;
    border: 1px solid #004eff;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
}

.alarm_box .alert_search_form {
    width: 98%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.15rem;
    padding: 0 1%;
}

.alarm_box .alert_search_form li {
    /*width: 12%;*/
    margin-right: 0.05rem;
}

.alarm_box .alert_search_form li input {
    width: 100%;
    height: 0.32rem;
    border: 1px solid #004eff;
    border-radius: 0.04rem;
    background: #0e3278;
    padding: 0 0.05rem;
    box-sizing: border-box;
    color: #02cadc;
}

.alarm_box .alert_search_form li.search_btn {
    width: 10%;
    line-height: 0.32rem;
    background: #00207c;
    border-radius: 0.04rem;
    cursor: pointer;
    text-align: center;
    height: 0.32rem;
    color: #fff;
    border: 1px solid #004eff;
    cursor: pointer;
}

.alarm_box .alert_search_form li.search_btn i {
    margin-right: 0.1rem;
    cursor: pointer;
}

.alarm_box .alert_search_form li.search_btn:hover {
    background: #007eff;
}

.alarm_box .alert_search_con {
    width: 98%;
    padding: 0 1%;
}

.alarm_box .alert_search_con li.alert_search_title {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    width: 100%;
    background: #003190 !important;
}

.alarm_box .alert_search_con li.alert_search_list {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    width: 100%;
}

.alarm_box .alert_search_con li.alert_search_list {
    cursor: pointer;
}

.alarm_box .alert_search_con li:nth-child(2n) {
    background: #001d46;
}

.alarm_box .alert_search_con li.alert_search_list:hover {
    background: #0b3675;
}

.alarm_box .alert_search_con li.alert_search_list p {
    font-size: 0.13rem;
    color: #fff;
    padding: 0.14rem 0;
}

.alarm_box .alert_search_con .alert_search_title_bg {
    position: absolute;
    width: 98%;
    padding: 0 1%;
    height: 0.36rem;
    opacity: 0.5;
    background: #004eff;
    z-index: -1;
}

.alarm_box .alert_search_con li p {
    text-align: center;
    line-height: 0.2rem;
    padding: 0.08rem 0;
    color: #fff;
    box-sizing: border-box;
}

.alarm_box .alert_search_con li.alert_search_title p.dot {
    width: 0.1rem;
    margin: 0.18rem 0 0 0.1rem;
    padding: 0;
}

.alarm_box .alert_search_con li.alert_search_list p.dot {
    width: 0.1rem;
    height: 0.1rem;
    border: 0.02rem solid #01d7e2;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    margin: 0.18rem 0 0 0.1rem;
    padding: 0;
}

.alarm_box .alert_search_con li p.text_center {
    text-align: center;
}

.alarm_box .alert_search_con li p.w5 {
    width: 5%;
}

.alarm_box .alert_search_con li p.w8 {
    width: 8%;
}

.alarm_box .alert_search_con li p.w10 {
    width: 10%;
}

.alarm_box .alert_search_con li p.w12 {
    width: 12%;
}

.alarm_box .alert_search_con li p.w15 {
    width: 15%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.alarm_box .alert_search_con li p.w24 {
    width: 24%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.alarm_box .alert_search_con .alert_search_page {
    padding: 0.1rem 0;
    line-height: 0.3rem;
    font-size: 0.13rem;
}
.float_close {
    position: absolute;
    right: 0.2rem;
    top: -0.18rem;
    background: url(../../../static/images/float_close.png) no-repeat center
        center;
    width: 0.61rem;
    height: 0.18rem;
    display: block;
    z-index: 2;
    text-align: center;
    line-height: 0.2rem;
    font-size: 0.12rem;
    color: #fff;
    cursor: pointer;
}

.float_close:hover {
    color: #ff6a6b;
}
</style>
