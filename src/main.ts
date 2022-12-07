import * as os from 'os'
import {chmod} from 'fs/promises'
import * as core from '@actions/core'
import * as cache from '@actions/tool-cache'
import * as semver from 'semver'

const toolName = 'mach-composer'

async function run(): Promise<void> {
  try {
    let toolPath

    const version: string = core.getInput('version')

    // is this version already in our cache
    toolPath = cache.find(toolName, version)
    if (!toolPath) {
      toolPath = await downloadCLI(version)
    }

    // add tool to path for this and future actions to use
    core.addPath(toolPath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getPlatform(): string {
  let val: string = os.platform()
  if (val === 'win32') {
    val = 'windows'
  }
  return val
}

function getArch(): string {
  let val = os.arch()
  if (val === 'x64') {
    val = 'amd64'
  }
  return val
}

async function downloadCLI(version: string): Promise<string> {
  const url = getReleaseURL(version)
  const downloadedTool = await cache.downloadTool(url)
  const permissions = 0o755

  await chmod(downloadedTool, permissions)
  return await cache.cacheFile(downloadedTool, toolName, toolName, version)
}

export function getReleaseURL(version: string): string {
  const cleanVersion = semver.clean(version) || ''
  const platform = getPlatform()
  const arch = getArch()

  return encodeURI(
    `https://github.com/labd/mach-composer/releases/download/v${cleanVersion}/mach-composer-${cleanVersion}-${platform}-${arch}.tar.gz`
  )
}

run()
