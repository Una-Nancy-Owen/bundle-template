import { NodeCG } from '../server'
import { runnerDataController } from './runner_data_controller'
import { speakerController } from './speaker_controller'
import { timerController } from './timer_controller'

export default async (nodecg: NodeCG) => {
  nodecg.log.info('Hello, NodeCG extension!')
  runnerDataController(nodecg)
  timerController(nodecg)
  speakerController(nodecg)
  // let timerController = new TimerController(nodecg)
  //timerController.init()

  // let rtaTimerController = new RTATimerController(nodecg)
  // nodecg.listenFor('setTimerSignal', (message) => {
  //   rtaTimerController.setTimerSignal(message)
  // })
}
