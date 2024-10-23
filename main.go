package main

import (
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	router "rgt-test/src"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"
)

var (
	g errgroup.Group
)

func main() {

	fmt.Println("Hello World!")

	goServer1 := &http.Server{
		Addr:         "192.168.10.106:4301",
		Handler:      goServer(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// g.Go(func() error {
	// 	return goServer1.ListenAndServe()
	// })
	defer func() {
		if r := recover(); r != nil {
			var err error
			if reflect.TypeOf(r) == reflect.TypeOf("string") {
				log.Println(r)
			} else if reflect.TypeOf(r) == reflect.TypeOf(err) {
				log.Println(r.(error).Error())
			}
		}
	}()

	goServer1.ListenAndServe()

}
func goServer() http.Handler {

	//gin.SetMode(gin.ReleaseMode)
	e := gin.Default()
	e.Use(gin.Recovery())

	configx := cors.Config{
		AllowOrigins:     []string{"http://dandadan.synology.me", "http://dandadan.synology.me:4300"},
		AllowMethods:     []string{"POST", "PUT", "DELETE", "GET", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	//configx.AddAllowHeaders("authorization")
	//configx.AddAllowHeaders("Content-Type", "application/json")
	//configx.AddAllowHeaders("Accept", "application/json")

	//configx.AllowCredentials = true
	//configx.AllowAllOrigins = true
	e.Use(cors.New(configx))
	//configx := cors.DefaultConfig()

	//e.Use(CORSMiddleware())
	router.Routes(e)
	e.Use(static.Serve("/", static.LocalFile("./res/dist/res/", true)))
	e.MaxMultipartMemory = 8 << 20
	return e
}
