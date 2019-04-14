import { classicBeh } from '../classic-beh'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  methods: {
    onPlay() {
      if (!this.data.playing) {
        // 暂停状态
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        // 播放状态
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    // 恢复状态
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        // 暂停状态，不执行后续操作
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    // 监听总播放器的状态
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  },

  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  }
})
