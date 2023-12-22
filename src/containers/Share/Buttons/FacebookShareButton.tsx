import assert from "assert";

import objectToGetParams from "../Create/objectToGetParams";
import createShareButton from "../Create/createShareButton";

function facebookLink(
  url: string,
  { quote, hashtag }: { quote?: string; hashtag?: string }
) {
  assert(url, "facebook.url");

  return (
    "https://www.facebook.com/sharer/sharer.php" +
    objectToGetParams({
      u: url,
      quote,
      hashtag,
    })
  );
}

const FacebookShareButton = createShareButton<{
  quote?: string;
  hashtag?: string;
}>(
  "facebook",
  facebookLink,
  (props: any) => ({
    quote: props.quote,
    hashtag: props.hashtag,
  }),
  {
    windowWidth: 550,
    windowHeight: 400,
  }
);

export default FacebookShareButton;
