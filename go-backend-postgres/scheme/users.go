package scheme

import "gorm.io/gorm"


type Users struct {
	gorm.Model
	Id        uint `gorm:"primaryKey"`
	Firstname string
	Lastname  string
	Username  string
	Password  string
	Tasks []*Task `gorm:"-"`
}
