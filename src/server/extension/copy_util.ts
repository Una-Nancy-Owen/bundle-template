import { RunnerData, RunnerGroup } from 'bundle-template'

export function copyRunnerGroup(data: RunnerGroup): RunnerGroup {
  let runnerGroup: RunnerGroup = {
    id: -1,
    commentators: [],
    runners: [],
    graphicsType: 'Undefined',
    title: [],
    platform: '',
    category: '',
    estimatedTime: '',
  }
  data.runners.forEach((runner, index) => {
    if (index == 0) {
      runnerGroup.id = runner.group
      runnerGroup.graphicsType = runner.graphicsType
      runnerGroup.platform = runner.platform
      runnerGroup.category = runner.category
      runnerGroup.estimatedTime = runner.estimatedTime
      if (runner.title.includes('\\n')) {
        runnerGroup.title = runner.title.split('\\n')
      } else {
        runnerGroup.title.push(runner.title)
      }
    }
    const copyRunner = copyRunnerData(runner)
    runnerGroup.runners.push(copyRunner)
  })
  data.commentators.forEach((commentator, index) => {
    if (index == 0) {
      runnerGroup.graphicsType = commentator.graphicsType
    }
    const copyCommentator = copyRunnerData(commentator)
    runnerGroup.commentators.push(copyCommentator)
  })
  return runnerGroup
}

export function copyRunnerData(runner: RunnerData): RunnerData {
  const copyRunner: RunnerData = {
    group: runner.group,
    name: runner.name,
    commentator: runner.commentator,
    title: runner.title,
    platform: runner.platform,
    category: runner.category,
    estimatedTime: runner.estimatedTime,
    graphicsType: runner.graphicsType,
  }
  return copyRunner
}
