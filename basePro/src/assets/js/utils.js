/**
 * 工具类
 */
import secureUtils from './secureUtil'

// 加密解密
export function demoRequest(data) {
  let encryptMessage = secureUtils.encryption(data)
  return encryptMessage
}

export function demoResponse(data) {
  let decryptMessage = secureUtils.decryption(data)
  return decryptMessage
}
export default {
  demoRequest,
  demoResponse
}
