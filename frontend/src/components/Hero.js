import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect, useState } from "react"; //useeffect unutk menangani penmanggilan API , usestate untuk mengelola fungsi state di react

const Hero = () => {
  const [loopNum, setLoopNum] = useState(0); //state untuk menyimpan data jumlah loop
  const [isDeleting, setIsDeleting] = useState(false); //menyimpan data apakah teks sedang dihapus atau tidak
  const toRotate = ["SELAMAT DATANG", "DI PUSKESMAS BANTARUJEG"]; //array untuk menyimpan data teks yang akan ditampilkan
  const [text, setText] = useState(" "); //state untuk menyimpan data teks yang akan ditampilkan
  const [delta, setDelta] = useState(300 - Math.random() * 1000); //state untuk menyimpan data delta untuk mengatur waktu
  const period = 2000; //variabel untuk menyimpan data periode

  //useEffect untuk mengatur animasi teks
  useEffect(() => {
    let ticker = setInterval(() => {
      //setInterval untuk mengatur waktu
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    }; //clearInterval untuk menghentikan waktu
  }, [text]);

  //fungsi untuk mengatur animasi teks
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updateText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updateText);
    // cek apakah teks sudah selesai ditampilkan dan dihapus
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updateText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updateText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <>
      <Navigation />
      <section id="Hero">
        <div className="Hero text-center text-white ">
          <div className="Container">
            <div className="content text-center">
              <h1>
                {" "}
                <span className="wrap">{text}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hero;
