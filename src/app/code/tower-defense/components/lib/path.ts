import { ctx, r50, r50h, sizeTile } from "../main";
import { KindPath, MapPath, Pos } from "../types";

const mapPathVertices = [
  "225",
  "2 16",
  "1 3 17",
  "2 4 18",
  "3 5 19",
  "4 6 20",
  "5 7 21",
  "6 8 22",
  "7 9 23",
  "8 10 24",
  "9 11 25",
  "10 12 26",
  "11 13 27",
  "12 14 28",
  "13 15 29",
  "14 30",
  "1 17 31",
  "2 16 18 32",
  "3 17 19 33",
  "4 18 20 34",
  "5 19 21 35",
  "6 20 22 36",
  "7 21 23 37",
  "8 22 24 38",
  "9 23 25 39",
  "10 24 26 40",
  "11 25 27 41",
  "12 26 28 42",
  "13 27 29 43",
  "14 28 30 44",
  "15 29 45",
  "16 32 46",
  "17 31 33 47",
  "18 32 34 48",
  "19 33 35 49",
  "20 34 36 50",
  "21 35 37 51",
  "22 36 38 52",
  "23 37 39 53",
  "24 38 40 54",
  "25 39 41 55",
  "26 40 42 56",
  "27 41 43 57",
  "28 42 44 58",
  "29 43 45 59",
  "30 44 60",
  "31 47 61",
  "32 46 48 62",
  "33 47 49 63",
  "34 48 50 64",
  "35 49 51 65",
  "36 50 52 66",
  "37 51 53 67",
  "38 52 54 68",
  "39 53 55 69",
  "40 54 56 70",
  "41 55 57 71",
  "42 56 58 72",
  "43 57 59 73",
  "44 58 60 74",
  "45 59 75",
  "46 62 76",
  "47 61 63 77",
  "48 62 64 78",
  "49 63 65 79",
  "50 64 66 80",
  "51 65 67 81",
  "52 66 68 82",
  "53 67 69 83",
  "54 68 70 84",
  "55 69 71 85",
  "56 70 72 86",
  "57 71 73 87",
  "58 72 74 88",
  "59 73 75 89",
  "60 74 90",
  "61 77 91",
  "62 76 78 92",
  "63 77 79 93",
  "64 78 80 94",
  "65 79 81 95",
  "66 80 82 96",
  "67 81 83 97",
  "68 82 84 98",
  "69 83 85 99",
  "70 84 86 100",
  "71 85 87 101",
  "72 86 88 102",
  "73 87 89 103",
  "74 88 90 104",
  "75 89 105",
  "76 92 106",
  "77 91 93 107",
  "78 92 94 108",
  "79 93 95 109",
  "80 94 96 110",
  "81 95 97 111",
  "82 96 98 112",
  "83 97 99 113",
  "84 98 100 114",
  "85 99 101 115",
  "86 100 102 116",
  "87 101 103 117",
  "88 102 104 118",
  "89 103 105 119",
  "90 104 120",
  "91 107 121",
  "92 106 108 122",
  "93 107 109 123",
  "94 108 110 124",
  "95 109 111 125",
  "96 110 112 126",
  "97 111 113 127",
  "98 112 114 128",
  "99 113 115 129",
  "100 114 116 130",
  "101 115 117 131",
  "102 116 118 132",
  "103 117 119 133",
  "104 118 120 134",
  "105 119 135",
  "106 122 136",
  "107 121 123 137",
  "108 122 124 138",
  "109 123 125 139",
  "110 124 126 140",
  "111 125 127 141",
  "112 126 128 142",
  "113 127 129 143",
  "114 128 130 144",
  "115 129 131 145",
  "116 130 132 146",
  "117 131 133 147",
  "118 132 134 148",
  "119 133 135 149",
  "120 134 150",
  "121 137 151",
  "122 136 138 152",
  "123 137 139 153",
  "124 138 140 154",
  "125 139 141 155",
  "126 140 142 156",
  "127 141 143 157",
  "128 142 144 158",
  "129 143 145 159",
  "130 144 146 160",
  "131 145 147 161",
  "132 146 148 162",
  "133 147 149 163",
  "134 148 150 164",
  "135 149 165",
  "136 152 166",
  "137 151 153 167",
  "138 152 154 168",
  "139 153 155 169",
  "140 154 156 170",
  "141 155 157 171",
  "142 156 158 172",
  "143 157 159 173",
  "144 158 160 174",
  "145 159 161 175",
  "146 160 162 176",
  "147 161 163 177",
  "148 162 164 178",
  "149 163 165 179",
  "150 164 180",
  "151 167 181",
  "152 166 168 182",
  "153 167 169 183",
  "154 168 170 184",
  "155 169 171 185",
  "156 170 172 186",
  "157 171 173 187",
  "158 172 174 188",
  "159 173 175 189",
  "160 174 176 190",
  "161 175 177 191",
  "162 176 178 192",
  "163 177 179 193",
  "164 178 180 194",
  "165 179 195",
  "166 182 196",
  "167 181 183 197",
  "168 182 184 198",
  "169 183 185 199",
  "170 184 186 200",
  "171 185 187 201",
  "172 186 188 202",
  "173 187 189 203",
  "174 188 190 204",
  "175 189 191 205",
  "176 190 192 206",
  "177 191 193 207",
  "178 192 194 208",
  "179 193 195 209",
  "180 194 210",
  "181 197 211",
  "182 196 198 212",
  "183 197 199 213",
  "184 198 200 214",
  "185 199 201 215",
  "186 200 202 216",
  "187 201 203 217",
  "188 202 204 218",
  "189 203 205 219",
  "190 204 206 220",
  "191 205 207 221",
  "192 206 208 222",
  "193 207 209 223",
  "194 208 210 224",
  "195 209 225",
  "196 212",
  "197 211 213",
  "198 212 214",
  "199 213 215",
  "200 214 216",
  "201 215 217",
  "202 216 218",
  "203 217 219",
  "204 218 220",
  "205 219 221",
  "206 220 222",
  "207 221 223",
  "208 222 224",
  "209 223 225",
  "210 224",
];

export class Path {
  startPos: KindPath;
  endPos: KindPath;

  border: number;
  hidden: boolean = false;
  numVertices: number = sizeTile ** 2;

  mapPath: MapPath[] = [];
  previous: number[] = [];
  resultPath: Pos[] = [];

  constructor() {
    this.border = r50 + r50h;

    const arrayTile = [
      0,
      sizeTile,
      sizeTile ** 2 - 1 - sizeTile,
      sizeTile ** 2 - 1,
    ];

    const restless = (sizeTile + 3) * r50;
    const pytaless = (r50 * Math.SQRT2 - r50h) / 2;

    this.startPos = {
      air: {
        x: -pytaless,
        y: -pytaless,
      },
      ground: {
        alt: false,
        pos: [
          {
            x: r50,
            y: -r50,
            index: arrayTile[0],
          },
          {
            x: r50 * 2,
            y: -r50,
            index: arrayTile[1],
          },
        ],
      },
    };

    this.endPos = {
      air: {
        x: restless,
        y: restless,
      },
      ground: {
        alt: false,
        pos: [
          {
            x: sizeTile * r50 - r50h,
            y: restless,
            index: arrayTile[2],
          },
          {
            x: (sizeTile + 1) * r50 - r50h,
            y: restless,
            index: arrayTile[3],
          },
        ],
      },
    };

    this.readMap();
    this.altMap();
  }

  clear() {
    this.border = r50 + r50h;

    const arrayTile = [
      0,
      sizeTile,
      sizeTile ** 2 - 1 - sizeTile,
      sizeTile ** 2 - 1,
    ];

    const restless = (sizeTile + 3) * r50;
    const pytaless = (r50 * Math.SQRT2 - r50h) / 2;

    this.startPos = {
      air: {
        x: -pytaless,
        y: -pytaless,
      },
      ground: {
        alt: false,
        pos: [
          {
            x: r50,
            y: -r50,
            index: arrayTile[0],
          },
          {
            x: r50 * 2,
            y: -r50,
            index: arrayTile[1],
          },
        ],
      },
    };

    this.endPos = {
      air: {
        x: restless,
        y: restless,
      },
      ground: {
        alt: false,
        pos: [
          {
            x: sizeTile * r50 - r50h,
            y: restless,
            index: arrayTile[2],
          },
          {
            x: (sizeTile + 1) * r50 - r50h,
            y: restless,
            index: arrayTile[3],
          },
        ],
      },
    };

    this.readMap();
    this.altMap();
  }

  copy(path: Path) {
    this.startPos = path.startPos;
    this.endPos = path.endPos;
    this.border = path.border;
    this.hidden = path.hidden;
    this.numVertices = path.numVertices;
    this.mapPath = path.mapPath;
    this.previous = path.previous;
    this.resultPath = path.resultPath;
  }

  draw(state: boolean, { x, y }: Pos) {
    if (state) {
      ctx.fillStyle = "rgba(255,0,0,0.3)";
    } else {
      ctx.fillStyle = "rgba(0,255,0,0.3)";
    }

    ctx.fillRect(x, y, r50, r50);
  }

  update(mouse: Pos) {
    const x = Math.floor((mouse.x - r50) / r50);
    const y = Math.floor((mouse.y - r50) / r50);

    const index = (x == 0 ? x : x * sizeTile) + y;
    const point = this.mapPath[index];
    if (point && y > -1 && y < 15) {
      this.draw(point.state, {
        x: r50 + r50 * x,
        y: r50 + r50 * y,
      });
    }
  }

  readMap() {
    for (let i = 1; i < mapPathVertices.length; i++) {
      const line = mapPathVertices[i].split(" ");
      const row: number[] = [];
      for (let j = 0; j < line.length; j++) {
        row[j] = Number(line[j].trim()) - 1;
      }

      this.mapPath[i - 1] = { state: false, edges: row };
    }
  }

  altMap() {
    const start = this.startPos.ground.pos;
    this.bfsVisited(
      !this.startPos.ground.alt ? start[0].index : start[1].index
    );

    this.resultPath.length = 0;

    const end = this.endPos.ground.pos;
    const endless = this.endPos.ground.alt;

    if (endless) {
      this.resultPath = this.findEdges({
        end: end[1].index,
        pos: { x: end[1].x, y: end[1].y },
      });
    } else if (this.mapPath[end[1].index].state) {
      this.resultPath = this.findEdges({
        end: end[0].index,
        pos: { x: end[0].x, y: end[0].y },
      });
    } else {
      const end1 = this.findEdges({
        end: end[0].index,
        pos: { x: end[0].x, y: end[0].y },
      });

      const end2 = this.findEdges({
        end: end[1].index,
        pos: { x: end[1].x, y: end[1].y },
      });

      if (end1.length <= end2.length) {
        this.resultPath = end1;
      } else {
        this.resultPath = end2;
      }
    }
  }

  bfsVisited(start: number) {
    this.previous.length = 0;
    const processed = [];
    const distance = [];
    const vertices = [];

    for (let i = 0; i < this.numVertices; i++) {
      this.previous[i] = -1;
      processed[i] = false;
      distance[i] = 0;
    }

    const queue: number[] = [];
    queue.push(start);
    processed[start] = true;
    vertices.push(start);

    while (queue.length != 0) {
      const u = queue.shift()!;
      const n = this.mapPath[u].edges.length;
      for (let v = 0; v < n; v++) {
        const index = this.mapPath[u].edges[v];

        if (processed[index] || this.mapPath[index].state) {
          continue;
        }

        processed[index] = true;
        queue.push(index);

        this.previous[index] = u;
        distance[index] = distance[u] + 1;
        vertices.push(index);
      }
    }

    processed.length = distance.length = vertices.length = 0;
  }

  findEdges({ end, pos }: { end: number; pos: Pos }) {
    const array: number[] = [];
    const posPath: Pos[] = [];

    for (let i = end; i != -1; i = this.previous[i]) {
      array.unshift(i + 1);
    }

    const pathCheck = {
      row: false,
      col: true,
    };

    const pathReal = [];
    const n = array.length;
    for (let index = 1; index < n; index++) {
      const prev = array[index - 1];
      const next = array[index];
      const result = Math.abs(prev - next);
      if (result == sizeTile) {
        pathCheck.row = true;
        if (pathCheck.col) {
          pathCheck.col = false;
          pathReal.push(prev);
        }
      } else {
        pathCheck.col = true;
        if (pathCheck.row) {
          pathCheck.row = false;
          pathReal.push(prev);
        }
      }

      if (index == n - 1 && !pathReal.includes(next) && !pathCheck.col) {
        pathReal.push(next);
      }
    }

    for (const item of pathReal) {
      const remainder = item % sizeTile;
      const x = Math.floor((item - 1) / sizeTile);
      const y = (remainder == 0 ? sizeTile : remainder) - 1;

      posPath.push({
        x: this.border + x * r50,
        y: this.border + y * r50,
      });
    }

    if (posPath.length == 0) {
      this.hidden = true;
    }

    posPath.push(pos);
    return posPath;
  }

  placeClick(mouse: Pos) {
    const x = Math.floor((mouse.x - r50) / r50);
    const y = Math.floor((mouse.y - r50) / r50);
    const index = (x == 0 ? x : x * sizeTile) + y;

    const result = {
      index,
      state: y > -1 && y < 15 ? this.mapPath[index] != undefined : false,
    };

    return result;
  }

  altPath(index: number, state: boolean) {
    this.mapPath[index].state = state;
    this.altMap();
  }

  altPoint(index: number) {
    const start = this.startPos.ground.pos[0].index;
    const startAlt = this.startPos.ground.pos[1].index;

    const end = this.endPos.ground.pos[0].index;
    const endAlt = this.endPos.ground.pos[1].index;

    if (start == index) {
      if (!this.mapPath[startAlt].state) {
        this.startPos.ground.alt = true;
        return true;
      } else {
        return false;
      }
    }

    if (startAlt == index) {
      if (!this.mapPath[start].state) {
        return true;
      } else {
        return false;
      }
    }

    if (end == index) {
      if (!this.mapPath[endAlt].state) {
        this.endPos.ground.alt = true;
        return true;
      } else {
        return false;
      }
    }

    if (endAlt == index) {
      if (!this.mapPath[end].state) {
        return true;
      } else {
        return false;
      }
    }

    const altResult = structuredClone(this.resultPath);
    this.mapPath[index].state = true;
    this.altMap();

    if (this.resultPath.length == 1) {
      this.mapPath[index].state = false;
      this.resultPath = altResult;
      return false;
    }

    return true;
  }
}
