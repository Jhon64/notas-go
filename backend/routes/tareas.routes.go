package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Jhon64/go-backend-postgres/database"
	"github.com/Jhon64/go-backend-postgres/scheme"
)
func PostTasksHandler(writer http.ResponseWriter, request *http.Request)  {
	var task scheme.Task
	json.NewDecoder(request.Body).Decode(&task)

	db:=database.DBConnection()

	result:=db.Save(&task)
	err:=result.Error
	if(err!=nil){
		writer.WriteHeader(http.StatusBadRequest)
		writer.Write([]byte(err.Error()))
	}
	
	json.NewEncoder(writer).Encode(&task)

}
func GetTasksHandler(writer http.ResponseWriter, request *http.Request)  {
	fmt.Println("get Tasks",request.Body)
	db:=database.DBConnection()
	var tasks []scheme.Task
	db.Find(&tasks)
	fmt.Println("lista users ::",len(tasks) )
	json.NewEncoder(writer).Encode(&tasks)

}