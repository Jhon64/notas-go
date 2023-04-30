
import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { Http, IHttpResponse } from "../core/http";
import { Notificacion, SpinnerLoading } from "../helpers/notiflix.helper";
import { IResponse } from "../core/iresponse";

interface LoginState {
   password: string
   username: string
}
export class Login extends React.Component<any, LoginState> {
   constructor(props: any) {
      super(props)
      this.state = { password: '', username: '' }
   }

   login() {
      const state = this.state
      const form = { ...state }
      SpinnerLoading.loading()
      Http.POST("/auth", form).then((rs:IHttpResponse )=> {
         const data:IResponse=rs.data
         console.log(data)
         if(rs.status==200){
            Notificacion.success(data.message||'Usuario Validado')
         }
         SpinnerLoading.remove()
      }).catch(err => { SpinnerLoading.remove();console.log(err) })
   }

   render(): React.ReactNode {
      return <div className="flex bg-blue-gray-50 justify-between items-center content-center w-full " style={{ height: '100vh', marginTop: '-10%' }}>
         <div className="w-11/12 sm:w-6/12 md:w-4/12 mx-auto shadow inset-1  shadow-indigo-300 border-solid  p-4">
            <div className="flex justify-center items-center mb-4 border-b border-solid border-b-purple-500">
               <h3 className="text-purple-600 capitalize">LOGIN</h3>
            </div>
            <div className="mb-6">
               <Input label="Username" color="purple" onBlur={({ target }) => this.setState({ username: target.value })} />
            </div>
            <div className="mb-6">
               <Input label='Password' key='password' color="purple" onBlur={({ target }) => this.setState({ password: target.value })} />
            </div>
            <div>
               <Button color="purple" size="sm" className="w-full" onClick={(e) => this.login()}>Login</Button>
            </div>
         </div>

      </div>
   }
}