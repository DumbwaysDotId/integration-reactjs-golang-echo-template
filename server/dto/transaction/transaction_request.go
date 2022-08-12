package transactiondto

type TransactionRequest struct {
	ProductId int `gorm:"type: int" json:"productId" validate:"required"`
	SellerId  int `gorm:"type: int" json:"sellerId" validate:"required"`
	Price     int `gorm:"type: int" json:"price" validate:"required"`
}