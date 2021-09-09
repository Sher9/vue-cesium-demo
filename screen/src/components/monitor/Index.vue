<template>
    <div>
        <div class="frame_title">视频监控</div>
        <div class="frame_close" @click="closeModel">
            <i class="icon_error"></i>
        </div>
        <div class="main_frame video">
            <!--Tree-------------------------------->
            <div class="left_content">
                <div class="tree_box">
                    <div class="tree_search">
                        <input
                            type="text"
                            placeholder="请输入查询的关键字"
                            v-model="keywords"
                        />
                        <i class="icon_search"></i>
                    </div>
                    <div class="tree_list">
                        <ul>
                            <li
                                v-for="(camera, index) in cameras"
                                :key="camera.cameraID"
                                :class="{ active: cameraIndex === index }"
                            >
                                <div v-if="camera.isParent" class="parent_div">
                                    <font>{{ camera.cameraName }}</font>
                                </div>
                                <div class="child_div" v-else>
                                    <div class="dot"></div>
                                    <font>{{ camera.cameraName }}</font>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="tree_list">
                        <el-tree
                            :highlight-current="true"
                            @node-click="triggerCamera"
                            :props="{ children: 'children', label: 'name' }"
                            ref="cameraTree"
                            :data="cameras"
                            node-key="id"
                            class="el-tree-wrap"
                            icon-class="el-icon-video-camera"
                            :filter-node-method="filterCameras"
                        ></el-tree> 
                    </div> -->
                </div>
            </div>
            <!--视频-------------------------------->
            <div class="video_box">
                <div class="video_div">
                    <video autoplay loop muted>
                        <source
                            src="../../../static/video/show.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                <!-- <div id="video_window" class="video_window"></div> -->
                <!-- <div class="video_nav">
                    <ul class="class_2">
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_screen_one"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_screen_four"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_screen_nine"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_screenshot"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_screen_recording"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_microphone_open"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_sound_open"></i>
                        </li>
                        <li>
                            <div class="background_translucent"></div>
                            <i class="icon_screen_big"></i>
                        </li>
                    </ul>
                </div> -->
                <div class="info_div" v-show="type === 'tank'">
                    <ul class="form_list">
                        <li class="w50">
                            <div class="form_title">
                                <p>时间</p>
                            </div>
                            <div class="form_del">2020-12-23 14:33:53</div>
                        </li>
                        <li class="w50">
                            <div class="form_title">
                                <p>油罐编号</p>
                            </div>
                            <div class="form_del">YG92391202-1</div>
                        </li>
                        <li class="w50">
                            <div class="form_title">
                                <p>警报类型</p>
                            </div>
                            <div class="form_del">温度预警</div>
                        </li>
                        <li class="w50">
                            <div class="form_title">
                                <p>实时液位</p>
                            </div>
                            <div class="form_del">102.71m</div>
                        </li>
                        <li class="w50">
                            <div class="form_title">
                                <p>实时温度</p>
                            </div>
                            <div class="form_del">58℃</div>
                        </li>
                        <li class="w100">
                            <div class="form_title">
                                <p>警情描述</p>
                            </div>
                            <div class="form_del">
                                昨日09:28:12，温度出现过高的情况，请快速安排人员进行处理
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--云台控制-------------------------------->
            <div class="control_box">
                <div class="box_control">
                    <div class="cloud_console">
                        <div class="cloud_control">
                            <ul>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.UPPER_LEFT,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="top_left"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="backgroud_shape_right">
                                        <div class="shape_bg">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                        <div class="shape_border">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(ptzControlConstants.TOP, false)
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="top_middle"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="background_translucent"></div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.UPPER_RIGHT,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="top_right"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="backgroud_shape_right">
                                        <div class="shape_bg">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                        <div class="shape_border">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.LEFT,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="middle_left"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="background_translucent"></div>
                                </li>
                                <li
                                    @click="
                                        optCloud(
                                            ptzControlConstants.AUTO,
                                            false
                                        )
                                    "
                                    class="middle_middle"
                                >
                                    <P>AUTO</P>
                                    <div class="background_translucent"></div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.RIGHT,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="middle_right"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="background_translucent"></div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.DOWN_LEFT,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="bottom_left"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="backgroud_shape_right">
                                        <div class="shape_bg">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                        <div class="shape_border">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.BOTTOM,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="bottom_middle"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="background_translucent"></div>
                                </li>
                                <li
                                    @mousedown="
                                        optCloud(
                                            ptzControlConstants.DOWN_RIGHT,
                                            false
                                        )
                                    "
                                    @mouseup="optCloud(1, true)"
                                    class="bottom_right"
                                >
                                    <i class="icon_arrowtop3"></i>
                                    <div class="backgroud_shape_right">
                                        <div class="shape_bg">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                        <div class="shape_border">
                                            <div class="top_shape"></div>
                                            <div class="bottom_square"></div>
                                            <div class="bottom_triangle"></div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="other_control">
                            <ul>
                                <li>
                                    <span
                                        @mousedown="
                                            optCloud(
                                                ptzControlConstants.DECREASE_ZOOM,
                                                false
                                            )
                                        "
                                        @mouseup="
                                            optCloud(
                                                ptzControlConstants.DECREASE_ZOOM,
                                                true
                                            )
                                        "
                                    >
                                        <i class="icon_linked_delete"></i>
                                    </span>
                                    <p>变倍</p>
                                    <span
                                        @mousedown="
                                            optCloud(
                                                ptzControlConstants.INCREASE_ZOOM,
                                                false
                                            )
                                        "
                                        @mouseup="
                                            optCloud(
                                                ptzControlConstants.INCREASE_ZOOM,
                                                true
                                            )
                                        "
                                    >
                                        <i class="icon_linked_add"></i>
                                    </span>
                                    <div class="background_translucent"></div>
                                </li>
                                <li>
                                    <span
                                        @mousedown="
                                            optCloud(
                                                ptzControlConstants.DECREASE_FOCUS,
                                                false
                                            )
                                        "
                                        @mouseup="
                                            optCloud(
                                                ptzControlConstants.DECREASE_FOCUS,
                                                true
                                            )
                                        "
                                    >
                                        <i class="icon_linked_delete"></i>
                                    </span>
                                    <p>变焦</p>
                                    <span
                                        @mousedown="
                                            optCloud(
                                                ptzControlConstants.INCREASE_FOCUS,
                                                false
                                            )
                                        "
                                        @mouseup="
                                            optCloud(
                                                ptzControlConstants.INCREASE_FOCUS,
                                                true
                                            )
                                        "
                                    >
                                        <i class="icon_linked_add"></i>
                                    </span>
                                    <div class="background_translucent"></div>
                                </li>
                                <li>
                                    <span
                                        @mousedown="
                                            optCloud(
                                                ptzControlConstants.DECREASE_IRIS,
                                                false
                                            )
                                        "
                                        @mouseup="
                                            optCloud(
                                                ptzControlConstants.DECREASE_IRIS,
                                                true
                                            )
                                        "
                                    >
                                        <i class="icon_linked_delete"></i>
                                    </span>
                                    <p>光圈</p>
                                    <span
                                        @mousedown="
                                            optCloud(
                                                ptzControlConstants.INCREASE_IRIS,
                                                false
                                            )
                                        "
                                        @mouseup="
                                            optCloud(
                                                ptzControlConstants.INCREASE_IRIS,
                                                true
                                            )
                                        "
                                    >
                                        <i class="icon_linked_add"></i>
                                    </span>
                                    <div class="background_translucent"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import webVideoUtil from '../../../static/util/webVideoUtil'
//import { fetchCamerasTree } from '../../api/index'
export default {
    props: {
        type: {
            type: String,
        },
    },
    data() {
        return {
            keywords: '',
            cameras: [
                {
                    cameraID: 1,
                    cameraName: '测试设备1',
                    isParent: true,
                },
                {
                    cameraID: 11,
                    cameraName: '测试1',
                    isParent: false,
                },
                {
                    cameraID: 12,
                    cameraName: '测试2',
                    isParent: false,
                },
                {
                    cameraID: 13,
                    cameraName: '测试3',
                    isParent: false,
                },
                {
                    cameraID: 2,
                    cameraName: '测试设备2',
                    isParent: true,
                },
                {
                    cameraID: 21,
                    cameraName: '测试1',
                    isParent: false,
                },
                {
                    cameraID: 22,
                    cameraName: '测试2',
                    isParent: false,
                },
                {
                    cameraID: 3,
                    cameraName: '测试设备2',
                    isParent: true,
                },
                {
                    cameraID: 31,
                    cameraName: '测试1',
                    isParent: false,
                },
            ],
            curNode: null,
            curWindowIndex: 0,
            loginedCamera: [],
        }
    },
    created() {
        this.fetchTreeData()
    },
    watch: {
        keywords(val) {
            this.$refs.cameraTree.filter(val)
        },
    },
    mounted() {
        // webVideoUtil.init(
        //     (xmlDoc) => {
        //         let tempIndex = $(xmlDoc)
        //             .find('SelectWnd')
        //             .eq(0)
        //             .text()
        //         //选中的视频窗口改变后需要清空一些东西
        //         if (tempIndex !== this.curWindowIndex) {
        //             this.clearCameraOpt()
        //         }
        //         this.curWindowIndex = tempIndex
        //     },
        //     1,
        //     'video_window'
        // )
    },
    methods: {
        //获取摄像头列表
        fetchTreeData() {
            // fetchCamerasTree().then((res) => {
            //     this.cameras = res.data.result
            //     if (this.cameras && this.cameras.length > 0) {
            //         if (this.selectedCamera) {
            //             this.$nextTick(() => {
            //                 let selectNode = this.$refs.cameraTree.getNode(
            //                     this.selectedCamera
            //                 )
            //                 if (selectNode) {
            //                     this.curNode = selectNode
            //                     this.$refs.cameraTree.setCurrentKey(
            //                         this.curNode
            //                     )
            //                     this.cameraPrewPlay(selectNode.data)
            //                 }
            //             })
            //         }
            //     }
            // })
        },
        //关闭弹窗
        closeModel() {
            this.curNode = null
            // webVideoUtil.stopAll()
            this.$emit('closeMonitorBox')
        },
        //树节点事件点击回调
        triggerCamera(data, node) {
            if (this.curNode && this.curNode.data.id === data.id) {
                return
            }
            this.curNode = node
            this.cameraPrewPlay(data)
        },
        //预览摄像头
        cameraPrewPlay(data) {
            console.log(data)
            // if (this.loginedCamera.indexOf(data.attribute.ip) > -1) {
            //     webVideoUtil.start(data.attribute.ip)
            // } else {
            //     webVideoUtil.login(data, (cameraIP) => {
            //         let channelPromise = webVideoUtil.getChannels(cameraIP)
            //         channelPromise.then(() => {
            //             this.loginedCamera.push(cameraIP)
            //             webVideoUtil.start(cameraIP)
            //         })
            //     })
            // }
        },
        //树名称过滤
        filterCameras(value, data) {
            if (!value) {
                return true
            }
            return data.name && data.name.indexOf(value) > -1
        },
        //清空摄像头的一些操作
        clearCameraOpt() {
            // this.voiceFlag && (this.voiceFlag = webVideoUtil.closeSound())
            // this.recordFlag &&
            //     (this.recordFlag = webVideoUtil.stopRecordVideo(
            //         this.curWindowIndex
            //     ))
            // this.talkFlag && (this.talkFlag = webVideoUtil.stopVoiceTalk())
        },
        //操作云台
        optCloud(ptz_index, stopFlag) {
            if (!this.curNode) {
                this.$message.warning('请先从左侧选择摄像头')
                return
            }
            console.log(ptz_index)
            console.log(stopFlag)
            //webVideoUtil.ptzControl(ptz_index, stopFlag, 4)
        },
    },
    destroyed() {
        this.loginedCamera = []
    },
}
</script>
<style scoped>
.el-tree-wrap {
    background: none;
    border: 0;
    color: #606266;
}
.el-tree-wrap /deep/ .el-tree-node__expand-icon.is-leaf {
    color: #c0c4cc;
}
.frame_close {
    position: absolute;
    top: -0.16rem;
    right: 0;
    width: 0.3rem;
    height: 0.2rem;
    background: #010e2e;
    text-align: center;
    line-height: 0.2rem;
    font-size: 0.13rem;
    color: #fff;
    display: block;
    z-index: 111;
    cursor: pointer;
    border-top-left-radius: 0.04rem;
    border-top-right-radius: 0.04rem;
}
.frame_title {
    line-height: 0.2rem;
    color: #fe7b00;
    margin-left: 0.2rem;
    position: absolute;
    top: 0;
    z-index: 9;
}

.main_frame {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    background: url('../../../static/images/monitor_bg.png') center center;
    background-size: 100% 100%;
}
.main_frame.video {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem;
    box-sizing: border-box;
    overflow: hidden;
}
.main_frame.video .left_content {
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.main_frame.video .left_content .tree_box {
    margin-top: 0.2rem;
    width: 100%;
    height: 100%;
}
.main_frame.video .left_content .tree_box .tree_search {
    width: 100%;
    position: relative;
}
.main_frame.video .left_content .tree_box .tree_search input {
    width: 100%;
    height: 0.32rem;
    border: 1px solid #004eff;
    border-radius: 0.04rem;
    background: #0e3278;
    padding: 0 0.05rem;
    box-sizing: border-box;
    color: #02cadc;
}
.main_frame.video .left_content .tree_box .tree_search i {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    font-size: 0.16rem;
    color: #3c98d0;
    cursor: pointer;
    z-index: 10;
}
.main_frame.video .left_content .tree_box .tree_list {
    margin-top: 0.1rem;
    height: 100%;
    font-size: 0.13rem;
    overflow: auto;
}

.main_frame.video .left_content .tree_box ul {
    height: 93.5%;
    /* background: #12347c; */
}

.main_frame.video .left_content .tree_box li {
    line-height: 0.24rem;
    color: #fff;
    padding: 0.01rem 0.1rem;
    cursor: pointer;
    display: flex;
}

.main_frame.video .left_content .tree_box li .parent_div {
    background: #002143;
    color: #00539e;
    width: 100%;
    padding-left: 0.1rem;
    font-size: 0.14rem;
}
.main_frame.video .left_content .tree_box li .child_div {
    display: flex;
}

.main_frame.video .left_content .tree_box li:hover,
.main_frame.video .left_content .tree_box li.active {
    background: #008dbf;
}

.main_frame.video .left_content .tree_box li .dot {
    width: 0.01rem;
    height: 0.01rem;
    border-radius: 50%;
    margin-top: 0.1rem;
    margin-right: 0.1rem;
    border: 0.03rem solid #fff;
}
.main_frame.video .video_box {
    width: 62%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 2%;
    overflow-y: auto;
}

.main_frame.video .video_box video {
    height: 90%;
    width: 100%;
}

.main_frame.video .video_box .form_list {
    position: relative;
    float: left;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 0.1rem;
}

.main_frame.video .video_box .form_list .form_del {
    float: left;
    width: 100%;
    line-height: 0.32rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #0046a0;
    padding: 0 0.05rem;
    height: 0.32rem;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.main_frame.video .video_box .form_list > li {
    float: left;
    margin-top: 0.16rem;
    position: relative;
}

.main_frame.video .video_box .form_list .form_title {
    float: left;
    text-align: right;
    display: table;
    height: 0.32rem;
    position: relative;
}

.main_frame.video .video_box .form_list .form_title p {
    vertical-align: middle;
    display: table-cell;
    line-height: 0.14rem;
    width: auto;
    color: #fff;
}

.main_frame.video .video_box .form_list .form_title span {
    position: absolute;
    right: -0.1rem;
    top: 0.12rem;
    color: #ff0000;
}

.main_frame.video .video_box .form_list > li.w50 {
    width: 50%;
}

.main_frame.video .video_box .form_list > li.w50 .form_title {
    width: 30%;
    margin: 0 6% 0 4%;
}

.main_frame.video .video_box .form_list > li.w50 .form_del {
    width: 60%;
}

.main_frame.video .video_box .form_list > li.w50 .form_con {
    width: 60%;
}

.main_frame.video .video_box .form_list > li.w100 {
    width: 100%;
}

.main_frame.video .video_box .form_list > li.w100 .form_title {
    width: 16%;
    margin: 0 3% 0 1%;
}

.main_frame.video .video_box .form_list > li.w100 .form_del {
    width: 80%;
}

.main_frame.video .video_box .video_window {
    width: 100%;
    height: 100%;
    border: 0.03rem solid #bfbfbf;
    box-sizing: border-box;
    background: #d2d2d2;
}
.main_frame.video .video_box .video_nav {
    width: 100%;
    margin-top: 0.15rem;
    display: flex;
    justify-content: center;
}
.main_frame.video .video_box .video_nav ul {
    display: flex;
    justify-content: center;
    margin: 0 0.08rem;
}
.main_frame.video .video_box .video_nav ul.class_2 li {
    color: #fff;
}
.main_frame.video .video_box .video_nav ul.class_2 li:hover {
    background: #fe696b;
}
.main_frame.video .video_box .video_nav li {
    margin: 0 0.02rem;
    width: 0.44rem;
    height: 0.44rem;
    line-height: 0.44rem;
    background: #1a91e4;
    box-sizing: border-box;
    border-radius: 0.04rem;
    cursor: pointer;
    text-align: center;
    font-size: 0.24rem;
    position: relative;
    z-index: 1;
}

.main_frame.video .control_box {
    width: 1.92rem;
    height: 100%;
    margin-top: 2%;
}

.main_frame.video .control_box .tables_title {
    margin-bottom: 0.06rem;
}

.main_frame.video .control_box .tables_title ul {
    display: flex;
    border-top-left-radius: 0.04rem;
    border-top-right-radius: 0.04rem;
    border-left: 1px solid #ff6a6c;
    border-bottom: 1px solid #ff6a6c;
    overflow: hidden;
}

.main_frame.video .control_box .tables_title ul li:hover,
.main_frame.video .control_box .tables_title ul li.active {
    background: #ff6a6c;
    color: #fff;
}

.main_frame.video .control_box .tables_title ul li {
    display: block;
    line-height: 0.26rem;
    text-align: center;
    font-size: 0.13rem;
    width: 33.33%;
    cursor: pointer;
    border-top: 1px solid #ff6a6c;
    border-right: 1px solid #ff6a6c;
}

.main_frame.video .cloud_console {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.main_frame.video .cloud_console .cloud_control {
    width: 100%;
    height: 1.9rem;
    margin-bottom: 0.1rem;
}

.main_frame.video .cloud_console .cloud_control ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.main_frame.video .cloud_console .cloud_control ul li.top_left,
.main_frame.video .cloud_console .cloud_control ul li.top_middle,
.main_frame.video .cloud_console .cloud_control ul li.middle_left,
.main_frame.video .cloud_console .cloud_control ul li.middle_middle,
.main_frame.video .cloud_console .cloud_control ul li.middle_right,
.main_frame.video .cloud_console .cloud_control ul li.bottom_middle {
    background: #12347c;
    border-radius: 0.04rem;
    /* border: 1px solid #1d3fba; */
}

.main_frame.video .cloud_console .cloud_control ul li.top_left {
    background: linear-gradient(135deg, transparent 10px, #12347c 0) top left;
}

.main_frame.video .cloud_console .cloud_control ul li.top_right {
    background: linear-gradient(-135deg, transparent 10px, #12347c 0) top right;
}
.main_frame.video .cloud_console .cloud_control ul li.bottom_left {
    background: linear-gradient(45deg, transparent 10px, #12347c 0) bottom left;
}

.main_frame.video .cloud_console .cloud_control ul li.bottom_right {
    background: linear-gradient(-45deg, transparent 10px, #12347c 0) bottom
        right;
}

.main_frame.video .cloud_console .cloud_control ul li {
    width: 0.62rem;
    height: 0.62rem;
    position: relative;
    box-sizing: border-box;
    margin: 0.01rem;
    cursor: pointer;
}

.main_frame.video .cloud_console .cloud_control ul li.top_left i {
    float: left;
    margin: 0.2rem 0 0 0.2rem;
    transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    -moz-transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
}

.main_frame.video .cloud_console .cloud_control ul li i {
    font-size: 0.2rem;
    width: 0.2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    color: #fff;
    display: block;
}

.main_frame.video
    .cloud_console
    .cloud_control
    ul
    li.top_left
    .backgroud_shape_right {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
}

.main_frame.video .cloud_console .cloud_control ul li.top_middle i {
    float: left;
    margin: 0.1rem 0 0 0.2rem;
}

.main_frame.video .cloud_console .cloud_control ul li.top_right i {
    float: right;
    margin: 0.2rem 0.2rem 0 0;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

.main_frame.video .cloud_console .cloud_control ul li.middle_left i {
    float: left;
    margin: 0.2rem 0 0 0.1rem;
    transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
}

.main_frame.video .cloud_console .cloud_control ul li.middle_right i {
    float: right;
    margin: 0.2rem 0.1rem 0 0;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
}

.main_frame.video .cloud_console .cloud_control ul li.bottom_left i {
    float: left;
    margin: 0.2rem 0 0 0.2rem;
    transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    -moz-transform: rotate(225deg);
    -webkit-transform: rotate(225deg);
}

.main_frame.video .cloud_console .cloud_control ul li.bottom_middle i {
    float: left;
    margin: 0.3rem 0 0 0.2rem;
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
}

.main_frame.video .cloud_console .cloud_control ul li.bottom_right i {
    float: right;
    margin: 0.2rem 0.2rem 0 0;
    transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

.main_frame.video .cloud_console .cloud_control ul li:hover {
    background: #284af7;
    color: #fff;
}

.main_frame.video .cloud_console .cloud_control ul li p {
    color: #fff;
    line-height: 0.62rem;
    text-align: center;
    font-size: 0.2rem;
}

.main_frame.video .cloud_console .other_control {
    width: 100%;
}

.main_frame.video .cloud_console .other_control ul li {
    width: 100%;
    height: 0.24rem;
    line-height: 0.24rem;
    border: 1px solid #1d3fba;
    border-radius: 0.04rem;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.06rem;
    background: #12347c;
}

.main_frame.video .cloud_console .other_control ul li span {
    width: 0.24rem;
    line-height: 0.24rem;
    color: #fff;
    background: #12347c;
    display: block;
    text-align: center;
    font-size: 0.12rem;
    cursor: pointer;
}

.main_frame.video .cloud_console .other_control ul li p {
    width: 1.5rem;
    line-height: 0.22rem;
    color: #fff;
    text-align: center;
}

.main_frame.video .playback_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.main_frame.video .text_title {
    width: 100%;
    line-height: 0.14rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    padding: 0.08rem 0 0.1rem 0;
    position: relative;
}
.main_frame.video .text_title span {
    float: left;
    width: 0.14rem;
    height: 0.14rem;
    border: 0.04rem solid #1a91e4;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 0.06rem;
    display: block;
}
.main_frame.video .playback_box .select_time {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}
.main_frame.video .playback_box .select_time input {
    width: 100%;
    height: 0.3rem;
    border: 1px solid #bfbfbf;
    border-radius: 0.03rem;
    margin-bottom: 0.04rem;
    box-sizing: border-box;
    padding: 0 0.05rem;
    font-size: 0.13rem;
    color: #666;
}
.main_frame.video .playback_box .select_time .btn {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    background: #1a91e4;
    border-radius: 0.03rem;
    margin-bottom: 0.05rem;
    font-size: 0.14rem;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
.main_frame.video .playback_box .select_time .btn i {
    line-height: 0.3rem;
    margin-right: 0.08rem;
}
.main_frame.video .playback_box .search_result {
    border: 1px solid #1a91e4;
    box-sizing: border-box;
    border-radius: 0.04rem;
    overflow: auto;
    padding: 0;
    height: 1.14rem;
}
.main_frame.video .playback_box .search_result ul {
    width: 100%;
}
.main_frame.video .playback_box .search_result ul li {
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
}
.main_frame.video .playback_box .search_result ul li span {
    width: 0.1rem;
    height: 0.1rem;
    border: 2px solid #1a91e4;
    box-sizing: border-box;
    border-radius: 50%;
    margin-top: 0.06rem;
    margin-right: 0.05rem;
    display: block;
}
.main_frame.video .playback_box .search_result ul li p {
    line-height: 0.22rem;
    color: #666;
    font-size: 0.12rem;
}
</style>
