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

export function compactNumber(num: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
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
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function durationUTC(duration: number, format: string = "mm:ss") {
  return moment
    .utc(moment.duration(duration, "seconds").asMilliseconds())
    .format(format);
}

export function strArray(str: string) {
  const arr: string[] = [];
  const string = str.trim().replace(/ +(?= )/g, "");

  for (let i = 0; i < string.trim().length; i++) {
    arr.push(string.substr(0, i + 1).toLowerCase());
  }

  return arr;
}

export function cleanObject<T extends Record<string, unknown>>(
  base: T,
  clean: T
) {
  const obj = structuredClone(clean);

  for (const [key, value] of Object.entries(clean)) {
    if (typeof value == "undefined") {
      delete obj[key];
    }

    if (typeof value == "string" && value.trim() == "") {
      delete obj[key];
    }

    if (typeof value != "object") {
      if (base[key] == clean[key]) {
        delete obj[key];
      }
    }
  }

  return obj as T;
}
