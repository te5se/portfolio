package models

type Project struct {
	ID               string        `json:"id" db:"id"`
	Name             string        `json:"name" db:"name"`
	PrimaryColor     string        `json:"primaryColor" db:"primary_color"`
	LinkLocation     string        `json:"linkLocation" db:"link_location"`
	ShortDescription string        `json:"shortDescription" db:"short_description"`
	ImageLink        string        `json:"imageLink" db:"image_link"`
	CssVariables     []CssVariable `json:"cssVariables"`
}
