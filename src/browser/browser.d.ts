import { CreateNodecgInstance, CreateNodecgConstructor } from 'ts-nodecg/browser'
import { ReplicantMap } from '../nodecg/replicant'
import { MessageMap } from '../nodecg/message'
declare global {
  const nodecg: CreateNodecgInstance<'bundle-template', undefined, ReplicantMap, MessageMap>
  const NodeCG: CreateNodecgConstructor<'bundle-template', undefined, ReplicantMap, MessageMap>
}
