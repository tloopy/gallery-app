import { useRouter } from "next/router";
import { Image, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DetailedPhoto } from "../types";
import { fetchPhoto } from "../util/apiUtil";

const TextRow: React.FC<{ label: string; content: string | number }> = ({
  label,
  content,
}) => (
  <Text>
    <b>{label}: </b>
    {content}
  </Text>
);

const ImagePage = ({}) => {
  const [photo, setPhoto] = useState<DetailedPhoto | undefined>();

  const router = useRouter();
  const pid = typeof router.query.pid === "string" ? router.query.pid : "";

  useEffect(() => {
    if (pid.length > 0) {
      fetchPhoto(pid).then((res) =>
        setPhoto({
          id: res.id,
          downloads: res.downloads,
          likes: res.likes,
          username: res.user.username,
          url: res.urls.full,
          views: res.views,
        })
      );
    }
  }, [pid]);

  let content = null;
  if (photo) {
    content = (
      <Flex margin="20px" direction={"column"}>
        <TextRow label="Username" content={photo.username} />
        <TextRow label="Likes" content={photo.likes} />
        <TextRow label="Downloads" content={photo.downloads} />
        <TextRow label="Views" content={photo.views} />
        <Image
          src={photo.url}
          maxH={{ base: "100vh", md: "80vh" }}
          maxW={{ base: "100vw", md: "80vw" }}
        />
      </Flex>
    );
  }

  return <>{content}</>;
};

export default ImagePage;
