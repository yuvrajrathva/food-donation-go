package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/yuvrajrathva/food-donation-go/database"
	"github.com/yuvrajrathva/food-donation-go/routes"
)

func main() {
	database.Connect()

	app := fiber.New()
	
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://127.0.0.1:5173",
	}))
    
	routes.Setup(app)
	
	app.Listen(":8000")
}

