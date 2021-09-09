<template>
    <div>
        <ul class="float_case_list">
            <div class="text_title">
                <span></span>
                <p>历史报警信息详情</p>
            </div>
            <li class="w50">
                <p>案发时间</p>
                <div class="form_div">{{ caseForm.case.createTime }}</div>
            </li>
            <li class="w50">
                <p>案件来源</p>
                <div class="form_div">{{ caseForm.case.caseSrcValue }}</div>
            </li>
            <li class="w50">
                <p>地址描述</p>
                <div class="form_div">{{ caseForm.case.address }}</div>
            </li>
            <li class="w50">
                <p>报警人</p>
                <div class="form_div">{{ caseForm.case.userName }}</div>
            </li>
            <li class="w50">
                <p>处理时间</p>
                <div class="form_div">{{ caseForm.case.dealTime }}</div>
            </li>
            <li class="w50">
                <p>归档时间</p>
                <div class="form_div">{{ caseForm.case.archiveTime }}</div>
            </li>
            <li class="w50">
                <p>报警级别</p>
                <div class="form_div">{{ caseForm.case.caseLevelValue }}</div>
            </li>
            <li class="w50">
                <p>案件类型</p>
                <div class="form_div">{{ caseForm.case.caseTypeValue }}</div>
            </li>
            <li class="w50">
                <p>设备名称</p>
                <div class="form_div">{{ caseForm.case.deviceID }}</div>
            </li>
            <li class="w50">
                <p>案件状态</p>
                <div class="form_div">{{ caseForm.case.caseStatusValue }}</div>
            </li>
            <li class="w50">
                <p>案件描述</p>
                <div class="form_div format" :title="caseForm.case.caseDesc">
                    {{ caseForm.case.caseDesc }}
                </div>
            </li>
            <li class="w50">
                <p>处理意见</p>
                <div class="form_div format" :title="caseForm.case.dealContent">
                    {{ caseForm.case.dealContent }}
                </div>
            </li>
        </ul>
        <!--<div class="float_case_right">
            <div class="float_case_media">
                <media :medias="caseForm.medias" :init-index="1"></media>
            </div>
            <div class="float_case_map">
                <img v-bind:style="{position:'relative',left: caseForm.case.coordX + 'px',top: caseForm.case.coordY + 'px'
                  }" src="/case/static/images/hotspot1.png"/>
            </div>
        </div>-->
    </div>
</template>
<script>
//import {fetchCaseDetail} from '../../api/index';
//import media from '../common/Media.vue';
export default {
    props: {
        caseId: {
            required: true,
        },
    },
    data() {
        return {
            caseForm: {
                case: {},
                medias: [],
            },
        }
    },
    computed: {},
    watch: {},
    created() {
        // fetchCaseDetail(this.caseId).then(res => {
        //     this.caseForm = res.data.result;
        //     this.caseForm.case.createTime = moment(this.caseForm.case.createTime).format('YYYY-MM-DD HH:mm:ss');
        // });
    },
    mounted() {},
    methods: {},
    components: {
        //media
    },
}
</script>
<style lang="css" scoped>
.float_case_list {
    width: 100%;
    text-align: center;
}

.float_case_list li {
    float: left;
    display: flex;
    justify-content: flex-start;
}
.float_case_list .w50 {
    width: 50%;
}
.float_case_list .w100 {
    width: 100%;
}

.float_case_list li p {
    width: 18%;
    line-height: 0.2rem;
    padding: 0.08rem 0;
    color: #fff;
    text-align: right;
    color: #00c6ff;
    padding-right: 0.1rem;
    box-sizing: border-box;
}

.float_case_list li .form_div {
    width: 82%;
    border-bottom: 1px solid #1d4d84;
    box-sizing: border-box;
    color: #fff;
    text-align: left;
    line-height: 0.2rem;
    padding: 0.08rem 0.1rem;
}

.float_case_list li .form_div.format {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.text_title {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    padding: 0.08rem 0 0.1rem 0;
    margin-bottom: 0.1rem;
    position: relative;
}

.text_title span {
    width: 0.14rem;
    height: 0.14rem;
    border: 0.04rem solid #82b4ff;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 0.06rem;
}

.text_title p {
    line-height: 0.14rem;
    font-size: 0.14rem;
    color: #fff;
}
</style>
