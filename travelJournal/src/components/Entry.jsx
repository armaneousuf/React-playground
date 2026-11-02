import markerImg from "../assets/marker.svg";
export default function Entry() {
  return (
    <article>
      <div className="panels">
        <div className="rigth-panel">
          <img
            className="main-img"
            src="https://scrimba.com/links/travel-journal-japan-image-url"
            alt="images of mountain"
          />
        </div>
        <div className="left-panel">
          <div className="data">
            <img src={markerImg} alt="images of marker" />
            <p>JAPAN</p>
            <a href="#">View on Google Maps</a>
          </div>
          <div className="details">
            <h2>Mount Fuji</h2>
            <p>12 Jan, 2023 - 24 Jan, 2023</p>
            <p>
              Mount Fuji is the tallest mountain in Japan, standing at 3,776
              meters (12,380 feet). Mount Fuji is the single most popular
              tourist site in Japan, for both Japanese and foreign tourists.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
