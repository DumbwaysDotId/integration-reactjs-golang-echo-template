package categoriesdto

type CreateCategoryRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type UpdateCategoryRequest struct {
	Name string `json:"name" form:"name"`
}
