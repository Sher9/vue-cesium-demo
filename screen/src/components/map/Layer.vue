<template>
    <div class="tool_box">
        <div class="map_layer">
            <!-- <div class="map_layer_bg"></div> -->
            <!-- <div class="map_layer_close" @click="layerBox = false">
                <i class="icon_error"></i>
            </div> -->
            <div class="layer_right_img">
                <img
                    class="loading-animation"
                    src="../../../static/images/layer.png"
                />
            </div>
            <div class="layer_right_inner_img">
                <img src="../../../static/images/layer_inner.png" />
            </div>
            <div class="map_layer_title">
                图层控制
            </div>
            <div class="layer_item" v-show="layerBox">
                <ul v-for="layer in layerTreeData" :key="layer.id">
                    <div
                        :class="{
                            ul_title: layer.children.length === 0,
                            active: activeCode.indexOf(layer.id) > -1,
                        }"
                        class="parent"
                        @click="layerTreeClick(layer)"
                    >
                        <div class="icon">
                            <img
                                :src="
                                    require('../../../static/images/' +
                                        layer.url)
                                "
                            />
                        </div>
                        <font>{{ layer.name }}</font>
                    </div>
                    <li
                        v-for="child in layer.children"
                        :key="child.id"
                        @click="layerTreeClick(child)"
                        :class="{ active: activeCode.indexOf(child.id) > -1 }"
                    >
                        <div class="child_icon">
                            <img
                                :src="
                                    require('../../../static/images/' +
                                        child.url)
                                "
                            />
                        </div>
                        <div class="child_title">
                            <font>{{ child.name }}</font>
                        </div>
                        <div class="child_selected">
                            <img
                                v-show="activeCode.indexOf(child.id) > -1"
                                src="../../../static/images/selected.png"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            layerBox: true,
            layerTreeData: [
                {
                    id: 1,
                    name: '消防设施',
                    url: 'layer_facility.png',
                    children: [
                        {
                            id: 11,
                            name: '消防栓',
                            url: 'layer_hydrant.png',
                        },
                        {
                            id: 12,
                            name: '消防池',
                            url: 'layer_pool.png',
                        },
                    ],
                },
                {
                    id: 2,
                    name: '应急切断阀',
                    url: 'layer_shutoff.png',
                    children: [],
                },
                {
                    id: 3,
                    name: '防爆电话',
                    url: 'layer_mobile.png',
                    children: [],
                },
                {
                    id: 4,
                    name: '紧急按钮',
                    url: 'layer_button.png',
                    children: [],
                },
                {
                    id: 5,
                    name: '岗楼',
                    url: 'layer_build.png',
                    children: [],
                },
                {
                    id: 6,
                    name: '视频监控',
                    url: 'layer_monitor.png',
                    children: [
                        {
                            id: 61,
                            name: '球机',
                            url: 'layer_camera2.png',
                            data: [
                                {
                                    id: 100,
                                    icon: 'monitor_icon',
                                    lon: 114.025,
                                    lat: 31.678,
                                    type: 'monitor',
                                },
                            ],
                        },
                        {
                            id: 62,
                            name: '枪机',
                            url: 'layer_camera1.png',
                        },
                    ],
                },
                {
                    id: 7,
                    name: '罐体',
                    url: 'layer_tank.png',
                    children: [
                        {
                            id: 71,
                            name: '立罐',
                            url: 'layer_vtank.png',
                            data: [
                                {
                                    id: 171,
                                    icon: 'layer_tank',
                                    lon: 114.020406133,
                                    lat: 31.67864832,
                                    type: 'tank',
                                    name: '1# 作业罐【立罐】',
                                    saveType: '燃油',
                                    area: '作业区',
                                },
                                {
                                    id: 172,
                                    icon: 'layer_tank',
                                    lon: 114.022997366,
                                    lat: 31.680361532,
                                    type: 'tank',
                                    name: '8# 作业罐【立罐】',
                                    saveType: '燃油',
                                    area: '作业区',
                                },
                                {
                                    id: 173,
                                    icon: 'layer_tank',
                                    lon: 114.022469125,
                                    lat: 31.67864832,
                                    type: 'tank',
                                    name: '27# 作业罐【立罐】',
                                    saveType: '燃油',
                                    area: '作业区',
                                },
                            ],
                        },
                        {
                            id: 72,
                            name: '卧罐',
                            url: 'layer_htank.png',
                            data: [
                                {
                                    id: 174,
                                    icon: 'layer_tank',
                                    lon: 114.025,
                                    lat: 31.678,
                                    type: 'tank',
                                },
                            ],
                        },
                    ],
                },
            ],
            activeCode: [],
        }
    },
    created() {},
    computed: {},
    methods: {
        layerTreeClick(layer) {
            let index = this.activeCode.indexOf(layer.id)
            if (index > -1) {
                this.activeCode.splice(index, 1)
                this.$emit('removeBillboards', layer.data)
            } else {
                this.activeCode.push(layer.id)
                this.$emit('addBillboards', layer.data)
            }
        },
    },
    components: {},
}
</script>
<style lang="css" scoped>
.tool_box {
    z-index: 8;
}
/*--地图工具-------------------------*/
.map_tool {
    position: absolute;
    top: 1rem;
    right: 0.1rem;
    width: 0.32rem;
    background: url('../../../static/images/layer_bg.png') center center;
    background-size: 100% 100%;
    border-radius: 0.04rem;
    z-index: 8;
    border: 1px solid #b9b9b9;
}

.map_tool i {
    width: 0.32rem;
    height: 0.32rem;
    display: block;
    line-height: 0.36rem;
    font-size: 0.14rem;
    color: #007eff;
    text-align: center;
    cursor: pointer;
}

.map_tool i:hover,
.map_tool i.active {
    background: #007eff;
    color: #fff;
}

.map_tool span {
    width: 0.32rem;
    height: 1px;
    background: #b9b9b9;
    display: block;
}
/*--地图图层-------------------------*/
.map_layer {
    position: absolute;
    top: 1.1rem;
    right: 0.52rem;
    width: 2rem;
    border-radius: 0.04rem;
    padding: 0 0 0.1rem 0;
    box-sizing: border-box;
    z-index: 8;
    background: url('../../../static/images/layer_bg.png') center center;
    background-size: 100% 100%;
    height: 50%;
}

.map_layer .layer_right_img {
    position: absolute;
    right: -0.18rem;
    top: -0.5rem;
}

.map_layer .layer_right_img .loading-animation {
    animation: loading 0.75s linear infinite forwards;
}

.map_layer .layer_right_inner_img {
    right: 0.06rem;
    position: absolute;
    top: -0.27rem;
}

.map_layer_bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #00264a;
    z-index: -1;
}

.map_layer_title {
    line-height: 0.2rem;
    color: #fe7b00;
    margin-left: 0.2rem;
}

.map_layer_title i {
    float: left;
    margin-right: 0.1rem;
    line-height: 0.4rem;
    font-size: 0.18rem;
    margin-left: 0.1rem;
}

.map_layer_close {
    position: absolute;
    right: 0rem;
    top: 0.09rem;
    width: 0.3rem;
    height: 0.18rem;
    display: block;
    z-index: 2;
    text-align: center;
    line-height: 0.2rem;
    font-size: 0.16rem;
    color: #989898;
    cursor: pointer;
}

.map_layer_close:hover {
    color: #0155ad;
}

.map_layer .layer_item {
    height: 88%;
    overflow-y: auto;
    overflow-x: hidden;
    width: 98%;
    padding: 5% 0;
}

.map_layer .parent {
    display: flex;
    color: #00dac5;
    background: #002248;
}

.map_layer .parent font {
    width: 100%;
    line-height: 0.32rem;
    font-size: 0.15rem;
    margin-left: 0.06rem;
}
.map_layer .parent .icon {
    width: 0.28rem;
    height: 0.26rem;
    border-radius: 50%;
    background: #000a2b;
    line-height: 0.26rem;
    text-align: center;
    /* margin: 0 auto; */
    margin-top: 0.04rem;
    margin-left: 0.04rem;
}

.map_layer .parent .icon img {
    vertical-align: middle;
}

.map_layer ul {
    float: left;
    width: 2.4rem;
    padding: 0.01rem 0.1rem;
}

.map_layer ul .ul_title {
    cursor: pointer;
}

.map_layer ul .ul_title:hover,
.map_layer ul .ul_title.active {
    background: #0042a4;
}

.map_layer ul font {
    width: 100%;
    line-height: 0.26rem;
    font-size: 0.15rem;
}

/* .map_layer ul img {
    padding: 0.07rem 0;
    float: left;
    margin-right: 0.05rem;
} */

.map_layer ul li {
    width: 100%;
    line-height: 0.28rem;
    margin: 0.01rem 0;
    font-size: 0.13rem;
    padding: 0 0.25rem;
    box-sizing: border-box;
    cursor: pointer;
    color: #fff;
    display: flex;
    background: #222b46;
}

.map_layer ul li:hover,
.map_layer ul li.active {
    background: #0042a4;
}

.map_layer ul li .child_icon {
    margin-right: 0.08rem;
    margin-top: 0.03rem;
    width: 0.16rem;
    height: 0.16rem;
}

.map_layer ul li .child_icon img {
    width: 100%;
    height: 100%;
}

.map_layer ul li .child_selected {
    margin-left: 0.7rem;
    width: 0.2rem;
    height: 0.16rem;
    padding: 0.07rem 0px 0px;
}

.map_layer ul li .child_selected img {
    width: 80%;
    height: 80%;
    margin-bottom: 0.2rem;
}

/* .map_layer ul li img {
    padding: 0.04rem 0;
    float: left;
    margin-right: 0.05rem;
} */
</style>
