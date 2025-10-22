import { useGetFriends } from "../../model/querry";

import { FriendCard } from "@/entities/friend/Card";

import styles from "./style.module.scss";

export const Friends = () => {
  const { isLoading, isError } = useGetFriends();

  const data = {
    message: "string",
    success: true,
    friends: [
      {
        id: 2,
        login: "ardark",
        UID: "fff",
        avatarUrl:
          "https://i.pinimg.com/1200x/dc/f2/ea/dcf2eae56177194754e85ce79c6d3f74.jpg",
      },
    ],
  };

  return (
    <>
      <div className={styles.FriendsHead}></div>
      <div className={styles.FriendsBody}>
        {isLoading && <p>Loading...</p>}

        {isError && <p>Something went wrong 😔</p>}

        {!isLoading && !isError && !data?.friends?.length && (
          <p>No friends yet 😢</p>
        )}

        {!isLoading &&
          !isError &&
          data?.friends?.map((obj) => (
            <FriendCard variant="friends" value={obj} key={obj.id} />
          ))}
      </div>
    </>
  );
};
