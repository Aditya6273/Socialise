export const extractPublicIdFromUrl = (url) => {
    const regex = /\/v[0-9]+\/(.*?)\.(?:jpg|jpeg|png|gif)$/;
    const match = url.match(regex);
    return match ? match[1] : null;  // match[1] is the public_id
  };