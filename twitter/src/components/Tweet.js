import React, { useEffect, useState } from "react";
import { dbService, StorageService } from "../firebase";

function tweet({ tweetObj, isOwner }) {
  const [editing, setediting] = useState(false);
  const [editText, seteditText] = useState("");

  const onDeleteHandler = () => {
    const ok = window.confirm("해당 게시물을 삭제하시겠습니까?");
    if (ok) {
      dbService.collection("tweet").doc(`${tweetObj.id}`).delete();
      StorageService.refFromURL(tweetObj.img).delete();
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dbService
      .collection("tweet")
      .doc(`${tweetObj.id}`)
      .set({
        ...tweetObj,
        text: editText,
      });
    setediting((prev) => !prev);
  };

  const onEditHandler = () => {
    setediting((prev) => !prev);
  };

  return (
    <>
      <div>
        {tweetObj.img ? (
          <img src={tweetObj.img} width="400" height="400" />
        ) : null}
        <h4>{tweetObj.text}</h4>
        {isOwner ? (
          <>
            <button onClick={onDeleteHandler}>삭제</button>
            <button onClick={onEditHandler}>수정</button>
          </>
        ) : null}
      </div>
      <div>
        {editing ? (
          <form>
            <input
              type="text"
              placeholder="수정할 내용을 입력하세요"
              value={editText}
              onChange={(e) => seteditText(e.target.value)}
            />
            <button onClick={onSubmitHandler}>수정</button>
          </form>
        ) : null}
      </div>
    </>
  );
}

export default tweet;
