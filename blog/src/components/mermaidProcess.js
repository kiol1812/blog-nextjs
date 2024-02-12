Xt = function E(k, C, O) {
    var x;
    if (!k)
      return X;
    if (typeof k == "string") {
      var D = k.toLowerCase();
      G[D] && (x = D), C && (G[D] = C, x = D);
      var T = k.split("-");
      if (!x && T.length > 1)
        return E(T[0]);
    } else {
      var H = k.name;
      G[H] = k, x = H;
    }
    return !O && x && (X = x), x || !O && X;
  }