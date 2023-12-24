package controllers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/yuvrajrathva/food-donation-go/database"
	"github.com/yuvrajrathva/food-donation-go/models"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return (err)
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{
		FirstName: data["first-name"],
		LastName:  data["last-name"],
		Email:     data["email"],
		Password:  password,
	}

	database.DB.Create(&user)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return (err)
	}

	var user models.User

	// finding the user in DB
	database.DB.Where("email=?", data["Email"]).First(&user)

	if user.ID == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	// check the password for auth
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["Password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "password is incorrect",
		})
	}

	// setting jwt
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
		})
	}

	// setting jwt into http only cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "successfully logged in",
	})
}
