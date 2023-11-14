import {
  TimerGroup,
  RunnerGroup,
  SignalType,
  Speaker,
  TimerSignal,
  TimerState,
} from 'bundle-template'
import { RefObject, createRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  StHorizontalGroup,
  RoundButton,
  SquareButton,
  StVerticalGroup,
  ToggleLabel,
  ToggleInput,
  ToggleSwitch,
} from '@ui/style'
import { colRed, colOrange, colBlue, colSkyGrey, colTurquoiseBlue } from '@ui/color'
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs'
import { styled } from 'styled-components'

type RunnerTimerInfo = {
  isVisible: boolean
  name: string
}

const RunnerTimerInfoInitValues: RunnerTimerInfo = {
  isVisible: false,
  name: '',
}

/**
 * タイマー、操作するボタンを表示するコンポーネント
 */
export const TimerControlePanel = memo(
  (props: { runnerGroup: RunnerGroup; timerState: TimerState }) => {
    const visibleRef = useRef<RunnerTimerInfo[]>([
      RunnerTimerInfoInitValues,
      RunnerTimerInfoInitValues,
      RunnerTimerInfoInitValues,
      RunnerTimerInfoInitValues,
    ])
    const paragraphRef = useRef<RefObject<HTMLParagraphElement>[]>([
      createRef<HTMLParagraphElement>(),
      createRef<HTMLParagraphElement>(),
      createRef<HTMLParagraphElement>(),
      createRef<HTMLParagraphElement>(),
    ])
    const [speaker, setSpeaker] = useState<Speaker>()
    const [showMS, setShowMS] = useState<boolean>(false)

    useEffect(() => {
      nodecg.readReplicant('timerGroup', (value) => {
        setShowMS(value.showMS)
      })
      nodecg.Replicant('timerGroup').on('change', (newValue) => {
        refreshTimerRefine(newValue)
      })
      nodecg.Replicant('speaker').on('change', (newValue) => {
        setSpeaker(newValue)
      })
    }, [])

    /**
     * タイマー表示を更新する関数
     */
    const refreshTimerRefine = useCallback((timerGroup: TimerGroup) => {
      if (timerGroup != null) {
        timerGroup.timer.forEach((timer, index) => {
          if (paragraphRef.current![index] != null) {
            const currentTimeStr = timerGroup.showMS
              ? `${timer.h}:${timer.m}:${timer.s}.${timer.ms}`
              : `${timer.h}:${timer.m}:${timer.s}`
            const prevTimeStr: string = paragraphRef.current![index].current!.innerText
            if (currentTimeStr != prevTimeStr) {
              paragraphRef.current![index].current!.innerText = currentTimeStr
            }
          }
        })
      }
    }, [])

    /**
     * 全体のタイマーを操作したときにメッセージを送信する関数
     */
    const allSignal = useCallback((signal: SignalType) => {
      const timerSignal: TimerSignal = {
        signalType: signal,
        all: true,
        index: 0,
      }
      nodecg.sendMessage('setTimerSignal', timerSignal)
    }, [])

    const changeSpeaker = useCallback((index: number) => {
      nodecg.sendMessage('setSpeaker', index)
    }, [])

    const changeMSVisibility = useCallback(() => {
      nodecg.sendMessage('changeMSVisibility', !showMS)
      setShowMS(!showMS)
    }, [showMS])

    if (paragraphRef.current != null) {
    }
    for (let i = 0; i < visibleRef.current.length; i++) {
      if (i < props.runnerGroup.runners.length) {
        visibleRef.current[i] = {
          isVisible: true,
          name: props.runnerGroup.runners[i].name,
        }
      } else {
        visibleRef.current[i] = RunnerTimerInfoInitValues
      }
    }
    const individualButtons = visibleRef.current.map((data, i) => (
      <StHideableContainer key={`individualButtons${i.toString()}`} $isVisible={data.isVisible}>
        <IndividualButtonGroup index={i} isDisabled={props.timerState.individibleTimer[i]} />
        <StTimerTextContainer>
          <StCircleButton
            $color={speaker?.enabled[i] ? colTurquoiseBlue : colRed}
            onClick={changeSpeaker.bind(this, i)}>
            {speaker?.enabled[i] ? <BsFillMicFill /> : <BsFillMicMuteFill />}
          </StCircleButton>
          <p>{data.name}</p>
          <StTimerParagraph ref={paragraphRef.current[i]} />
        </StTimerTextContainer>
      </StHideableContainer>
    ))
    return (
      <StVerticalGroup>
        <StHorizontalGroup>
          <RoundButton
            $color={colRed}
            onClick={allSignal.bind(this, 'Start')}
            disabled={props.timerState.startedEveryone}>
            StartAll
          </RoundButton>
          <RoundButton
            $color={colOrange}
            onClick={allSignal.bind(this, 'Stop')}
            disabled={!props.timerState.startedSomeone}>
            StopAll
          </RoundButton>
          <RoundButton $color={colBlue} onClick={allSignal.bind(this, 'Reset')}>
            ResetAll
          </RoundButton>
          <ToggleLabel>
            <span>ミリ秒を表示</span>
            <ToggleInput checked={showMS} type='checkbox' onChange={changeMSVisibility} />
            <ToggleSwitch />
          </ToggleLabel>
        </StHorizontalGroup>
        {individualButtons}
      </StVerticalGroup>
    )
  }
)

/**
 * 走者個別のタイマーを操作するボタンを表示するコンポーネント
 */
export const IndividualButtonGroup = (props: { index: number; isDisabled: boolean }) => {
  /**
   * 走者個別のタイマーのボタンを押したときにメッセージを送信する関数
   */
  const individualSignal = useCallback((signal: SignalType) => {
    const timerSignal: TimerSignal = {
      signalType: signal,
      all: false,
      index: props.index,
    }
    nodecg.sendMessage('setTimerSignal', timerSignal)
  }, [])

  return (
    <StHorizontalGroup>
      <SquareButton
        $color={colRed}
        onClick={individualSignal.bind(this, 'Start')}
        disabled={props.isDisabled}>
        Start
      </SquareButton>
      <SquareButton
        $color={colOrange}
        onClick={individualSignal.bind(this, 'Stop')}
        disabled={!props.isDisabled}>
        Stop
      </SquareButton>
      <SquareButton $color={colBlue} onClick={individualSignal.bind(this, 'Reset')}>
        Reset
      </SquareButton>
    </StHorizontalGroup>
  )
}

// #region styles

const StTimerTextContainer = styled(StHorizontalGroup)`
  align-items: center;
  justify-content: center;

  & > p {
    width: 100%;
    font-size: 1.2rem;
    margin: 4px 10px;
    font-weight: 700;
  }

  & > p:first-of-type {
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const StTimerParagraph = styled.p`
  font-family: 'Noto Sans Mono';
`

const StHideableContainer = styled(StVerticalGroup)<{ $isVisible: boolean }>`
  margin: 5px 20px;
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  background-color: ${colSkyGrey.normal};
  border-radius: 4px;
`

const StCircleButton = styled(RoundButton)`
  min-width: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`

// #endregion styles
