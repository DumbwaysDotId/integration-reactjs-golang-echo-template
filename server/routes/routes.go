package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	ProfileRoutes(r)
	ProductRoutes(r)
	AuthRoutes(r)
	TransactionRoutes(r)
	CategoryRoutes(r)
}

