package main

import (
	"github.com/yuvrajrathva/food-donation-go/database"
	"github.com/yuvrajrathva/food-donation-go/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()
	app := fiber.New()
    routes.Setup(app)
	app.Listen(":8000")
}
