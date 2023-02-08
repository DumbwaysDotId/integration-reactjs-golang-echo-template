package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repositories"

	"github.com/labstack/echo/v4"
)

func CategoryRoutes(e *echo.Group) {
	categoryRepository := repositories.RepositoryCategory(mysql.DB)
	h := handlers.HandlerCategory(categoryRepository)

	e.GET("/categories", h.FindCategories)
	e.GET("/category/:id", h.GetCategory)
	e.POST("/category", h.CreateCategory)
	e.DELETE("/category/:id", h.DeleteCategory)
	e.PATCH("/category/:id", h.UpdateCategory)
}
