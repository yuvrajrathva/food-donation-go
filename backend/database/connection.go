package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/yuvrajrathva/food-donation-go/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)
var DB *gorm.DB

func getEnvVariable(key string) string{
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatalf("Error loading .env file")
    }
    return os.Getenv(key)
}

func Connect(){
	dbUser := getEnvVariable("DB_USER")
    dbPassword := getEnvVariable("DB_PASSWORD")
    // dbHost := getEnvVariable("DB_HOST")

    dsn := dbUser + ":" + dbPassword + "@/food-donation-db"

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

    if err!=nil{
        panic("could not connect to db")
    }

    DB = db

    db.AutoMigrate(&models.User{})
}