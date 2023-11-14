import { TimerGroup, Timer, TimerSignal, TimerState } from 'bundle-template'
import { NodeCG } from '../server'

/**
 * タイマーを管理する関数
 * @param nodecg nodecgのインスタンス
 */
export const timerController = (nodecg: NodeCG) => {
  let intervalId: NodeJS.Timeout | null = null
  let timerGroup: TimerGroup = {
    timer: [],
    runningNum: 0,
    showMS: false,
  }
  let timerState: TimerState = {
    startedEveryone: false,
    startedSomeone: false,
    individibleTimer: [],
  }
  let isRunningTimer: boolean = false
  let groupRunnersNum: number = 0
  const DELAY: number = 50
  const MAX_RUNNERS_NUM = 4
  const TIMER_INITIAL_VALUE: Timer = {
    startTime: 0,
    currentTime: 0,
    isRunning: false,
    h: '0',
    m: '00',
    s: '00',
    ms: '000',
  }
  const groupTimerRep = nodecg.Replicant('timerGroup')
  const timerStateRep = nodecg.Replicant('timerState')

  /**
   * 初期化用の関数
   */
  const init = (): void => {
    const initCurrentRunnerGroupRep = nodecg.readReplicant('currentRunnerGroup')
    if (initCurrentRunnerGroupRep !== undefined) {
      groupRunnersNum = initCurrentRunnerGroupRep.runners.length
    }

    const initTimerRep = nodecg.readReplicant('timerGroup')
    if (initTimerRep !== undefined) {
      nodecg.log.info('initTimerRep found')
      timerGroup = initTimerRep
      timerGroup.timer.forEach((timer) => {
        if (timer.isRunning) {
          isRunningTimer = true
          countUp()
          return true
        }
      })
    } else {
      nodecg.log.info('initTimerRep not found')
      for (let i = 0; i < MAX_RUNNERS_NUM; i++) {
        timerGroup.timer.push({ ...TIMER_INITIAL_VALUE })
      }
      groupTimerRep.value = timerGroup
    }
    if (timerStateRep.value !== undefined) {
      timerState = timerStateRep.value
    } else {
      for (let i = 0; i < MAX_RUNNERS_NUM; i++) {
        timerState.individibleTimer.push(false)
      }
      timerStateRep.value = timerState
    }
  }

  /**
   * タイマーの経過時間の時部分を返す関数
   * @param sec タイマーの経過時間（秒）
   * @returns タイマー（時）の文字列
   */
  const getH = (sec: number): string => {
    const h = Math.floor(sec / 3600).toString()
    return h
  }

  /**
   * タイマーの経過時間の分部分を返す関数
   * @param sec タイマーの経過時間（秒）
   * @returns タイマー（分）の文字列
   */
  const getM = (sec: number): string => {
    const m = Math.floor((sec % 3600) / 60)
    const mm = String(m).padStart(2, '0')
    return mm
  }

  /**
   * タイマーの経過時間の秒部分を返す関数
   * @param sec タイマーの経過時間（秒）
   * @returns タイマー（秒）の文字列
   */
  const getS = (sec: number): string => {
    const s = sec % 60
    const ss = String(s).padStart(2, '0')
    return ss
  }

  /**
   * タイマーの経過時間のミリ秒部分を返す関数
   * @param millisec タイマーの経過時間（秒）
   * @returns タイマー（ミリ秒）の文字列
   */
  const getMS = (millisec: number): string => {
    const ms = millisec % 1000
    const ss = String(ms).padStart(3, '0')
    return ss
  }

  /**
   * タイマーの経過時間を計算して更新する関数
   * @param timer 個別のタイマー
   * @returns 計算後のタイマー
   */
  const culcTime = (timer: Timer): Timer => {
    timer.currentTime = Date.now()
    const currentMS = timer.currentTime - timer.startTime
    const currentSec = Math.floor(currentMS / 1000)
    timer.h = getH(currentSec)
    timer.m = getM(currentSec)
    timer.s = getS(currentSec)
    timer.ms = getMS(currentMS)
    return timer
  }

  const countUp = (): void => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        timerGroup.timer.forEach((timer, index) => {
          if (timer.isRunning) {
            timerGroup.timer[index] = culcTime(timer)
          }
        })
        groupTimerRep.value = timerGroup
      }, DELAY)
    }
  }

  /**
   * 個別にタイマーを動作させる関数
   * @param index 走者の配列のインデックス
   */
  const individualStart = (index: number): void => {
    if (index < groupRunnersNum) {
      let timer = timerGroup.timer[index]
      if (!timer.isRunning) {
        timer.isRunning = true
        timerState.individibleTimer[index] = true
        timer.startTime = Date.now()
        timerGroup.runningNum++
        if (timerGroup.runningNum === groupRunnersNum) {
          timerState.startedEveryone = true
          timerState.startedSomeone = true
        } else {
          timerState.startedEveryone = false
          timerState.startedSomeone = true
        }
        timerStateRep.value = timerState
      }
      timerGroup.timer[index] = timer
      if (!isRunningTimer) {
        isRunningTimer = true
        countUp()
      }
    }
  }

  /**
   * タイマー計測を停止させる関数
   */
  const stopGroupTimer = (): void => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    intervalId = null
    isRunningTimer = false
    timerState.startedEveryone = false
    timerState.startedSomeone = false
    timerStateRep.value = timerState
  }

  /**
   * 全員のタイマー計測を開始する関数
   */
  const start = (): void => {
    timerGroup.timer.forEach((_timer, index) => {
      individualStart(index)
    })
  }

  /**
   * 個別のタイマーを停止させる関数
   * @param index 走者の配列のインデックス
   */
  const individualStop = (index: number): void => {
    if (timerGroup.timer[index].isRunning) {
      timerGroup.runningNum--
    }
    let timer = timerGroup.timer[index]
    if (timer.isRunning) {
      timer.isRunning = false
      timerState.individibleTimer[index] = false
      timerGroup.timer[index] = culcTime(timer)
      groupTimerRep.value = timerGroup
      if (timerGroup.runningNum === 0) {
        stopGroupTimer()
      } else {
        timerState.startedEveryone = false
        timerState.startedSomeone = true
        timerStateRep.value = timerState
      }
      timerStateRep.value = timerState
    }
  }

  /**
   * 全員のタイマー計測を停止する関数
   */
  const stop = (): void => {
    timerGroup.timer.forEach((_timer, index) => {
      individualStop(index)
    })
  }

  /**
   * 個別のタイマーをリセットする関数
   * @param index 走者の配列のインデックス
   */
  const individualReset = (index: number): void => {
    if (timerGroup.timer[index].isRunning) {
      timerGroup.runningNum--
    }
    timerGroup.timer[index] = { ...TIMER_INITIAL_VALUE }
    timerState.individibleTimer[index] = false
    groupTimerRep.value = timerGroup
    if (timerGroup.runningNum === 0) {
      stopGroupTimer()
    } else {
      timerState.startedEveryone = false
      timerState.startedSomeone = true
      timerStateRep.value = timerState
    }
    timerStateRep.value = timerState
  }

  /**
   * 全員のタイマーをリセットする関数
   */
  const reset = (): void => {
    timerGroup.timer.forEach((_timer, index) => {
      individualReset(index)
    })
  }

  /**
   * 送られてきた信号によって別のタイマーの処理を行う関数
   * @param signal タイマー用の信号
   */
  const setTimerSignal = (signal: TimerSignal): void => {
    switch (signal.signalType) {
      case 'Start':
        if (signal.all) {
          nodecg.log.info(`start`)
          start()
        } else {
          nodecg.log.info(`individualStart: ${signal.index}`)
          individualStart(signal.index)
        }
        break
      case 'Stop':
        if (signal.all) {
          nodecg.log.info(`stop`)
          stop()
        } else {
          nodecg.log.info(`individualStop: ${signal.index}`)
          individualStop(signal.index)
        }
        break
      case 'Reset':
        if (signal.all) {
          nodecg.log.info(`reset`)
          reset()
        } else {
          nodecg.log.info(`individualReset: ${signal.index}`)
          individualReset(signal.index)
        }
        break
      default:
        break
    }
  }

  nodecg.listenFor('setTimerSignal', (signal) => {
    setTimerSignal(signal)
  })

  nodecg.listenFor('changeMSVisibility', (isVisible) => {
    timerGroup.showMS = isVisible
    groupTimerRep.value = timerGroup
  })

  nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
    if (newValue !== undefined) {
      groupRunnersNum = newValue.runners.length
      reset()
    }
  })

  init()
}
