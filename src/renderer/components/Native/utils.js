import is from 'electron-is'
import { LIGHT_THEME, DARK_THEME } from '@shared/constants'

const remote = is.renderer() ? require('electron').remote : {}

export function getSystemTheme () {
  let result = LIGHT_THEME
  if (!is.macOS()) {
    return result
  }
  result = remote.systemPreferences.isDarkMode() ? DARK_THEME : LIGHT_THEME
  return result
}
