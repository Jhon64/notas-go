package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=localhost user=postgres password=sa dbname=gorm port=5432"
var DB *gorm.DB

func DBConnection() *gorm.DB{
	DB, err := gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {  
		log.Fatalf("Error in connect the DB %v", err)  
		return  nil
	  }  
	  if DB.Error != nil { 
		log.Fatalln("Any Error in connect the DB " + err.Error()) 
		return  nil
	  }  
	  log.Println("DB connected")  
	  return DB
}
