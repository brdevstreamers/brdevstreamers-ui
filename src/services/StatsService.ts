import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { UserInteractionType } from "../model/UserInteractionModel";
import Cookies from "universal-cookie";

const fpPromise = FingerprintJS.load();

export const logUserInteraction = async (
  target_user: string,
  streamType: UserInteractionType,
  isLoggedIn: boolean,
  user_login?: string
) => {
  const cookies = new Cookies();

  (async () => {
    if (isLoggedIn) {
      const fp = await fpPromise;
      const result = await fp.get();

      axios.post(
        process.env.REACT_APP_API_URL + "/api/userinteraction" || "",
        {
          user_login: user_login,
          target_user: target_user.toLowerCase(),
          date: new Date(),
          type: streamType,
          interaction_fingerprint: result.visitorId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.get("api_token"),
          },
        }
      );
    }
  })();
};
