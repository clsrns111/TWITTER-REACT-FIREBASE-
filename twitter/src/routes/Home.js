import React, { useEffect, useState } from "react";
import { dbService, firebaseInstance, StorageService } from "../firebase";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from "uuid";

function Home({ userObj }) {
  const [tweet, settweet] = useState("");
  const [gettweet, setgettwwet] = useState([]);
  const [img, setimg] = useState("");
  const [imgUrl, setimgUrl] = useState("");

  const getTweets = async () => {
    const data = await dbService.collection("tweet").get();
    data.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setgettwwet((prev) => [tweetObj, ...prev]);
      console.log(gettweet);
    });
  };

  useEffect(() => {
    getTweets();
    dbService.collection("tweet").onSnapshot((snapShot) => {
      const tweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setgettwwet(tweetArray);
    });
  }, []);

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

  const onCancelHandler = () => {
    setimg("");
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
            <button onClick={onCancelHandler}>취소</button>
          </div>
        )}
      </form>
      <div>
        {gettweet.map((el) => (
          <Tweet
            key={el.id}
            tweetObj={el}
            isOwner={el.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
