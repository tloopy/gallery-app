import { Image } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GalleryPhoto } from "../types";
import { useRouter } from "next/router";

export type IGalleryProps = {
  loadMore: () => void;
  photos: GalleryPhoto[];
};

const Gallery: React.FC<IGalleryProps> = ({ loadMore, photos }) => {
  const router = useRouter();
  return (
    <>
      {photos.length > 0 ? (
        <InfiniteScroll
          datalength={photos.length}
          hasMore={true}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          loadMore={loadMore}
        >
          {photos.map((photo) => (
            <Image
              onClick={() => router.push(`/${photo.id}`)}
              cursor="pointer"
              height={{ base: "auto", md: 225 }}
              width={{ base: "100%", md: 300 }}
              key={photo.id}
              margin="5px"
              src={photo.url}
            />
          ))}
        </InfiniteScroll>
      ) : null}
    </>
  );
};

export { Gallery };
