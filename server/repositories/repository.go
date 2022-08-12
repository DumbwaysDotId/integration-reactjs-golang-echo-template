package repositories

import "gorm.io/gorm"

type repository struct {
	db *gorm.DB
}
