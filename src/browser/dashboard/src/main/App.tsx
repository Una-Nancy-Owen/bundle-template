import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { RunnerGroup, TimerState } from 'bundle-template'
import { TimerControlePanel } from './timer_control_panel'
import { NextRunnerSelector } from './next_runner_selector'
import { StHorizontalGroup, StVerticalGroup } from '@ui/style'
import { RunnerSwitcher } from './runner_switcher'

function App() {
  const [runnerGroupArray, setRunnerGroupArray] = useState<RunnerGroup[]>([])
  const [currentRunnerGroup, setCurrentRunnerGroup] = useState<RunnerGroup>()
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>()
  const [nextRunnerGroup, setNextRunnerGroup] = useState<RunnerGroup>()
  const [nextGroupIndex, setNextGroupIndex] = useState<number>()
  const [timerState, setTimerState] = useState<TimerState>()
  useEffect(() => {
    nodecg.Replicant('runnerGroupArray').on('change', (newValue) => {
      setRunnerGroupArray(newValue)
    })
    nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
      setCurrentRunnerGroup(newValue)
    })
    nodecg.Replicant('groupIndex').on('change', (newValue) => {
      setCurrentGroupIndex(newValue)
    })
    nodecg.Replicant('nextRunnerGroup').on('change', (newValue) => {
      setNextRunnerGroup(newValue)
    })
    nodecg.Replicant('nextGroupIndex').on('change', (newValue) => {
      setNextGroupIndex(newValue)
    })
    nodecg.Replicant('timerState').on('change', (newValue) => {
      setTimerState({ ...newValue })
    })
  }, [])
  if (
    runnerGroupArray !== undefined &&
    currentRunnerGroup !== undefined &&
    currentGroupIndex !== undefined &&
    nextGroupIndex !== undefined &&
    timerState !== undefined
  ) {
    return (
      <StWrapper>
        <StLeftColumn>
          <RunnerSwitcher
            currentRunnerGroup={currentRunnerGroup}
            nextRunnerGroup={nextRunnerGroup}
            nextGroupIndex={nextGroupIndex}
            timerState={timerState}
          />
        </StLeftColumn>
        <StCenterColumn>
          <NextRunnerSelector
            runnerGroupArray={runnerGroupArray}
            currentIndex={currentGroupIndex}
            nextIndex={nextGroupIndex}
          />
        </StCenterColumn>
        <StRightColumn>
          <TimerControlePanel runnerGroup={currentRunnerGroup} timerState={timerState} />
        </StRightColumn>
      </StWrapper>
    )
  } else {
    return <></>
  }
}

export default App

// #region styles

const StWrapper = styled(StHorizontalGroup)`
  width: 100%;
  max-height: 100vh;
`

const StLeftColumn = styled(StVerticalGroup)`
  width: 33%;
  padding: 20px 5px;
`

const StCenterColumn = styled(StVerticalGroup)`
  width: 34%;
  padding: 20px 5px;
`

const StRightColumn = styled(StVerticalGroup)`
  width: 33%;
  padding: 20px 5px;
`

// #endregion styles
