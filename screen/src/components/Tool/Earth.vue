<template>
    <div class="tool_box">
        <!--地图工具条-------------------------------->
        <div class="map_tool">
            <!-- <i class="icon_map_enlarge"></i>
            <span></span>
            <i class="icon_map_narrow"></i>
            <span></span>
            <i
                class="icon_map_layer"
                :class="{ active: layerBox }"
                @click="layerBox = !layerBox"
            ></i>
            <span></span>
            <i class="icon_map_area"></i>
            <span></span>
            <i class="icon_map_distance"></i>
            <span></span>
            <i class="icon_map_roam"></i>
            <span></span> -->
            <i
                class="icon_map_screen"
                :class="{ active: fullScreen }"
                @click="fullScreenClick"
            ></i>
        </div>
        <!--地图图层-------------------------------->
        <div class="map_layer" v-show="layerBox">
            <div class="map_layer_bg"></div>
            <div class="map_layer_close" @click="layerBox = false">
                <i class="icon_error"></i>
            </div>
            <div class="map_layer_title">
                <i class="icon_geography_layer"></i>图层控制
            </div>
            <ul v-for="layer in layerTreeData" :key="layer.id">
                <div
                    :class="{
                        ul_title: layer.children.length === 0,
                        active: activeCode.indexOf(layer.id) > -1,
                    }"
                    @click="layerTreeClick(layer)"
                >
                    <img :src="layer.url" />
                    <font>{{ layer.name }}</font>
                </div>
                <li
                    v-for="child in layer.children"
                    :key="child.id"
                    @click="layerTreeClick(child)"
                    :class="{ active: activeCode.indexOf(child.id) > -1 }"
                >
                    <img :src="child.url" />
                    {{ child.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { fetchLayerTree, fetchDeviceById } from '../../api/index'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            layerBox: false,
            layerTreeData: [],
            activeCode: [],
            activeScreen: false,
        }
    },
    created() {
        this.fetchLayerByUser()
    },
    computed: {
        ...mapState({
            fullScreen: (state) => state.fullScreen,
        }),
    },
    methods: {
        fetchLayerByUser() {
            fetchLayerTree().then((res) => {
                this.layerTreeData = res.data.result
                _.forEach(this.layerTreeData, (item) => {
                    this.$set(
                        item,
                        'url',
                        require(`../../../static/images/layer_${item.icon}.png`)
                    )
                    if (item.children.length > 0) {
                        _.forEach(item.children, (child) => {
                            this.$set(
                                child,
                                'url',
                                require(`../../../static/images/layer_${child.icon}.png`)
                            )
                        })
                    }
                })
            })
        },
        layerTreeClick(layer) {
            let index = this.activeCode.indexOf(layer.id)
            if (index > -1) {
                this.activeCode.splice(index, 1)
                fetchDeviceById({
                    layerId: layer.id,
                }).then((res) => {
                    this.$emit('removeBillboards', layer.icon, res.data.result)
                })
            } else {
                this.activeCode.push(layer.id)
                fetchDeviceById({
                    layerId: layer.id,
                }).then((res) => {
                    if (res.data.result.length > 0) {
                        this.$emit('addBillboards', res.data.result)
                    }
                })
            }
        },
        fullScreenClick() {
            this.activeScreen = !this.activeScreen
            this.$store.commit('updatefullScreen', this.activeScreen)
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
    background: #fff;
    border-radius: 0.04rem;
    z-index: 8;
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
    top: 1rem;
    right: 0.52rem;
    width: 2.6rem;
    border-radius: 0.04rem;
    border: 1px solid #91a69c;
    padding: 0 0 0.1rem 0;
    box-sizing: border-box;
    z-index: 8;
}

.map_layer_bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: -1;
}

.map_layer_title {
    line-height: 0.36rem;
    color: #0155ad;
    background-color: #f5f5f5;
    border-top-left-radius: 0.04rem;
    border-top-right-radius: 0.04rem;
    border-bottom: 1px solid #cfcfcf;
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

.map_layer ul {
    float: left;
    width: 2.4rem;
    padding: 0 0.1rem;
}

.map_layer ul .ul_title {
    cursor: pointer;
}

.map_layer ul .ul_title:hover,
.map_layer ul .ul_title.active {
    background: #d2e2f1;
}

.map_layer ul font {
    width: 100%;
    line-height: 0.34rem;
    font-size: 0.15rem;
    color: #0155ad;
}

.map_layer ul img {
    padding: 0.07rem 0;
    float: left;
    margin-right: 0.05rem;
}

.map_layer ul li {
    width: 100%;
    line-height: 0.28rem;
    margin-bottom: 0.02rem;
    font-size: 0.13rem;
    padding: 0 0.25rem;
    box-sizing: border-box;
    cursor: pointer;
}

.map_layer ul li:hover,
.map_layer ul li.active {
    background: #d2e2f1;
}

.map_layer ul li img {
    padding: 0.04rem 0;
    float: left;
    margin-right: 0.05rem;
}
</style>
