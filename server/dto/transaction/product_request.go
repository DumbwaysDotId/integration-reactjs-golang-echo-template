package transactiondto

type CreateTransactionRequest struct {
	ProductID int    `json:"product_id" validate:"required"`
	BuyerID   int    `json:"buyer_id" validate:"required"`
	SellerID  int    `json:"seller_id" validate:"required"`
	Price     int    `json:"price" validate:"required"`
	Status    string `json:"status" validate:"required"`
}
