export interface GalleryPhoto {
  id: string;
  url: string;
}

export interface DetailedPhoto {
  id: string;
  likes: number;
  views: number;
  downloads: number;
  username: string;
  url: string;
}
