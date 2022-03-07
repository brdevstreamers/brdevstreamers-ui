import {
  Box,
  Center,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import LandingLayout from "../components/layouts/LandingLayout";
import { StatsModel } from "../model/StatsModel";

export default function Supporters() {
  const [stats, setStats] = useState([]);
  const [statsSummary, setStatsSummary] = useState({
    streams: 0,
    vods: 0,
    previews: 0,
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/public/stats")
      .then((response) => {
        setStats(response.data);
      });

    axios
      .get(process.env.REACT_APP_API_URL + "/public/stats/summary")
      .then((response) => {
        setStatsSummary(response.data);
      });
  }, []);

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    colors: ["#B685FF", "#D3C8FF", "#92DCFF"],

    legend: {
      show: true,
      position: "top",
      labels: {
        colors: ["#B685FF", "#D3C8FF", "#92DCFF"],
        useSeriesColors: true,
      },
    },
    labels: ["Lives", "Vods", "Prévias"],
  };

  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Estatísticas</Heading>
        <Text color={"gray.500"}>Saiba mais sobre o projeto!</Text>
      </Box>

      <Table mt="5" size="sm" color="primary.400">
        <Thead>
          <Tr>
            <Th color="primary.600">Streamer</Th>
            <Th isNumeric color="primary.600">
              Acessos em Lives
            </Th>
            <Th isNumeric color="primary.600">
              Acessos em Vods
            </Th>
            <Th isNumeric color="primary.600">
              Prévias na Página
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats.map((stat: StatsModel) => {
            return (
              <Tr key={stat.user_login}>
                <Td>{stat.user_login}</Td>
                <Td isNumeric>{stat.stream_clicks}</Td>
                <Td isNumeric>{stat.vod_clicks}</Td>
                <Td isNumeric>{stat.preview_clicks}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Center mt="10">
        <ReactApexChart
          options={options}
          series={[
            statsSummary.streams,
            statsSummary.vods,
            statsSummary.previews,
          ]}
          type="pie"
          width={380}
        />
      </Center>
    </LandingLayout>
  );
}
