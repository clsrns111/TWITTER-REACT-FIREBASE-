import React, { useEffect, useState } from "react";
import { dbService, StorageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
function MakeTweet({ userObj }) {
  const [tweet, settweet] = useState("");
  const [img, setimg] = useState("");

  const fileSubmitHandler = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      } = e;
      setimg(result);
    };
    /*   img.src = URL.createObjectURL(e.target.files[0]);
     */
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    if (img) {
      const fileRef = StorageService.ref().child(`강인경/${uuidv4()}`);
      const res = await fileRef.putString(img, "data_url");
      url = await fileRef.getDownloadURL();
    }

    dbService.collection("tweet").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      img: url,
    });
    settweet("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={(e) => {
            settweet(e.target.value);
          }}
        ></input>
        <input type="file" accept="image/*" onChange={fileSubmitHandler} />
        <input type="submit" value="트윗" />
        {img && (
          <div>
            <img src={img} className="img" width="100" height="100" />
            <button onClick={() => setimg("")}>취소</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default MakeTweet;
