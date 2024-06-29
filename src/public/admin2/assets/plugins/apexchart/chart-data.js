'use strict';

$(document).ready( function() {

	function generateData(baseval, count, yrange) {
		var i = 0;
		var series = [];
		while (i < count) {
			var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
			var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
			var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

			series.push([x, y, z]);
			baseval += 86400000;
			i++;
		}
		return series;
	}
  async function countMonth() {
    const response = await fetch('/123');
  const data1 = await response.json();
  const revenueData1 = data1.revenueData;
  // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
  }
  function getMonthNamesUntilCurrent() {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // Lấy chỉ số của tháng hiện tại (0-11)

    // Mảng chứa tên các tháng
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Lấy các tên tháng từ 'Jan' đến tháng hiện tại
  
    const monthNamesUntilCurrent = monthNames.slice(0, currentMonthIndex + 1);

    return monthNamesUntilCurrent
}

const monthNamesUntilCurrent = getMonthNamesUntilCurrent();


function getYearUntilCurrent() {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}

// Gọi hàm và lưu kết quả vào biến years
const years = getYearUntilCurrent();

// Kiểm tra kết quả bằng cách in ra console
console.log(years); // In ra mảng các năm từ 2020 đến năm hiện tại



	// Column chart
    if($('#sales_chart').length > 0 ){
    	var columnCtx = document.getElementById("sales_chart"),
    	columnConfig = {
    		colors: ['#7638ff', '#fda600'],
    		series: [
    			{
    			name: "Received",
    			type: "column",
    			data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50]
    			},
    			{
    			name: "Pending",
    			type: "column",
    			data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80]
    			}
    		],
    		chart: {
    			type: 'bar',
    			fontFamily: 'Poppins, sans-serif',
    			height: 350,
    			toolbar: {
    				show: false
    			}
    		},
    		plotOptions: {
    			bar: {
    				horizontal: false,
    				columnWidth: '60%',
    				endingShape: 'rounded'
    			},
    		},
    		dataLabels: {
    			enabled: false
    		},
    		stroke: {
    			show: true,
    			width: 2,
    			colors: ['transparent']
    		},
    		xaxis: {
    			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    		},
    		yaxis: {
    			title: {
    				text: '$ (thousands)'
    			}
          
    		},
    		fill: {
    			opacity: 1
    		},
    		tooltip: {
    			y: {
    				formatter: function (val) {
    					return "$ " + val + " thousands"
    				}
    			}
    		}
    	};
    	var columnChart = new ApexCharts(columnCtx, columnConfig);
    	columnChart.render();
    }

	//Pie Chart
  async function fetchDataAndRenderChartDonut(type) {
    if ($('#invoice_chart').length > 0) {
      const response = await fetch('/OAChart');
      const data = await response.json();
      const dataOA = data.OAData;
      const dataOA_year = data.OAData_year;
  
      // Log dữ liệu vào console để kiểm tra
      dataOA.forEach(subArray => {
        if (Array.isArray(subArray)) {
          subArray.forEach(count => {
            console.log(count);
          });
        }
      }); 
  
      dataOA_year.forEach(subArray => {
        if (Array.isArray(subArray)) {
          subArray.forEach(count => {
            console.log(count);
          });
        }
      }); 
  
      const chartData = {
        This_month: {
          series: dataOA,
          labels: ['Confirmed', 'Preparing', 'Delivering', 'Delivered', 'Canceled']
        },
        This_year: {
          series: dataOA_year,
          labels: ['Confirmed', 'Preparing', 'Delivering', 'Delivered', 'Canceled']
        }
      };
  
      const pieConfig1 = {
        colors: ['#007bff', '#fd7e14', '#28a745', '#17a2b8', '#dc3545'],
        series: chartData[type].series,
        chart: {
          fontFamily: 'Poppins, sans-serif',
          height: 320,
          type: 'donut'
        },
        labels: chartData[type].labels,
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          markers: {
            width: 12,
            height: 12
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
              height: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
  
      // Hủy bỏ biểu đồ hiện tại bằng hàm renderChart
      renderChart(type);
  let currentChart = window.chart
      // Tạo một đối tượng biểu đồ mới với cấu hình cập nhật
      currentChart = new ApexCharts(document.querySelector("#invoice_chart"), pieConfig1);
      currentChart.render();
    }
  }
  
  // Hàm để hủy biểu đồ hiện tại
  function renderChart(type) {
    if (chart) {
      chart.destroy();
    }
  }
  
  $(document).ready(function() {
    fetchDataAndRenderChartDonut('This_month'); // Mặc định là This_month
  
    $('.dropdown-item5').on('click', function() {
      var type = $(this).data('chart');
      var buttonLabel = type.replace('_', ' ').replace(/\b\w/g, function(l){ return l.toUpperCase() });
      $('#dropdownMenuButton5').text(buttonLabel);
      fetchDataAndRenderChartDonut(type);
    });
  });
  
  

async function fetchDataAndRenderChartDonut_RBC(type) {
  if ($('#RBC').length > 0) {
    const response = await fetch('/chartData_Donut_RBC');
    const data = await response.json();
      // const dataArray = dataOA[0].OAData;
      // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
    const catename =data.catename
    const revenue =data.revenue

    const catename_year =data.catename_year
    const revenue_year =data.revenue_year
      // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
      catename.forEach(subArray => {
        if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
            subArray.forEach(catename => {
                console.log(catename);
            });
        } else {
        }
    }); 
    revenue.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(revenue => {
              console.log(revenue);
          });
      } else {
      }
  });       
  
catename_year.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
        subArray.forEach(catename_year => {
            console.log(catename_year);
        });
    } else {
    }
}); 
revenue_year.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(revenue_year => {
          console.log(revenue_year);
      });
  } else {
  }
}); 
      const chartData = {
        This_month: {
              series: data.revenue,
              labels: data.catename
          },
          This_year: {
              series: data.revenue_year,
              labels: data.catename_year
          }
      };

      const pieConfig = {
          colors: ['#007bff', '#fd7e14', '#28a745', '#17a2b8', '#dc3545', '#ffc107', '#6610f2'],
          series: chartData[type].series,
          chart: {
              fontFamily: 'Poppins, sans-serif',
              height: 320,
              type: 'donut'
          },
          labels: chartData[type].labels,
          legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '14px',
              markers: {
                  width: 12,
                  height: 12
              },
              itemMargin: {
                  horizontal: 10,
                  vertical: 5
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
                  chart: {
                      width: 200,
                      height: 200
                  },
                  legend: {
                      position: 'bottom'
                  }
              }
          }]
      };

      if (chart) {
          chart.destroy();
      }

      chart = new ApexCharts(document.querySelector("#RBC"), pieConfig);
      chart.render();
  }
}

$(document).ready(function() {
  let chart; // Declare chart variable outside of the function

  fetchDataAndRenderChartDonut_RBC('This_month'); // Default type is daily

  $('.dropdown-item4').on('click', function() {
      var type = $(this).data('chart');
      var buttonLabel = type.replace('_', ' ').replace(/\b\w/g, function(l){ return l.toUpperCase() });
      $('#dropdownMenuButton4').text(buttonLabel);
      fetchDataAndRenderChartDonut_RBC(type);
  });
});

async function fetchDataAndRenderChartDonut_QBS() {

  if($('#QBS').length > 0 ){
    const response = await fetch('/chartData_Donut_QBS');
    const data = await response.json();
      // const dataArray = dataOA[0].OAData;
      // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
    const sname =data.sname
    const quantity =data.quantity
      // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
      sname.forEach(subArray => {
        if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
            subArray.forEach(sname => {
                console.log(sname);
            });
        } else {
        }
    }); 
    quantity.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(quantity => {
              console.log(quantity);
          });
      } else {
      }
  }); 
    var donut_QBS = document.getElementById("QBS"),
    pieConfig = {
      colors: ['#007bff', '#fd7e14', '#28a745', '#17a2b8', '#dc3545', '#ffc107', '#6610f2'],
      series: quantity,
      chart: {
        fontFamily: 'Poppins, sans-serif',
        height: 320,
        type: 'donut',
      },
      labels: sname,
      legend: {
        position: 'bottom', // Position the legend below the chart
        horizontalAlign: 'center', 
        fontSize: '14px',
        markers: {
            width: 12,
            height: 12,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 5
        }
    },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
                      height:200,
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    var pieChart = new ApexCharts(donut_QBS, pieConfig);
    pieChart.render();
}
}
$(document).ready(function() {
  fetchDataAndRenderChartDonut_QBS();
});
async function fetchDataAndRenderChartDonut_QBC(type) {
  if ($('#QBC').length > 0) {
    const response = await fetch('/chartData_Donut_QBC');
    const data = await response.json();
      // const dataArray = dataOA[0].OAData;
      // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
    const catename =data.catename
    const quantity =data.quantity
    
    const catename_year =data.catename_year
    const quantity_year =data.quantity_year
    
      // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
      catename.forEach(subArray => {
        if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
            subArray.forEach(catename => {
                console.log(catename);
            });
        } else {
        }
    }); 
    quantity.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(quantity => {
              console.log(quantity);
          });
      } else {
      }
  }); 
  catename_year.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(catename_year => {
              console.log(catename_year);
          });
      } else {
      }
  }); 
    quantity_year.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(quantity_year => {
              console.log(quantity_year);
          });
      } else {
      }
    }); 
      const chartData = {
          This_month: {
              series: data.quantity,
              labels: data.catename
          },
          This_year: {
              series: data.quantity_year,
              labels: data.catename_year
          }
      };

      const pieConfig = {
          colors: ['#007bff', '#fd7e14', '#28a745', '#17a2b8', '#dc3545', '#ffc107', '#6610f2'],
          series: chartData[type].series,
          chart: {
              fontFamily: 'Poppins, sans-serif',
              height: 320,
              type: 'donut'
          },
          labels: chartData[type].labels,
          legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '14px',
              markers: {
                  width: 12,
                  height: 12
              },
              itemMargin: {
                  horizontal: 10,
                  vertical: 5
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
                  chart: {
                      width: 200,
                      height: 200
                  },
                  legend: {
                      position: 'bottom'
                  }
              }
          }]
      };

      if (window.chart) {
          window.chart.destroy();
      }

      window.chart = new ApexCharts(document.querySelector("#QBC"), pieConfig);
      window.chart.render();
  }
}

$(document).ready(function() {
  fetchDataAndRenderChartDonut_QBC('This_month'); // Default type is This_month

  $('.dropdown-item3').on('click', function() {
      var type = $(this).data('chart');
      var buttonLabel = type.replace('_', ' ').replace(/\b\w/g, function(l){ return l.toUpperCase() });
      $('#dropdownMenuButton3').text(buttonLabel);
      fetchDataAndRenderChartDonut_QBC(type);
  });
});

async function fetchDataAndRenderChartLineCol(type) {
  if ($('#s-line1').length > 0) {
    const response = await fetch('/linecolChart');
  const data = await response.json();
    // const dataArray = dataOA[0].OAData;
    // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
  const day =data.day1
  const net_revenue = data.net_revenue
  const gross_profit  = data.gross_profit

  const net_revenue_monthly = data.net_revenue_monthly
  const gross_profit_monthly  = data.gross_profit_monthly

  const net_revenue_yearly = data.net_revenue_yearly
  const gross_profit_yearly  = data.gross_profit_yearly

    // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
    day.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(day => {
              console.log(day);
          });
      } else {
      }
  }); 
  net_revenue.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
        subArray.forEach(net_revenue => {
            console.log(net_revenue);
        });
    } else {
    }
}); 
gross_profit.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(gross_profit => {
          console.log(gross_profit);
      });
  } else {
  }
}); 
net_revenue_monthly.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(net_revenue_monthly => {
          console.log(net_revenue_monthly);
      });
  } else {
  }
}); 
gross_profit_monthly.forEach(subArray => {
if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
    subArray.forEach(gross_profit_monthly => {
        console.log(gross_profit_monthly);
    });
} else {
}
}); 


net_revenue_yearly.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(net_revenue_yearly => {
          console.log(net_revenue_yearly);
      });
  } else {
  }
}); 
gross_profit_yearly.forEach(subArray => {
if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
    subArray.forEach(gross_profit_yearly => {
        console.log(gross_profit_yearly);
    });
} else {
}
}); 

    const chartData = {
      daily: {
        series: [{
          name: "Net revenue",
          type: 'column',
          data: data.net_revenue
        }, {
          name: "Gross Profit",
          type: 'column',
          data: data.gross_profit
        }],
        categories: data.day1
      },
      monthly: {
        series: [{
          name: "Net revenue",
          type: 'column',
          data: data.net_revenue_monthly
        }, {
          name: "Gross Profit",
          type: 'column',
          data: data.gross_profit_monthly
        }],
        categories: monthNamesUntilCurrent
      },
      yearly: {
        series: [{
          name: "Net revenue",
          type: 'column',
          data: data.net_revenue_yearly
        }, {
          name: "Gross Profit",
          type: 'column',
          data: data.gross_profit_yearly
        }],
        categories: years
      }
    };

    let chart;

    function renderChart(type) {
      if (chart) {
        chart.destroy();
      }

      const sline1 = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#ff737b', '#fda600'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        series: chartData[type].series,
        title: {
          text: '',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f1f2f3', 'transparent'],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: chartData[type].categories
        }
      };

      chart = new ApexCharts(document.querySelector("#s-line1"), sline1);
      chart.render();
    }

    // Initial render of the chart
    renderChart(type);

    // Event listener for dropdown items
    $('.dropdown-item1').on('click', function() {
      var type = $(this).data('chart');
      var buttonLabel = type.charAt(0).toUpperCase() + type.slice(1);
      $('#dropdownMenuButton1').text(buttonLabel);
      renderChart(type);
    });
  }
}

$(document).ready(function() {
  fetchDataAndRenderChartLineCol('daily'); // Default type is daily
});
async function fetchDataAndRenderChartLine(type) {
  if ($('#s-line').length > 0) {
    const response = await fetch('/lineChart');
    const data = await response.json();
      // const dataArray = dataOA[0].OAData;
      // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
    const revenue_growth_rate = data.revenue_growth_rate
    const revenue_growth_rate_monthly = data.revenue_growth_rate_monthly
      // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
  
    revenue_growth_rate.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(revenue_growth_rate => {
              console.log(revenue_growth_rate);
          });
      } else {
      }
  }); 
  revenue_growth_rate_monthly.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
        subArray.forEach(revenue_growth_rate_monthly => {
            console.log(revenue_growth_rate_monthly);
        });
    } else {
    }
  }); 
      const chartData = {
          yearly: {
              series: [{
                  name: "Revenue growth rate",
                  data: data.revenue_growth_rate
              }],
              categories: years// Dữ liệu danh sách ngày
          },
          monthly: {
              series: [{
                  name: "Revenue growth rate",
                  data: data.revenue_growth_rate_monthly
              }],
              categories: monthNamesUntilCurrent // Dữ liệu danh sách tháng
          }
      };

      const sline = {
          chart: {
              height: 350,
              type: 'line',
              zoom: {
                  enabled: false
              },
              toolbar: {
                  show: false
              }
          },
          colors: ['#7539FF'],
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'straight'
          },
          series: chartData[type].series,
          title: {
              text: '',
              align: 'left'
          },
          grid: {
              row: {
                  colors: ['#f1f2f3', 'transparent'],
                  opacity: 0.5
              }
          },
          xaxis: {
              categories: chartData[type].categories
          }
      };

      if (chart) {
          chart.destroy();
      }

      chart = new ApexCharts(document.querySelector("#s-line"), sline);
      chart.render();
  }
}

$(document).ready(function() {
  let chart; // Declare chart variable outside of the function

  fetchDataAndRenderChartLine('yearly'); // Default type is daily

  $('.dropdown-item2').on('click', function() {
      var type = $(this).data('chart');
      var buttonLabel = type.charAt(0).toUpperCase() + type.slice(1);
      $('#dropdownMenuButton2').text(buttonLabel);
      fetchDataAndRenderChartLine(type);
  });
});

async function fetchDataAndRenderChartRetention(){
  if ($('#s-Retention').length > 0) {

    // Dữ liệu mẫu cho doanh thu của dòng và cột
    const response = await fetch('/chartData_Retention');
    const data = await response.json();
      // const dataArray = dataOA[0].OAData;
      // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
    const num_new_customers = data.num_new_customers
    const num_returning_customers = data.num_returning_customers
    const retention_rate = data.retention_rate

      // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
    num_new_customers.forEach(subArray => {
        if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
            subArray.forEach(num_new_customers => {
                console.log(num_new_customers);
            });
        } else {
        }
    }); 
    num_returning_customers.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(num_returning_customers => {
              console.log(num_returning_customers);
          });
      } else {
      }
  });     
  retention_rate.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
        subArray.forEach(retention_rate => {
            console.log(retention_rate);
        });
    } else {
    }
}); 
    // Danh sách các tháng
    const months = monthNamesUntilCurrent

    // Tạo đối tượng biểu đồ
    var Retention = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            }
        },
        colors: ['#7539FF', '#ff737b', '#fda600'], // Màu của đường và cột
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            name: "Retention rate",
            type: 'line',
            data: retention_rate // Dữ liệu cho đường
        }, {
            name: "New customers",
            type: 'column',
            data: num_new_customers // Dữ liệu cho cột 1
        }, {
            name: "Retention customers",
            type: 'column',
            data: num_returning_customers // Dữ liệu cho cột 2
        }],
        title: {
            text: '',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f1f2f3', 'transparent'], // Màu của các dòng lưới
                opacity: 0.5
            },
        },
        xaxis: {
            categories: months // Sử dụng danh sách tháng làm nhãn trục x
        },
        tooltip: {
          y: {
              formatter: function(val, { seriesIndex }) {
                  if (seriesIndex === 0) {
                      return val + "%";
                  }
                  return val + " hundered";
              }
          }
      }
    };

    // Tạo và hiển thị biểu đồ
    var chart = new ApexCharts(
        document.querySelector("#s-Retention"),
        Retention
    );

    chart.render();
}
}
$(document).ready(function() {
  fetchDataAndRenderChartRetention();
});
async function fetchDataAndRenderChartTest(){
  const response = await fetch('/lineChart');
  const data = await response.json();
    // const dataArray = dataOA[0].OAData;
    // const formattedData = `(${dataArray.length}) [${dataArray.join(', ')}]`;
  const year =data.years
  const revenue_growth_rate = data.revenue_growth_rate

    // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
    year.forEach(subArray => {
      if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
          subArray.forEach(year => {
              console.log(year);
          });
      } else {
      }
  }); 
  revenue_growth_rate.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
        subArray.forEach(revenue_growth_rate => {
            console.log(revenue_growth_rate);
        });
    } else {
    }
}); 
// Simple Line Area
$(document).ready(function() {
  
  const chartData = {
      weekly: {
          series: [{
              name: 'Weekly series1',
              data: revenue_growth_rate
          }, {
              name: 'Weekly series2',
              data: revenue_growth_rate
          }],
          categories: year
      },
      monthly: {
          series: [{
              name: 'Monthly series1',
              data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109]
          }, {
              name: 'Monthly series2',
              data: [11, 32, 45, 32, 34, 52, 41, 31, 11, 32, 45, 32, 34, 52]
          }],
          categories: ['2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00', '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00', '2018-09-19T06:30:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00', '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00', '2018-09-19T06:30:00']
      },
      yearly: {
          series: [{
              name: 'Yearly series1',
              data: [310, 420, 280, 510, 420, 1090, 1000]
          }, {
              name: 'Yearly series2',
              data: [110, 320, 450, 320, 340, 520, 410]
          }],
          categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
      }
  };

  let chart;

  function renderChart(type) {
      if (chart) {
          chart.destroy();
      }

      var sLineArea = {
          chart: {
              height: 350,
              type: 'area',
              toolbar: {
                  show: false,
              }
          },
          colors: ['#7539FF', '#00e396'],
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'smooth'
          },
          series: chartData[type].series,
          xaxis: {
              type: 'datetime',
              categories: chartData[type].categories
          },
          tooltip: {
              x: {
                  format: 'dd/MM/yy HH:mm'
              },
          }
      }

      chart = new ApexCharts(document.querySelector("#s-line-area"), sLineArea);
      chart.render();
  }

  // Initial render of the chart
  renderChart('monthly');

  // Event listener for dropdown items
  $('.dropdown-item').on('click', function() {
      var type = $(this).data('type');
      var buttonLabel = type.charAt(0).toUpperCase() + type.slice(1);
      $('#dropdownMenuButton').text(`${buttonLabel}`);
      renderChart(type);
  });
});
}

$(document).ready(function() {
  fetchDataAndRenderChartTest();
});
// Simple Column
async function fetchDataAndRenderChartColumn() {


  const response = await fetch('/SAChart');
  const data = await response.json();
  const revenueData = data.revenueData;
  const netProfitData =data.netProfitData

  const revenueData_yearly = data.revenueData_yearly;
  const netProfitData_yearly =data.netProfitData_yearly
  
  const day1 = data.day1
  const revenueData_daily = data.revenueData_daily;
  const netProfitData_daily =data.netProfitData_daily
  // Truy cập vào mỗi mảng con và lấy ra các giá trị doanh thu
  
revenueData.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
        subArray.forEach(revenue => {
            console.log(revenue);
        });
    } else {
    }
}); 
  netProfitData.forEach(subArray => {
    if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(revenue => {
          console.log(revenue);
      });
  } else {
  }
});
revenueData_yearly.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(revenueData_yearly => {
          console.log(revenueData_yearly);
      });
  } else {
  }
}); 
netProfitData_yearly.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
    subArray.forEach(netProfitData_yearly => {
        console.log(netProfitData_yearly);
    });
} else {
}
});


day1.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
      subArray.forEach(day => {
          console.log(day);
      });
  } else {
  }
}); 
netProfitData_daily.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
    subArray.forEach(netProfitData_daily => {
        console.log(netProfitData_daily);
    });
} else {
}
});

revenueData_daily.forEach(subArray => {
  if (Array.isArray(subArray)) { // Kiểm tra xem subArray có phải là mảng không
    subArray.forEach(revenueData_daily => {
        console.log(revenueData_daily);
    });
} else {
}
});

$(document).ready(function() {
  const chartData = {
    weekly: {
      series: [{
          name: 'Net Profit',
          data: netProfitData_daily
      }, {
          name: 'Revenue',
          data: revenueData_daily
      }],
      categories: day1
  },
  
    monthly: {
      series: [{
          name: 'Net Profit',
          data: netProfitData
      }, {
          name: 'Revenue',
          data: revenueData 
      }],
      categories: monthNamesUntilCurrent
  },

    yearly: {
        series: [{
            name: 'Net Profit',
            data: netProfitData_yearly
        }, {
            name: 'Revenue',
            data: revenueData_yearly
        }],
        categories: [2020,2021,2022,2023,2024]
    }
  };

  let chart;

  function renderChart(type) {
    if (chart) {
        chart.destroy();
    }

    var sCol = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'  
            },
        },
        colors: ['#7539FF', '#00e396'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: chartData[type].series,
        xaxis: {
            categories: chartData[type].categories,
        },
        yaxis: {
            title: {}
        },
        fill: {
            opacity: 1
    
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };

    chart = new ApexCharts(document.querySelector("#s-col"), sCol);
    chart.render();
  }

  // Initial render of the chart
  renderChart('weekly');

  // Event listener for dropdown items
  $('.dropdown-item').on('click', function() {
    var type = $(this).data('type');
    var buttonLabel = type.charAt(0).toUpperCase() + type.slice(1);
    $('#dropdownMenuButton').text(`${buttonLabel}`);
    renderChart(type);
  });
});
}
$(document).ready(function() {
  fetchDataAndRenderChartColumn();
});

// Simple Column Stacked
if($('#s-col-stacked').length > 0 ){
var sColStacked = {
    chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        }
    },
    colors: ['#7539FF', '#00e396', '#feb019', '#ff4560'],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    plotOptions: {
        bar: {
            horizontal: false,
        },
    },
    series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
    },{
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
    },{
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
    },{
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
    }],
    xaxis: {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
    },
    legend: {
        position: 'right',
        offsetY: 40
    },
    fill: {
        opacity: 1
    },
}

var chart = new ApexCharts(
    document.querySelector("#s-col-stacked"),
    sColStacked
);

chart.render();
}

// Simple Bar
if($('#s-bar').length > 0 ){
var sBar = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        }
    },
    colors: ['#7539FF'],
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
    }
}

var chart = new ApexCharts(
    document.querySelector("#s-bar"),
    sBar
);

chart.render();
}


if($('#s-cohort').length > 0 ){

 const cohortData = [
    { cohort_year: '2020-01-01', order_year: '2020-01-01', num_accounts: 100, cohort_size: 200, retention_rate: 50 },
    { cohort_year: '2020-01-01', order_year: '2020-02-01', num_accounts: 80, cohort_size: 200, retention_rate: 40 },
    { cohort_year: '2020-01-01', order_year: '2020-03-01', num_accounts: 120, cohort_size: 200, retention_rate: 70 },
    // Thêm dữ liệu khác nếu cần
];

// Biểu đồ cohort sử dụng ApexCharts
var options = {
    chart: {
        type: 'line',
        height: 350
    },
    series: [
        {
            name: "Retention Rate",
            data: cohortData.map(item => item.retention_rate) // Dữ liệu tỷ lệ giữ chân khách hàng
        }
    ],
    xaxis: {
        categories: cohortData.map(item => item.order_year), // Dữ liệu tháng/năm
        labels: {
            rotate: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Arial, sans-serif'
            }
        }
    },
    yaxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function (value) {
                return value + '%'; // Định dạng giá trị trục y là phần trăm
            }
        }
    }
};

// Khởi tạo biểu đồ với tùy chọn đã cung cấp
var chart = new ApexCharts(
  document.querySelector("#s-cohort"),
  options
);
chart.render(); // Hiển thị biểu đồ
  }

// Mixed Chart
if($('#mixed-chart').length > 0 ){
var options = {
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    }
  },
  colors: ['#7539FF', '#00e396'],
  series: [{
    name: 'Website Blog',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
  }, {
    name: 'Social Media',
    type: 'line',
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
  }],
  stroke: {
    width: [0, 4]
  },
  title: {
    text: 'Traffic Sources'
  },
  labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
  xaxis: {
    type: 'datetime'
  },
  yaxis: [{
    title: {
      text: 'Website Blog',
    },

  }, {
    opposite: true,
    title: {
      text: 'Social Media'
    }
  }]

}

var chart = new ApexCharts(
  document.querySelector("#mixed-chart"),
  options
);

chart.render();
}

// Donut Chart

if(document.querySelector('#donut-chart')){
  var donutChart = {
      chart: {
          height: 350,
          type: 'donut',
          toolbar: {
              show: false,
          }
      },
      colors: ['#7539FF', '#00e396', '#feb019', '#ff4560'],
      series: [44, 55, 41, 17],
      labels: ['Confirmed', 'Preparing', 'Delivering', 'Delivered'], // Add your labels here
      legend: {
          position: 'bottom', // Position the legend below the chart
          horizontalAlign: 'center', 
          fontSize: '14px',
          markers: {
              width: 12,
              height: 12,
          },
          itemMargin: {
              horizontal: 10,
              vertical: 5
          }
      },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200,
                  height: 300,
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  }

  var donut = new ApexCharts(
      document.querySelector("#donut-chart"),
      donutChart
  );

  donut.render();
}

// Radial Chart
if($('#radial-chart').length > 0 ){
var radialChart = {
    chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false,
        }
    },
    colors: ['#7539FF', '#00e396', '#feb019', '#ff4560'],
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (w) {
                        return 249
                    }
                }
            }
        }
    },
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],    
}

var chart = new ApexCharts(
    document.querySelector("#radial-chart"),
    radialChart
);

chart.render();
}	

if($('#earnings-chart').length > 0 ){
    var options = {
        series: [{
        name: "Earnings ",
        colors: ['#7539FF'],
        data: [{
          x: 'Jan',
          y: 40,
        }, {
          x: 'Feb',
          y: 38
        }, {
          x: 'Mar',
          y: 50
        }, {
          x: 'Apr',
          y: 85
        }, {
          x: 'May',
          y: 55
        },{
          x: 'Jun',
          y: 45
        },{
            x: 'Jul',
            y: 60
          },{
            x: 'Aug',
            y: 40
          },{
            x: 'Sep',
            y: 43
          },{
            x: 'Oct',
            y: 30
          },{
            x: 'Nov',
            y: 65
          },{
            x: 'Dec',
            y: 50
        }]
      }],
        chart: {
        type: 'bar',
        height: 250,
      },
      plotOptions: {
        bar: {
            borderRadius: 50,
            borderRadiusApplication: 'around',
        }
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#7539FF'],
      xaxis: {
        type: 'category',
        group: {
          style: {
            fontSize: '7px',
            fontWeight: 700,
          },
          groups: [
            { title: '2019', cols: 4 },
            { title: '2020', cols: 4 }
          ]
        }
      },
      
      };

      var chart = new ApexCharts(document.querySelector("#earnings-chart"), options);
      chart.render();
}	


if($('#companies_flow').length > 0 ){
  var options = {
    series: [{
      name: "Companies",
      data: [25, 40, 30, 55, 25, 35, 25,50,20]
  }],
    chart: {
    height: 273,
    type: 'area',
    zoom: {
      enabled: false
    }
  },
  colors: ['#FF9F43'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: '',
    align: 'left'
  },
  // grid: {
  //   row: {
  //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //     opacity: 0.5
  //   },
  // },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  },
  yaxis: {
    min: 10,
    max: 60,
    tickAmount: 5,
        labels: {
          formatter: (val) => {
            return val / 1 + 'K'
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
  };

  var chart = new ApexCharts(document.querySelector("#companies_flow"), options);
  chart.render();
}

if($('#plane-chart').length > 0 ){
  var options = {
    series: [{
    data: [400, 325, 312, 294, 254, 252]
  }],
    chart: {
    type: 'bar',
    height: 300
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#FFEFDD', '#EADDFF', '#DDF3FF', '#FFECEC', '#E1FFED', '#E0E0E0'],
  dataLabels: {
    enabled: true,
    textAnchor: 'end',
    margin:10,
    style: {
      colors: ['#1D1D1D']
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
    },
    offsetX: 0,
    dropShadow: {
      enabled: true
    }
  },
  stroke: {
    width: 0,
    colors: ['#1D1D1D'],
  },
  xaxis: {
    categories: ['Sales : $6,100,00','Sales : $5,100,00','Sales : $4,200,00','Sales : $3,400,00','Sales : $3,400,00','Sales : $400,00'],
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return ''
        }
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#plane-chart"), options);
  chart.render();
}
	
	
  
});