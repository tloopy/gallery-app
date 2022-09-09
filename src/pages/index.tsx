import { useEffect, useState } from "react";
import { Gallery } from "../components/Gallery";
import { GalleryPhoto } from "../types";
import { fetchGalleryPhotos } from "../util/apiUtil";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { COLORS, ORIENTATIONS } from "../util/constants";
import { Row } from "../components/Row";

const Index = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [color, setColor] = useState<string>("");
  const [orientation, setOrientation] = useState<string>("");
  // Giving default values for demo purposes
  const [query, setQuery] = useState<string>("dog");
  const [newSearch, setNewSearch] = useState(true);

  const fetchPhotos = (pageNumber: number) => {
    fetchGalleryPhotos(query, pageNumber, color, orientation).then((res) => {
      setPage(pageNumber);
      setTotalPages(res.total_pages);
      setPhotos((photos) => [
        ...photos,
        ...res.results.map((upload) => ({
          id: upload.id,
          url: upload.urls.thumb,
        })),
      ]);
    });
  };

  useEffect(() => {
    if (newSearch) {
      setPhotos([]);
      setTotalPages(0);
      setNewSearch(false);
      fetchPhotos(1);
    }
  }, [newSearch]);

  // Only load more if there are more pages to be loaded
  const loadMorePhotos = () => {
    if (page < totalPages) {
      fetchPhotos(page + 1);
    }
  };

  return (
    <>
      <Row>
        <Text fontSize="md" fontWeight={600}>
          Query:
        </Text>
        <Input
          placeholder="Enter a photo search query"
          mx="3px"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setNewSearch(true);
            }
          }}
        />
      </Row>
      <Row>
        <Text fontSize="md" fontWeight={600} mr="10px">
          Color:
        </Text>
        <Select placeholder="Select a color (optional)" onChange={(e) => setColor(e.target.value)}>
          {COLORS.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
      </Row>
      <Row>
        <Text fontSize="md" fontWeight={600} mr="10px">
          Orientation:
        </Text>
        <Select
          placeholder="Select an orientation (optional)"
          onChange={(e) => setOrientation(e.target.value)}
        >
          {ORIENTATIONS.map((orientation) => (
            <option key={orientation} value={orientation}>
              {orientation}
            </option>
          ))}
        </Select>
      </Row>
      <Flex flexDirection={"row"} justifyContent="flex-end" p="10px">
        <Button colorScheme="blue" w="200px" onClick={() => setNewSearch(true)}>
          Search
        </Button>
      </Flex>
      <Flex flexDirection={"row"} alignItems="center" p="20px"></Flex>
      <Gallery loadMore={loadMorePhotos} photos={photos} />
    </>
  );
};

export default Index;
