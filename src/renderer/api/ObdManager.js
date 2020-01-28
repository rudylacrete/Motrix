class ObdManager {
  constructor () {
    this._connnected = false
    this._store = null
  }

  init (store) {
    this._store = store
    setTimeout(() => {
      this._connnected = true
      this._store.dispatch('obd/changeConnectedStatus', this._connnected)
    }, 5000)
  }

  disconnect () {
    this._connnected = false
    this._store.dispatch('obd/changeConnectedStatus', this._connnected)
  }
}

export default new ObdManager()
