import {expect, test} from '@jest/globals'
import {downloadCLI, getReleaseURL} from './main'

jest.mock('os')
const os = require('os')

// shows how the runner will run a javascript action with env / stdout protocol
test('release url', () => {
  os.platform = jest.fn().mockReturnValue('linux')
  os.arch = jest.fn().mockReturnValue('amd64')

  const url = getReleaseURL('v2.4.6')
  expect(url).toBe(
    'https://github.com/labd/mach-composer/releases/download/v2.4.6/mach-composer-2.4.6-linux-amd64.tar.gz'
  )
})
