import { TimerSignal } from 'bundle-template'

export interface MessageMap {
  setTimerSignal: { data: TimerSignal }
  setNextRunnerGroupIndex: { data: number }
  setCurrentRunnerGroupIndex: { data: number }
  loadCSVData: {}
  setSpeaker: { data: number }
  changeMSVisibility: { data: boolean }
}
