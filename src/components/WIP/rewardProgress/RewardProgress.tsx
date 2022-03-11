import {VStack, Text, Progress } from "@chakra-ui/react";


interface Props {
    label: string;
    value: number;
    w?: string;
}

export default function RewardProgress(props: Props) {
  return (
    <VStack w={props.w || '100%'} position="relative">
      <Text mb='20px' color="secondary.700" fontWeight="semibold">
        {`${props.label}:`}
      </Text>
      <Text position="absolute" top='20px' color="secondary.500" fontWeight="semibold" left={`${props.value}%`}>{props.value}%</Text>
      <Progress w="100%" borderRadius={2} size="lg" colorScheme="purple" hasStripe value={props.value} />
    </VStack>
  );
}
