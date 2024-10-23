package router

import (
	"rgt-test/src/api"

	"github.com/gin-gonic/gin"
)

func Routes(route *gin.Engine) {
	books := route.Group("/api/books")
	books.GET("", api.BooksGet)
	books.POST("", api.BooksInsert)
	booksId := route.Group("/api/books/:id")
	booksId.PUT("", api.BooksUpdate)
	booksId.DELETE("", api.BooksDelete)

	// setup := route.Group("/api/setup")
	// setup.PUT("", api.SetupPut)

	// port := route.Group("/api/using_port")
	// port.GET("", api.GetPort)

	// referenceConfig := route.Group("/api/referenceConfig")
	// referenceConfig.GET("", api.GetReferenceConfig)
	// referenceConfig.PUT("", api.PutReferenceConfig)

}
