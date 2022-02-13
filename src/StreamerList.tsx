import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { StreamerModel } from "./model/StreamerModel";

import StreamerCard from "./StreamerCard";

export default function StreamerList() {
  const [streamers, setStreamers] = React.useState([]);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(process.env.REACT_APP_API_URL || "")
      .then((streamersList) => setStreamers(streamersList.data));
  };

  return (
    <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
      {streamers.map((streamer: StreamerModel) => {
        return <StreamerCard streamer={streamer}></StreamerCard>;
      })}
    </SimpleGrid>
  );
}
