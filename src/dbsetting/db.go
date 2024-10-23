package dbsetting

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gocraft/dbr"

	"log"
)

var db *sql.DB

func OpenGetSqlite() *dbr.Connection {
	//open a db connection
	//conn, _ := dbr.Open("mysql", USER+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DB, nil)
	//conn.SetMaxOpenConns(10)
	conn, _ := dbr.Open("sqlite3", "file:insDB.db", nil)
	//conn.SetMaxOpenConns(10)
	return conn
}

func OpenMariaDB() *dbr.Connection {
	var conn *dbr.Connection
	conn, _ = dbr.Open("mysql", "kankala:Kk13123!@#@tcp(192.168.10.106:3306)/kankaladb?charset=utf8", nil)

	return conn

}

func OpenGetDB() *sql.DB {
	//open a db connection
	var err error
	db, err = sql.Open("mysql", "root:13123@tcp(127.0.0.1:3306)/kankaladb?charset=utf8")
	if err != nil {
		panic(err)
		log.Fatal(err)
	}

	return db
}
