package dto

type SuccessResult struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

type ErrorResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
