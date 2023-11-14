import { RunnerData, RunnerGroup } from 'bundle-template'

/**
 * 走者データの配列を、走者グループごとに分けた走者グループの配列に変換して返す関数
 * @param dataArray 走者データの配列
 * @returns 走者グループの配列
 */
export function runnerDataArrayToRunnersGroupArray(dataArray: RunnerData[]): RunnerGroup[] {
  let runnerGroupList: RunnerGroup[] = []

  for (let i = 0; i < dataArray.length; i++) {
    const groupId = i
    let runnerGroup: RunnerGroup = {
      id: groupId,
      runners: [],
      commentators: [],
      graphicsType: 'Undefined',
      title: [],
      platform: '',
      category: '',
      estimatedTime: '',
    }
    for (let k = 0; k < dataArray.length; k++) {
      let data = dataArray[k]
      if (data.group == groupId) {
        if (String(data.commentator) === 'TRUE' || String(data.commentator) === 'FALSE') {
          data.commentator = String(data.commentator) == 'TRUE' ? true : false
        }
        if (!data.commentator) {
          runnerGroup.runners.push(data)
        } else {
          runnerGroup.commentators.push(data)
        }
      }
    }
    if (0 < runnerGroup.runners.length) {
      if (runnerGroup.runners[0].title.includes('\\n')) {
        runnerGroup.title = runnerGroup.runners[0].title.split('\\n')
      } else {
        runnerGroup.title.push(runnerGroup.runners[0].title)
      }
      runnerGroup.platform = runnerGroup.runners[0].platform
      runnerGroup.category = runnerGroup.runners[0].category
      runnerGroup.estimatedTime = runnerGroup.runners[0].estimatedTime
      runnerGroup.graphicsType = runnerGroup.runners[0].graphicsType
      runnerGroupList.push(runnerGroup)
    } else {
      break
    }
  }
  return runnerGroupList
}
