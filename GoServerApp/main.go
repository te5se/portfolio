package main

import (
	_ "portfolio/server-app/docs"

	"portfolio/server-app/factories/connectionFactory"
	"portfolio/server-app/projects/adminProject/controllers/projectController"
	"portfolio/server-app/projects/adminProject/services"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	_ "github.com/lib/pq/auth/kerberos"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.uber.org/dig"
)

var factory connectionFactory.ConnectionFactory

// @title TagService
// @description asdf
func main() {
	router := gin.Default()

	container := SetupDependencyInjection()

	router.Use(CORSMiddleware())
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	projectController.SetupController(router, container)
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
