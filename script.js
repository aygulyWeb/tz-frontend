// Задача: написать функцию decode в том же стиле, что и функция encode (вытянутой в цепочку) и узнать значение переменной input

let value = "frontend"; //получается '.4-2.6-1.4-1.20-16.1-2'
const encode = (input) =>
  [...input]
    .map((x, i) => [x.charCodeAt(0), i])
    .sort()
    .flatMap((x) => x)
    .join(".")
    .match(/./g)
    .flatMap((x, i) => new Array(x == "." ? 1 : 2 + x * 2).fill((1 + i) % 2))
    .join("")
    .replace(/(([01])\2*)/g, (x) => `${+x ? "." : "-"}${x.length}`);

const encoded = encode(value);
console.log(encoded);

const decode = (input) =>
  input
    .replace(/(\.|\-)(\d+)/g, (_, x, val) =>
      x == "." ? "1".repeat(val) : "0".repeat(val)
    )
    .match(/([01])\1*/g)
    .map((x) => (x.length == 1 ? "." : (x.length - 2) / 2))
    .join("")
    .match(/\d+\.\d+/g)
    .map((x) => x.split("."))
    .sort((a, b) => a[1] - b[1])
    .map((x) => String.fromCharCode(x[0]))
    .join("");

const decoded = decode(encoded);

console.log(decoded, value == decoded);
