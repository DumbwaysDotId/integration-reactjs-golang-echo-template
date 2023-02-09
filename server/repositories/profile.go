package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	GetProfile(userId int) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetProfile(userId int) (models.Profile, error) {
	var profile models.Profile
	err := r.db.Preload("User").First(&profile, "user_id=?", userId).Error

	return profile, err
}
