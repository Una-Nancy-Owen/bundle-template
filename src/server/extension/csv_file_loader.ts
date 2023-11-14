import { RunnerData } from 'bundle-template'
import fs from 'fs'
import csv from 'csvtojson'

const CSV_FILE_PATH = '../assets/data.csv'

/**
 * assetsディレクトリ内のdata.csvを読み込み、走者データの配列を返す関数
 * @returns 走者データの配列
 */
export async function LoadCSVFile(): Promise<RunnerData[] | undefined> {
  const filePath = require('path').resolve(__dirname, CSV_FILE_PATH)
  return new Promise((resolve, reject) => {
    let runnerDataArray: RunnerData[] = []
    fs.createReadStream(filePath, { encoding: 'utf-8' })
      .on('error', (error) => {
        reject(error)
      })
      .pipe(
        csv().on('data', (data) => {
          try {
            const json = JSON.parse(data)
            runnerDataArray.push(json)
          } catch (error) {
            reject(error)
          }
        })
      )
      .on('error', (error) => {
        reject(error)
      })
      .on('end', () => resolve(runnerDataArray))
  })
}
