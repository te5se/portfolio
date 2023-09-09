package main

import (
	"net/http"
	"reflect"

	"database/sql"
	"fmt"

	"portfolio/server-app/factories/connectionFactory"
	"portfolio/server-app/projects/adminProject/controllers/projectController"
	"portfolio/server-app/projects/adminProject/services"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	_ "github.com/lib/pq/auth/kerberos"
	"github.com/olivere/dapper"
	"go.uber.org/dig"
)

var factory connectionFactory.ConnectionFactory

func main() {
	router := gin.Default()

	container := SetupDependencyInjection()

	router.Use(CORSMiddleware())

	projectController.SetupController(router, container)

	router.POST("/testInterface", testInterface)
	/* router.GET("/albums", getAlbums)
	router.GET("/projects", getProjects)
	router.GET("/projectsParsed", getProjectsParsed)
	router.POST("/albums", postAlbums)
	router.GET("/albums/:id", getAlbumByID) */

	router.Run("0.0.0.0:8090")
}
func SetupDependencyInjection() *dig.Container {
	container := dig.New()

	container.Provide(connectionFactory.ProvideConnectionFactory)
	container.Provide(services.ProvideProjectService)

	container.Invoke(func(pFactory connectionFactory.ConnectionFactory) {
		factory = pFactory
	})
	return container
}

// album represents data about a record album.
type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}
type project struct {
	ID           int    `json:"id" dapper:"id"`
	Project_Name string `json:"projectName" dapper:"project_name"`
	Count        int    `json:"count" dapper:"count"`
}

// albums slice to seed record album data.
var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func testInterface(c *gin.Context) {
	var test struct {
		Asdf interface{} `json:"asdf"`
	}
	var anonymousInterface interface{}

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&test); err != nil {
		panic(err)
	}

	fmt.Println(reflect.TypeOf(test.Asdf))
	session := factory.GetConnection()

	err := session.Get(&anonymousInterface, "select id from portfolio.projects")
	if err != nil {
		panic(err)
	}
	fmt.Println(reflect.TypeOf(anonymousInterface))

	c.IndentedJSON(http.StatusCreated, "123")
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
	var newAlbum album

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	// Add the new album to the slice.
	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}

// getAlbums responds with the list of all albums as JSON.
func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getAlbumByID(c *gin.Context) {
	id := c.Param("id")

	// Loop over the list of albums, looking for
	// an album whose ID value matches the parameter.
	for _, a := range albums {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
func getProjects(c *gin.Context) {
	connStr := "host=localhost user=postgres  port=5434 password=postgres dbname=postgres sslmode=disable"
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select * from \"GoTest\".go_projects")
	fmt.Println(rows)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	projects := []project{}

	for rows.Next() {
		var p project

		err = rows.Scan(&p.ID, &p.Project_Name, &p.Count)
		if err != nil {
			panic(err)
		}
		projects = append(projects, p)
	}
	for _, p := range projects {
		fmt.Println(p.ID, p.Project_Name, p.Count)
	}

	c.IndentedJSON(http.StatusOK, projects)
}
func getProjectsParsed(c *gin.Context) {
	connStr := "host=localhost user=postgres  port=5434 password=postgres dbname=postgres sslmode=disable"
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
	}

	projects := []project{}

	session := dapper.New(db)

	err = session.Find("select * from \"GoTest\".go_projects ", nil).All(&projects)

	if err != nil {
		panic(err)
	}

	for _, p := range projects {
		fmt.Println(p.ID, p.Project_Name, p.Count)
	}

	c.IndentedJSON(http.StatusOK, projects)
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
