package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", h.GetUser)
	e.POST("/user", h.CreateUser)
	e.PATCH("/user/:id", h.UpdateUser)
	e.DELETE("/user/:id", h.DeleteUser)
}
