package connectionFactory

import (
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

type ConnectionFactory struct {
}

func ProvideConnectionFactory() ConnectionFactory {
	var factory ConnectionFactory

	factory.InitializeConnection()
	return factory
}

func (c ConnectionFactory) InitializeConnection() {
	connStr := "host=localhost user=postgres  port=5434 password=postgres dbname=postgres sslmode=disable"
	dbLocal, err := sqlx.Open("postgres", connStr)

	db = dbLocal.Unsafe()

	if err != nil {
		panic(err)
	}

}
func (c ConnectionFactory) GetConnection() *sqlx.DB {
	return db
}
