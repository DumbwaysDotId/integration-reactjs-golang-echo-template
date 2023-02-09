package handlers

import (
	productdto "dumbmerch/dto/product"
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

var path_file = "http://localhost:5000/uploads/"

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range products {
		products[i].Image = path_file + p.Image
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var product models.Product
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	product.Image = path_file + product.Image

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProduct(product)})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	var err error
	dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))
	qty, _ := strconv.Atoi(c.FormValue("qty"))

	categoryIdString := c.FormValue("category_id")
	if categoryIdString == "" {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Error: category_id form value is missing."})
	}

	var categoriesId []int
	err = json.Unmarshal([]byte(categoryIdString), &categoriesId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if len(categoriesId) == 0 {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Error: category_id form value is missing."})
	}

	request := productdto.ProductRequest{
		Name:       c.FormValue("name"),
		Desc:       c.FormValue("desc"),
		Price:      price,
		Image:      dataFile,
		Qty:        qty,
		CategoryID: categoriesId,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	categories, _ := h.ProductRepository.FindCategoriesById(request.CategoryID)

	product := models.Product{
		Name:     request.Name,
		Desc:     request.Desc,
		Price:    request.Price,
		Image:    request.Image,
		Qty:      request.Qty,
		Category: categories,
		UserID:   int(userId),
	}

	product, err = h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	product, _ = h.ProductRepository.GetProduct(product.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProduct(product)})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))
	qty, _ := strconv.Atoi(c.FormValue("qty"))

	categoryIdString := c.FormValue("category_id")
	categoryIds := strings.Split(categoryIdString, ",")
	categoriesId := make([]int, 0, len(categoryIds))
	for _, idStr := range categoryIds {
		id, err := strconv.Atoi(idStr)
		if err == nil {
			categoriesId = append(categoriesId, id)
		}
	}

	request := productdto.ProductRequest{
		Name:       c.FormValue("name"),
		Desc:       c.FormValue("desc"),
		Price:      price,
		Image:      dataFile,
		Qty:        qty,
		CategoryID: categoriesId,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		product.Name = request.Name
	}

	if request.Desc != "" {
		product.Desc = request.Desc
	}

	if request.Price != 0 {
		product.Price = request.Price
	}

	if dataFile != "" {
		product.Image = dataFile
	}

	if request.Qty != 0 {
		product.Qty = request.Qty
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func convertResponseProduct(u models.Product) models.ProductResponse {
	return models.ProductResponse{
		ID:       u.ID,
		Name:     u.Name,
		Desc:     u.Desc,
		Price:    u.Price,
		Image:    u.Image,
		Qty:      u.Qty,
		User:     u.User,
		Category: u.Category,
	}
}
