import styles from "./index.module.scss";

import DefaultAvatar from "@/shared/images/default/avatar.svg?react";

import Accept from "@/shared/svg/friend/accept.svg?react";
import Reject from "@/shared/svg/friend/reject.svg?react";
import Message from "@/shared/svg/friend/message.svg?react";
import UserPlus from "@/shared/svg/friend/userPlus.svg?react";

export type friendItem = {
  value: {
    id: number;
    login: string;
    UID: string;
    avatarUrl: string;
  };
  variant: "friends" | "requests" | "search";
  onAccept?: () => void;
  onReject?: () => void;
  onAdd?: () => void;
};

export const FriendCard = ({
  value,
  variant,
  onAccept,
  onReject,
  onAdd,
}: friendItem) => {
  return (
    <div className={styles.Card}>
      <div className={styles.CardContent}>
        <div className={styles.CardWrapp}>
          {value.avatarUrl ? (
            <img
              src={value.avatarUrl}
              alt="user-img"
              className={styles.CardAvatar}
            />
          ) : (
            <DefaultAvatar className={styles.CardAvatar} />
          )}
        </div>
        <div className={styles.CardInfo}>
          <h3 className={`${styles.CardInfoLogin} h1`}>
            {value?.login ?? "failed"}
          </h3>
          <span className={styles.CardInfoId}>@{value?.UID ?? "failed"}</span>
        </div>
      </div>
      {variant === "requests" && (
        <div className={styles.CardAction}>
          <button
            onClick={onAccept}
            className={`${styles.CardBtnAccept} ${styles.CardBtn}`}
          >
            <Accept className={styles.CardBtnSvg} />
          </button>
          <button
            onClick={onReject}
            className={`${styles.CardBtnReject} ${styles.CardBtn}`}
          >
            <Reject className={styles.CardBtnSvg} />
          </button>
        </div>
      )}

      {variant === "search" && (
        <button
          onClick={onAdd}
          className={`${styles.CardBtnAdd} ${styles.CardBtn}`}
        >
          <UserPlus className={styles.CardBtnSvg} />
        </button>
      )}

      {variant === "friends" && (
        <button className={`${styles.CardBtnMessage} ${styles.CardBtn}`}>
          <Message className={styles.CardBtnSvg} />
        </button>
      )}
    </div>
  );
};
