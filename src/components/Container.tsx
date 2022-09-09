import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    bg="gray.900"
    color="white"
    {...props}
  />
);
