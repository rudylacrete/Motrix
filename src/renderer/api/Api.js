import { remote } from 'electron'
import is from 'electron-is'
import { isEmpty } from 'lodash'
import {
  separateConfig,
  changeKeysToCamelCase,
  changeKeysToKebabCase
} from '@shared/utils'
import { EMPTY_STRING } from '@shared/constants'

const application = remote.getGlobal('application')

export default class Api {
  constructor (options = {}) {
    this.options = options

    this.init()
  }

  init () {
    this.loadConfig()
  }

  loadConfigFromLocalStorage () {
    // TODO
    const result = {}
    return result
  }

  loadConfigFromNativeStore () {
    const systemConfig = application.configManager.getSystemConfig()
    const userConfig = application.configManager.getUserConfig()

    const result = { ...systemConfig, ...userConfig }
    return result
  }

  loadConfig () {
    let result = is.renderer()
      ? this.loadConfigFromNativeStore()
      : this.loadConfigFromLocalStorage()

    result = changeKeysToCamelCase(result)
    this.config = result
  }

  fetchPreference () {
    return new Promise((resolve) => {
      this.loadConfig()
      resolve(this.config)
    })
  }

  savePreference (params = {}) {
    const kebabParams = changeKeysToKebabCase(params)
    if (is.renderer()) {
      return this.savePreferenceToNativeStore(kebabParams)
    } else {
      return this.savePreferenceToLocalStorage(kebabParams)
    }
  }

  savePreferenceToLocalStorage () {
    // TODO
  }

  savePreferenceToNativeStore (params = {}) {
    const { user, system, others } = separateConfig(params)
    if (!isEmpty(system)) {
      console.info('[Motrix] save system config: ', system)
      application.configManager.setSystemConfig(system)
    }

    if (!isEmpty(user)) {
      console.info('[Motrix] save user config: ', user)
      application.configManager.setUserConfig(user)
    }

    if (!isEmpty(others)) {
      console.info('[Motrix] save config found iillegal key: ', others)
    }
  }

  startPowerSaveBlocker () {
    application.energyManager.startPowerSaveBlocker()
  }

  stopPowerSaveBlocker () {
    application.energyManager.stopPowerSaveBlocker()
  }

  async fetchBtTrackerFromGitHub (source) {
    if (isEmpty(source)) {
      return EMPTY_STRING
    }

    const now = Date.now()
    const promises = source.map((url) => {
      return fetch(`${url}?t=${now}`).then((res) => res.text())
    })

    const values = await Promise.all(promises)
    let result = values.join('\r\n').replace(/^\s*[\r\n]/gm, '')
    return result
  }
}
