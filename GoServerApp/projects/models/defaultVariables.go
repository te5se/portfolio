package models

type DefaultVariables struct {
	Id   string `json:"id" db:"id"`
	Name string `json:"name" db:"s_name"`
}
