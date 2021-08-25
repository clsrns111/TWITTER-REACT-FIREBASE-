import React, { useEffect, useState } from "react";
import { dbService, firebaseInstance, StorageService } from "../firebase";
import Tweet from "../components/Tweet";

import MakeTweet from "../components/MakeTweet";

function Home({ userObj }) {
  const [gettweet, setgettwwet] = useState([]);

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

  return (
    <div>
      <div>
        <MakeTweet userObj={userObj} />
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
