import axios from "axios";
import Cookies from "universal-cookie";

export const getUser = async (nickname: string) => {
  const cookies = new Cookies();

  await axios.get(process.env.NEXT_PUBLIC_PRIVATE_API_URL + "/api/user/" + nickname, {
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.get("api_token"),
    },
  });
};

export const updateUser = async (
  nickname: string,
  email: string,
  discord: string,
  linkedin: string,
  twitter: string,
  github: string,
  bio: string
) => {
  const cookies = new Cookies();

  await axios.put(
    process.env.NEXT_PUBLIC_PRIVATE_API_URL + "/api/user" || "",
    {
      user_login: nickname,
      email: email,
      discord: discord,
      linkedin: linkedin,
      twitter: twitter,
      github: github,
      bio: bio
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("api_token"),
      },
    }
  );
};
