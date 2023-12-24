package routes

import (
	"github.com/yuvrajrathva/food-donation-go/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
}
