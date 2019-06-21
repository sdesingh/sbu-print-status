/* 
  -----------------------------------------------------------
                      GRAPH TYPES
  -----------------------------------------------------------
*/
const CLEAN = {
                
  responsive: true, maintainAspectRatio: true, spanGaps: true, 

  animation: {
    duration: 600,
  },
  legend: {
      display: false
  },

  elements: {
      point:{
          radius: 0
      }
  },
  
  scales: {
      yAxes: [{
          scaleType: "linear",
          display: true,
          ticks: {
              beginAtZero: true
          },
          gridLines: {
              display:false
          }
      }],
      xAxes: [{
          scaleType: "linear",
          display: true,
          ticks: {
              display: true
          },
          gridLines: {
              display:false
          }
      }]
  },

}

const REGULAR = {
  responsive: true, maintainAspectRatio: true, spanGaps: true,

  legend: {
      display: true
  },
  
  scales: {
      yAxes: [{
          scaleType: "linear",
          beginAtZero: true,
          display: true,
          ticks: {
              display: true
          },
          gridLines: {
              display:false
          }
      }],
      xAxes: [{
          beginAtZero: true,
          scaleType: "linear",
          display: true,
          ticks: {
              display: true
          },
          gridLines: {
              display:false
          }
      }]
  }
}

export default {
  CLEAN,
  REGULAR,

}