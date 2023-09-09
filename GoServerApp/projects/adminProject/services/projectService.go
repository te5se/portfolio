package services

import (
	"portfolio/server-app/factories/connectionFactory"
	"portfolio/server-app/projects/models"

	. "github.com/ahmetb/go-linq/v3"
)

var factory connectionFactory.ConnectionFactory

type ProjectService struct {
}

func (p ProjectService) Init(factoryProvided connectionFactory.ConnectionFactory) {
	factory = factoryProvided
}
func ProvideProjectService(factoryProvided connectionFactory.ConnectionFactory) ProjectService {
	var service ProjectService
	service.Init(factoryProvided)
	return service
}
func (p ProjectService) GetProjects() []models.Project {
	var projects []models.Project
	var variables []models.CssVariable

	session := factory.GetConnection()

	err := session.Select(&projects, "select * from portfolio.projects order by place desc")
	if err != nil {
		panic(err)
	}
	err = session.Select(&variables, "select * from portfolio.css_variables")
	if err != nil {
		panic(err)
	}
	for index := range projects {
		From(variables).Where(func(c interface{}) bool {
			return c.(models.CssVariable).IdProject == projects[index].ID
		}).ToSlice(&projects[index].CssVariables)
	}
	return projects
}
func (p ProjectService) GetDefaultVariables() []models.DefaultVariables {
	var session = factory.GetConnection()

	var defaultVariables []models.DefaultVariables

	err := session.Select(&defaultVariables, "select * from portfolio.default_variables")

	if err != nil {
		panic(err)
	}
	return defaultVariables
}
