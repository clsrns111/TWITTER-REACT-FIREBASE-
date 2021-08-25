import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthService, dbService } from "../firebase";
import Tweet from "../components/Tweet";

function Profile({ isLoggedIn, userObj, refreshUser }) {
  const logOutHandler = () => {
    AuthService.signOut();
    window.location.replace("/");
    refreshUser();
  };

  /* const [gettweet, setgettweet] = useState("");

  console.log(gettweet);

  useEffect(() => {
    dbService.collection("tweet").onSnapshot((snapShot) => {
      const tweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let data = tweetArray.filter((el) => el.creatorId === userObj.uid);
      console.log(data);
      setgettweet(data);
    });
  }, []);
 */
  const [changeEmail, setchangeEamil] = useState("");

  const getMytweet = async () => {
    let data = dbService
      .collection("tweet")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await userObj.updateProfile({ displayName: changeEmail });
    refreshUser();
  };

  useEffect(() => {
    getMytweet();
  }, []);

  return (
    <div>
      <button onClick={logOutHandler}>로그아웃</button>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={changeEmail}
            onChange={(e) => setchangeEamil(e.target.value)}
          />
          <button>변경</button>
        </form>
        {/*         {" "}
        {gettweet.length > 0 ? (
          gettweet.map((el) => (
            <Tweet
              key={el.id}
              tweetObj={el}
              isOwner={el.creatorId === userObj.uid}
            />
          ))
        ) : (
          <h2>게시한 글이 없습니다.</h2>
        )}
 */}{" "}
      </div>
    </div>
  );
}

export default Profile;
