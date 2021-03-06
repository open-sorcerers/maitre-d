import { writeFile } from 'torpor'
import { chain, pipe, __ } from 'ramda'
import { fork } from 'fluture'

import defaultDataFrom from '../default-data'
import readFileOr from '../utils/readFileOr'

function onLoadWithConfig(config) {
  const backup = config.STORAGE.BACKUP
  return () => {
    const oldThoughts = readFileOr(defaultDataFrom(config))
    const newThoughts = writeFile(backup, __, 'utf8')
    pipe(
      oldThoughts,
      chain(newThoughts),
      fork(console.warn)((x) => x)
    )(config.STORAGE.BRAIN)
  }
}

export default onLoadWithConfig
