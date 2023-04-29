
import React from "react";
import { Button } from "@material-tailwind/react";
export class Login extends React.Component{
   constructor(props:any){
      super(props)
      this.state={}
   }
   render(): React.ReactNode {
      return<div className="flex justify-between items-center w-full h-full">
      <div className="flex">
         <h3 className="text-3xl font-bold underline">LOGIN</h3>
      </div>
      <Button>Button</Button>
      </div>
   }
}