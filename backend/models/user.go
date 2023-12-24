package models

type User struct {
	ID        uint	 `json:"id" xml:"id" form:"id"`
	FirstName string `json:"first-name" xml:"first-name" form:"first-name"`
	LastName  string `json:"last-name" xml:"last-name" form:"last-name"`
	Email     string `json:"email" xml:"email" form:"email" gorm:"unique"`
	Password  []byte `json:"password" xml:"password" form:"password"`
}
