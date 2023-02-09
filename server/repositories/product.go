package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProducts() ([]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	CreateProduct(product models.Product) (models.Product, error)
	UpdateProduct(product models.Product) (models.Product, error)
	DeleteProduct(product models.Product, ID int) (models.Product, error)
	FindCategoriesById(categoriesId []int) ([]models.Category, error)
	DeleteProductCategoryByProductId(product models.Product) (models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProducts() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Preload("User").Preload("Category").Find(&products).Error // add this code

	return products, err
}

func (r *repository) GetProduct(ID int) (models.Product, error) {
	var product models.Product
	// not yet using category relation, cause this step doesnt Belong to Many
	err := r.db.Preload("User").Preload("Category").First(&product, ID).Error // add this code

	return product, err
}

func (r *repository) CreateProduct(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error

	return product, err
}

func (r *repository) UpdateProduct(product models.Product) (models.Product, error) {
	r.db.Exec("DELETE FROM product_categories WHERE product_id=?", product.ID)
	err := r.db.Save(&product).Error

	return product, err
}

func (r *repository) DeleteProduct(product models.Product, ID int) (models.Product, error) {
	err := r.db.Delete(&product, ID).Scan(&product).Error

	return product, err
}

func (r *repository) FindCategoriesById(categoriesId []int) ([]models.Category, error) {
	var categories []models.Category
	err := r.db.Find(&categories, categoriesId).Error

	return categories, err
}

func (r *repository) DeleteProductCategoryByProductId(product models.Product) (models.Product, error) {
	r.db.Exec("DELETE FROM product_categories WHERE product_id=?", product.ID)
	err := r.db.Preload("User").Preload("Category").First(&product, product.ID).Error // add this code

	return product, err
}
