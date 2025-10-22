import { Input } from "@/shared/ui/input";
import styles from "./style.module.scss";
import { Button } from "@/shared/ui/ButtonBase";
import { useEffect, useState } from "react";
import { usePostSend } from "../../model/querry";
import axios from "axios";

export const FriendsAdd = () => {
  const [UID, setUID] = useState("");
  const { mutate, isPending, isSuccess, isError } = usePostSend();

  const [alert, setAlert] = useState<string>();

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      setAlert("");
    }, 60000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleClick = () => {
    mutate(UID, {
      onSuccess: (succes) => {
        console.log(succes);
        setAlert(succes.message);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setAlert(error.response?.data?.message ?? "Ошибка соединения");
        } else {
          setAlert("Неизвестная ошибка");
        }
      },
    });
  };

  return (
    <div className={styles.FriendsPage}>
      <div className={styles.FriendsForm}>
        <label htmlFor="uid" className={styles.FriendsLabel}>
          UID:
        </label>
        <div className={styles.FriendsWrapper}>
          <Input
            id="uid"
            placeholder="@"
            value={UID}
            onChange={(e) => setUID(e.target.value)}
          />
        </div>
        <Button
          className={styles.FriendsButton}
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? "Отправка..." : "Добавить"}
        </Button>
      </div>
      <div className={styles.FriendsAlert}>
        {isSuccess && (
          <p>
            ✅ Запрос отправлен!
            <br />
            {alert}
          </p>
        )}
        {isError && alert && (
          <p>
            ❌ Ошибка при отправке!
            <br /> {alert}
          </p>
        )}
      </div>
    </div>
  );
};
