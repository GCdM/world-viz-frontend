class ChartController {

  static makeImmigrationChart(country, year) {
    Highcharts.chart('i-chart', {
      colorAxis: {
        minColor: '#D9FCD6',
        maxColor: '#0FA602'
      },
      chart:{
        backgroundColor: '#fff'
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: ChartController.parseFlows(country.immigrations, year)
      }],
      title: {
        text: "Immigrations in " + year
      },
    })
    const chartLabels = document.getElementsByClassName('highcharts-label highcharts-data-label')

    for (let i = 0; i < chartLabels.length; i++) {
      chartLabels[i].addEventListener('click', Listener.handleChartClick)
    }
  }

  static makeEmigrationChart(country, year) {
    Highcharts.chart('e-chart', {
      colorAxis: {
        minColor: '#FCD6CD',
        maxColor: '#D52C04'
      },
      chart:{
        backgroundColor: '#fff'
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: ChartController.parseFlows(country.emigrations, year)
      }],
      title: {
        text: "Emigrations in " + year
      }
    })
    const chartLabels = document.getElementsByClassName('highcharts-label highcharts-data-label')

    for (let i = 0; i < chartLabels.length; i++) {
      chartLabels[i].addEventListener('click', Listener.handleChartClick)
    }
  }

  static makeStreamChart(country, immigration) {
    let title = "Emigration Data"
    let migrations = country.emigrations

    if (immigration) {
      title = "Immigration Data"
      migrations = country.immigrations
    }

    let colors = Highcharts.getOptions().colors;
    Highcharts.chart('s-chart', {

        chart: {
            backgroundColor: '#fff',
            type: 'streamgraph',
            marginBottom: 30,
            zoomType: 'x'
        },

        // Make sure connected countries have similar colors
        colors: [
            colors[0],
            colors[1],
            colors[2],
            colors[3],
            colors[4],
            colors[5],
            colors[6],
            colors[7],
            colors[8],
            colors[9],
            colors[0],
            colors[1],
            colors[2],
            colors[3]
        ],

        title: {
            floating: true,
            align: 'left',
            text: title
        },
        subtitle: {
            floating: true,
            align: 'left',
            y: 35,
            text: 'between 1990 and 2017'
        },

        xAxis: {
            maxPadding: 0,
            type: 'category',
            crosshair: true,
            categories: [
                '',
                '1990',
                '1995',
                '2000',
                '2005',
                '2010',
                '2015',
                '2017',
                ''
            ],
            labels: {
                align: 'left',
                reserveSpace: false,
                rotation: 270
            },
            lineWidth: 0,
            margin: 20,
            tickWidth: 0
        },

        yAxis: {
            visible: false,
            startOnTick: false,
            endOnTick: false
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                label: {
                    minFontSize: 5,
                    maxFontSize: 15,
                    style: {
                        color: 'rgba(255,255,255,0.75)'
                    }
                }
            }
        },

        // Data parsed with olympic-medals.node.js
        series: ChartController.parseStream(migrations),

        exporting: {
            sourceWidth: 800,
            sourceHeight: 600
        }

    });

  }

  static makeDonutChart(country, year) {
    document.querySelector('#immi-donut').innerHTML = ""
    document.querySelector('#emi-donut').innerHTML = ""

    new d3pie("immi-donut", {
    	"header": {
    		"title": {
    			"text": "Immigrations",
    			"fontSize": 25,
    			"font": "sans-serif"
    		},
        "subtitle": {
    			"text": "by Region",
    			"color": "#999999",
    			"fontSize": 15,
    			"font": "sans-serif"
    		},
    		"location": "pie-center"
    	},
    	"size": {
    		"canvasWidth": 590,
    		"pieInnerRadius": "70%",
    		"pieOuterRadius": "70%"
    	},
    	"data": {
    		"sortOrder": "label-desc",
    		"content": ChartController.parseImmiDonut(country.immi_by_region[year])
    	},
    	"labels": {
    		"outer": {
    			"format": "label-percentage1",
    			"pieDistance": 20
    		},
    		"inner": {
    			"format": "none"
    		},
    		"mainLabel": {
    			"fontSize": 11
    		},
    		"percentage": {
    			"color": "#999999",
    			"fontSize": 11,
    			"decimalPlaces": 0
    		},
    		"value": {
    			"color": "#cccc43",
    			"fontSize": 11
    		},
    		"lines": {
    			"enabled": true,
    			"style": "straight",
    			"color": "#777777"
    		},
    		"truncation": {
    			"enabled": true
    		}
    	},
    	"tooltips": {
    		"enabled": true,
    		"type": "placeholder",
    		"string": "{label}: {value}, {percentage}%"
    	},
    	"effects": {
    		"pullOutSegmentOnClick": {
    			"effect": "linear",
    			"speed": 400,
    			"size": 8
    		}
    	},
    	"misc": {
    		"colors": {
    			"segmentStroke": "#FFFFFF"
    		}
    	}
    });
    new d3pie("emi-donut", {
    	"header": {
    		"title": {
    			"text": "Emigrations",
    			"fontSize": 25,
    			"font": "sans-serif"
    		},
        "subtitle": {
    			"text": "by Region",
    			"color": "#999999",
    			"fontSize": 15,
    			"font": "sans-serif"
    		},
    		"location": "pie-center"
    	},
    	"size": {
    		"canvasWidth": 590,
    		"pieInnerRadius": "70%",
    		"pieOuterRadius": "70%"
    	},
    	"data": {
    		"sortOrder": "label-desc",
    		"content": ChartController.parseEmiDonut(country.emi_by_region[year])
    	},
    	"labels": {
    		"outer": {
    			"format": "label-percentage1",
    			"pieDistance": 20
    		},
    		"inner": {
    			"format": "none"
    		},
    		"mainLabel": {
    			"fontSize": 11
    		},
    		"percentage": {
    			"color": "#999999",
    			"fontSize": 11,
    			"decimalPlaces": 0
    		},
    		"value": {
    			"color": "#cccc43",
    			"fontSize": 11
    		},
    		"lines": {
    			"enabled": true,
    			"style": "straight",
    			"color": "#777777"
    		},
    		"truncation": {
    			"enabled": true
    		}
    	},
    	"tooltips": {
    		"enabled": true,
    		"type": "placeholder",
    		"string": "{label}: {value}, {percentage}%"
    	},
    	"effects": {
    		"pullOutSegmentOnClick": {
    			"effect": "linear",
    			"speed": 400,
    			"size": 8
    		}
    	},
    	"misc": {
    		"colors": {
    			"segmentStroke": "#FFFFFF"
    		}
    	}
    });
  }

  static parseFlows(collection, year) {
    let colorCounter = 0
    let results = []
    for (let flow of collection) {
      results.push({
        name: flow.country_name,
        value: flow.data[year],
        colorValue: ++colorCounter
      })
    }
    return results
  }

  static parseStream(flows) {
    const results = []
    for (let flow of flows) {
      let parsed = {
        "name": flow.country_name,
        "data": [0]
      }
      for (let year in flow.data) {
        parsed["data"].push(flow.data[year])
      }
      parsed["data"].push(0)
      results.push(parsed)
    }
    return results
  }

  static parseImmiDonut(migrations) {
    const results = []
    let Dcolors = ['#D9FCD6', '#C7F9C3', '#B0F4AA', '#95E78D', '#98EC91', '#82DC7B', '#6BCC64', '#5EBF57', '#4FB148', '#41A73A', '#339C2C', '#298E22']
    let counter = 0
    for (let region in migrations) {
      results.push({
        "label": region,
        "value": migrations[region],
        "color": Dcolors[counter++ % 12]
      })
    }
    return results
  }

  static parseEmiDonut(migrations) {
    const results = []
    let Dcolors = ['#FCD6CD', '#F7BBAC', '#EB9B87', '#E3856D', '#DC755B', '#D6684D', '#D45536', '#CB4625', '#BB3D1D', '#AF3617', '#A52F11', '#D52C04']
    let counter = 0
    for (let region in migrations) {
      results.push({
        "label": region,
        "value": migrations[region],
        "color": Dcolors[counter++ % 12]
      })
    }
    return results
  }
}
