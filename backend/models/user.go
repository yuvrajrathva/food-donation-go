package models

type User struct {
	ID        uint	 `json:"id" xml:"id" form:"id"`
	FirstName string `json:"first_name" xml:"first_name" form:"first_name"`
	LastName  string `json:"last_name" xml:"last_name" form:"last_name"`
	Email     string `json:"email" xml:"email" form:"email" gorm:"unique"`
	Password  []byte `json:"-"`
}
