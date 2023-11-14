import { Timer } from 'bundle-template'

export const getTimerStr = (timer: Timer, showMS: boolean) => {
  return showMS
    ? `${timer.h}:${timer.m}:${timer.s}.${timer.ms}`
    : `${timer.h}:${timer.m}:${timer.s}`
}
