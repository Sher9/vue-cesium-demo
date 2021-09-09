<template>
    <div id="progress-bar-cylinder">
        <svg id="cylinder-progress" width="130px" height="80px">
            <g
                class="progress-container"
                :stroke="cylinderBackgroundColorStroke"
                :fill="backgroundColor"
            >
                <rect x="10" y="20" width="36%" height="40" />
                <ellipse cx="33" cy="20" rx="18%" ry="10" class="top" />
                <ellipse cx="33" cy="60" rx="18%" ry="10" class="bottom" />
            </g>
            <g
                class="progress-content"
                :stroke="cylinderColorStroke"
                :fill="cylinderProgressColor"
            >
                <rect x="10" :y="rectY" width="36%" :height="rectHeight" />
                <ellipse cx="33" :cy="topCy" rx="18%" ry="10" class="top" />
                <ellipse cx="33" cy="60" rx="18%" ry="10" class="bottom" />
            </g>
            <!-- <g class="progress-container">
                <ellipse
                    :stroke="cylinderBackgroundColorStroke"
                    cx="75"
                    cy="20"
                    rx="20%"
                    ry="10"
                    class="top"
                    fill="none"
                />
            </g> -->
            <!-- <text
                :style="textStyle"
                :x="horizontalTextAlignP"
                :y="verticalTextAlignP"
            >
                {{ value }}%
            </text> -->
        </svg>
    </div>
</template>

<script>
import { ProgressBarMixin } from './ProgressBarMixin'

export default {
    name: 'ProgressBarCylinder',
    mixins: [ProgressBarMixin],
    props: {
        options: {
            type: Object,
            required: false,
            default: () => {},
        },
        value: {
            type: Number,
            required: false,
            default: 0,
        },
    },
}
</script>

<style lang="css" scoped>
.progress-container {
    stroke-width: 2px;
}

.progress-container .top {
    z-index: 2;
}
.progress-content {
    stroke-width: 2px;
}

.progress-content .top {
    z-index: 1;
}
</style>
