var fs = require('fs')
var path = require('path')

/**
 * Returns the operating system's CPU architecture. This is different than
 * `process.arch` or `os.arch()` which returns the architecture the Node.js (or
 * Electron) binary was compiled for.
 *
 * On Windows, the most reliable way to detect a 64-bit OS from within a 32-bit
 * app is based on the presence of a WOW64 file: %SystemRoot%\SysNative.
 *
 * Background: https://twitter.com/feross/status/776949077208510464
 */
module.exports = function arch () {
   // The running binary is 64-bit, so the OS is clearly 64-bit.
  if (process.arch === 'x64') return 'x64'

  var useEnv = false
  try {
    useEnv = !!(process.env.SYSTEMROOT && fs.statSync(process.env.SYSTEMROOT))
  } catch (err) {}

  var sysRoot = useEnv ? process.env.SYSTEMROOT : 'C:\\Windows'

  // If %SystemRoot%\SysNative exists, we are in a WOW64 FS Redirected application.
  var isWOW64 = false
  try {
    isWOW64 = !!fs.statSync(path.join(sysRoot, 'sysnative'))
  } catch (err) {}

  return isWOW64 ? 'x64' : 'x86'
}
