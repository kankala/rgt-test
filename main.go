package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"reflect"
	"time"

	router "rgt-test/src"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/sync/errgroup"
)

var (
	g errgroup.Group
)

func main() {

	fmt.Println("Hello World!")

	err := godotenv.Load("/usr/serverdata/rgtServer/.env_release")
	//err := godotenv.Load(".env_local")

	if err != nil {
		log.Fatal(".env 파일을 찾을 수 없습니다.")
	}

	hostip := os.Getenv("host_ip")
	port_e := os.Getenv("port_e")

	goServer1 := &http.Server{
		Addr:         hostip + ":" + port_e,
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
	err = goServer1.ListenAndServe()

	if err != nil {
		log.Fatal(err.Error())
	}
	//goServer1.ListenAndServeTLS("cert.pem", "privkey.pem")

}
func goServer() http.Handler {

	//gin.SetMode(gin.ReleaseMode)
	e := gin.Default()
	e.Use(gin.Recovery())

	host := os.Getenv("host")
	port_f := os.Getenv("port_f")
	configx := cors.Config{
		//AllowOrigins:     []string{"http://dandadan.synology.me:4300", "http://dandadan.synology.me"},
		AllowOrigins:     []string{"http://" + host + ":" + port_f, "http://" + host},
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
