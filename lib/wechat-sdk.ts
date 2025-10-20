// 微信JSSDK配置和工具函数

declare global {
  interface Window {
    wx: any
  }
}

export interface WeChatConfig {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
}

// 初始化微信JSSDK
export function initWeChatSDK(config: WeChatConfig) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.wx) {
      reject(new Error("微信JSSDK未加载"))
      return
    }

    window.wx.config({
      debug: false, // 生产环境设为false
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: [
        "scanQRCode", // 扫描二维码
        "chooseImage", // 选择图片
        "uploadImage", // 上传图片
      ],
    })

    window.wx.ready(() => {
      console.log("[v0] 微信JSSDK初始化成功")
      resolve(true)
    })

    window.wx.error((err: any) => {
      console.error("[v0] 微信JSSDK初始化失败:", err)
      reject(err)
    })
  })
}

// 调用微信扫码功能
export function scanQRCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.wx) {
      reject(new Error("微信JSSDK未加载"))
      return
    }

    window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码，默认二者都有
      success: (res: any) => {
        // 返回扫描结果
        const result = res.resultStr
        console.log("[v0] 扫码成功:", result)
        resolve(result)
      },
      fail: (err: any) => {
        console.error("[v0] 扫码失败:", err)
        reject(err)
      },
    })
  })
}

// 获取微信配置（需要从后端API获取）
export async function getWeChatConfig(): Promise<WeChatConfig> {
  // 在实际应用中，这里应该调用后端API获取配置
  // 后端需要根据当前URL生成签名
  const url = window.location.href.split("#")[0] // 微信签名需要使用不带#的URL

  try {
    // 模拟API调用
    // const response = await fetch('/api/wechat/config', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url })
    // })
    // return await response.json()

    // 开发环境返回模拟配置
    return {
      appId: "wxb0193c2906fd79e9", // 替换为实际的AppID
      timestamp: Math.floor(Date.now() / 1000),
      nonceStr: Math.random().toString(36).substring(2, 15),
      signature: "mock_signature_" + Math.random().toString(36).substring(2, 15),
    }
  } catch (error) {
    console.error("[v0] 获取微信配置失败:", error)
    throw error
  }
}

// 检查是否在微信环境中
export function isWeChatBrowser(): boolean {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent.toLowerCase()
  return ua.includes("micromessenger")
}
