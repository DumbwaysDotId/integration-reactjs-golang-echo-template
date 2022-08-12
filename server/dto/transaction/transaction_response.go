package transactiondto

import (
	"dumbmerch/models"
	"time"
)

type TransactionResponse struct {
	ID        int                  			`json:"id" gorm:"primary_key:auto_increment"`
	Product   models.ProductResponse      	`json:"product" gorm:"foreignKey:ProductID"`
	// BuyerID   int                  			`json:"buyer_id"`
	Buyer     models.UsersProfileResponse 	`json:"buyer"`
	// SellerID  int                  			`json:"seller_id"`
	Seller    models.UsersProfileResponse 	`json:"seller"`
	Price     int                  			`json:"price"`
	Status    string               			`json:"status"  gorm:"type:varchar(25)"`
	CreatedAt time.Time            			`json:"-"`
	UpdatedAt time.Time            			`json:"-"`
}

// type TransactionResponse struct {
// 	ID         int                  `json:"id"`
// 	Name       string               `json:"name"`
// 	Desc       string               `json:"desc"`
// 	Price      int                  `json:"price"`
// 	Image      string               `json:"image"`
// 	Qty        int                  `json:"qty"`
// 	UserID     int                  `json:"-"`
// 	User       UsersProfileResponse `json:"user"`
// 	Category   []Category           `json:"category" gorm:"many2many:product_categories"`
// 	CategoryID []int                `json:"-" form:"category_id" gorm:"-"`
// }