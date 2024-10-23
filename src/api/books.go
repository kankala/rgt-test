package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"reflect"
	"rgt-test/src/dbsetting"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type BookSt struct {
	Idx    float64 `db:"idx" json:"idx"`
	Name   string  `db:"name" json:"name"`
	Writer string  `db:"writer" json:"writer"`
	Count  float64 `db:"count" json:"count"`
}

type RequestSt struct {
	Body BodySt `json:"body"`
}
type BodySt struct {
	Book BookSt `json:"item"`
}

func BooksGet(c *gin.Context) {

	con := dbsetting.OpenMariaDB()
	sess := con.NewSession(nil)

	paramPairs := c.Request.URL.Query()
	//fmt.Printf("%v \r\n", paramPairs)

	defer func() {
		sess.Close()
		con.Close()
	}()
	var bookList []*BookSt
	//book := new(BookSt)

	useSql := ""
	searchWriter := paramPairs["writer"]
	searchName := paramPairs["name"]
	if searchWriter != nil {
		useSql += " and writer LIKE '%" + searchWriter[0] + "%'"
	}
	if paramPairs["name"] != nil {

		useSql += " and name LIKE '%" + searchName[0] + "%'"
	}

	// sess.Select("*").From("booklist").
	// 	OrderDesc("idx").Load(&bookList)
	_, err := sess.SelectBySql("select * FROM booklist " +
		"WHERE 1=1" + useSql + " Order by idx DESC").
		Load(&bookList)
	if err != nil {
		println(err.Error())
	}

	if len(bookList) >= 1 {
		configJson, err := json.MarshalIndent(bookList, "", "  ")
		if err != nil {
			log.Fatal(err)
			c.JSON(404, gin.H{"error": "json fail"})
		} else {
			c.JSON(200, string(configJson))
		}

	}
}
func BooksUpdate(c *gin.Context) {

	//id := c.Param("id")
	//book := BookSt{}
	//buf := make([]byte, 1024)

	var request RequestSt
	c.BindJSON(&request)
	book := request.Body.Book

	//var data map[string]interface{}
	//json.Unmarshal([]byte(reqBody), &data)
	//mapstructure.Decode(request, &book)

	//fmt.Printf("%v \r\n", request.Body.Book)
	con := dbsetting.OpenMariaDB()
	sess := con.NewSession(nil)

	defer func() {
		sess.Close()
		con.Close()
	}()
	//book := new(BookSt)
	_, err := sess.Update("booklist").
		Set("name", book.Name).
		Set("writer", book.Writer).
		Set("count", book.Count).
		Where("idx = ?", book.Idx).
		Exec()
	checkError(err)
	c.JSON(200, "update ok")
}

func BooksInsert(c *gin.Context) {
	var request RequestSt
	c.BindJSON(&request)
	book := request.Body.Book

	con := dbsetting.OpenMariaDB()
	sess := con.NewSession(nil)

	tx, err := sess.Begin()

	checkError(err)

	defer func() {
		tx.RollbackUnlessCommitted()
		sess.Close()
		con.Close()
	}()
	//car_i := &customStruct.CarSt{}

	//fieldString := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(fields)), ", "), "[]")
	//jsonString, _ := json.Marshal(car)
	//err := json.Unmarshal(jsonString, car_i)
	// if err != nil {
	// 	log.Fatalf(err.Error())
	// }

	fields := DBFields(book)
	fields = fields[1:]

	i, err := sess.InsertInto("booklist").
		Columns(fields...).
		Record(book). // Watch out! this is not Values
		Exec()
	checkError(err)
	lastIndex64, err := i.LastInsertId()
	_ = int(lastIndex64)
	//println(lastIndex)
	checkError(err)
	tx.Commit()

	c.JSON(200, "insert ok")

}

func BooksDelete(c *gin.Context) {
	id := c.Param("id")
	con := dbsetting.OpenMariaDB()
	sess := con.NewSession(nil)

	tx, err := sess.Begin()
	defer func() {
		tx.RollbackUnlessCommitted()
		sess.Close()
		con.Close()
	}()

	if err != nil {
	}

	_, err = sess.DeleteFrom("booklist").
		Where("idx = ?", id).
		Exec()
	checkError(err)

	tx.Commit()
	c.JSON(200, "delete ok")
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func arrayToString(A []int, delim string) string {

	var buffer bytes.Buffer
	for i := 0; i < len(A); i++ {
		buffer.WriteString(strconv.Itoa(A[i]))
		if i != len(A)-1 {
			buffer.WriteString(delim)
		}
	}

	return buffer.String()
}

func aizuArray(A string, N string) []int {
	strs := strings.Split(A, N)
	ary := make([]int, len(strs))
	for i := range ary {
		ary[i], _ = strconv.Atoi(strs[i])
	}
	return ary
}

func DBFields(values interface{}) []string {
	field := ""
	v := reflect.ValueOf(values)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	fields := []string{}
	if v.Kind() == reflect.Struct {
		for i := 0; i < v.NumField(); i++ {
			field = v.Type().Field(i).Tag.Get("db")
			if field != "" {
				fields = append(fields, field)
			}
		}
		return fields
	}
	if v.Kind() == reflect.Map {
		for _, keyv := range v.MapKeys() {
			fields = append(fields, keyv.String())
		}
		return fields
	}
	panic(fmt.Errorf("DBFields requires a struct or a map, found: %s", v.Kind().String()))
}

// sess.SelectBySql(`
// 		select cl.*
// 		FROM carlist as cl
// 			WHERE cl.idx IN (SELECT carlist_Fk FROM abs_info where transmit = ?)
// 			OR cl.idx IN (SELECT carlist_Fk FROM sus_info where transmit = ?)
// 			OR cl.idx IN (SELECT carlist_Fk FROM hlt_info where transmit = ?)
// 			OR cl.idx IN (SELECT carlist_Fk FROM gs_info where transmit = ?)
// 			OR cl.idx IN (SELECT carlist_Fk FROM slm_info where transmit = ?)
// 		Order by cl.idx DESC
// 	`, 1, 1, 1, 1, 1).Load(&carList)

// useSql := ""
// 	useSqlFlag := false
// 	if !useSqlFlag {
// 		useSqlFlag = true
// 		useSql += " and ("
// 	}
// 	useSql += "cl.idx in (select carlist_Fk from abs_info where (checkA = 1 or checkB = 1 or checkS = 1) and laneNo = " + strconv.Itoa(laneNo) + ")"

// 	if !useSqlFlag {
// 		useSqlFlag = true
// 		useSql += " and ("
// 	} else {
// 		useSql += " or "
// 	}
// 	useSql += "cl.idx in (select carlist_Fk from sus_info where checkUp = 1 and laneNo = " + strconv.Itoa(laneNo) + ")"
// _, err := sess.SelectBySql("select cl.* FROM carlist as cl " +
// 		"WHERE cl.orderTime >= '" + timeText + "'" + useSql).
// 		Load(&carList)
// 	if err != nil {
// 		println(err.Error())
// 	}
