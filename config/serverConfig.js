//网关部署的项目名  默认 是/
var backEndContextPath = '/'

//Api基础路径
var backEndBaseAPI = 'http://192.168.6.193:9001' + backEndContextPath

var gisConfig = {
    mapConfig: {
        wkid: '3857',
        initCenter: [114.026456, 31.676821],
        initZoom: 0,
    },
    serverUrl: 'http://192.168.6.34:8083/3.19',
    layerConfig: {
        tileUrl:
            'http://192.168.6.113:6080/arcgis/rest/services/oil/oilTile2/MapServer',
    },
}
//飞行浏览配置
var flyWatchConfig = [
    {
        name: '储油区-作业区',
        id: 1,
        path: [
            {
                longitude: 114.02,
                dimension: 31.681,
                height: 150,
                time: 0,
            },
            {
                longitude: 114.023,
                dimension: 31.679,
                height: 150,
                time: 40,
            },
            {
                longitude: 114.025,
                dimension: 31.678,
                height: 150,
                time: 80,
            },
            {
                longitude: 114.027,
                dimension: 31.676,
                height: 150,
                time: 120,
            },
            {
                longitude: 114.028,
                dimension: 31.674,
                height: 150,
                time: 160,
            },
            {
                longitude: 114.029,
                dimension: 31.672,
                height: 150,
                time: 200,
            },
            {
                longitude: 114.03,
                dimension: 31.67,
                height: 150,
                time: 240,
            },
            {
                longitude: 114.029,
                dimension: 31.669,
                height: 150,
                time: 280,
            },
            {
                longitude: 114.027,
                dimension: 31.67,
                height: 150,
                time: 360,
            },
        ],
        speed: 3,
    },
    {
        name: '储油区-行政区',
        id: 2,
        path: [
            {
                longitude: 114.020406133,
                dimension: 31.67864832,
                height: 150,
                time: 0,
            },
            {
                longitude: 114.022469125,
                dimension: 31.67864832,
                height: 150,
                time: 40,
            },
            {
                longitude: 114.022997366,
                dimension: 31.680361532,
                height: 150,
                time: 80,
            },
            {
                longitude: 114.024160922,
                dimension: 31.681510812,
                height: 250,
                time: 120,
            },
            {
                longitude: 114.025724228,
                dimension: 31.680090274,
                height: 250,
                time: 160,
            },
            {
                longitude: 114.024953283,
                dimension: 31.678234294,
                height: 250,
                time: 200,
            },
            {
                longitude: 114.027323226,
                dimension: 31.676578189,
                height: 200,
                time: 240,
            },
            {
                longitude: 114.0277896,
                dimension: 31.674607995,
                height: 200,
                time: 280,
            },
            {
                longitude: 114.028750902,
                dimension: 31.67264732,
                height: 180,
                time: 320,
            },
            {
                longitude: 114.029854972,
                dimension: 31.67162891,
                height: 150,
                time: 360,
            },
            {
                longitude: 114.030597364,
                dimension: 31.670781822,
                height: 150,
                time: 400,
            },
            {
                longitude: 114.029607508,
                dimension: 31.671076875,
                height: 150,
                time: 440,
            },
        ],
        speed: 3,
    },
    {
        name: '储油区环绕',
        id: 3,
        path: [
            {
                longitude: 114.019918343,
                dimension: 31.678291401,
                height: 150,
                time: 0,
            },
            {
                longitude: 114.02205034,
                dimension: 31.677215885,
                height: 150,
                time: 40,
            },
            {
                longitude: 114.024429801,
                dimension: 31.676578189,
                height: 150,
                time: 80,
            },
            {
                longitude: 114.025905067,
                dimension: 31.67825333,
                height: 250,
                time: 120,
            },
            {
                longitude: 114.026209638,
                dimension: 31.68006172,
                height: 250,
                time: 160,
            },
            {
                longitude: 114.025181711,
                dimension: 31.681413254,
                height: 250,
                time: 200,
            },
            {
                longitude: 114.022954535,
                dimension: 31.681470361,
                height: 250,
                time: 240,
            },
            {
                longitude: 114.020632181,
                dimension: 31.681536986,
                height: 220,
                time: 280,
            },
            {
                longitude: 114.019480522,
                dimension: 31.680090274,
                height: 180,
                time: 320,
            },
            {
                longitude: 114.019299683,
                dimension: 31.678291401,
                height: 150,
                time: 360,
            },
        ],
        speed: 3,
    },
]
//快速跳转
var quickPositionConfig = [
    {
        name: '储油区西大门',
        id: 1,
        coordinates: [114.028722349, 31.672894784],
    },
    {
        name: '办公楼',
        id: 2,
        coordinates: [114.030226168, 31.670915072],
    },
    {
        name: '作业区',
        id: 3,
        coordinates: [114.027941886, 31.669030539],
    },
]
