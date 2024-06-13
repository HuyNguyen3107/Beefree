export const isImageLink = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const isYoutubeLink = (url) => {
  return /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.test(
    url
  );
};

export const getYoutubeVideoId = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const isVimeoLink = (url) => {
  return /https?:\/\/(www\.)?vimeo.com\/(\d+)(\/)?/.test(url);
};

export const isFirebaseStorageLink = (url) => {
  return /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/.*/.test(url);
};
