
import React from "react";
import { Button, Input } from "@material-tailwind/react";

export class Login extends React.Component {
   constructor(props: any) {
      super(props)
      this.state = {}
   }
   render(): React.ReactNode {
      return <div className="flex justify-between items-center content-center w-full " style={{height:'100vh',marginTop:'-10%'}}>
         <div className="w-11/12 sm:w-6/12 md:w-4/12 mx-auto shadow inset-1  shadow-indigo-300 border-solid  p-4">
            <div className="flex justify-center items-center mb-4 border-b border-solid border-b-purple-500">
               <h3 className="text-purple-600 capitalize">LOGIN</h3>
            </div>
            <div className="mb-6">
               <Input label="Username" color="purple" />
            </div>
            <div className="mb-6">
               <Input label='Password' color="purple" />
            </div>
            <div>
               <Button  color="purple" size="sm" className="w-full">Login</Button>
            </div>
         </div>

      </div>
   }
}