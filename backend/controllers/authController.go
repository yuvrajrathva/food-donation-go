package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/yuvrajrathva/food-donation-go/models"
	"github.com/yuvrajrathva/food-donation-go/database"
	"golang.org/x/crypto/bcrypt"
)

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
