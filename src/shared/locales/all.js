import eleLocaleFr from 'element-ui/lib/locale/lang/fr'
import appLocaleFr from '@shared/locales/fr'

// Please keep the locale key in alphabetical order.
const resources = {
  'fr': {
    translation: {
      ...eleLocaleFr,
      ...appLocaleFr
    }
  }
}

export default resources
