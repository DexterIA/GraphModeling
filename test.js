let graphUtils = require('./utils/graphUtils');

let average  = [];
for (let i = 50; i <= 1000; i += 50) {
  let sumAver = 0;
  for (let j = 0; j < 1000; j++) {
    sumAver += graphUtils.getAverageDegreesOfAVertex(i, 20);
  }
  average.push(sumAver/1000);
}

console.log(average);