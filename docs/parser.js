const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function parseData(data) {
  const parsedData = [];
  for (const item of data) {
    parsedData.push({
      id: item.id,
      value: parseFloat(item.value),
      timestamp: new Date(item.timestamp),
    });
  }
  return parsedData;
}

if (isMainThread) {
  const data = [
    { id: 1, value: '10.5', timestamp: '2022-01-01T12:00:00.000Z' },
    { id: 2, value: '20.3', timestamp: '2022-01-01T13:00:00.000Z' },
    { id: 3, value: '30.1', timestamp: '2022-01-01T14:00:00.000Z' },
  ];

  const worker = new Worker(__filename, { workerData: data });
  worker.on('message', (parsedData) => {
    console.log(parsedData);
  });
} else {
  const { data } = workerData;
  const parsedData = parseData(data);
  parentPort.postMessage(parsedData);
}