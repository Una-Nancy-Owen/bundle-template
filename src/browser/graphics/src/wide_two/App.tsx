import { StHorizontalGroup, StVerticalGroup, StWideFrame } from '@ui/style'
import { getTimerStr } from '@util/util'
import { TimerGroup, RunnerGroup, Speaker } from 'bundle-template'
import { RefObject, createRef, useCallback, useEffect, useRef, useState } from 'react'
import { HiSpeakerWave } from 'react-icons/hi2'
import { styled } from 'styled-components'

function App() {
  const [runnerGroup, setRunnerGroup] = useState<RunnerGroup>()
  const [speaker, setSpeaker] = useState<Speaker>()
  const timerRef = useRef<RefObject<HTMLParagraphElement>[]>([
    createRef<HTMLParagraphElement>(),
    createRef<HTMLParagraphElement>(),
  ])
  useEffect(() => {
    nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
      if (newValue != null) {
        setRunnerGroup(newValue)
      }
    })
    nodecg.Replicant('timerGroup').on('change', (newValue) => {
      refreshTimer(newValue)
    })
    nodecg.Replicant('speaker').on('change', (newValue) => {
      if (newValue != null) {
        setSpeaker(newValue)
      }
    })
  }, [])
  useEffect(() => {
    nodecg.readReplicant('timerGroup', (newValue) => {
      refreshTimer(newValue)
    })
  }, [runnerGroup])
  /**
   * タイマー表示を更新する関数
   */
  const refreshTimer = useCallback((timerGroup: TimerGroup) => {
    if (timerGroup != null) {
      timerGroup.timer.forEach((timer, index) => {
        if (timerRef.current![index] != null) {
          if (timerRef.current![index].current != null) {
            const currentTimeStr = getTimerStr(timer, timerGroup.showMS)
            const prevTimeStr: string = timerRef.current![index].current!.innerText
            if (currentTimeStr != prevTimeStr) {
              timerRef.current![index].current!.innerText = currentTimeStr
            }
          }
        }
      })
    }
  }, [])
  if (runnerGroup != null) {
    const title = runnerGroup.title.join('')
    const commentator = runnerGroup.commentators.map((data, index) => (
      <p key={`commentator${index}`}>{data.name}</p>
    ))
    return (
      <StWrapper>
        <StUpperVerticalGroup>
          <StHorizontalGroup>
            <StFrameContainerLeft>
              <StWideFrame />
              <StRunnerInfoContainer>
                <StNameContainer>
                  <StSpeaker>{speaker?.enabled[0] ? <HiSpeakerWave /> : null}</StSpeaker>
                  <p>{runnerGroup.runners[0].name}</p>
                </StNameContainer>
                <StTimerParagraph ref={timerRef.current[0]} />
              </StRunnerInfoContainer>
            </StFrameContainerLeft>
            <StFrameContainerRight>
              <StWideFrame />
              <StRunnerInfoContainer>
                <StNameContainer>
                  <StSpeaker>{speaker?.enabled[1] ? <HiSpeakerWave /> : null}</StSpeaker>
                  <p>{1 < runnerGroup.runners.length ? runnerGroup.runners[1].name : ''}</p>
                </StNameContainer>
                <StTimerParagraph ref={timerRef.current[1]} />
              </StRunnerInfoContainer>
            </StFrameContainerRight>
          </StHorizontalGroup>
          <StCommentatorContainer>
            <p>{0 < runnerGroup.commentators.length ? '解説' : ''}</p>
            {commentator}
          </StCommentatorContainer>
        </StUpperVerticalGroup>

        <StBottomContainer>
          <StTitleParagraph>{title}</StTitleParagraph>
          <StVerticalGroup>
            <StTitleInfoGroup>
              <p>{runnerGroup.category}</p>
              <p>{runnerGroup.platform}</p>
            </StTitleInfoGroup>
          </StVerticalGroup>
          <StRightAlignVerticalGroup>
            <p>予定タイム</p>
            <p>{runnerGroup.estimatedTime}</p>
          </StRightAlignVerticalGroup>
        </StBottomContainer>
      </StWrapper>
    )
  } else {
    return null
  }
}

export default App

// #region styles

const StWrapper = styled(StVerticalGroup)`
  width: 1920px;
  height: 1080px;
  font-size: 2.2rem;
  background-image: url('polka_dots.jpg');
  mask-image: url('mask_wide_two.png');
  -webkit-mask-image: url('mask_wide_two.png');
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: 0% 0%;
  -webkit-mask-position: 0% 0%;
`

const StUpperVerticalGroup = styled(StVerticalGroup)`
  height: 942px;
`

const StFrameContainer = styled(StVerticalGroup)`
  width: 960px;
`

const StFrameContainerLeft = styled(StFrameContainer)`
  & > div:first-child {
    margin: 155px 6px 10px 10px;
  }
`

const StFrameContainerRight = styled(StFrameContainer)`
  & > div:first-child {
    margin: 155px 10px 10px 6px;
  }
`

const StRunnerInfoContainer = styled(StHorizontalGroup)`
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px 60px 50px;
`

const StCommentatorContainer = styled(StHorizontalGroup)`
  height: 122px;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  & > p {
    font-size: 2.2rem;
    font-weight: 900;
  }

  & > p:first-child {
    padding: 0 20px;
  }

  & > p:nth-child(n + 2) {
    padding: 0 10px;
  }
`

const StBottomContainer = styled(StHorizontalGroup)`
  background-color: rgb(32 47 91 / 23%);
  width: 100%;
  height: 138px;
  align-items: center;
  padding: 20px 10px;
`

const StTitleParagraph = styled.p`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  flex-grow: 1;
`

const StTitleInfoGroup = styled(StVerticalGroup)`
  width: 360px;
  padding: 0 10px;
  & > p {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
`

const StSpeaker = styled(StHorizontalGroup)`
  margin-bottom: -4px;
  align-items: center;
  width: 50px;
  & > svg {
    width: 40px;
  }
`

const StNameContainer = styled(StHorizontalGroup)`
  font-weight: 900;
  align-items: center;
  text-align: left;
`

const StTimerParagraph = styled.p`
  width: 320px;
  background-color: rgba(119, 124, 134, 0.692);
  font-weight: 900;
  text-align: center;
  font-family: 'Noto Sans Mono', monospace;
`

const StRightAlignVerticalGroup = styled(StVerticalGroup)`
  margin-left: auto;
  padding: 5px 10px;
  & > p {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  & > p:last-child {
    font-family: 'Noto Sans Mono', monospace;
  }
`

// #endregion styles
