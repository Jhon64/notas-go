import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Switch } from "@material-tailwind/react"
import { useState } from "react"

export interface IAddTaskProps {
   form: any
   handleGuardar: Function
}

export const AddDTask = (props: IAddTaskProps) => {
   const [openDialog, setOpenDialog] = useState(false)
   const [form, setForm] = useState(props.form)
   const handleOpen = () => setOpenDialog(!openDialog);

   return <>
      <button className="bg-blue-500 text-white py-0 px-3 rounded" onClick={() => handleOpen()}>
         <span className=" text-white dark:text-white text-xs fa fa-plus" ></span>
         &nbsp;ADD</button>
      <Dialog open={openDialog} dismiss={{ enabled: false }} handler={handleOpen}>
         <DialogHeader>AddTask</DialogHeader>
         <DialogBody divider>
            <div className="mb-2 flex justify-between gap-2">
               <Input label="Description" onBlur={({ target }) => {
                  const { value } = target;
                  form.description = value;
               }} />
               <Switch label="Completado" onChange={({ target }) => {
                  const { checked } = target; form.done = checked;
               }} />
            </div>
            <div className="flex justify-end gap-1">
               <Button color="gray" size="sm" onClick={() => handleOpen()}>Cancelar</Button>
               <Button color="blue" size="sm" onClick={() => { handleOpen(); props.handleGuardar() }}>Guardar</Button>
            </div>
         </DialogBody>
      </Dialog>
   </>
}