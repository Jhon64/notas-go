package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Jhon64/go-backend-postgres/database"
	"github.com/Jhon64/go-backend-postgres/helpers"
	"github.com/Jhon64/go-backend-postgres/scheme"
	"github.com/gorilla/mux"
)
func PostTasksHandler(writer http.ResponseWriter, request *http.Request)  {
	var task scheme.Task
	json.NewDecoder(request.Body).Decode(&task)

	db:=database.DBConnection()

	result:=db.Save(&task)
	err:=result.Error
	if(err!=nil){
		response := helpers.Response{Status: 500}
		response.MakeResponse(writer)
		return
	}
	
	response := helpers.Response{Data: task, Message: "Tarea Registrada"}
	response.MakeResponse(writer)

}
func GetTasksHandler(writer http.ResponseWriter, request *http.Request)  {
	fmt.Println("get Tasks",request.Body)
	db:=database.DBConnection()
	var tasks []scheme.Task
	db.Find(&tasks)
	fmt.Println("lista users ::",len(tasks) )
	response := helpers.Response{Data: tasks, Message: "Listando Tareas"}
	response.MakeResponse(writer)

}

func GetTasksHandlerByUserID(writer http.ResponseWriter, request *http.Request)  {
	params := mux.Vars(request)
	userID := params["userID"]
	fmt.Println("USUARIO ID ::",len(userID) )
	db:=database.DBConnection()
	var tasks []scheme.Task
	db.Find(&tasks,"user_id=?",userID)
	fmt.Println("lista tareas ::",len(tasks) )
	response := helpers.Response{Data: tasks, Message: "Listando Tareas"}
	response.MakeResponse(writer)

}

func DeleteTasksHandler(writer http.ResponseWriter, request *http.Request)  {
	
	params := mux.Vars(request)
	taskID := params["id"]
	fmt.Println("get Tasks",request.Body)
	db:=database.DBConnection()
	var tasks []scheme.Task
	db.Delete(&tasks,"id=?",taskID)
	fmt.Println("lista users ::",len(tasks) )
	response := helpers.Response{Data: tasks, Message: "Tareas Eliminadas"}
	response.MakeResponse(writer)

}

func PutTasksHandler(writer http.ResponseWriter, request *http.Request)  {
	var task scheme.Task
	json.NewDecoder(request.Body).Decode(&task)	
	db:=database.DBConnection()

	result:=db.Save(&task)
	err:=result.Error
	if(err!=nil){
		response := helpers.Response{Status: 500}
		response.MakeResponse(writer)
		return
	}
	
	response := helpers.Response{Data: task, Message: "Tarea Registrada"}
	response.MakeResponse(writer)

}