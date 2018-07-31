var complexTable = [];

for(let re = -4; re <= 4; re++) {
  complexTable[re] = [];
  for(let im = -4; im <= 4; im++) {
    complexTable[re][im] = {
      re,
      im,
      str: `(${re},${im})`
    };
  }
}

// newするより1つの数に1オブジェクト割り当てるようにすれば等号比較が楽？
export default function Complex(arr) {
  return complexTable[arr[0]][arr[1]];
}
