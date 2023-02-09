package handlers

import (
	profiledto "dumbmerch/dto/profile"
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repositories"

	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) GetProfile(c echo.Context) error {
	userId := c.Get("userLogin").(jwt.MapClaims)["id"].(float64)

	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProfile(profile)})
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:      u.ID,
		Phone:   u.Phone,
		Gender:  u.Gender,
		Address: u.Address,
		UserID:  u.UserID,
		User:    u.User,
	}
}
