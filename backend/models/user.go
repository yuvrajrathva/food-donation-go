package models

type User  struct{
	ID 			uint
	FirstName   string 
	LastName 	string
	Email 		string `gorm:"unique"`
	Password 	[]byte
}