import { localStorageHelper } from "../helpers/localstorage.helper"

export namespace AuthGuard {
  export const validToken = (): boolean => {
    const token = localStorageHelper.getItemString("token")
    const expireToken = Number.parseInt(localStorageHelper.getItemString("expireToken") || '0')
    const dateNow = Date.now()
    if (expireToken && expireToken >= dateNow && token) {
      return true
    } else {
      localStorageHelper.deleteItems(["token", "expireToken", "user_info"])
      window.token = ""
      window.expiredToken = 0
      return false
    }
  }
}