package scheme

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Id          uint   `gorm:"primaryKey"`
	Description *string `json:"description"`
	Done        bool  `json:"done"`
	UserID      *uint `json:"userID"`
}
