const initialHTML = `<!DOCTYPE html><html><head><script src="lib/d3/d3.js"></script></head><body><svg width="600" height="200"></svg></body></html>`;

const initialJS1 = `// Стандартный кусок кода для описания ширины и отступов графика
var svg = d3.select("svg");
    margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Данные
var lineData = [{x:0,y:20},{x:5,y:15},{x:10,y:-10},{x:20,y:25},{x:25,y:30}];
var materialData1 = [{x:0,y:40},{x:5,y:40}];
var materialData2 = [{x:5,y:40},{x:10,y:40}];
var materialData3 = [{x:10,y:40},{x:20,y:40}];
var materialData4 = [{x:20,y:40},{x:25,y:40}];
`;

const initialJS2 = `

function drawMaterial(materialData, fill) {
  // здесь реализуйте функцию добавления прямоугольника по координатам
}

drawMaterial(materialData1, "rgba(137, 196, 244, 0.4)");
drawMaterial(materialData2, "rgba(89, 171, 227, 0.4)");
drawMaterial(materialData3, "rgba(75, 119, 190, 0.4)");
drawMaterial(materialData4, "rgba(77, 5, 232, 0.4)");
`;

const resultJS1 = `
// Стандартный кусок кода для описания ширины и отступов графика
var svg = d3.select("svg");
    margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Данные
var lineData = [{x:0,y:20},{x:5,y:15},{x:10,y:-10},{x:20,y:25},{x:25,y:30}];
var materialData1 = [{x:0,y:40},{x:5,y:40}];
var materialData2 = [{x:5,y:40},{x:10,y:40}];
var materialData3 = [{x:10,y:40},{x:20,y:40}];
var materialData4 = [{x:20,y:40},{x:25,y:40}];

// Объединяем данные линии и закраску диапозонов
var allData = lineData
                 .concat(materialData1)
                 .concat(materialData2)
                 .concat(materialData3)
                 .concat(materialData4);
var allDataMinMaxX = d3.extent(allData, d => d.x);
var allDataMinMaxY = d3.extent(allData, d => d.y);

// Функции, которые масштабируют данные к координатам
var x = d3.scaleLinear().domain(allDataMinMaxX).range([0, width]);
var y = d3.scaleLinear().domain(allDataMinMaxY).range([height, 0]);

// Функция линии
var line = d3.line().x(d => x(d.x)).y(d => y(d.y));

// Добавляем ось слева
g.append("g").call(d3.axisLeft(y));
`;

const stepHelp2 = `Функция, которая масштабирует данные к координатам
var x = d3.scaleLinear().domain(allDataMinMaxX).range([0, width]);`;

const stepTitle2 = `Рисуем горизонтальную ось`;

const resultJS2 = resultJS1 + `// Добавляем ось снизу
g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
`;

const stepHelp3 = `Функция линии
var line = d3.line().x(d => x(d.x)).y(d => y(d.y));`;

const stepTitle3 = `Рисуем линию`;

const resultJS3 = resultJS2 + `// Добавляем линию
g.append("path").datum(lineData).attr("fill", "none").attr("stroke", "black").attr("d", line);
`;

const stepHelp4 = `Функция, которая добавляет прямоугольник
g.append("rect")`;

const stepTitle4 = `Закрашиваем график`;

const resultJS4 = resultJS3 + `// Функция, которая добавляет прямоугольник по координатам
function drawMaterial(materialData, fill) {
  // Выясняем минимальную и максимальные точки по x и y.
  var materialMinMaxX = d3.extent(materialData, d => d.x); // [Xmin, Xmax]

  g.append("rect")
  // Ширина = максимум минус минимум
    .attr("width", x(materialMinMaxX[1] - materialMinMaxX[0]))
  // Высота = высота всего графика
    .attr("height",  height)
  // Отступ слева
    .attr("x", x(materialMinMaxX[0]))
  // Отступ сверху
    .attr("y", 0)
  // Цвет
    .attr("fill", fill);
}

drawMaterial(materialData1, "rgba(137, 196, 244, 0.4)");
drawMaterial(materialData2, "rgba(89, 171, 227, 0.4)");
drawMaterial(materialData3, "rgba(75, 119, 190, 0.4)");
drawMaterial(materialData4, "rgba(77, 5, 232, 0.4)");
`;

window.initialCode = {
  initialHTML,
  initialJS1,
  initialJS2,
  resultJS1,
  resultJS2,
  resultJS3,
  resultJS4,
  stepTitle2,
  stepTitle3,
  stepTitle4,
  stepHelp2,
  stepHelp3,
  stepHelp4
};
