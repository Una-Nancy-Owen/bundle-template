import { NodeCG } from '../server'
import { LoadCSVFile } from './csv_file_loader'
import { runnerDataArrayToRunnersGroupArray } from './json_utility'

export const runnerDataController = (nodecg: NodeCG) => {
  const runnerGroupArrayRep = nodecg.Replicant('runnerGroupArray')
  const currentRunnerGroupRep = nodecg.Replicant('currentRunnerGroup')
  const currentGroupIndexRep = nodecg.Replicant('groupIndex')
  const nextRunnerGroupRep = nodecg.Replicant('nextRunnerGroup')
  const nextGroupIndexRep = nodecg.Replicant('nextGroupIndex')

  nodecg.listenFor('loadCSVData', async () => {
    const dataArray = await LoadCSVFile().catch((e) => {
      nodecg.log.error(`Failed to load CSV file\n${e}`)
      return undefined
    })
    if (dataArray != undefined) {
      nodecg.log.info('CSV file loading is completed')
      const groupDataArray = runnerDataArrayToRunnersGroupArray(dataArray)
      if (0 < groupDataArray.length) {
        runnerGroupArrayRep.value = groupDataArray
        currentRunnerGroupRep.value = JSON.parse(JSON.stringify(groupDataArray[0]))
        currentGroupIndexRep.value = 0
        if (1 < groupDataArray.length) {
          nextGroupIndexRep.value = 1
          nextRunnerGroupRep.value = JSON.parse(JSON.stringify(groupDataArray[1]))
        } else {
          nextGroupIndexRep.value = 0
        }
        nodecg.log.info('runnerGroupArray replicant is changed')
      } else {
        nodecg.log.info(`Unable to read valid data from CSV file`)
      }
    }
  })

  nodecg.listenFor('setNextRunnerGroupIndex', (index) => {
    if (runnerGroupArrayRep.value != null) {
      nextGroupIndexRep.value = index
      nextRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArrayRep.value[index]))
    }
  })

  nodecg.listenFor('setCurrentRunnerGroupIndex', (index) => {
    if (runnerGroupArrayRep.value != null) {
      if (index < runnerGroupArrayRep.value.length) {
        currentGroupIndexRep.value = index
        currentRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArrayRep.value[index]))
      }
      if (index + 1 < runnerGroupArrayRep.value.length) {
        nextGroupIndexRep.value = index + 1
        nextRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArrayRep.value[index + 1]))
      } else {
        nextGroupIndexRep.value = index + 1
        nextRunnerGroupRep.value = undefined
      }
    }
  })
}
