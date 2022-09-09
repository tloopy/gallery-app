const authorization = "Client-ID bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs";

export const fetchGalleryPhotos = async (
  query: string,
  page: number,
  color?: string,
  orientation?: string
) => {
  let additionalQueryParams = "";
  if (color && color.length > 0) {
    additionalQueryParams += `&color=${color}`;
  }
  if (orientation && orientation.length > 0) {
    additionalQueryParams += `&orientation=${orientation}`;
  }
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}` + additionalQueryParams,
    {
      headers: {
        Authorization: authorization,
      },
    }
  ).catch(console.error);
  if (res) {
    return res.json();
  }
};

export const fetchPhoto = async (id: string) => {
  const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: authorization,
    },
  }).catch(console.error);
  if (res) {
    return res.json();
  }
};
