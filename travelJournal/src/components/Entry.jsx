import markerImg from "../assets/marker.svg";
export default function Entry({img, title, country, googleMapsLink, dates, text}) {
  return (
    <article>
      <div className="panels">
        <div className="rigth-panel">
          <img
            className="main-img"
            src={img.src}
            alt={img.alt}
          />
        </div>
        <div className="left-panel">
          <div className="data">
            <img src={markerImg} alt="images of marker" />
            <p>{country}</p>
            <a href={googleMapsLink}>View on Google Maps</a>
          </div>
          <div className="details">
            <h2>{title}</h2>
            <p>{dates}</p>
            <p>
              {text}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
