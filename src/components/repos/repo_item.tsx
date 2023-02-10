import { Repository } from "@/store/repos/types";
import { AtSignIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

const RepoItem: React.FunctionComponent<Repository> = ({
  name,
  stargazers_count,
  description,
  owner,
}) => (
  <Card w='100%'>
    <CardHeader>
      <Heading size='md'>{ name }</Heading>
      <Flex alignItems='center' flexDir='row'>
        <Box mr={1}><AtSignIcon mt={-1} color='black' /></Box>
        <Box>{owner?.login}</Box>
        <Box ml={4} mr={2}><StarIcon mt={-1} color='gold' /></Box>
        <Box>{stargazers_count}</Box>
      </Flex>
    </CardHeader>
    <CardBody>
      <Text>
        { description }
      </Text>
    </CardBody>
  </Card>
);

export default RepoItem;