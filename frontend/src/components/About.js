import Card from "react-bootstrap/Card";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { CardBody } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Navigation />
      <section id="About">
        <div className="About text-center">
          <div className="Container">
            <div className="row justify-content-center fs-5">
              <div className="col-md-6 text-center mb-1">
                <Card style={{ backgroundColor: "#c7e6fd" }}>
                  <CardBody>
                    <h1>About</h1>
                    <Card.Text>Salah satu Puskesmas yang berada di daerah kecamatan Bantarujeg. Puskesmas ini pindah yanga awalnya berada di dekat kecamatan sekarang pindah tempat ke Jl. Wadowetan </Card.Text>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
