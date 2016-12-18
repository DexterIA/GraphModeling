let Point = require('./../Point'),
  mathUtils = require('./mathUtils'),
  graphUtils = {};

/**
 * Возвращает случайную точку в окружности указанного радиуса
 * @param {Number} radius - радиус окружности
 * @returns {Point} - набор x и y
 */
graphUtils.getRandomPointInCircle = function (radius) {
  let point;
  do {
    point = new Point(mathUtils.getRandomFloat(0, radius*2, 2),
      mathUtils.getRandomFloat(0, radius*2, 2));
  }
  while (!mathUtils.circleMember(radius, point));
  return point;
};

/**
 * Возвращает массив случайных вершин к круге
 * @param {Number} vertexCount - количество вершин
 * @param {Number} radius - радиус окружности
 * @returns {Array} - массив вершин
 */
graphUtils.getRandomVertices = function (vertexCount, radius) {
  let vertices = [];
  for (let i = 0; i < vertexCount; i++) {
    vertices.push(graphUtils.getRandomPointInCircle(radius))
  }
  return vertices;
};

/**
 * Забиваем матрицу нулями
 * @param {Number} n - размерность матрицы
 * @returns {Array} - матрица с нулями
 */
graphUtils.getEmptyMatrix = function (n) {
   let matrix = [];
   for (let i = 0; i < n; i++) {
     let edges = [];
     for (let j = 0; j < n; j++) {
       edges.push(0);
     }
     matrix.push(edges);
   }
   return matrix;
};

/**
 * Возвращает ребро между случайно выбранными вершинами
 * Ребро обязательно будет иметь расстояние > 1
 * @param {Array} vertices - массив вершин
 * @returns {Object} - ребро, состоящее из набора индексов вершин
 */
graphUtils.getRandomEdge = function (vertices) {
  let a, b, n = vertices.length;
  do {
    a = mathUtils.getRandomInt(0, n - 1);
    b = mathUtils.getRandomInt(0, n - 1);
  } while (mathUtils.pointDistance(vertices[a], vertices[b]) < 1);
  return {a, b};
};

/**
 * Зная количество вершин,
 * определяем максимальное количество рёбер в графе
 * @param {Number} n - количество вершин
 * @returns {Number} - максимальное количество рёбер
 */
graphUtils.getMaxEdges = function (n) {
  return n * ((n - 1) / 2);
};

/**
 * Возвращает случайно сгенерированный граф
 * количество рёбер случайное, варьируется от количества вершин
 * до максимально возможного количества рёбер в графе
 * @param {Number} vertexCount - количество вершин
 * @param {Number} radius - радиус окружности, которой будут ограничены вершины в графе
 */
graphUtils.getGraph = function (vertexCount, radius) {
  const maxEdges = graphUtils.getMaxEdges(vertexCount),
    randomEdgesCount = mathUtils.getRandomInt(vertexCount, maxEdges);
  let vertices = graphUtils.getRandomVertices(vertexCount, radius),
  adjacencyMatrix = graphUtils.getEmptyMatrix(vertexCount);
  for (let i = 0; i < randomEdgesCount; i++) {
    let edge = graphUtils.getRandomEdge(vertices);
    adjacencyMatrix[edge.a][edge.b] = 1;
    adjacencyMatrix[edge.b][edge.a] = 1;
  }
  return adjacencyMatrix;
};

/**
 * Считает количество рёбер и выводит среднее значение
 * @param {Number} vertexCount - количество вершин
 * @param {Number} radius - радиус окружности
 * @returns {Number} - среденее значение степени вершины в графе
 */
graphUtils.getAverageDegreesOfAVertex = function (vertexCount, radius) {
  let matrix = graphUtils.getGraph(vertexCount, radius),
    edgeCount = 0;
  for (let i = 0; i < vertexCount; i++) {
    for (let j = 0; j < vertexCount; j++) {
      edgeCount += matrix[i][j];
    }
  }
  return edgeCount/vertexCount;
};

module.exports = graphUtils;