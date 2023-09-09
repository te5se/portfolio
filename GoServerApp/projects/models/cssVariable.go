package models

type CssVariable struct {
	Id        string `json:"id" db:"id"`
	Name      string `json:"name" db:"s_name"`
	Value     string `json:"value" db:"s_value"`
	IdProject string `db:"id_project"`
}
