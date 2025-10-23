import clsx from "clsx";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { FriendCard } from "@/entities/friend/Card";
import ChevronDown from "@/shared/svg/arrows/chevronDown.svg?react";
import styles from "./style.module.scss";

import {
  useGetFriends,
  useReceivedFriends,
  useSendedFriends,
  usePostAccept,
  usePostDecline,
} from "../../model/querry";

export const Friends = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sendOpen, setSendOpen] = useState<boolean>(false);

  const friendQuerry = useGetFriends();
  const requestsQuerry = useReceivedFriends();
  const sendedFriendQuerry = useSendedFriends();
  const AcceptQuerry = usePostAccept();
  const DeclineQuerry = usePostDecline();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(!open), 180000);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!sendOpen) return;
    const timer = setTimeout(() => setSendOpen(!sendOpen), 180000);
    return () => clearTimeout(timer);
  }, [sendOpen]);

  const handleAccept = (id: number) => {
    AcceptQuerry.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getReceivedFriends"] });
        queryClient.invalidateQueries({ queryKey: ["getFriends"] });
      },
    });
  };

  const handleDecline = (id: number) => {
    DeclineQuerry.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getReceivedFriends"] });
      },
    });
  };

  return (
    <>
      <div className={styles.FriendsHead}>
        <div className={styles.FriendsHeadPromo}>
          <ChevronDown
            onClick={() => setOpen(!open)}
            className={clsx(styles.FriendsArrow, open && styles.isActive)}
          />
          <span>Запросы:</span>
        </div>
        <div
          className={clsx(
            styles.FriendsHeadNotification,
            open && styles.isActive
          )}
        >
          {requestsQuerry.data?.friends?.filter(Boolean).map((obj) => (
            <FriendCard
              variant="requests"
              value={obj}
              key={obj.UID}
              onAccept={() => handleAccept(obj.id)}
              onReject={() => handleDecline(obj.id)}
            />
          ))}
          {!requestsQuerry.isLoading &&
            !requestsQuerry.isError &&
            !requestsQuerry.data?.friends?.length && (
              <p>No friend requests 📭</p>
            )}
          {requestsQuerry.isLoading && <p>Loading...</p>}
        </div>
      </div>
      <div className={styles.FriendsSended}>
        <div className={styles.FriendsSendedPromo}>
          <ChevronDown
            onClick={() => setSendOpen(!sendOpen)}
            className={clsx(styles.FriendsArrow, sendOpen && styles.isActive)}
          />
          <span>Отправленные запросы:</span>
        </div>
        <div
          className={clsx(
            styles.FriendsSendedNotification,
            sendOpen && styles.isActive
          )}
        >
          {sendedFriendQuerry.data?.friends?.map((obj) => (
            <FriendCard variant="sended" value={obj} key={obj.UID} />
          ))}
          {!sendedFriendQuerry.isLoading &&
            !sendedFriendQuerry.isError &&
            !sendedFriendQuerry.data?.friends?.length && (
              <p>You haven’t sent any requests 📨</p>
            )}
          {sendedFriendQuerry.isLoading && <p>Loading...</p>}
        </div>
      </div>
      <div className={styles.FriendsBody}>
        {friendQuerry.isLoading && <p>Loading...</p>}

        {friendQuerry.isError && <p>Something went wrong 😔</p>}

        {!friendQuerry.isLoading &&
          !friendQuerry.isError &&
          !friendQuerry.data?.friends?.length && (
            <p>Make some new friends 💫</p>
          )}

        {!friendQuerry.isLoading &&
          !friendQuerry.isError &&
          friendQuerry.data?.friends?.map((obj) => (
            <FriendCard variant="friends" value={obj} key={obj.UID} />
          ))}
      </div>
    </>
  );
};
