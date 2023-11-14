declare module 'bundle-template' {
  type SignalType = 'Start' | 'Stop' | 'Reset'

  type TimerSignal = {
    signalType: SignalType
    all: boolean
    index: number
  }

  type Timer = {
    startTime: number
    currentTime: number
    isRunning: boolean
    h: string
    m: string
    s: string
    ms: string
  }

  type TimerState = {
    startedEveryone: boolean
    startedSomeone: boolean
    individibleTimer: boolean[]
  }

  type Speaker = {
    enabled: boolean[]
  }

  type TimerGroup = {
    timer: Timer[]
    runningNum: number
    showMS: boolean
  }

  type GraphicsType =
    | 'SquareOne'
    | 'SquareTwo'
    | 'SquareThree'
    | 'SquareFour'
    | 'WideOne'
    | 'WideTwo'
    | 'WideThree'
    | 'WideFour'
    | 'Undefined'

  type RunnerData = {
    group: number
    name: string
    commentator: boolean
    title: string
    platform: string
    category: string
    estimatedTime: string
    graphicsType: GraphicsType
  }

  type RunnerGroup = {
    id: number
    runners: RunnerData[]
    commentators: RunnerData[]
    title: string[]
    platform: string
    category: string
    estimatedTime: string
    graphicsType: GraphicsType
  }
}
