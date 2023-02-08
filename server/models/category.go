package models

import "time"

type Category struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Name      string    `json:"name" gorm:"type: varchar(100)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
