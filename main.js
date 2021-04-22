let fromDate = document.getElementById("fromDate");
let toDate = document.getElementById("toDate");

const getData = async () => {
  const res = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
  const finalResult = await res.json();
  if (finalResult) {
    let myChart1 = document.getElementById("myChart1").getContext("2d");
    new Chart(myChart1, {
      type: "bar",
      data: {
        labels: Object.keys(finalResult.bpi).map((dd) => dd),
        datasets: [
          {
            label: "Currency",
            data: Object.values(finalResult.bpi).map((dd) => dd.rate_float),
            backgroundColor: "purple",
          },
        ],
      },
    });
  }
};

const getBTCrange = async () => {
  if (window.barChart instanceof Chart) {
    window.barChart.destroy();
  }
  let from = fromDate.value;
  let to = toDate.value;
  const res = await fetch(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`
  );
  const finalRes = await res.json();
  if (finalRes) {
    let myChart = document.getElementById("myChart2").getContext("2d");
    window.barChart = new Chart(myChart, {
      type: "line",
      data: {
        labels: Object.keys(finalRes.bpi).map((dd) => dd),
        datasets: [
          {
            label: "Date",
            data: Object.values(finalRes.bpi).map((dd) => dd),
            backgroundColor: "red",
          },
        ],
      },
    });
  }
};

getData();
