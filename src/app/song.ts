export interface Song {
  id: string,
  title: string,
  artist: string | null,
  file_name: string,
  source: string,
  tags: string[],
  thumbnail: string,
  playing: boolean,
}
