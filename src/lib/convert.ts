import moment from "moment";

export function numChapter(num: number, full: boolean = false) {
  return num == -1 ? "One shot" : full ? `Chapter ${num}` : `Ch ${num}`;
}

export function timeFromNow(timestamp: number) {
  return capitalize(moment.unix(timestamp).locale("vi").fromNow());
}

export function timestampNow() {
  return new Date().getTime();
}

export function strToHex(str: string) {
  var hash = 0;
  if (str.length === 0) return "#000";

  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substring(-2);
  }
  return color;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
