package settings

import (
	"github.com/golang-jwt/jwt/v5"
)

var JwtSecretKey=[]byte("MySecretKey")
type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

