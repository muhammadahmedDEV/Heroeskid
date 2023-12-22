export default function ShortenText(text, startingPoint, maxLength) {
  return text && text.length > maxLength
    ? text && text.slice(startingPoint, maxLength)
    : text && text;
}
