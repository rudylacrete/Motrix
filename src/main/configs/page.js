import is from 'electron-is'

export default {
  index: {
    attrs: {
      title: 'Motrix',
      width: 862,
      height: 588,
      minWidth: 400,
      minHeight: 420
    },
    url: is.dev() ? `http://localhost:9080` : `file://${__dirname}/index.html`
  }
}
