package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/Jhon64/go-backend-postgres/database"
	"github.com/Jhon64/go-backend-postgres/helpers"
	"github.com/Jhon64/go-backend-postgres/scheme"
	"github.com/Jhon64/go-backend-postgres/settings"
	"github.com/golang-jwt/jwt/v5"
)

type ValidUser struct {
	Username    string      `json:"username"`
	Id          uint        `json:"id"`
	Token       string      `json:"token"`
	ExpireToken interface{} `json:"expire_token"`
}

func SigninHandlers(w http.ResponseWriter, r *http.Request) {
	var creds settings.Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	fmt.Println("params::", creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the expected password from our in memory map
	db := database.DBConnection()
	var user *scheme.Users
	result := db.Find(&user, "username=? and password=?", creds.Username, creds.Password)

	// expectedPassword, ok := users[creds.Username]
	if result.Error != nil || result.RowsAffected==0 {
		fmt.Println("Error al autenticar", result.Error)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	fmt.Println("rows ::", result.RowsAffected)

	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expirationTime := time.Now().Add(24 * time.Hour)
	// Create the JWT claims, which includes the username and expiry time
	claims := &settings.Claims{
		Username: creds.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			Issuer:    "test",
			Subject:   "somebody",
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	fmt.Println("secretKey::", settings.JwtSecretKey)
	tokenString, err := token.SignedString(settings.JwtSecretKey)
	
	fmt.Println("token::", tokenString)
	if err != nil {
		response := helpers.Response{Status: 401}
		response.MakeResponse(w)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	
	validUser := ValidUser{Username: user.Username, Id: user.Id, Token: tokenString,
		ExpireToken: expirationTime.UnixMilli()}

	fullname := user.Firstname + " " + user.Lastname
	fmt.Println("usuario::", user)
	messageBienvenido := "Bienvenido, " + fullname
	fmt.Println("message::", messageBienvenido)
	response := helpers.Response{Data: validUser, Message: messageBienvenido}
	response.MakeResponse(w)
}
