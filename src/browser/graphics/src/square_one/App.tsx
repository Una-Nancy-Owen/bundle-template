import { StHorizontalGroup, StSquareFrame, StVerticalGroup } from '@ui/style'
import { TimerGroup, RunnerGroup } from 'bundle-template'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getTimerStr } from '@util/util'
import { styled } from 'styled-components'

function App() {
  const [runnerGroup, setRunnerGroup] = useState<RunnerGroup>()
  const timerRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
      if (newValue != null) {
        setRunnerGroup(newValue)
      }
    })
    nodecg.Replicant('timerGroup').on('change', (newValue) => {
      refreshTimer(newValue)
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
      const timer = timerGroup.timer[0]
      if (timerRef != null) {
        if (timerRef.current != null) {
          const currentTimeStr = getTimerStr(timer, timerGroup.showMS)
          const prevTimeStr: string = timerRef.current!.innerText
          if (currentTimeStr != prevTimeStr) {
            timerRef.current!.innerText = currentTimeStr
          }
        }
      }
    }
  }, [])
  if (runnerGroup != null) {
    const title = runnerGroup.title.join('')
    const runnerData = runnerGroup.runners[0]
    const commentator = runnerGroup.commentators.map((data, index) => (
      <p key={`commentator${index}`}>{data.name}</p>
    ))
    return (
      <StWrapper>
        <StUpperHorizontalGroup>
          <StLeftContainer>
            <StNameParagraph>{runnerData.name}</StNameParagraph>
            <StCommentatorContainer>
              <p>{0 < runnerGroup.commentators.length ? '解説' : ''}</p>
              {commentator}
            </StCommentatorContainer>
          </StLeftContainer>
          <StSquareFrame />
        </StUpperHorizontalGroup>
        <StBottomContainer>
          <StTitleParagraph>{title}</StTitleParagraph>
          <StVerticalGroup>
            <StTitleInfoGroup>
              <p>{runnerGroup.category}</p>
              <p>{runnerGroup.platform}</p>
            </StTitleInfoGroup>
          </StVerticalGroup>
          <StTimerParagraph ref={timerRef} />
          <StVerticalGroupRA>
            <p>予定タイム</p>
            <p>{runnerGroup.estimatedTime}</p>
          </StVerticalGroupRA>
        </StBottomContainer>
      </StWrapper>
    )
  } else {
    return null
  }
}

export default App

// #region styles

const StWrapper = styled.div`
  width: 1920px;
  height: 1080px;
  background-image: url('polka_dots.jpg');
  mask-image: url('mask_square_one.png');
  -webkit-mask-image: url('mask_square_one.png');
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: 0% 0%;
  -webkit-mask-position: 0% 0%;
`

const StUpperHorizontalGroup = styled(StHorizontalGroup)`
  height: 942px;
  justify-content: flex-start;
  & > div:last-child {
    width: 1340px;
    margin: 9px 50px;
  }
`

const StLeftContainer = styled(StVerticalGroup)`
  width: 480px;
  padding: 40px 0;
  flex-grow: 1;
  align-items: center;
`

const StBottomContainer = styled(StHorizontalGroup)`
  background-color: rgb(32 47 91 / 23%);
  width: 100%;
  height: 138px;
  align-items: center;
  padding: 0px 10px;
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

const StNameParagraph = styled.p`
  font-size: 2.2rem;
  font-weight: 900;
  text-align: center;
`

const StCommentatorContainer = styled(StHorizontalGroup)`
  font-size: 2.2rem;
  font-weight: 900;

  & > p:first-child {
    padding: 0 20px;
  }
`

const StTimerParagraph = styled.p`
  width: 320px;
  background-color: rgba(119, 124, 134, 0.692);
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  font-family: 'Noto Sans Mono', monospace;
`

const StVerticalGroupRA = styled(StVerticalGroup)`
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
