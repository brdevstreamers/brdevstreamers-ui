import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LoginPage() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        await axios.post(
          process.env.REACT_APP_API_URL + "/api/user" || "",
          {
            user_login: user?.nickname,
            email: user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );
        document.location.href = "/";
      })();
    }
  }, [isAuthenticated]);

  return (
    <>
      <CircularProgress isIndeterminate color="primary.500" size="120px" />
    </>
  );
}
