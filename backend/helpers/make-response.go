package helpers

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Data    any  `json:"data"`
	Status  any `json:"status"`
	Message any `json:"message"`
	Error   any `json:"error"`
}

func (res *Response) MakeResponse(writer http.ResponseWriter) {
	writer.Header().Set("Content-Type", "application/json")
	if res.Data != nil {
		if res.Status == nil {
			status := 200
			writer.WriteHeader(status)
			res.Status = status
		}
	
		if res.Message == nil {
			message := "Mostrando información"
			res.Message = &message
		}
	}
	if res.Error!=nil{
		if res.Status == nil {
			status := 500
			writer.WriteHeader(status)
			res.Status = &status
		}
	}
	if(res.Status==401){
		status := 401
		res.Error="Usuario Inválido"
		writer.WriteHeader(status)
	}

	json.NewEncoder(writer).Encode(&res)
}

type IMakeResponse interface {
	MakeResponse()
}
