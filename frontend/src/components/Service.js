import Navigation from "./Navigation";
import Footer from "./Footer";
import keg1 from "../assets/img/peresmian.jpg";
import keg2 from "../assets/img/pelayanan.jpg";
import keg3 from "../assets/img/keg3.jpg";

const Service = () => {
  return (
    <>
      <Navigation />
      <section id="service">
        <div className="service text-center text-white">
          <div className="Container">
            <div className="row text-center mb-5">
              <div className="col">
                <h1>Kegiatan</h1>
              </div>
            </div>
            <div className="row fs-5">
              <div className="col-md-4 mb-3">
                <div className="card text-center image" style={{ width: "18rem", height: "auto" }}>
                  <img className="card-img-top" src={keg1} alt="keg1" />
                  <div className="card-body">
                    <div className="text center fw-bold">Peresmian</div>
                    <p className="card-text">Kegiatan Peresmian gedung oleh bupati Majalengka</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-center image" style={{ width: "18rem", height: "auto" }}>
                  <img className="card-img-top" src={keg2} alt="keg2" />
                  <div classNames="card-body">
                    <div className="text center fw-bold">Pelayanan</div>
                    <p classNames="card-text">Kegiatan program bakti sosial operasi katarak massal secara gratis</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-center image" style={{ width: "18rem", height: "auto" }}>
                  <img className="card-img-top" src={keg3} alt="keg3" />
                  <div className="card-body">
                    <div className="text center fw-bold">Kunjungan</div>
                    <p className="card-text">kegiatan kunjungan ke blok Cisaar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Service;
