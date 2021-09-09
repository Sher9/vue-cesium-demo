<template>
    <div>
        <div class="map_left_bg"></div>
        <div class="map_top_bg"></div>
        <div class="map_right_bg"></div>
        <div class="map_bottom_bg"></div>
        <leftbox></leftbox>
        <screen-cesium ref="cesium" @showMonitor="showMonitor"></screen-cesium>
        <cesium-tool
            @addBillboards="addBillboards"
            @removeBillboards="removeBillboards"
        ></cesium-tool>
        <el-dialog
            :visible.sync="isShowMonitor"
            :close-on-click-modal="false"
            top="0"
            width="88%"
            :show-close="false"
            :append-to-body="true"
            custom-class="vedio-model"
        >
            <screen-monitor
                ref="monitor"
                :type="type"
                @closeMonitorBox="closeMonitorBox"
            ></screen-monitor>
        </el-dialog>
    </div>
</template>
<script>
import leftbox from './LeftBox'
import cesiumTool from './Layer'
import screenCesium from './Cesium'
import screenMonitor from '../monitor/Index'
export default {
    data() {
        return {
            isShowMonitor: false,
            type: '',
        }
    },
    methods: {
        addBillboards(data) {
            this.$refs.cesium.addBillboards(data)
        },
        removeBillboards(data) {
            this.$refs.cesium.removeBillboards(data)
        },
        showMonitor(data) {
            this.type = data
            this.isShowMonitor = true
        },
        closeMonitorBox() {
            this.isShowMonitor = false
        },
    },
    components: {
        leftbox,
        cesiumTool,
        screenCesium,
        screenMonitor,
    },
}
</script>
<style scoped>
.map_left_bg {
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0;
    width: 28%;
    background: url('../../../static/images/map_left_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}

.map_top_bg {
    position: absolute;
    top: 0.1rem;
    height: 10%;
    left: 0;
    right: 0;
    background: url('../../../static/images/map_top_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}

.map_right_bg {
    position: absolute;
    top: 10%;
    bottom: 10%;
    right: 0;
    width: 20%;
    background: url('../../../static/images/map_right_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}

.map_bottom_bg {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10%;
    background: url('../../../static/images/map_bottom_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}
</style>
