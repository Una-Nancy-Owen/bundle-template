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
  if (runnerGroup != null && speaker != null) {
    const title = runnerGroup.title.map((value, index) => <p key={`title${index}`}>{value}</p>)
    const commentator = runnerGroup.commentators.map((data, index) => (
      <p key={`commentator${index}`}>{data.name}</p>
    ))
    return (
      <StWrapper>
        <StFrameContainer>
          <StWideFrame />
          <StWideFrame />
        </StFrameContainer>
        <StCenterContainer>
          <StRunnerInfoLeftAlignGroup>
            <StNameContainer>
              <StSpeaker>{speaker.enabled[0] ? <HiSpeakerWave /> : null}</StSpeaker>
              <p>{runnerGroup.runners[0].name}</p>
            </StNameContainer>
            <StTimerParagraph ref={timerRef.current[0]} />
          </StRunnerInfoLeftAlignGroup>
          <StRunnerInfoRightAlignGroup>
            <StNameContainer>
              <p>{1 < runnerGroup.runners.length ? runnerGroup.runners[1].name : ''}</p>
              <StSpeaker>{speaker.enabled[1] ? <HiSpeakerWave /> : null}</StSpeaker>
            </StNameContainer>
            <StTimerParagraph ref={timerRef.current[1]} />
          </StRunnerInfoRightAlignGroup>
          <StTitleInfoContainer>
            <StTitle>{title}</StTitle>
            <StTitleInfoVerticalGroup>
              <StTitleInfoGroup>
                <p>{runnerGroup.category}</p>
                <p>{runnerGroup.platform}</p>
              </StTitleInfoGroup>
              <StRightAlignVerticalGroup>
                <p>予定タイム</p>
                <p>{runnerGroup.estimatedTime}</p>
              </StRightAlignVerticalGroup>
            </StTitleInfoVerticalGroup>
          </StTitleInfoContainer>
          <StCommentatorContainer>
            <p>{0 < runnerGroup.commentators.length ? '解説' : ''}</p>
            {commentator}
          </StCommentatorContainer>
          <StRunnerInfoLeftAlignGroup>
            <StNameContainer>
              <StSpeaker>{speaker.enabled[2] ? <HiSpeakerWave /> : null}</StSpeaker>
              <p>{2 < runnerGroup.runners.length ? runnerGroup.runners[2].name : ''}</p>
            </StNameContainer>
            <StTimerParagraph ref={timerRef.current[2]} />
          </StRunnerInfoLeftAlignGroup>
          <StRunnerInfoRightAlignGroup>
            <StNameContainer>
              <p>{3 < runnerGroup.runners.length ? runnerGroup.runners[3].name : ''}</p>
              <StSpeaker>{speaker.enabled[3] ? <HiSpeakerWave /> : null}</StSpeaker>
            </StNameContainer>
            <StTimerParagraph ref={timerRef.current[3]} />
          </StRunnerInfoRightAlignGroup>
        </StCenterContainer>
        <StFrameContainer>
          <StWideFrame />
          <StWideFrame />
        </StFrameContainer>
      </StWrapper>
    )
  } else {
    return null
  }
}

export default App

// #region styles

const StWrapper = styled(StHorizontalGroup)`
  width: 1920px;
  height: 1080px;
  background-image: url('polka_dots.jpg');
  mask-image: url('mask_wide_four.png');
  -webkit-mask-image: url('mask_wide_four.png');
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: 0% 0%;
  -webkit-mask-position: 0% 0%;
`

const StFrameContainer = styled(StVerticalGroup)`
  height: 1080px;
  flex-grow: 1;
  justify-content: center;

  & > div:first-child {
    margin: 0px 8px 5px;
  }

  & > div:last-child {
    margin: 5px 8px 0px;
  }
`

const StCenterContainer = styled(StVerticalGroup)`
  width: 352px;
  padding: 100px 0;
  position: relative;
`

const StRunnerInfoVerticalGroup = styled(StVerticalGroup)`
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`

const StRunnerInfoLeftAlignGroup = styled(StRunnerInfoVerticalGroup)`
  align-items: flex-start;

  & > p:first-child {
    text-align: left;
    padding-left: 20px;
  }
`

const StRunnerInfoRightAlignGroup = styled(StRunnerInfoVerticalGroup)`
  align-items: flex-end;
  & > p:first-child {
    text-align: right;
    padding-right: 20px;
  }
`

const StTitleInfoContainer = styled(StVerticalGroup)`
  justify-content: center;
  flex-grow: 1;
  background-color: rgb(32 47 91 / 13%);
  margin: 20px 0px;
  border-radius: 8px;
`

const StSpeaker = styled(StHorizontalGroup)`
  align-items: center;
  margin-bottom: -6px;
  width: 50px;
  & > svg {
    width: 40px;
  }
`

const StTitleInfoVerticalGroup = styled(StVerticalGroup)`
  padding: 0;
  justify-content: space-evenly;
`

const StCommentatorContainer = styled(StHorizontalGroup)`
  align-items: center;
  padding: 40px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  & > p {
    font-size: 2rem;
    font-weight: 900;
  }

  & > p:first-child {
    padding: 0 20px;
  }

  & > p:nth-child(n + 2) {
    padding: 0 10px;
  }
`

const StTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
`

const StTitleInfoGroup = styled(StVerticalGroup)`
  & > p {
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
  }
`

const StNameContainer = styled(StHorizontalGroup)`
  height: 46px;
  font-size: 2rem;
  font-weight: 900;
  text-align: left;

  & > p {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const StTimerParagraph = styled.p`
  width: 270px;
  background-color: rgba(119, 124, 134, 0.69);
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
  font-family: 'Noto Sans Mono', monospace;
`

const StRightAlignVerticalGroup = styled(StVerticalGroup)`
  & > p {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
  }

  & > p:last-child {
    font-family: 'Noto Sans Mono', monospace;
  }
`

// #endregion styles
