import jsonp from "jsonp";

import createShareCount from "../Create/createShareCount";

function getFacebookShareCount(
  shareUrl: string,
  callback: (shareCount?: number) => void
) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=og_object{engagement}`;

  jsonp(endpoint, (err, data) => {
    callback(
      !err && data && data.og_object && data.og_object.engagement
        ? data.og_object.engagement.count
        : undefined
    );
  });
}

export default createShareCount(getFacebookShareCount);
