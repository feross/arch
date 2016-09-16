var os = require('os')

module.exports = function arch () {
  return os.arch()
}
