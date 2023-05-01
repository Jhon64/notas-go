import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Switch } from "@material-tailwind/react"
import { memo, useState } from "react"

export interface IAddTaskProps {
   form: any
   handleGuardar: (form:any)=>void
}

export const EditTask = memo((props: IAddTaskProps) => {
   const [openDialog, setOpenDialog] = useState(false)
   const [form, setForm] = useState(props.form)
   const handleOpen = () => setOpenDialog(!openDialog);
   
   return <>
      <button className="bg-green-500 py-0 px-1 rounded" onClick={() => handleOpen()}>
         <span className="fa fa-pen text-white dark:text-white text-xs" ></span>
      </button>
      <Dialog open={openDialog} dismiss={{ enabled: false }} handler={handleOpen}>
         <DialogHeader>Edit Task</DialogHeader>
         <DialogBody divider>
            <div className="mb-2 flex justify-between gap-2">
               <Input label="Description" onBlur={({ target }) => {
                  const { value } = target;
                  form.description = value;
                  setForm({...form})
               }}  defaultValue={form.description}/>
               <Switch label="Completado" onChange={({ target }) => {
                  const { checked } = target; form.done = checked;
                  setForm({...form})
               }} checked={form.done||false}/>
            </div>
            <div className="flex justify-end gap-1">
               <Button color="gray" size="sm" onClick={() => handleOpen()}>Cancelar</Button>
               <Button color="blue" size="sm" onClick={() => { handleOpen(); props.handleGuardar(form) }}>Guardar</Button>
            </div>
         </DialogBody>
      </Dialog>
   </>
})