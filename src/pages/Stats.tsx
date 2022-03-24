import { useState, useEffect, useCallback } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Center,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useAxios } from "../hooks/useAxios";
import { endpoints } from "../service/api";
import { Stats, StatsSummary, StatsSummaryDefault } from "../types";
import { useErrorHandler } from "react-error-boundary";

export default function Supporters() {
  const { apiGet } = useAxios();
  const handleError = useErrorHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stats[]>([]);
  const [statsSummary, setStatsSummary] = useState<StatsSummary>(StatsSummaryDefault);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);

      const statsList = await apiGet<Stats[]>(endpoints.stats.url);
      const statsSummaryList = await apiGet<StatsSummary>(endpoints.stats_summary.url);

      setStats(statsList);
      setStatsSummary(statsSummaryList);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiGet, handleError]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    <>
      <Box mt={8} mb={4}>
        <Heading>Estatísticas</Heading>
        <Text color={"gray.500"}>Saiba mais sobre o projeto!</Text>
      </Box>

      {isLoading ? (
        <Center mt={10}>
          <Spinner size="lg" color="gray.100" />
        </Center>
      ) : (
        <>
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
              {stats.map((stat) => (
                <Tr key={stat.user_login}>
                  <Td>{stat.user_login}</Td>
                  <Td isNumeric>{stat.stream_clicks}</Td>
                  <Td isNumeric>{stat.vod_clicks}</Td>
                  <Td isNumeric>{stat.preview_clicks}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Center mt="10">
            <ReactApexChart
              options={options}
              series={[statsSummary.streams, statsSummary.vods, statsSummary.previews]}
              type="pie"
              width={380}
            />
          </Center>
        </>
      )}
    </>
  );
}
