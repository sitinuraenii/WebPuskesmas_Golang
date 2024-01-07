import React, { useState, useEffect } from "react"; //useeffect menangani pemanggilan API ,usestate untuk mengelola fungsi state di react
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios"; //untuk melakukan permintaan ke database mengirim atau memanggil
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Pasien = () => {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [nama, setNama] = useState("");
  const [usia, setUsia] = useState(0);
  const [jenisKelamin, setJenisKelamin] = useState("L");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showCreate, setshowCreate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDetail, setshowDetail] = useState(false);
  const [showTambah, setshowTambah] = useState(true);

  const tambahUsia = (e) => {
    e.preventDefault();
    setUsia(usia + 1);
  };

  const kurangiUsia = (e) => {
    e.preventDefault();
    if (usia > 0) {
      setUsia(usia - 1);
    }
  };

  useEffect(() => {
    // Fetch data from API using Axios
    axios
      .get("http://localhost:9080/api/pasiens")
      .then((response) => {
        setData(response.data); // Set the fetched data to the state
        setshowCreate(true);
        setShowTable(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const resetForm = () => {
    setNama("");
    setUsia("");
    setJenisKelamin("");
    setAlamat("");
    setDeskripsi("");
  };

  const handleDaftarClick = () => {
    setShowTable(false);
    setshowCreate(false);
    resetForm();
    setshowTambah(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      nama,
      usia,
      jenis_kelamin: jenisKelamin,
      alamat,
      deskripsi,
    };

    if (editMode) {
      handleUpdate(postData);
    } else {
      axios
        .post("http://localhost:9080/api/pasien", postData)
        .then((response) => {
          console.log("Berhasil mengirim data!", response.data);
          alert("Berhasil menambah pasien!");

          // Ambil data terbaru setelah menambahkan data baru
          axios
            .get("http://localhost:9080/api/pasiens")
            .then((response) => {
              setData(response.data);
              setShowTable(true);
              setshowCreate(true);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
            });
        })
        .catch((error) => {
          console.error("Gagal mengirim data:", error);
        });
    }
  };

  const handleidClick = (id) => {
    setSelectedId(id);
    setShowTable(false);
    setshowCreate(true);
    setshowDetail(true);
  };

  useEffect(() => {
    const fetchDataById = async (id) => {
      try {
        const response = await axios.get(`http://localhost:9080/api/pasien/${id}`);
        setSelectedData(response.data);
      } catch (error) {
        console.error("Error fetching data by ID: ", error);
      }
    };

    if (selectedId !== null && selectedId !== undefined) {
      fetchDataById(selectedId);
    }
  }, [selectedId]);

  const handleUpdate = () => {
    const updatedData = {
      nama,
      usia,
      jenis_kelamin: jenisKelamin,
      alamat,
      deskripsi,
    };

    axios
      .put(`http://localhost:9080/api/pasien/${selectedId}`, updatedData)
      .then((response) => {
        console.log("Respon dari server setelah pembaruan:", response.data);
        alert("Berhasil memperbarui pasien!");

        axios
          .get(`http://localhost:9080/api/pasien/${selectedId}`)
          .then((response) => {
            setSelectedData(response.data);
          })
          .catch((error) => {
            console.error("Update data error ", error);
          });

        setData((prevData) => {
          return prevData.map((item) => {
            if (item.id === selectedId) {
              return { ...item, ...updatedData };
            }
            return item;
          });
        });

        setShowTable(true);
        setEditMode(false);
        setshowCreate(true);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Gagal memperbarui pasien!");
      });
  };

  const handleEdit = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedId(selectedItem.id);
      setNama(selectedItem.nama);
      setUsia(selectedItem.usia);
      setJenisKelamin(selectedItem.jenis_kelamin);
      setAlamat(selectedItem.alamat);
      setDeskripsi(selectedItem.deskripsi);
      setShowTable(false);
      setEditMode(true);
      setshowCreate(false);
    } else {
      console.error("Data tidak tersedia!");
    }
  };

  const handleDelete = (selectedId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pasien ini?")) {
      axios
        .delete(`http://localhost:9080/api/pasien/${selectedId}`)
        .then(() => {
          console.log("Berhasil menghapus data!");
          alert("Berhasil menghapus pasien!");

          // Perbarui state setelah penghapusan berhasil
          setData((prevData) => prevData.filter((item) => item.id !== selectedId));

          setShowTable(true);
        })
        .catch((error) => {
          console.error("Gagal menghapus data:", error);
          alert("Gagal menghapus pasien!");
        });
    }
  };

  return (
    <>
      <Navigation />
      {/* section keseluruhan */}
      <section id="pasien">
        <div className="pasien">
          {/* section home add */}
          <section id="tambah">
            <div className="tamabah">
              <div id="tambah" className={`tambah d-flex justify-content-center align-items-center ${showTambah ? "" : "d-none"}`}>
                <div className="row text-center ">
                  <div className="col pt-2 ">
                    <h1>PENDAFTARAN ONLINE</h1>
                    <Button style={{ marginBottom: "10px" }} variant="primary" onClick={handleDaftarClick}>
                      Daftar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* section tabel pendaftar */}
          <section id="pendaftar">
            <div className="pendaftar">
              <div id="pasienTable" className={`row justify-content-center md-1 ${showTable ? "" : "d-none"}`}>
                <div className="col-md-10">
                  <div className="row text-center ">
                    <div className="col pt-5">
                      <h1>PENDAFTAR</h1>
                    </div>
                  </div>
                  <Table striped bordered hover className="text-center">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nama Lengkap</th>
                        <th>Usia</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.nama}</td>
                          <td>{item.usia}</td>
                          <td>{item.jenis_kelamin}</td>
                          <td>{item.alamat}</td>
                          <td>{item.deskripsi}</td>
                          <td>
                            <Button style={{ marginLeft: "10px" }} variant="info" onClick={() => handleEdit(item.id)}>
                              Update
                            </Button>
                            <Button
                              style={{ marginLeft: "10px" }}
                              variant="danger"
                              onClick={() => handleDelete(item.id)} // Tambahkan pemanggilan fungsi handleDelete
                            >
                              Delete
                            </Button>
                            <Button style={{ marginLeft: "10px" }} variant="outline-info" onClick={() => handleidClick(item.id)}>
                              Detail
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Button
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                    variant="primary"
                    onClick={() => {
                      setshowTambah(true);
                      setShowTable(false);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* section mendaftar dan mengupdate */}
          <section id="daftar">
            <div className="daftar">
              <div className="Container">
                <div id="formPasien" className={`row justify-content-center md-1 ${showCreate ? "d-none" : ""}`}>
                  <div className="col-md-7">
                    <div className="card col-md-10 offset-md-4 offset-md-4 mx-auto" style={{ backgroundColor: "#fffde4" }}>
                      <div className="row text-center ">
                        <div className="col pt-3">
                          <h1>{editMode ? "UPDATE DATA" : "SILAHKAN DAFTAR"}</h1>
                        </div>
                      </div>
                      <div className="card-body">
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-2" controlId="nama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Nama" />
                          </Form.Group>

                          <Form.Label>Usia</Form.Label>
                          <div className="input-group col-1">
                            <Button variant="light" onClick={kurangiUsia} disabled={usia <= 0}>
                              -
                            </Button>
                            <Form.Control type="number" value={usia} onChange={(e) => setUsia(e.target.value)} placeholder="Usia" min={0} />

                            <Button variant="light" onClick={tambahUsia}>
                              +
                            </Button>
                          </div>

                          <Form.Label as="legend" column sm={2}>
                            Jenis Kelamin
                          </Form.Label>
                          <Form.Check type="radio" label="Laki-laki" name="jenisKelamin" value="laki-laki" checked={jenisKelamin === "laki-laki"} onChange={() => setJenisKelamin("laki-laki")} />
                          <Form.Check type="radio" label="Perempuan" name="jenisKelamin" value="perempuan" checked={jenisKelamin === "perempuan"} onChange={() => setJenisKelamin("perempuan")} />
                          <Form.Group className="mb-2" controlId="alamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Masukkan Alamat" />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="deskripsi">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control type="textarea" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Masukkan Deskripsi" />
                          </Form.Group>
                          <Button className="btn btn-success" onClick={(event) => (editMode ? handleUpdate(selectedId) : handleSubmit(event))}>
                            {editMode ? "Update" : "Save"}
                          </Button>
                          <Button
                            style={{ marginTop: "5px", marginLeft: "10px" }}
                            variant="light"
                            onClick={() => {
                              if (editMode) {
                                handleUpdate(selectedId);
                                setShowTable(true);
                                setshowCreate(true);
                                setshowTambah(false);
                              } else {
                                setShowTable(false);
                                setshowCreate(true);
                                setshowTambah(true);
                              }
                            }}
                          >
                            Cancel
                          </Button>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* section detail */}
          <section id="detail">
            {selectedData && !showTable && !editMode && (
              <div className="detail">
                <div className={`row justify-content-center mt-2 ${showDetail ? "" : "d-none"}`}>
                  <div className="col-md-7">
                    <Card style={{ width: "50rem", backgroundColor: "#c7e6fd" }}>
                      <div className="row text-center ">
                        <div className="col pt-3">
                          <h1>DETAIL PENDAFTAR</h1>
                        </div>
                      </div>
                      <Card.Body>
                        <Button style={{ marginBottom: "5px" }} variant="primary" onClick={() => handleEdit(selectedData.id)}>
                          Update
                        </Button>
                        <Button style={{ marginBottom: "5px", marginLeft: "10px" }} variant="danger" onClick={() => handleDelete(selectedData.id)}>
                          Delete
                        </Button>
                        <Card.Text>
                          <p>ID: {selectedData.id}</p>
                          <p>Nama: {selectedData.nama}</p>
                          <p>Usia: {selectedData.usia}</p>
                          <p>Jenis Kelamin: {selectedData.jenis_kelamin}</p>
                          <p>Alamat: {selectedData.alamat}</p>
                          <p>Deskripsi: {selectedData.deskripsi}</p>
                        </Card.Text>
                        <Button style={{ marginTop: "5px" }} variant="primary" onClick={() => setShowTable(true)}>
                          Back
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pasien;
