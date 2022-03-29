export enum Environment {
  Development = "development",
  Production = "production",
}

export const isDevelopment = process.env.NODE_ENV !== Environment.Production;

export const getEmbedUrl = (channel: string): string => {
  const domain = isDevelopment ? "localhost" : process.env.REACT_APP_DOMAIN;

  return (
    `https://player.twitch.tv/?channel=${channel}&parent=${domain}` +
    "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true"
  );
};
