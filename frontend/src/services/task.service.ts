import { Http } from "../core/http";
import { IResponse } from "../core/iresponse";

export namespace TaskService {
   export async function GET() {
      let data: any = []
      const rs = await Http.GET("/tareas", undefined, true)
      if (rs.status == 200) {
         
         const dataResponse: IResponse = rs.data
         data = dataResponse.data
      }
      return data
   }

   export async function PUT(id:number,form:any) {
      let data: any = []
      const rs = await Http.POST("/tareas/edit/"+id,form, undefined, true)
      if (rs.status == 200) {
         const dataResponse: IResponse = rs.data
         data = dataResponse.data
      }
      return data
   }

   export async function POST(form:any) {
      let data: any = []
      const rs = await Http.POST("/tareas",form, undefined, true)
      if (rs.status == 200) {
         const dataResponse: IResponse = rs.data
         data = dataResponse.data
      }
      return data
   }

   export async function GetByUserID(id:number) {
      let data: any = []
      const rs = await Http.GET("/tareas/"+id, undefined, true)
      if (rs.status == 200) {
         const dataResponse: IResponse = rs.data||[]
         data = dataResponse.data
      }
      return data
   }


   export async function DELETE(id:number) {
      let data: any = {}
      const rs = await Http.POST("/tareas/"+id, {},undefined, true)
      if (rs.status == 200) {
         const dataResponse: IResponse = rs.data
         data = dataResponse.data
      }
      return data
   }
   
}