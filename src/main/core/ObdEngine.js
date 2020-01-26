import { EventEmitter } from 'events'

export default class ObdEngine extends EventEmitter {
  init () {
    this._fakeThread = setInterval(() => {
      console.log('Send obd data')
      this.emit('data', {
        PID: 'AFR',
        value: Math.round((11 + Math.random() * 4) * 100) / 100
      })
    }, 1000)
  }
}
