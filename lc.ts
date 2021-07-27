// from https://scrapbox.io/programming-notes/scrapbox-titleLc
export const toLc = (text: string) =>
  text.toLowerCase()
    .replaceAll(" ", "_")
    .replace(/[/?#\{}^|<>]/g, (char) => encodeURIComponent(char));
