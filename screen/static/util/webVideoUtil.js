/**
 * 封装一些webVideoCtrl的操作方法
 */
import { Message } from 'element-ui'
import _ from 'lodash'
//云台方向控制常量
const ptzControlConstants = {
    TOP: 1,
    BOTTOM: 2,
    LEFT: 3,
    RIGHT: 4,
    UPPER_LEFT: 5,
    DOWN_LEFT: 6,
    UPPER_RIGHT: 7,
    DOWN_RIGHT: 8,
    AUTO: 9,
    INCREASE_ZOOM: 10, //变倍+
    DECREASE_ZOOM: 11, //变倍-
    INCREASE_FOCUS: 12, //变焦+
    DECREASE_FOCUS: 13, //变焦-
    INCREASE_IRIS: 14, //光圈+
    DECREASE_IRIS: 15, //光圈-
}
export default {
    ptzControlConstants,
    channelInfo: [],
    initStatus: false, //初始化状态
    /**
     * 初始化配置
     * @param cbSelWnd 选择窗口的回调
     * @param iWindowType
     * @param el  插入的父节点dom
     */
    init(cbSelWnd, iWindowType, el) {
        let iRet = WebVideoCtrl.I_CheckPluginInstall()
        if (-2 === iRet) {
            Message.warning('您的Chrome浏览器版本过高，不支持NPAPI插件！')
            return
        }
        if (-1 === iRet) {
            Message.warning(
                '您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！'
            )
            return
        }
        // 初始化插件
        WebVideoCtrl.I_InitPlugin('100%', '100%', {
            iWindowType,
            cbSelWnd,
            cbEvent: (eventType, windowIndex) => {
                console.log(eventType + '----' + windowIndex)
            },
        })
        //嵌入播放插件
        iRet = WebVideoCtrl.I_InsertOBJECTPlugin(el)
        if (iRet !== 0) {
            Message.error('嵌入播放插件失败')
        } else {
            this.initStatus = true
        }
    },

    /**
     * 登陆
     */
    login(camera, cb) {
        //只有初始化成功且未登录过才进行登录
        if (this.initStatus) {
            WebVideoCtrl.I_Login(
                camera.attribute.ip,
                1,
                camera.attribute.port,
                camera.attribute.userName,
                camera.attribute.password,
                {
                    success: () => {
                        this.config(camera.attribute.ip)
                        cb && cb(camera.attribute.ip)
                    },
                }
            )
        }
    },
    /**
     * 获取信号通道
     */
    getChannels(ip) {
        return new Promise((resolve, reject) => {
            if (ip) {
                // 模拟通道
                WebVideoCtrl.I_GetAnalogChannelInfo(ip, {
                    async: false,
                    success: (xmlDoc) => {
                        let oChannels = $(xmlDoc).find('VideoInputChannel')
                        _.forEach(oChannels, (item) => {
                            this.channelInfo.push({
                                host: ip,
                                id: $(item)
                                    .find('id')
                                    .eq(0)
                                    .text(),
                                name: $(item)
                                    .find('name')
                                    .eq(0)
                                    .text(),
                            })
                        })
                    },
                    error: () => console.log('获取模拟通道失败'),
                })
                // 数字通道
                WebVideoCtrl.I_GetDigitalChannelInfo(ip, {
                    async: false,
                    success: (xmlDoc) => {
                        let oChannels = $(xmlDoc).find(
                            'InputProxyChannelStatus'
                        )
                        _.forEach(oChannels, (item) => {
                            this.channelInfo.push({
                                host: ip,
                                id: $(item)
                                    .find('id')
                                    .eq(0)
                                    .text(),
                                name: $(item)
                                    .find('name')
                                    .eq(0)
                                    .text(),
                                ip: $(item)
                                    .find('ipAddress')
                                    .eq(0)
                                    .text(),
                                online: $(item)
                                    .find('online')
                                    .eq(0)
                                    .text(),
                            })
                        })
                    },
                    error: () => console.log('获取数字通道失败'),
                })
                // 零通道
                WebVideoCtrl.I_GetZeroChannelInfo(ip, {
                    async: false,
                    success: (xmlDoc) => {
                        let oChannels = $(xmlDoc).find('ZeroVideoChannel')
                        _.forEach(oChannels, (item) => {
                            if (
                                'true' ===
                                $(item)
                                    .find('enabled')
                                    .eq(0)
                                    .text()
                            ) {
                                this.channelInfo.push({
                                    host: ip,
                                    id: $(item)
                                        .find('id')
                                        .eq(0)
                                        .text(),
                                    name: $(item)
                                        .find('name')
                                        .eq(0)
                                        .text(),
                                    bZero: true,
                                })
                            }
                        })
                    },
                    error: () => console.log('获取零通道失败'),
                })
                resolve()
            } else {
                reject()
            }
        })
    },
    /**
     * 开始预览
     */
    start(ip) {
        if (this.initStatus) {
            WebVideoCtrl.I_Stop()
            let channel = _.find(this.channelInfo, { host: ip })
            WebVideoCtrl.I_StartRealPlay(channel.host, {
                iChannelID: channel.id,
                iStreamType: 1,
                bZeroChannel: channel.bZero || false,
            })
        } else {
            Message.warning('请先初始化摄像头插件')
        }
    },
    /**
     * 停止所有预览摄像头
     */
    stopAll() {
        let windows = WebVideoCtrl.I_GetWindowStatus()
        _.forEach(windows, (item) => {
            if (item.iPlayStatus === 1) {
                WebVideoCtrl.I_Stop(item.iIndex)
            }
        })
    },

    /**
     * 操作云台
     * @param iPTZIndex  云台方向
     * @param stopFlag 停止方向标识
     * @param iPTZSpeed 速度
     * @param success 成功回调
     * @param error 失败回调
     */
    ptzControl(iPTZIndex, stopFlag, iPTZSpeed, success, error) {
        WebVideoCtrl.I_PTZControl(iPTZIndex, stopFlag || false, {
            iPTZSpeed,
            success,
            error,
        })
    },
    /**
     * 全屏
     */
    fullScreen() {
        WebVideoCtrl.I_FullScreen(true)
    },
    /**
     * 分割窗口数
     * @param type
     */
    changeWindowNum(type) {
        WebVideoCtrl.I_ChangeWndNum(type)
    },
    /**
     * 截图
     */
    capturePic(ip) {
        console.log(WebVideoCtrl.I_GetLocalCfg())
        let channel = _.find(this.channelInfo, { ip })
        let iRet = WebVideoCtrl.I_CapturePic(
            `${channel.host}_${new Date().getTime()}`
        )
        if (iRet === 0) {
            Message.success('截图成功')
        } else {
            Message.error('截图失败')
        }
    },
    /**
     * 开始录像
     */
    recordVideo(ip) {
        let channel = _.find(this.channelInfo, { ip })
        let iRet = WebVideoCtrl.I_StartRecord(
            `${channel.host}_${new Date().getTime()}`
        )
        if (iRet === 0) {
            Message.success('开始录像，再次点击按钮则停止录像')
        } else {
            Message.error('开启录像失败')
        }
        return iRet === 0
    },
    /**
     * 停止录像
     * @param iWndIndex
     */
    stopRecordVideo(iWndIndex) {
        let iRet = WebVideoCtrl.I_StopRecord(iWndIndex)
        if (iRet === 0) {
            Message.success('已停止录像')
        } else {
            Message.error('停止录像失败')
        }
        return iRet !== 0
    },
    /**
     * 打开声音
     */
    openSound() {
        let allWndInfo = WebVideoCtrl.I_GetWindowStatus()
        _.forEach(allWndInfo, (item) => {
            if (item.bSound) {
                WebVideoCtrl.I_CloseSound(item.iIndex)
            }
        })
        let iRet = WebVideoCtrl.I_OpenSound()
        if (iRet === 0) {
            Message.success('声音打开成功')
        } else {
            Message.error('声音打开失败')
        }
        return iRet === 0
    },
    /**
     * 关闭声音
     */
    closeSound() {
        let iRet = WebVideoCtrl.I_CloseSound()
        if (iRet === 0) {
            Message.success('声音关闭成功')
        } else {
            Message.error('声音关闭失败')
        }
        return iRet !== 0
    },

    /**
     * 开始语音对讲
     */
    startVoiceTalk(ip) {
        return new Promise((resolve, reject) => {
            let channel = _.find(this.channelInfo, { ip })
            WebVideoCtrl.I_GetAudioInfo(channel.host, {
                success: (xmlDoc) => {
                    let oAudioChannels = $(xmlDoc).find('TwoWayAudioChannel')
                    //先默认取第一个通道进行语音对讲，后续再改交互。
                    let audioChannelID = $(oAudioChannels[0])
                        .find('id')
                        .eq(0)
                        .text()
                    let iRet = WebVideoCtrl.I_StartVoiceTalk(
                        channel.host,
                        audioChannelID
                    )
                    if (iRet === 0) {
                        Message.success('语音对讲开启成功')
                        resolve(true)
                    } else {
                        Message.error('语音对讲开启失败')
                        reject('获取对讲通道失败！')
                    }
                },
                error: () => reject('获取对讲通道失败'),
            })
        })
    },
    /**
     * 停止语音对讲
     */
    stopVoiceTalk() {
        let iRet = WebVideoCtrl.I_StopVoiceTalk()
        if (iRet === 0) {
            Message.success('语音对讲关闭成功')
        } else {
            Message.success('语音对讲关闭失败')
        }
        return iRet !== 0
    },
    /**
     *  搜索回放录像
     * @param ip 摄像头绑定的IP地址，用于获取其channelID
     * @param startTime
     * @param endTime
     */
    recordSearch(ip, startTime, endTime) {
        let channel = _.find(this.channelInfo, { ip })
        return new Promise((resolve, reject) => {
            WebVideoCtrl.I_RecordSearch(
                channel.host,
                channel.id,
                moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
                moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
                {
                    success: (xmlDoc) => {
                        let iLength = $(xmlDoc).find('searchMatchItem').length
                        if (iLength > 0) {
                            let result = []
                            for (let i = 0; i < iLength; i++) {
                                let szPlaybackURI = $(xmlDoc)
                                    .find('playbackURI')
                                    .eq(i)
                                    .text()
                                if (szPlaybackURI.indexOf('name=') >= 0) {
                                    $(xmlDoc)
                                        .find('endTime')
                                        .eq(i)
                                        .text()
                                    result.push({
                                        startTime: moment(
                                            $(xmlDoc)
                                                .find('startTime')
                                                .eq(i)
                                                .text()
                                        ).format('YYYY-MM-DD HH:mm:ss'),
                                        endTime: moment(
                                            $(xmlDoc)
                                                .find('endTime')
                                                .eq(i)
                                                .text()
                                        ).format('YYYY-MM-DD HH:mm:ss'),
                                    })
                                }
                            }
                            resolve(result)
                        } else {
                            reject('此摄像头在此时间段无历史录像')
                        }
                    },
                    error: () => reject('历史录像搜索失败'),
                }
            )
        })
    },

    /**
     * 播放回放
     * @param ip 摄像头的IP
     * @param startTime
     * @param endTime
     */
    playHisVideo(ip, startTime, endTime) {
        let channel = _.find(this.channelInfo, { ip })
        WebVideoCtrl.I_Stop()
        WebVideoCtrl.I_StartPlayback(channel.host, {
            iChannelID: channel.id,
            szStartTime: startTime,
            szEndTime: endTime,
        })
    },
    /**
     * 销毁视频播放实例
     */
    destroy() {
        let windows = WebVideoCtrl.I_GetWindowStatus()
        _.forEach(windows, (item) => {
            if (item.iPlayStatus === 1) {
                WebVideoCtrl.I_Stop(item.iIndex)
            }
        })
    },
    //本地配置
    config(ip) {
        let ret = WebVideoCtrl.I_SetLocalCfg(
            '<LocalConfigInfo>' +
                '<PackgeSize>0</PackgeSize>' +
                '<PlayWndType>0</PlayWndType>' +
                '<BuffNumberType>0</BuffNumberType>' +
                '<RecordPath>' +
                'D:\\webVideo\\' +
                ip +
                'record</RecordPath>' +
                '<CapturePath>' +
                'D:\\webVideo\\' +
                ip +
                'capture</CapturePath>' +
                '<PlaybackFilePath>' +
                'D:\\webVideo\\' +
                ip +
                'playback</PlaybackFilePath>' +
                '<PlaybackPicPath>' +
                'D:\\webVideo\\' +
                ip +
                'playback</PlaybackPicPath>' +
                '<DownloadPath>' +
                'D:\\webVideo\\' +
                ip +
                'download</DownloadPath>' +
                '<IVSMode>1</IVSMode>' +
                '<CaptureFileFormat>0</CaptureFileFormat>' +
                '<ProtocolType>0</ProtocolType>' +
                '</LocalConfigInfo>'
        )
        if (ret !== 0) {
            Message.error('摄像头配置读取失败!')
        }
    },
}
