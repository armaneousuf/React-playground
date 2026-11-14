// later plan: add click to place text so a user can write text wherever they want

import { useState, useEffect } from "react";
export default function Main() {
  const [meme, setMeme] = useState({
    imgUrl: "http://i.imgflip.com/1bij.jpg",
    topText: "",
    bottomText: "",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(e) {
    const { value, name } = e.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage() {
    const randomIdx = Math.floor(Math.random() * allMemes.length)
    const newUrl = allMemes[randomIdx].url
    console.log(newUrl)
    setMeme(prevMeme => ({
      ...prevMeme,
      imgUrl: newUrl
    }))
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imgUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
