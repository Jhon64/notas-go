import React from "react";
import { TaskService } from "../services/task.service";
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton } from "@material-tailwind/react";

interface ITaskState {
   taskList: ITask[]
}
interface ITask {
   id: number
   description: number
   done: number
   userID: number
}
export class Task extends React.Component<any, ITaskState>{
   constructor(props: any) {
      super(props)
      this.state = {
         taskList: []
      }
   }
   componentDidMount(): void {
      this.getTareas()
   }
   async getTareas() {
      const tareas = await TaskService.GET()
      debugger
      this.setState({ taskList: tareas })
   }

   async deleteTareas(id:number) {
       await TaskService.DELETE(id)
      const tareas=this.state.taskList.filter(x=>x.id!=id)
      this.setState({ taskList: tareas })
   }

   render(): React.ReactNode {
      return <>
         <div className="flex justify-between mb-3">
            <h3 className="dark:text-white uppercase">Tareas</h3>
            <button className="bg-blue-500 py-0 px-3 rounded">
               <span className=" text-white dark:text-white text-xs fa fa-plus" ></span>&nbsp;ADD</button>
         </div>
         <hr />
         <div className="flex flex-wrap  mt-3 w-full">
            {
               this.state.taskList.map((list) => {
                  return <Card shadow variant="filled" className="m-1 w-1/6 rounded dark:bg-blue-gray-900 dark:border dark:border-white">
                     <CardBody className="py-3 px-6 ">
                        <div className="flex justify-between gap-1">
                           <label className="text-xs px-1 pt-1 dark:border-b-white dark:text-white border-b rounded border-b-purple-500
                        ">{list.id}</label>
                           <div className="flex gap-1">
                              <button className="bg-green-500 py-0 px-1 rounded">
                                 <span className="fa fa-pen text-white dark:text-white text-xs" ></span></button>
                              <button className="bg-red-500 py-0 px-1 rounded "  onClick={(e)=>{this.deleteTareas(list.id)}}>
                                 <span className="fa fa-trash text-white dark:text-white text-xs" ></span></button>
                           </div>
                        </div>
                        <label className="text-sm dark:text-white ">{list.description}</label>
                     </CardBody>
                  </Card>

               })
            }
         </div>
      </>
   }
}