package main

import (
	"fmt"
	"net/http"

	"github.com/Jhon64/go-backend-postgres/database"
	"github.com/Jhon64/go-backend-postgres/routes"
	"github.com/Jhon64/go-backend-postgres/scheme"
)

func main() {
	
	db:=database.DBConnection()
	fmt.Println("instancia db::",db)
	db.AutoMigrate(scheme.Task{})
	db.AutoMigrate(scheme.Users{})
	r:=routes.Handlers()
	fmt.Println("servidor levantado ::","http://localhost:3000")
	http.ListenAndServe(":3000", r)
	
}
