import { CreateNodecgInstance } from 'ts-nodecg/server'
import { ReplicantMap } from '../nodecg/replicant'
import { MessageMap } from '../nodecg/message'
export type NodeCG = CreateNodecgInstance<'bundle-template', undefined, ReplicantMap, MessageMap>
