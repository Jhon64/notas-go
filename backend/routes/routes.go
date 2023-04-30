package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func HomeHandler(writer http.ResponseWriter, request *http.Request) {
	writer.Write([]byte("Hello World"))
}
func Handlers()http.Handler{
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/tareas", GetTasksHandler).Methods(http.MethodGet)
	r.HandleFunc("/user", PostUserHandler).Methods(http.MethodPost)
	r.HandleFunc("/auth", SigninHandlers).Methods(http.MethodPost)
	handler := cors.Default().Handler(r)
	return handler
}