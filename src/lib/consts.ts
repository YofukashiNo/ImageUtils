export const USRBG_URL =
  "https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";
export const defaultSettings = {
  hideLens: false,
  darkenImage: true,
  saveValues: true,
  pixelZoom: false,
  invertScroll: true,
  square: false,
  zoom: 2,
  size: 100,
  scrollSpeed: 0.5,
  iconSize: ["128", "256", "512", "1024", "2048", "4096"],
  iconType: ["webp", "png", "jpg", "gif"],
  guild: true,
  user: true,
  gdm: true,
  userbg: true,
  stream: true,
  stickers: true,
  hex: true,
  host: true,
  dimensions: true,
  engines: ["Google", "Yandex", "SauceNAO", "IQDB", "TinEye", "ImgOps"],
};

export const searchEngines = {
  Google: "https://lens.google.com/uploadbyurl?url=",
  Yandex: "https://yandex.com/images/search?rpt=imageview&url=",
  SauceNAO: "https://saucenao.com/search.php?url=",
  IQDB: "https://iqdb.org/?url=",
  TinEye: "https://www.tineye.com/search?url=",
  ImgOps: "https://imgops.com/start?url=",
};
