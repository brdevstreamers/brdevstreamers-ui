import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { StreamType } from "../model/StreamType";
const fpPromise = FingerprintJS.load();

export const logClick = async (user_login: string, streamType: StreamType) => {
    (async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();

      axios.post(process.env.REACT_APP_API_URL + "/stats" || "", {
        user_login: user_login,
        access_date: new Date(),
        type: streamType,
        fingerprint: result.visitorId,
      });
    })();
  };