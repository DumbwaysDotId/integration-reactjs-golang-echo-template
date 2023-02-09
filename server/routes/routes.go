package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	UserRoutes(e)
	ProfileRoutes(e)
	ProductRoutes(e)
	AuthRoutes(e)
	CategoryRoutes(e)
	TransactionRoutes(e)
}
