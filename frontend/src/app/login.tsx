
import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { Http, IHttpResponse } from "../core/http";
import { Notificacion, SpinnerLoading } from "../helpers/notiflix.helper";
import { IResponse } from "../core/iresponse";
import { localStorageHelper } from "../helpers/localstorage.helper";
import { Route, Router, Navigate } from "react-router-dom";
import { AuthGuard } from "../validaciones/guard-auth";

interface LoginState {
   password: string
   username: string
   navigate: any
}
export class Login extends React.Component<any, LoginState> {
   constructor(props: any) {
      super(props)
      this.state = { password: '', username: '', navigate: null }
   }
   componentDidMount(): void {
      const validToken = AuthGuard.validToken()
      if (validToken) this.setState({ navigate: true })
   }

   login() {
      const state = this.state
      const form = { ...state }
      SpinnerLoading.loading()
      Http.POST("/auth", form).then((rs: IHttpResponse) => {
         const data: IResponse = rs.data
         console.log(data)
         if (rs.status == 200) {
            debugger
            const { token, expire_token, username,id } = data.data
            const user=data.data
            localStorageHelper.createItem("token", token)
            localStorageHelper.createItem("expireToken", expire_token + '')
            localStorageHelper.createItem("username", username)
            localStorageHelper.createItem("usuarioID", id+'')
            localStorageHelper.createItem("user_info", user)
            window.token = token
            window.username = username
            window.expiredToken = expire_token
            window.expiredToken = id
            Notificacion.success(data.message || 'Usuario Validado')
            // this.setState({navigate:true})
            setTimeout(() => { location.reload() }, 1000)
         }
         SpinnerLoading.remove()
      }).catch(err => {
         SpinnerLoading.remove(); console.log(err);
         const theme=localStorageHelper.getItemString("theme")
         localStorageHelper.clearAll()
         localStorageHelper.createItem("theme",theme)
      })
   }

   render(): React.ReactNode {
      return <div className="flex max-h-screen bg-blue-gray-50 dark:bg-blue-gray-900 dark:text-white justify-between items-center content-center w-full " style={{ height: '100vh', marginTop: '-10%' }}>
         {!this.state.navigate && <div className="w-11/12 sm:w-6/12 md:w-4/12 mx-auto shadow inset-1  shadow-indigo-300 border-solid  p-4">
            <div className="flex justify-center items-center mb-4 border-b border-solid border-b-purple-500">
               <h3 className="text-purple-600 capitalize">LOGIN</h3>
            </div>
            <div className="mb-6">
               <Input label="Username" color="purple" onBlur={({ target }) => this.setState({ username: target.value.trim() })} />
            </div>
            <div className="mb-6">
               <Input label='Password' key='password' color="purple"
                  onBlur={({ target }) => this.setState({ password: target.value.trim() })}
                  onKeyUp={(e) => {
                     if (e.key == "Enter") {
                        this.login()
                     }
                  }} />
            </div>
            <div>
               <Button color="purple" size="sm" className="w-full" onClick={(e) => this.login()}>Login</Button>
            </div>
         </div>
         }
         {this.state.navigate && (
            <Navigate to="/" replace={true} />
         )}
      </div>
   }
}