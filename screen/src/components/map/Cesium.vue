<template>
    <div class="map_box_cesium">
        <div id="cesiumContainer" ref="cesiumMap" class="map_box_cesium">
            <!-- <div class="oprate_map_btn">
            <span
                @click="add3DModel"
                @mouseover="btnMouseOver('quickPosition')"
                @mouseout="btnMouseOut('quickPosition')"
                :class="{ active: buildEntityFlag }"
            >
                <i class="icon_subscription_bbs_quarters"></i>
                {{ buildEntityFlag ? '移除模型' : '三维模型' }}
            </span>
            <span @click="add3DTiles" :class="{ active: tilesetFlag }">
                <i class="icon_earth"></i>
                {{ tilesetFlag ? '移除倾斜' : '倾斜模型' }}
            </span>
            <span
                @click="flyTo3DWatch"
                @mouseover="btnMouseOver('flyPath')"
                @mouseout="btnMouseOut('flyPath')"
                :class="{ active: flyEntityFlag }"
            >
                <i class="icon_subscription_service_aid_3"></i>
                {{ flyEntityFlag ? '关闭飞行' : '飞行浏览' }}
            </span>
        </div> -->
            <!-- <div class="detail_box" v-show="detailBoxShow">
            <div class="detail_title">
                <font>{{
                    detailInfo.icon === 'pool' ? '消防水池' : '消防栓'
                }}</font>
                <i class="icon_error" @click="detailBoxShow = false"></i>
            </div>
            <div class="detail_content">
                <ul>
                    <li class="w100">
                        {{ `名称：${detailInfo.name}` }}
                    </li>
                    <li class="w100">
                        {{ `地址：${detailInfo.address}` }}
                    </li>
                </ul>
            </div>
        </div> -->
            <!-- <div
            class="flight_form"
            @mouseover="btnMouseOver('flyPath')"
            @mouseout="btnMouseOut('flyPath')"
            v-show="flyPathBox"
        >
            <div class="fly_list_div">
                <ul>
                    <li
                        v-for="fly in flyPaths"
                        :key="fly.name"
                        :class="{ active: selectedFly === fly.id }"
                        @click="setFlyPath(fly)"
                    >
                        <span><i class="icon_right"></i></span>{{ fly.name }}
                    </li>
                </ul>
            </div>
            <div class="flight_form_bg"></div>
        </div> -->
            <!-- <div
            class="flight_form quick_fly"
            @mouseover="btnMouseOver('quickPosition')"
            @mouseout="btnMouseOut('quickPosition')"
            v-show="quickPositionBox"
        >
            <div class="fly_list_div">
                <ul>
                    <li
                        v-for="quick in quickPosition"
                        :key="quick.name"
                        :class="{ active: selectedPosition === quick.id }"
                        @click="quickFlyToPoint(quick)"
                    >
                        <span><i class="icon_right"></i></span>{{ quick.name }}
                    </li>
                </ul>
            </div>
            <div class="flight_form_bg"></div>
        </div> -->
            <!-- <leftbox></leftbox> -->
        </div>
        <div id="eye"></div>
        <div class="eye_div">
            <!-- <img src="../../../static/images/eye_bg.png" /> -->
        </div>
        <div
            id="tooltip-view"
            class="cesium-popup"
            style="transform: translate3d(364.5px, 338px, 0px);display:none;"
        >
            <a
                class="cesium-popup-close-button cesium-popup-color"
                onclick="document.getElementById('tooltip-view').style.display='none';"
                >×</a
            >
            <div class="cesium-popup-background" style="padding: 1px 0;">
                <div
                    id="tooltip-content"
                    class="cesium-popup-content cesium-popup-color"
                ></div>
            </div>
            <!-- <div class="cesium-popup-tip-container">
                <div class="cesium-popup-tip  cesium-popup-background"></div>
            </div> -->
        </div>
    </div>
</template>
<script type="text/javascript">
//import leftbox from './LeftBox'
//import { getDeviceDetail } from '../../api/index'
import _ from 'lodash'
export default {
    data() {
        return {
            detailBoxShow: false,
            detailInfo: '',
            buildEntityFlag: false,
            flyEntityFlag: false,
            tilesetFlag: false,
            flyPaths: flyWatchConfig,
            quickPosition: quickPositionConfig,
            selectedFly: -1,
            selectedPosition: -1,
            flyPathBox: false,
            quickPositionBox: false,
        }
    },
    created() {
        let _this = this
        window.showDetail = _this.showDetail
    },
    mounted() {
        this.createViewer()
    },
    methods: {
        //初始化视窗Viewer
        createViewer() {
            Cesium.Ion.defaultAccessToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYjU2ZTdmZC1hMDJiLTQ0YmItYTY2YS1kZDgyY2YxNTY1ODUiLCJpZCI6MjExODksInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzkwNzYxMzl9.Ox-ZVao1GYEx7fWW75hex5ejVS0s4Cvcn-gr0gjLOVk'
            window.cesiumEarth = new Cesium.Viewer('cesiumContainer', {
                animation: false,
                shouldAnimate: true,
                fullscreenButton: false,
                homeButton: false,
                infoBox: false,
                timeline: false,
                navigationHelpButton: false,
                baseLayerPicker: false,
                selectionIndicator: false,
                geocoder: false,
                sceneModePicker: false,
                imageryProvider: new Cesium.TileMapServiceImageryProvider({
                    url: Cesium.buildModuleUrl(
                        'Assets/Textures/NaturalEarthII'
                    ),
                }),
            })

            this.loadEyeView()
            this.add3DTiles()
        },
        loadEyeView() {
            window.eye = new Cesium.Viewer('eye', {
                geocoder: false,
                homeButton: false,
                sceneModePicker: false,
                baseLayerPicker: false,
                navigationHelpButton: false,
                animation: false,
                timeline: false,
                fullscreenButton: false,
            })
            //2.设置鹰眼图中球属性
            let control = window.eye.scene.screenSpaceCameraController
            control.enableRotate = false
            control.enableTranslate = false
            control.enableZoom = false
            control.enableTilt = false
            control.enableLook = false
            let syncViewer = function() {
                window.eye.camera.flyTo({
                    destination: window.cesiumEarth.camera.position,
                    orientation: {
                        heading: window.cesiumEarth.camera.heading,
                        pitch: window.cesiumEarth.camera.pitch,
                        roll: window.cesiumEarth.camera.roll,
                    },
                    duration: 0.0,
                })
            }
            window.cesiumEarth.entities.add({
                position: Cesium.Cartesian3.fromDegrees(0, 0),
                label: {
                    text: new Cesium.CallbackProperty(function() {
                        syncViewer()
                        return ''
                    }, true),
                },
            })
        },
        //根据Id移除cesium图片实体
        removeBillboards(data) {
            _.forEach(data, (item) => {
                _.forEach(
                    window.cesiumEarth.dataSources._dataSources,
                    (dataSource) => {
                        dataSource.entities.removeById(
                            `${item.icon}_${item.id}`
                        )
                    }
                )
            })
        },
        //添加倾斜模型3DTiles
        add3DTiles() {
            if (this.tilesetFlag) {
                window.cesiumEarth.scene.primitives.removeAll()
                this.tilesetFlag = false
            } else {
                let layers = window.cesiumEarth.scene.imageryLayers
                layers.addImageryProvider(
                    new Cesium.TileMapServiceImageryProvider({
                        url: '../common/tiles', //url为文件夹地址
                    })
                )
                let tileset = new Cesium.Cesium3DTileset({
                    url: '../common/3DTiles/tileset.json',
                })
                tileset.readyPromise
                    .then((tileset) => {
                        // let scene = window.earth.scene
                        // let globe = scene.globe
                        // globe.translucency.enabled = true
                        //获取到倾斜数据中心点的经纬度坐标（弧度）
                        let cartographic = Cesium.Cartographic.fromCartesian(
                            tileset.boundingSphere.center
                        )
                        //倾斜数据中心点的笛卡尔坐标
                        let surface = Cesium.Cartesian3.fromRadians(
                            cartographic.longitude,
                            cartographic.latitude,
                            0.0
                        )

                        // let positions = [
                        //     Cesium.Cartographic.fromDegrees(
                        //         cartographic.longitude,
                        //         cartographic.latitude
                        //     ),
                        // ]
                        // let promise = Cesium.sampleTerrainMostDetailed(
                        //     terrainProvider,
                        //     positions
                        // ) //其中terrainProvider是当前场景使用的高程Provider
                        // Cesium.when(promise, function(updatedPositions) {
                        //     let terrainHeight = updatedPositions[0].height //高程
                        //     let offset = Cesium.Cartesian3.fromRadians(
                        //         cartographic.longitude,
                        //         cartographic.latitude,
                        //         terrainHeight
                        //     ) //带高程的新笛卡尔坐标
                        //     let translation = Cesium.Cartesian3.subtract(
                        //         offset,
                        //         surface,
                        //         new Cesium.Cartesian3()
                        //     ) //做差得到变换矩阵
                        //     tileset.modelMatrix = Cesium.Matrix4.fromTranslation(
                        //         translation
                        //     )
                        // })

                        let offset = Cesium.Cartesian3.fromRadians(
                            cartographic.longitude,
                            cartographic.latitude,
                            -cartographic.height / 3
                        )
                        let translation = Cesium.Cartesian3.subtract(
                            offset,
                            surface,
                            new Cesium.Cartesian3()
                        )
                        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(
                            translation
                        )
                        window.cesiumEarth.scene.primitives.add(tileset)
                        // this.tilesetFlag = true
                        window.cesiumEarth.zoomTo(
                            tileset,
                            new Cesium.HeadingPitchRange(
                                0.0,
                                -0.8,
                                tileset.boundingSphere.radius
                            )
                        )
                    })
                    .otherwise(function(error) {
                        this.tilesetFlag = false
                        console.log(error)
                    })
            }
        },
        addBillboards(data) {
            this.addFeature(data)
            let mouseClickEntitiesHandler = new Cesium.ScreenSpaceEventHandler(
                window.cesiumEarth.scene.canvas
            )
            mouseClickEntitiesHandler.setInputAction((movement) => {
                let pickMent = window.cesiumEarth.scene.pick(movement.position)
                let cartesian = null
                if (Cesium.defined(pickMent)) {
                    if (pickMent.id && pickMent.id.tooltip) {
                        if (pickMent.id.data.type === 'monitor') {
                            this.$emit('showMonitor', pickMent.id.data)
                        } else {
                            let ray = window.cesiumEarth.scene.camera.getPickRay(
                                movement.position
                            )
                            cartesian = window.cesiumEarth.scene.globe.pick(
                                ray,
                                window.cesiumEarth.scene
                            )
                            $('#tooltip-view').show()
                            $('#tooltip-content').empty()
                            $('#tooltip-content').append(
                                pickMent.id.tooltip.html
                            )
                            let x =
                                movement.position.x -
                                $('#tooltip-view').width() / 2
                            if (
                                movement.position.x >=
                                document.getElementById('cesiumContainer')
                                    .clientWidth -
                                    document.getElementById('tooltip-view')
                                        .clientWidth
                            ) {
                                x =
                                    document.getElementById('cesiumContainer')
                                        .clientWidth -
                                    document.getElementById('tooltip-view')
                                        .clientWidth +
                                    pickMent.id.tooltip.anchor[0]
                            }
                            let y =
                                movement.position.y -
                                $('#tooltip-view').height() +
                                pickMent.id.tooltip.anchor[1]
                            $('#tooltip-view').css(
                                'transform',
                                'translate3d(' + x + 'px, ' + y + 'px, 0)'
                            )
                            window.cesiumEarth.scene.postRender.addEventListener(
                                function() {
                                    var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                                        window.cesiumEarth.scene,
                                        cartesian
                                    )
                                    // If things moved, move the popUp too
                                    if (Cesium.defined(changedC)) {
                                        // $('#tooltip-content').empty()
                                        // $('#tooltip-view').hide()
                                        // var x =
                                        //     changedC.x -
                                        //     $('#tooltip-view').width() / 2 +
                                        //     pickMent.id.tooltip.anchor[0]
                                        // var y =
                                        //     changedC.y -
                                        //     $('#tooltip-view').height() +
                                        //     pickMent.id.tooltip.anchor[1]
                                        // $('#tooltip-view').css(
                                        //     'transform',
                                        //     'translate3d(' +
                                        //         x +
                                        //         'px, ' +
                                        //         y +
                                        //         'px, 0)'
                                        // )
                                    }
                                }
                            )
                        }
                    }
                } else {
                    $('#tooltip-content').empty()
                    $('#tooltip-view').hide()
                    window.cesiumEarth.scene.postRender.removeEventListener()
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
            //绑定地图缩放
            mouseClickEntitiesHandler.setInputAction(function() {
                $('#tooltip-content').empty()
                $('#tooltip-view').hide()
            }, Cesium.ScreenSpaceEventType.WHEEL)
            //绑定地图移动
            mouseClickEntitiesHandler.setInputAction(function() {
                console.log(22)
                $('#tooltip-content').empty()
                $('#tooltip-view').hide()
            }, Cesium.ScreenSpaceEventType.LEFT_UP)
        },

        addFeature(e) {
            let dataSource = new Cesium.CustomDataSource('myData')
            $(e).each(function(e, res) {
                var html =
                    '<table style="width: 200px;"><tr><th scope="col" colspan="4"  style="color:#00FFFF;padding-left:0.1rem;font-size:15px;">' +
                    res.name +
                    '</th></tr> <tr><td style="padding:0.06rem 0.1rem;">储存介质：</td><td >' +
                    res.saveType +
                    '</td></tr><tr><td style="padding:0.06rem 0.1rem;">区域：</td><td >' +
                    res.area +
                    '</td></tr><tr><td colspan="4" style="text-align:right;"><a style="color:aqua;" href="javascript:void(0);" onclick="showDetail(\'' +
                    res.type +
                    '\')">查看监控</a></td></tr></table>'
                dataSource.entities.add(
                    {
                        name: res.name,
                        id: `${res.icon}_${res.id}`,
                        position: Cesium.Cartesian3.fromDegrees(
                            res.lon,
                            res.lat,
                            200
                        ),
                        billboard: {
                            width: 46,
                            height: 46,
                            image: `../common/model/${res.icon}.png`,
                        },
                        data: res,
                        tooltip: { html: html, anchor: [0, -12] },
                    },
                    window.cesiumEarth.dataSources.add(dataSource)
                )
            })
            window.cesiumEarth.flyTo(dataSource.entities, { duration: 3 })
            window.cesiumEarth.dataSources.add(dataSource)
        },
        showMonitor(data) {
            this.$emit('showMonitor', data)
        },
        showDetail(data) {
            this.$emit('showMonitor', data)
        },
    },
    // components: { cesiumTool },
    destroyed() {},
}
</script>
<style lang="css" scoped>
.eye_div {
    position: absolute;
    width: 20%;
    height: 27%;
    bottom: 0.3rem;
    right: 0.52rem;
    z-index: 99;
    background: url('../../../static/images/eye_bg.png') center center;
    background-size: 100% 100%;
}
#eye {
    position: absolute;
    width: 18%;
    height: 24%;
    bottom: 0.4rem;
    right: 0.52rem;
    z-index: 98;
}

.cesium-popup {
    position: absolute;
    left: 1.25rem;
    top: 1.06rem;
    text-align: left;
}

.cesium-popup-background {
    background: url('../../../static/images/popup_bg.png') center center;
    background-size: 100% 100%;
    border-radius: 6px;
}

.cesium-popup-content-wrapper {
    text-align: center;
    max-height: 600px;
    overflow-y: auto;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
    text-align: left;
    border-radius: 3px;
}

.cesium-popup-color {
    color: white;
}

.cesium-popup-content {
    margin: 15px 10px 10px;
    line-height: 1.4;
    font-size: 13px;
    max-width: 439px;
    min-width: 50px;
}

.cesium-popup-tip-container {
    margin: 0 auto;
    width: 40px;
    height: 13px;
    position: relative;
    overflow: hidden;
}

.cesium-popup-tip {
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
    width: 17px;
    height: 17px;
    padding: 1px;
    margin: -10px auto 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.cesium-popup-close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 4px 0 0;
    text-align: center;
    width: 18px;
    height: 14px;
    font: 16px/14px Tahoma, Verdana, sans-serif;
    text-decoration: none;
    font-weight: 700;
    background: transparent;
    z-index: 9999;
}

.cesium-popup-close-button:hover {
    cursor: pointer;
    color: #23527c;
}
.map_box_cesium {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    z-index: -9;
    top: 0.1rem;
}
.oprate_map_btn {
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    z-index: 8;
    display: flex;
    justify-content: center;
}
.oprate_map_btn span {
    padding: 0 0.15rem 0 0.1rem;
    background: #3992ec;
    margin-left: 0.1rem;
    display: block;
    float: left;
    border-radius: 0.05rem;
    cursor: pointer;
    color: #fff;
    font-size: 0.13rem;
    line-height: 0.3rem;
}
.oprate_map_btn span:hover,
.oprate_map_btn span.active {
    background: #08c551;
}
.oprate_map_btn span i {
    float: left;
    margin: 0 0.05rem 0 0;
    line-height: 0.3rem;
    font-size: 0.14rem;
}
.detail_box {
    position: absolute;
    top: 30%;
    left: 0;
    width: 2.3rem;
    height: 1.6rem;
    z-index: 9;
}
.detail_box .detail_title {
    padding: 0 0.1rem;
    height: 0.28rem;
    line-height: 0.28rem;
    background: #013438;
    color: #fff;
    display: flex;
    justify-content: space-between;
}
.detail_box .detail_title i {
    line-height: 0.28rem;
    cursor: pointer;
}
.detail_box .detail_content {
    padding: 0.06rem 0.1rem;
    height: 1.32rem;
    background: #006873;
    color: #fff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
}
.detail_box .detail_content ul {
    width: 100%;
}
.detail_box .detail_content ul li {
    line-height: 0.2rem;
    float: left;
    word-break: break-all;
}
.detail_content .w100 {
    width: 100%;
}
.flight_form {
    position: absolute;
    right: calc(42% - 0.96rem);
    width: 16%;
    height: 1.5rem;
    bottom: 0.8rem;
    z-index: 8;
    padding: 0.1rem;
    box-sizing: border-box;
}
.flight_form:hover {
    display: block;
}
.quick_fly {
    left: calc(42% - 0.96rem);
    right: unset;
}
.flight_form_bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    opacity: 0.6;
    border-radius: 0.04rem;
    z-index: -1;
}
/*-- 通用标题 --*/
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
    border: 0.04rem solid #3992ec;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 0.06rem;
}
.text_title p {
    line-height: 0.14rem;
    font-size: 0.14rem;
    color: #000;
}
.text_title font {
    margin: 0 0.02rem;
}
.text_title .bottom_border {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #3992ec;
}
.fly_list_div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    overflow: auto;
    padding: 0 0.1rem;
    bottom: 0;
}
.fly_list_div ul {
    width: 100%;
}
.fly_list_div ul li {
    float: left;
    width: 98%;
    margin: 0.05rem 1%;
    font-size: 0.16rem;
    font-weight: bold;
    line-height: 0.4rem;
    box-sizing: border-box;
    cursor: pointer;
}
.fly_list_div ul li span {
    float: left;
    width: 0.24rem;
    height: 0.22rem;
    background: #011d70;
    border: 1px solid #004eff;
    border-radius: 0.04rem;
    margin-top: 0.08rem;
    margin-right: 0.1rem;
}
.fly_list_div ul li span i {
    width: 0.24rem;
    height: 0.22rem;
    line-height: 0.22rem;
    text-align: center;
    font-size: 0.2rem;
    display: none;
}
.fly_list_div ul li i {
    float: left;
    margin-right: 0.1rem;
    font-size: 0.16rem;
    line-height: 0.4rem;
}
.fly_list_div ul li.active,
.fly_list_div ul li:hover {
    color: #3992ec;
}
.fly_list_div ul li.active span,
.fly_list_div ul li:hover span {
    background: #3992ec;
    border: 1px solid #3992ec;
}
.fly_list_div ul li.active span i,
.fly_list_div ul li:hover span i {
    display: block;
    color: #fff;
}
</style>
