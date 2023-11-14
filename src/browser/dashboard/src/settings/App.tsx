import { memo, useCallback, useEffect, useState } from 'react'
import { StHorizontalGroup, SquareButton, StVerticalGroup } from '@ui/style'
import styled from 'styled-components'
import { colBlue } from '../ui/color'
import { RunnerData, RunnerGroup } from 'bundle-template'

function App() {
  const LoadCSVDataHandler = useCallback(() => {
    nodecg.sendMessage('loadCSVData')
  }, [])
  return (
    <>
      <StWrapper>
        <StLeftColumn>
          <SquareButton $color={colBlue} onClick={LoadCSVDataHandler}>
            Load CSV File
          </SquareButton>
          <RunnerGroupArrayConmponent />
        </StLeftColumn>
        <StCenterColumn></StCenterColumn>
        <StRightColumn></StRightColumn>
      </StWrapper>
    </>
  )
}

export default App

export const RunnerGroupArrayConmponent = memo(() => {
  const [runnerGroupArray, setRunnerGroupArray] = useState<RunnerGroup[]>()
  useEffect(() => {
    nodecg.Replicant('runnerGroupArray').on('change', (newValue) => {
      setRunnerGroupArray(newValue)
    })
  }, [])
  if (runnerGroupArray === undefined) {
    return null
  } else {
    const groups = runnerGroupArray.map((data: RunnerGroup, i) => (
      <RunnerGroupComponent key={`RunnerGroupContainer${i.toString()}`} runnerGroup={data} />
    ))
    return (
      <>
        <StRunnerGroupArrayContainer>{groups}</StRunnerGroupArrayContainer>
      </>
    )
  }
})

export const RunnerGroupComponent = memo((props: { runnerGroup: RunnerGroup }) => {
  const runners = props.runnerGroup.runners.map((data: RunnerData, i) => (
    <RunnerDataComponent
      key={`RunnersContainer(${i.toString()})`}
      runnerData={data}
      index={i}
      isCommentator={false}
    />
  ))
  const commentators = props.runnerGroup.commentators.map((data: RunnerData, i) => (
    <RunnerDataComponent
      key={`CommentatorsContainer(${i.toString()})`}
      runnerData={data}
      index={i}
      isCommentator={true}
    />
  ))
  return (
    <StRunnerGroupContainer>
      {runners}
      {commentators}
    </StRunnerGroupContainer>
  )
})

export const RunnerDataComponent = memo(
  (props: { runnerData: RunnerData; index: number; isCommentator: boolean }) => {
    const overlappedContent =
      props.index === 0 && !props.isCommentator ? (
        <StTitleParagraph>
          {props.runnerData.group} : {props.runnerData.title.replace('\\n', '')}
        </StTitleParagraph>
      ) : null
    return (
      <StRunnerDataContainer>
        {overlappedContent}
        <p>{props.runnerData.name}</p>
        <p>{props.runnerData.platform}</p>
        <p>{props.runnerData.category}</p>
        <p>{props.runnerData.estimatedTime}</p>
        <p>{props.runnerData.graphicsType}</p>
      </StRunnerDataContainer>
    )
  }
)

// #region styles

const StWrapper = styled(StHorizontalGroup)`
  width: 100%;
  max-height: 100vh;
`

const StLeftColumn = styled(StVerticalGroup)`
  width: 33%;
  max-width: 600px;
  flex-grow: 1;
  align-items: center;
  padding: 20px 10px;
`

const StCenterColumn = styled(StVerticalGroup)`
  width: 34%;
  flex-grow: 1;
`

const StRightColumn = styled(StVerticalGroup)`
  width: 33%;
  flex-grow: 1;
`

const StRunnerGroupArrayContainer = styled(StVerticalGroup)`
  width: 100%;
  overflow-y: scroll;
  display: block;
  margin-top: 10px;
`

const StRunnerGroupContainer = styled(StVerticalGroup)`
  margin: 12px 4px;
`

const StRunnerDataContainer = styled.div`
  margin: 2px 8px;
  border: none;
  border-radius: 4px;
  padding: 12px;
  background-color: rgb(212 220 225);

  & > p {
    color: rgb(51 51 51);
    border-top: 1px dashed rgb(51 51 51 / 60%);
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > p:first-child {
    border-top: none;
  }
`

const StTitleParagraph = styled.p`
  font-size: 1.15rem;
`

// #endregion styles
