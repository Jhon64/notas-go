import { localStorageHelper } from "../helpers/localstorage.helper"
import { SpinnerLoading } from "../helpers/notiflix.helper"

export namespace functions{
   export function addOnLogout(){
      window.addEventListener('onLogout',(e)=>{
         SpinnerLoading.loading("Deslogeando ....")
         localStorageHelper.deleteItems(["token","expireToken","user_info"])
         setTimeout(()=>{
            SpinnerLoading.remove()
            location.reload()
         },1000)
      })
   }
   export function handleOnLogout(){
      const event=new Event("onLogout")
      window.dispatchEvent(event)
   }
}