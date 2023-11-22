/*! arch. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var cp = require('child_process')

/**
 * Returns the operating system's CPU architecture. This is different than
 * `process.arch` or `os.arch()` which returns the architecture the Node.js (or
 * Electron) binary was compiled for.
 */
module.exports = function arch () {
  /**
   * The running binary is 64-bit, so the OS is clearly 64-bit.
   */
  if (process.arch === 'x64') {
    return 'x64'
  }

  /**
   * On macOS, we need to detect if x64 Node is running because the CPU is truly
   * an Intel chip, or if it's running on Apple Silicon via Rosetta 2:
   * https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment
   */
  if (process.platform === 'darwin') {
    var nativeArm = process.arch === 'arm64'
    var rosettaArm = cp.execSync('sysctl -in sysctl.proc_translated', { encoding: 'utf8' }) === '1\n'

    return (nativeArm || rosettaArm) ? 'arm64' : 'x64'
  }

  /**
   * On Windows, use the standard environment variables:
   * "64-bit process: PROCESSOR_ARCHITECTURE=AMD64/IA64/ARM64"
   * "32-bit process: PROCESSOR_ARCHITECTURE=x86, PROCESSOR_ARCHITEW6432=%PROCESSOR_ARCHITECTURE%"
   * https://learn.microsoft.com/en-gb/windows/win32/winprog64/wow64-implementation-details#environment-variables
   */
  if (process.platform === 'win32') {
    var arch = process.env.PROCESSOR_ARCHITEW6432 || process.env.PROCESSOR_ARCHITECTURE
    if (arch === 'ARM64') return 'arm64'

    return ['AMD64', 'IA64'].includes(arch) ? 'x64' : 'x86'
  }

  /**
   * On Linux, use the `getconf` command to get the architecture.
   */
  if (process.platform === 'linux') {
    var output = cp.execSync('getconf LONG_BIT', { encoding: 'utf8' })
    return output === '64\n' ? 'x64' : 'x86'
  }

  /**
   * If none of the above, assume the architecture is 32-bit.
   */
  return 'x86'
}
