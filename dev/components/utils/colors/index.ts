export function shadeColor(color: string, percent: number) {
    let R: number = parseInt(color.substring(1,3),16);
    let G: number = parseInt(color.substring(3,5),16);
    let B: number = parseInt(color.substring(5,7),16);

    R = parseInt('' + (R * (100 + percent) / 100));
    G = parseInt('' + (G * (100 + percent) / 100));
    B = parseInt('' + (B * (100 + percent) / 100));

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export function hexToRgb(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}