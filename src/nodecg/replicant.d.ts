import { RTATimer, RunnerGroup, TimerGroup, TimerState, Speaker } from 'bundle-template'

export interface ReplicantMap {
  runnerGroupArray: RunnerGroup[]
  currentRunnerGroup: RunnerGroup
  nextRunnerGroup: RunnerGroup
  groupIndex: number
  nextGroupIndex: number
  timerGroup: TimerGroup
  timerState: TimerState
  speaker: Speaker
  timerOpacity: number
}
