import { ColorStyle, colRed, colBlue, colRoseRed } from '@ui/color'
import { SquareButton, StHorizontalGroup, StVerticalGroup } from '@ui/style'
import { RunnerGroup, TimerState } from 'bundle-template'
import { memo, useCallback } from 'react'
import { BiRun, BiSolidMicrophone } from 'react-icons/bi'
import { styled } from 'styled-components'

export const RunnerSwitcher = memo(
  (props: {
    currentRunnerGroup: RunnerGroup
    nextRunnerGroup: RunnerGroup | undefined
    nextGroupIndex: number
    timerState: TimerState
  }) => {
    const buttonHandler = useCallback(() => {
      nodecg.sendMessage('setCurrentRunnerGroupIndex', props.nextGroupIndex)
    }, [props.nextGroupIndex])

    const nextRunnerGroupPanel =
      props.nextRunnerGroup !== undefined ? (
        <RunnerGroupPanel runnerGroup={props.nextRunnerGroup} panelColor={colBlue} />
      ) : (
        <EmptyRunnerGroupPanel />
      )
    return (
      <>
        <StLabel>
          <BiRun />
          <p>現在の走者</p>
          <SquareButton
            $color={colRed}
            onClick={buttonHandler}
            disabled={props.timerState.startedSomeone}>
            次の走者に変更する
          </SquareButton>
        </StLabel>
        <RunnerGroupPanel runnerGroup={props.currentRunnerGroup} panelColor={colRoseRed} />
        <StLabel>
          <BiRun />
          <p>次の走者</p>
        </StLabel>
        {nextRunnerGroupPanel}
      </>
    )
  }
)

const RunnerGroupPanel = memo((props: { runnerGroup: RunnerGroup; panelColor: ColorStyle }) => {
  const runnerNames = props.runnerGroup.runners.map((data, index) => (
    <p key={`runnerNames${index.toString()}`}>{data.name}</p>
  ))
  const commentatorNames = props.runnerGroup.commentators.map((data, index) => (
    <p key={`commentatorNames${index.toString()}`}>{data.name}</p>
  ))
  const title = props.runnerGroup.title.join('')
  return (
    <StGroupPanel $panelType={props.panelColor}>
      <p>
        {props.runnerGroup.id} : {title}
      </p>
      <p>
        {props.runnerGroup.platform} / {props.runnerGroup.category}
      </p>
      <StLeftAlignmentGroup>
        <StHorizontalGroup>
          <BiRun />
          <StNameGroup>{runnerNames}</StNameGroup>
        </StHorizontalGroup>
      </StLeftAlignmentGroup>
      <StLeftAlignmentGroup>
        <StHorizontalGroup>
          <BiSolidMicrophone />
          <StNameGroup>{commentatorNames}</StNameGroup>
        </StHorizontalGroup>
      </StLeftAlignmentGroup>
      <p>{props.runnerGroup.estimatedTime}</p>
      <p>{props.runnerGroup.graphicsType}</p>
    </StGroupPanel>
  )
})

const EmptyRunnerGroupPanel = memo(() => {
  return (
    <StGroupPanel $panelType={colBlue}>
      <p>― : ―――</p>
      <p>――― / ―――</p>
      <p>―――</p>
      <p>―――</p>
      <p>―――</p>
      <p>―――</p>
    </StGroupPanel>
  )
})

// #region styles

const StLabel = styled(StHorizontalGroup)`
  height: 48px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  margin-top: 8px;

  & > svg {
    font-size: 1.6rem;
  }
  & > p {
    padding-left: 10px;
    font-size: 1.2rem;
    font-weight: 700;
  }
  & > button {
    margin: 0 20px 0 auto;
  }
`

const StGroupPanel = styled(StVerticalGroup)<{ $panelType: ColorStyle }>`
  margin: 2px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.$panelType.normal};
  flex-grow: 1;

  & p {
    text-align: left;
    padding: 7px 8px;
    font-size: 1.1rem;
    font-weight: 700;
  }

  & > p {
    border-top: 1px dashed rgb(255 255 255 /60%);
  }

  & > p:nth-child(1) {
    font-size: 1.3rem;
    font-weight: 900;
    border-top: none;
  }
`
const StLeftAlignmentGroup = styled(StHorizontalGroup)`
  min-height: 40px;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  overflow: visible;
  border-top: 1px dashed rgb(255 255 255 /60%);
  &:empty {
    border-top: none;
  }
  & > p {
    padding: 7px 8px 7px 0;
  }
  & svg {
    font-size: 1.3rem;
    min-width: 50px;
    align-self: center;
  }
  & > svg:nth-child(1) {
    font-size: 1.5rem;
  }
`

const StNameGroup = styled(StHorizontalGroup)`
  justify-content: flex-start;
  flex-wrap: wrap;
`

// #endregion styles
