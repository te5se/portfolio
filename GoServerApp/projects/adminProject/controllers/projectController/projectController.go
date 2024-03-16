package projectController

import (
	"fmt"
	"net/http"

	"portfolio/server-app/factories/connectionFactory"
	"portfolio/server-app/projects/adminProject/services"
	"portfolio/server-app/projects/models"

	"go.uber.org/dig"

	"github.com/gin-gonic/gin"
)

var factory connectionFactory.ConnectionFactory
var projectService services.ProjectService

func SetupController(router *gin.Engine, container *dig.Container) {

	var group = router.Group("projects")

	group.GET("get", getProjects)
	group.GET("getDefaultVariables", getDefaultVariables)
	group.PUT("add", addProject)
	group.DELETE("delete/:id", deleteProject)
	group.POST("update", updateProject)

	container.Invoke(func(pFactory connectionFactory.ConnectionFactory, pProjectService services.ProjectService) {
		factory = pFactory
		projectService = pProjectService
	})
}

// getAlbums responds with the list of all albums as JSON.
func getProjects(c *gin.Context) {

	projects := projectService.GetProjects()
	c.IndentedJSON(http.StatusOK, projects)
}
func getDefaultVariables(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, projectService.GetDefaultVariables())
}
func addProject(c *gin.Context) {
	var id string
	var project models.Project
	c.BindJSON(&project)
	session := factory.GetConnection()
	tx, err := session.Beginx()
	if err != nil {
		panic(err)
	}
	arg := map[string]interface{}{
		"name":             project.Name,
		"linkLocation":     project.LinkLocation,
		"shortDescription": project.ShortDescription,
		"imageLink":        project.ImageLink,
	}
	nstmt, err := session.PrepareNamed(`insert into portfolio.projects(name, link_location, short_description, image_link)
	  values(:name, :linkLocation,:shortDescription, :imageLink) returning id`) /* .Scalar(&id) */
	if err != nil {
		panic(err)
	}
	defer nstmt.Close()
	err = nstmt.Get(&id, arg)
	if err != nil {
		panic(err)
	}
	for _, value := range project.CssVariables {
		value.IdProject = id
		var variableID string
		fmt.Println(value)
		arg := map[string]interface{}{
			"name":       value.Name,
			"value":      value.Value,
			"project_id": id,
		}
		nstmt, err := session.PrepareNamed(`insert into portfolio.css_variables(s_name, s_value, id_project) values(:name, :value, :project_id) returning id`) /* .Scalar(&variableID) */
		if err != nil {
			panic(err)
		}
		defer nstmt.Close()
		err = nstmt.Get(&variableID, arg)
		if err != nil {
			panic(err)
		}
	}

	tx.Commit()
	c.IndentedJSON(http.StatusOK, id)
}
func deleteProject(c *gin.Context) {
	id := c.Param("id")
	fmt.Println(id)
	session := factory.GetConnection()

	tx, err := session.Beginx()

	if err != nil {
		panic(err)
	}

	_, err = tx.Exec("delete from portfolio.css_variables where id_project = $1", id)

	if err != nil {
		panic(err)
	}

	_, err = tx.Exec("delete from portfolio.projects where id = $1", id)

	if err != nil {
		panic(err)
	}
	tx.Commit()
	c.IndentedJSON(http.StatusOK, true)
}
func updateProject(c *gin.Context) {
	var project models.Project
	err := c.BindJSON(&project)

	if err != nil {
		panic(err)
	}
	session := factory.GetConnection()
	tx, err := session.Beginx()
	if err != nil {
		panic(err)
	}
	arg := map[string]interface{}{
		"name":             project.Name,
		"linkLocation":     project.LinkLocation,
		"shortDescription": project.ShortDescription,
		"imageLink":        project.ImageLink,
		"id":               project.ID,
	}

	nstmt, err := tx.PrepareNamed(`update portfolio.projects set name = :name, 
	 link_location = :linkLocation, short_description = :shortDescription, image_link = :imageLink where id = :id`)
	if err != nil {
		panic(err)
	}
	defer nstmt.Close()
	_, err = nstmt.Exec(arg)
	if err != nil {
		panic(err)
	}
	_, err = tx.Exec(`delete from portfolio.css_variables where id_project = $1`, project.ID)
	if err != nil {
		panic(err)
	}
	for _, value := range project.CssVariables {
		_, err = tx.Exec(`insert into portfolio.css_variables(s_name, s_value, id_project) values ($1, $2, $3)`,
			value.Name, value.Value, project.ID)
		if err != nil {
			panic(err)
		}
	}

	tx.Commit()
	c.IndentedJSON(http.StatusOK, true)
}
