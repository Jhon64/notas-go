package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/Jhon64/go-backend-postgres/database"
	"github.com/Jhon64/go-backend-postgres/scheme"
	"github.com/Jhon64/go-backend-postgres/settings"
	"github.com/golang-jwt/jwt/v5"
)

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
	if result.Error != nil {
		fmt.Println("Error al autenticar", result.Error)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

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
	fmt.Println("token error::", err)
	fmt.Println("token::", tokenString)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}
