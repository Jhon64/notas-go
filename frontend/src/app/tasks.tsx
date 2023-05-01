import React from "react";
import { TaskService } from "../services/task.service";
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton } from "@material-tailwind/react";
import { localStorageHelper } from "../helpers/localstorage.helper";
import { AddDTask } from "./components/add-task";
import { Notificacion } from "../helpers/notiflix.helper";
import { EditTask } from "./components/edit-task";

interface ITaskState {
   taskList: ITask[]
   form: any
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
         taskList: [],
         form: {}
      }
   }
   componentDidMount(): void {
      this.getTareas()
   }
   async getTareas() {
      const userID = window.usuarioID || Number.parseInt(localStorageHelper.getItemString("usuarioID") || '0')
      const tareas = await TaskService.GetByUserID(userID) || []
      this.setState({ taskList: tareas })
   }

   async deleteTareas(id: number) {
      await TaskService.DELETE(id)
      const tareas = this.state.taskList.filter(x => x.id != id)
      this.setState({ taskList: tareas })
   }

   guardarTarea = async (formEdit?:any) => {
      const state = this.state
      const form = { ...state.form }
      form.userID = window.usuarioID
      try {
         if (!formEdit) await TaskService.POST(form)
         else await TaskService.PUT(formEdit.id, formEdit)
         this.getTareas()
      } catch (error) {
         Notificacion.error("Error la registrar")
      }
   }

   render(): React.ReactNode {
      const state = this.state
      return <>
         <div className="flex justify-between mb-3">
            <h3 className="dark:text-white uppercase">Tareas</h3>
            <AddDTask form={state.form} handleGuardar={() => this.guardarTarea()} />
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
                              <EditTask form={list} handleGuardar={(form) => this.guardarTarea(form)} />
                              <button className="bg-red-500 py-0 px-1 rounded " onClick={(e) => { this.deleteTareas(list.id) }}>
                                 <span className="fa fa-trash text-white dark:text-white text-xs" ></span></button>
                           </div>
                        </div>
                        <label className="text-sm dark:text-white ">{list.description}</label>
                        <div className="flex justify-end">
                           <label className={"dark:text-white rounded border  px-2 dark:border-white dark:border " +
                              (list.done ? 'border-blue-500' : 'border-green-500')}>{list.done ? 'Completado' : 'Pendiente'}</label>
                        </div>
                     </CardBody>
                  </Card>

               })
            }
         </div>
      </>
   }
}