<template>
    <div class="wrap">
        <screen-header></screen-header>
        <div class="button">
            <div
                @click="idCode = 'map'"
                :class="['button_item', { active: idCode === 'map' }]"
            >
                实时监控
            </div>
            <div
                class="button_item"
                @click="idCode = 'alarm'"
                :class="['button_item', { active: idCode === 'alarm' }]"
            >
                报警查询
            </div>
        </div>
        <alarm-info v-show="idCode === 'alarm'"></alarm-info>
        <cesium-map v-show="idCode === 'map'"></cesium-map>
    </div>
</template>
<script>
import screenHeader from './Header'
import cesiumMap from './map/Index'
// import screenMonitor from './common/Monitor'
import alarmInfo from './alarm/Index'
export default {
    data() {
        return {
            idCode: 'map',
        }
    },
    methods: {
        openMonitorBox(cameraId) {
            this.selectedCamera = cameraId
            this.monitorModel = true
            if (this.cameraClickCount > 0) {
                this.$refs.monitor && this.$refs.monitor.fetchTreeData()
            }
            this.cameraClickCount++
        },
        closeMonitorBox() {
            this.monitorModel = false
        },
    },
    components: {
        screenHeader,
        cesiumMap,
        alarmInfo,
    },
}
</script>
<style lang="css" scoped>
.wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 1260px;
    z-index: -9;
}

.button {
    position: absolute;
    right: 0.2rem;
    width: 2.8rem;
    display: flex;
    top: 0.3rem;
}
.button .button_item {
    background: url('../../static/images/button.png') center center;
    background-size: 100% 100%;
    width: 50%;
    height: 0.28rem;
    text-align: center;
    line-height: 0.28rem;
    font-size: 0.14rem;
    color: #fff;
    cursor: pointer;
}

.button .button_item.active,
.button .button_item:hover {
    background: url('../../static/images/button_hover.png') center center;
    background-size: 100% 100%;
}
</style>
