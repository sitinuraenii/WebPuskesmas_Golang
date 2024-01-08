package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close() //menutup koneksi 
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter() //membuat router menggunakan package mux
	router.HandleFunc("/api/pasien", //menetapkan rute dengan memanggil func getpasien dlaam method get
		GetPasien).Methods("GET")
	router.HandleFunc("/api/pasien", 
		CreatePasien).Methods("POST") 
	router.HandleFunc("/api/pasien/{id}",
		GetPasienid).Methods("GET") 
	 router.HandleFunc("/api/pasien/{id}",
	 	UpdatePasien).Methods("PUT") 
	 router.HandleFunc("/api/pasien/{id}",
		DeletePasien).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

//Get all pasien
func GetPasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") //untuk memberitahu  bahwa respons yang dikirimkan akan berupa data JSON
	var pasiens []Pasien

	result, err := db.Query("SELECT id, nama," +
		"usia,jenis_kelamin,alamat,deskripsi from pasien_puskesmas_sitinuraeni")
	if err != nil {
		panic(err.Error()) //jika salah maka program berhenti dan menampilkan pesan error
	}
	defer result.Close() //setelah selesai menggunakan  query (result), koneksi tersebut akan ditutup
	for result.Next() { //mengambil baris dari hasil query
		var pasien Pasien
		err := result.Scan(&pasien.ID, &pasien.Nama,
			&pasien.Usia, &pasien.Jenis_Kelamin, &pasien.Alamat, &pasien.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		pasiens = append(pasiens, pasien) //menambah slice pasiens
	}
	json.NewEncoder(w).Encode(pasiens) //mengambil slice pasiens yang berisi query
}

//Create pasien
 func CreatePasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO pasien_puskesmas_sitinuraeni(nama," +
		"usia,jenis_kelamin,alamat,deskripsi) VALUES(?,?,?,?,?)") //persiapan memasukan data ke db
	if err != nil {
		panic(err.Error())
	}
 	body, err := ioutil.ReadAll(r.Body) //membaca seluruh isi dari body
	if err != nil {
 		panic(err.Error())
	}
 	keyVal := make(map[string]string) //membuat peta yg akan menampung data
	json.Unmarshal(body, &keyVal) //menguraikan json yang dimasukan kedalam keyval
	nama := keyVal["nama"]
	usia := keyVal["usia"]
	jenis_kelamin := keyVal["jenis_kelamin"]
	alamat := keyVal["alamat"]
	deskripsi := keyVal["deskripsi"]
	// fmt.Println(jenis_kelamin)
	_, err = stmt.Exec(nama, usia, jenis_kelamin, alamat, deskripsi)//eksekusi pernyataan sql
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New Pasien was created")
}

//Get pasien by ID
func GetPasienid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) //mengambil parameter id dari URL
	result, err := db.Query("SELECT id, nama,"+
		"usia,jenis_kelamin,alamat,deskripsi from pasien_puskesmas_sitinuraeni WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var pasien Pasien
	for result.Next() {
		err := result.Scan(&pasien.ID, &pasien.Nama,
			&pasien.Usia, &pasien.Jenis_Kelamin, &pasien.Alamat, &pasien.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(pasien) //mengubah data ke format JSON dan mengirimkannya kembali sebagai respons
}

	//Update pasien
	func UpdatePasien(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		params := mux.Vars(r) //mendapatkan parameter dari URL
		stmt, err := db.Prepare("UPDATE pasien_puskesmas_sitinuraeni SET nama = ?," +
			"usia= ?, jenis_kelamin=?, alamat=?, deskripsi=? WHERE id = ?")

		if err != nil {
			panic(err.Error())
		}
		body, err := ioutil.ReadAll(r.Body) //membaca seluruh isi dari body
		if err != nil {
			panic(err.Error())
		}
		keyVal := make(map[string]string)
		json.Unmarshal(body, &keyVal)
		nama := keyVal["nama"]
		usia := keyVal["usia"]
		jenis_kelamin := keyVal["jenis_kelamin"]
		alamat := keyVal["alamat"]
		deskripsi := keyVal["deskripsi"]
		_, err = stmt.Exec( nama, usia, jenis_kelamin, alamat, deskripsi, params["id"]) //eksekusi sql
		if err != nil {
			panic(err.Error())
		}
		fmt.Fprintf(w, "Pasien with ID = %s was updated",
			params["id"])
	}


func DeletePasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM pasien_puskesmas_sitinuraeni WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Pasien with ID = %s was deleted",
		params["id"])
}

type Pasien struct {
	ID        string `json:"id"`
	Nama		   string `json:"nama"`
	Usia      string `json:"usia"`
	Jenis_Kelamin  string `json:"jenis_kelamin"`
	Alamat    string `json:"alamat"`
	Deskripsi	string `json:"deskripsi"`

}


var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2206608_siti_nuraeni_uas")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

//func akses server yang berada di golang
func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
