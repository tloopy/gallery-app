import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

const Row: React.FC<FlexProps> = (props) => (
  <Flex flexDirection={"row"} alignItems="center" p="10px" {...props} />
);

export { Row };
