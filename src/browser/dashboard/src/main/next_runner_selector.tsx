import { RunnerGroup } from 'bundle-template'
import { memo, useCallback } from 'react'
import { ColorStyle, colBlue, colRoseRed, colTurquoiseBlue } from '@ui/color'
import { StHorizontalGroup, StVerticalGroup } from '@ui/style'
import { styled } from 'styled-components'

/**
 * 次の走者を変更するための走者グループのパネルを一覧表示するコンポーネント
 * @param runnerGroupArray 走者グループの配列
 * @param currentIndex 現在の走者グループの配列のインデックス
 * @param nextIndex 次の走者グループの配列のインデックス
 */
export const NextRunnerSelector = memo(
  (props: { runnerGroupArray: RunnerGroup[]; currentIndex: number; nextIndex: number }) => {
    const GetPanelColorStyle = useCallback(
      (currentIndex: number, nextIndex: number, arrayIndex: number): ColorStyle => {
        if (currentIndex == arrayIndex) {
          return colRoseRed
        } else if (nextIndex == arrayIndex) {
          return colBlue
        } else {
          return colTurquoiseBlue
        }
      },
      []
    )

    const nextRunnerSelectorContainer = props.runnerGroupArray.map((data) => (
      <RunnerGroupPanel
        key={`nextRunnerSelector${data.id.toString()}`}
        runnerGroup={data}
        currentIndex={props.currentIndex}
        nextIndex={props.nextIndex}
        panelColorStyle={GetPanelColorStyle(props.currentIndex, props.nextIndex, data.id)}
      />
    ))
    return nextRunnerSelectorContainer
  }
)

/**
 * 走者グループのパネルを表示するコンポーネント
 * @params runnerGroup 走者グループ
 * @params currentIndex 現在の走者グループの配列のインデックス
 * @params nextIndex 次の走者グループの配列のインデックス
 * @params panelColorStyle 表示するパネルのカラースタイル
 */
const RunnerGroupPanel = memo(
  (props: {
    runnerGroup: RunnerGroup
    currentIndex: number
    nextIndex: number
    panelColorStyle: ColorStyle
  }) => {
    const setNextRunnerGroupIndex = useCallback(
      (currentIndex: number, nextIndex: number, arrayIndex: number) => {
        if (currentIndex !== arrayIndex && nextIndex !== arrayIndex) {
          nodecg.sendMessage('setNextRunnerGroupIndex', arrayIndex)
        }
      },
      []
    )
    const title = props.runnerGroup.title.join('')
    const runnerNames = props.runnerGroup.runners.map((data, i) => (
      <p key={`runnerNames${i.toString}`}>{data.name}</p>
    ))
    const commentatorNames = props.runnerGroup.commentators.map((data, i) => (
      <p key={`commentatorNames${i.toString}`}>{data.name}</p>
    ))
    return (
      <StSelectablePanel
        $colorStyle={props.panelColorStyle}
        onClick={setNextRunnerGroupIndex.bind(
          this,
          props.currentIndex,
          props.nextIndex,
          props.runnerGroup.id
        )}>
        <p>{title}</p>
        <StNameContainer>
          {runnerNames}
          {commentatorNames}
        </StNameContainer>
      </StSelectablePanel>
    )
  }
)

// #region styles

const StSelectablePanel = styled(StVerticalGroup)<{ $colorStyle: ColorStyle }>`
  margin: 2px;
  padding: 5px;
  border-radius: 4px;
  background-color: ${(props) => props.$colorStyle.normal};

  &:hover {
    cursor: pointer;
  }

  & p {
    text-align: left;
  }

  & > p {
    font-size: 1.2rem;
    font-weight: 900;
  }
`

const StNameContainer = styled(StHorizontalGroup)`
  border-top: 1px dashed rgb(255 255 255 / 60%);
  justify-content: flex-start;

  & > p {
    padding: 0 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

// #endregion styles
