import { Speaker } from 'bundle-template'
import { NodeCG } from '../server'
export const speakerController = (nodecg: NodeCG) => {
  let groupRunnersNum: number = 0
  const MAX_RUNNERS_NUM = 4
  let speaker: Speaker = {
    enabled: [],
  }
  const speakerRep = nodecg.Replicant('speaker')

  const init = (): void => {
    const initSpeakerRepValue = nodecg.readReplicant('speaker')
    if (initSpeakerRepValue !== undefined) {
      speaker = initSpeakerRepValue
    } else {
      for (let i = 0; i < MAX_RUNNERS_NUM; i++) {
        speaker.enabled.push(false)
      }
      speakerRep.value = { ...speaker }
    }
  }

  const reset = (): void => {
    for (let i = 0; i < MAX_RUNNERS_NUM; i++) {
      speaker.enabled[i] = false
    }
    speakerRep.value = { ...speaker }
  }

  nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
    if (newValue !== undefined) {
      groupRunnersNum = newValue.runners.length
    }
    reset()
  })

  nodecg.listenFor('setSpeaker', (index) => {
    speaker.enabled[index] = !speaker.enabled[index]
    speakerRep.value = { ...speaker }
  })

  init()
}
