export const charts = [
  //  二维环状统计
  {
    color: ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59'],
    // 标签内容格式器
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // 标题
    title: {
      text: '二维环状统计',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      },
      subtext: '此处加入总计',
      left: 0,
      top: 0
    },
    // 图例组件
    legend: {
      orient: 'vertical',
      type: 'scroll',
      left: 0,
      top: 50,
      bottom: 5,
      padding: [5, 0, 5, 0],
      // 需要传入的具体名称数组
      data: ['具类1', '具类2', '具类3', '具类4', '具类5', '具类6']
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {show: true}
      }
    },
    series: [
      {
        // tooltip的显示
        name: '统计类总称',
        // 类型: pie
        type: 'pie',
        // 位置
        center: ['60%', '50%'],
        // 圆环宽度
        radius: ['40%', '60%'],
        // 防止标签重叠
        avoidLabelOverlap: false,
        // 显示的文字标签
        label: {
          // 环内则设置center
          normal: {
            show: true,
            position: 'left',
            formatter: '{b}'
          }
          // 强调
          // emphasis: {
          //   show: true,
          //   position: 'center',
          //   textStyle: {
          //     fontSize: '30',
          //     fontWeight: 'bold'
          //   }
          // }
        },
        // 标签线
        // labelLine: {
        //   normal: {
        //     show: true
        //   }
        // },
        // 数据
        data: [
          // 需要传入的具体数据，包含值和名称，对象形式
          {value: 0, name: '具类1'},
          {value: 0, name: '具类2'},
          {value: 0, name: '具类3'},
          {value: 0, name: '具类4'},
          {value: 0, name: '具类5'},
          {value: 0, name: '具类6'},
          {value: 0, name: '具类7'},
          {value: 0, name: '具类8'}
        ]
      }
    ]
  },
  //  二维饼图统计
  {
    color: ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59'],
    title: {
      text: '二维饼图',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      },
      subtext: '此处加入总计',
      left: 0,
      top: 0
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: true,
      orient: 'vertical',
      type: 'scroll',
      // x: 'center',
      // y: 'bottom',
      left: 0,
      top: '50%',
      bottom: 5,
      padding: [5, 0, 5, 0],
      data: ['类1', '类2']
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {show: true}
      }
    },
    series: [
      {
        name: '饼图分布',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          {value: 0, name: '类1'},
          {value: 0, name: '类2'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  },
  //  二维柱状图图
  {
    color: ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59'],
    // 标题: 副标题为总数统计, 自行填入
    title: {
      text: '二维柱状统计',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      },
      subtext: '此处加入总计'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{a} <br/>{b} : {c} ',
      axisPointer: {
        type: 'shadow'
      }
    },
    // 工具箱
    toolbox: {
      show: true,
      feature: {
        magicType: {type: ['line', 'bar']},
        // 工具箱表格标题
        // dataView: {show: true, readOnly: true, lang: ['统计表', '关闭', '刷新']},
        saveAsImage: {show: true}
      }
    },
    grid: {
      show: true,
      left: '1%',
      right: '1%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {rotate: 45, interval: 0},
        // 多个类别自填
        data: ['具类1', '具类2', '具类3', '具类4', '具类5', '具类6', '具类7', '具类8', '具类9', '具类10', '具类11', '具类12', '具类13', '具类14'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        // 类别自填
        name: '此处加入主题类',
        type: 'bar',
        // 宽度
        barWidth: '50%',
        // 位置
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        },
        itemStyle: {
          //  设置颜色
          normal: {
            color: function (params) {
              let colorList = ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59']
              return colorList[params.dataIndex]
            }
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0},
          {name: '具类13', value: 0},
          {name: '具类14', value: 0}
        ]
      }
    ]
  },
  //  二维线状趋势统计
  {
    // 标题: 副标题为总数统计, 自行填入
    title: {
      text: '二维线状图趋势统计',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      },
      subtext: '此处加入总计'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{a} <br/>{b} : {c} ',
      axisPointer: {
        type: 'shadow'
      }
    },
    // 工具箱
    toolbox: {
      show: true,
      feature: {
        magicType: {type: ['line', 'bar']},
        // 工具箱表格标题
        // dataView: {show: true, readOnly: true, lang: ['统计表', '关闭', '刷新']},
        saveAsImage: {show: true}
      }
    },
    grid: {
      show: true,
      left: '1%',
      right: '1%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // 多个类别自填
        data: ['具类1', '具类2', '具类3', '具类4', '具类5', '具类6', '具类7', '具类8', '具类9', '具类10', '具类11', '具类12', '具类13', '具类14'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        // 类别自填
        name: '此处加入主题类',
        type: 'line',
        // 宽度
        barWidth: '50%',
        // 位置
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        },
        itemStyle: {
          //  设置颜色
          normal: {
            color: function (params) {
              let colorList = ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59']
              return colorList[params.dataIndex]
            }
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0},
          {name: '具类13', value: 0},
          {name: '具类14', value: 0}
        ]
      }
    ]
  },
  //  区域缩放三维柱状图统计
  {
    color: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    title: {
      text: '区域缩放三维柱状图',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      },
      subtext: '此处加入总计',
      left: '0%',
      top: '0%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: '20%',
      containLabel: true,
      show: true
    },
    legend: {
      data: ['情形1', '情形2', '情形3'],
      type: 'scroll',
      // orient: '',
      orient: 'vertical',
      right: 10,
      top: 'center',
      // bottom: 5,
      padding: [5, 0, 5, 0],
      formatter: function (name) {
        if (name.length > 4) {
          return name.substring(0, 4) + '..'
        } else {
          return name
        }
      },
      tooltip: {
        show: true
      }
    },
    // 区域缩放设置
    dataZoom: [
      {
        type: 'slider',
        start: 30,
        end: 80,
        dataBackground: {
          areaStyle: {
            color: 'rgba(103, 104, 105, 0.7)'
          },
          lineStyle: {
            color: 'rgba(203, 104, 105, 1)'
          }
        },
        fillerColor: 'rgba(217, 239, 249, 0.5)',
        handleStyle: {
          color: 'rgba(63, 177, 227, 0.9)'
        },
        left: '20px',
        right: '20px',
        bottom: '10px'
      }
    ],
    toolbox: {
      show: true,
      feature: {
        magicType: {type: ['line', 'bar']},
        // dataView: {show: true, readOnly: true, lang: ['统计表', '关闭', '刷新']},
        saveAsImage: {show: true}
      }
    },
    // grid: {
    //   left: '1%',
    //   right: '1%',
    //   bottom: '1%',
    //   containLabel: true,
    //   show: true
    // },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisLabel: {rotate: 0, interval: 0, align: 'center'},
        axisTick: {show: false},
        nameLocation: 'center',
        data: [
          '具类1',
          '具类2',
          '具类3',
          '具类4',
          '具类5',
          '具类6',
          '具类7',
          '具类8',
          '具类9',
          '具类10',
          '具类11',
          '具类12'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        // 类别自填
        name: '情形1',
        type: 'bar',
        // 宽度
        barWidth: '20%',
        // 位置
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: '{c}'
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0}
        ]
      },
      {
        // 类别自填
        name: '情形2',
        type: 'bar',
        // 宽度
        barWidth: '20%',
        // 位置
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: '{c}'
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0}
        ]
      },
      {
        // 类别自填
        name: '情形3',
        type: 'bar',
        // 宽度
        barWidth: '20%',
        // 位置
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: '{c}'
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0}
        ]
      }
    ]
  },
  //  三维柱状图统计
  {
    color: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    title: {
      text: '三维柱状图统计',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      },
      subtext: '此处加入总计',
      left: '0%',
      top: '0%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['情形1', '情形2', '情形3'],
      type: 'scroll',
      // orient: '',
      right: 'center',
      top: 10,
      // bottom: 5,
      padding: [5, 0, 5, 0],
      formatter: function (name) {
        if (name.length > 4) {
          return name.substring(0, 4) + '..'
        } else {
          return name
        }
      },
      tooltip: {
        show: true
      }
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {type: ['line', 'bar', 'tiled', 'stack']},
        // dataView: {show: true, readOnly: true, lang: ['统计表', '关闭', '刷新']},
        saveAsImage: {show: true}
      }
    },
    // grid: {
    //   left: '1%',
    //   right: '1%',
    //   bottom: '1%',
    //   containLabel: true,
    //   show: true
    // },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: [
          '具类1',
          '具类2',
          '具类3',
          '具类4',
          '具类5',
          '具类6',
          '具类7',
          '具类8',
          '具类9',
          '具类10',
          '具类11',
          '具类12'
        ],
        axisLabel: {
          formatter: function (params) {
            let newParamsName = ''
            let paramsNameNumber = params.length
            let provideNumber = 5
            let rowNumber = Math.ceil(paramsNameNumber / provideNumber)
            if (paramsNameNumber > provideNumber) {
              for (let p = 0; p < rowNumber; p++) {
                let tempStr = ''
                let start = p * provideNumber
                let end = start + provideNumber
                if (p === rowNumber - 1) {
                  tempStr = params.substring(start, paramsNameNumber)
                } else {
                  tempStr = params.substring(start, end) + '\n'
                }
                newParamsName += tempStr
              }
            } else {
              newParamsName = params
            }
            return newParamsName
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        // 类别自填
        name: '情形1',
        type: 'bar',
        // 宽度
        barWidth: '20%',
        // 位置
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: '{c}'
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0}
        ]
      },
      {
        // 类别自填
        name: '情形2',
        type: 'bar',
        // 宽度
        barWidth: '20%',
        // 位置
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: '{c}'
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0}
        ]
      },
      {
        // 类别自填
        name: '情形3',
        type: 'bar',
        // 宽度
        barWidth: '20%',
        // 位置
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: '{c}'
          }
        },
        // 数据
        data: [
          {name: '具类1', value: 0},
          {name: '具类2', value: 0},
          {name: '具类3', value: 0},
          {name: '具类4', value: 0},
          {name: '具类5', value: 0},
          {name: '具类6', value: 0},
          {name: '具类7', value: 0},
          {name: '具类8', value: 0},
          {name: '具类9', value: 0},
          {name: '具类10', value: 0},
          {name: '具类11', value: 0},
          {name: '具类12', value: 0}
        ]
      }
    ]
  },
  // 任务进度统计
  {
    color: ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59'],
    title: {
      text: '任务进度统计',
      textStyle: {
        fontSize: 16,
        fontWeight: 800
      }
    },
    tooltip: {
      show: true,
      formatter: '{a} <br/>{b} : ({d}%)'
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {show: true}
      }
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      y: 'center',
      data: ['任务1完成率', '任务2完成率', '任务3完成率']
    },
    series: [
      {
        name: '任务1',
        type: 'pie',
        clockWise: false,
        // 设置环状的宽度
        radius: ['10%', '20%'],
        center: ['60%', '60%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {
            value: 0,
            name: '任务1完成率'
          },
          {
            value: 0,
            name: '未通过率',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                label: {show: false},
                labelLine: {show: false}
              },
              emphasis: {
                color: 'rgba(0,0,0,0)'
              }
            }
          }
        ]
      },
      {
        name: '任务2',
        type: 'pie',
        clockWise: false,
        radius: ['30%', '40%'],
        center: ['60%', '60%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {
            value: 0,
            name: '任务2完成率'
          },
          {
            value: 0,
            name: '未通过率',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                label: {show: false},
                labelLine: {show: false}
              },
              emphasis: {
                color: 'rgba(0,0,0,0)'
              }
            }
          }
        ]
      },
      {
        name: '任务3',
        type: 'pie',
        clockWise: false,
        radius: ['50%', '60%'],
        center: ['60%', '60%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {
            value: 0,
            name: '任务3完成率'
          },
          {
            value: 0,
            name: '未通过率',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                label: {show: false},
                labelLine: {show: false}
              },
              emphasis: {
                color: 'rgba(0,0,0,0)'
              }
            }
          }
        ]
      }
    ]
  }
]

export const initChart = (chart, obj, type) => {
  console.log(obj)
  console.log(chart)
  switch (type) {
    case 1 :
      chart = JSON.parse(JSON.stringify(charts[0]))
      chart.series[0].name = obj.text
      chart.legend.data = obj.classes
      chart.series[0].data = obj.data
      break
    case 2 :
      chart = JSON.parse(JSON.stringify(charts[1]))
      chart.series[0].name = obj.text
      chart.series[0].data = []
      console.log(obj)
      chart.legend.data = obj.classes
      obj.data.forEach((item, index) => {
        // if (item.value) {
        item.label = {
          normal: {
            formatter: '{b} : {c} ({d}%)'
          }
        }
        chart.series[0].data.push(item)
        // }
      })
      break
    case 3 :
      chart = JSON.parse(JSON.stringify(charts[2]))
      let colorOptions = ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59']
      obj.data.forEach((item, index) => {
        item.itemStyle = {
          color: colorOptions[index]
        }
      })
      chart.series[0].name = obj.text
      chart.xAxis[0].data = obj.classes
      chart.series[0].data = obj.data
      break
    case 4 :
      chart = JSON.parse(JSON.stringify(charts[3]))
      chart.series[0].name = obj.text
      chart.xAxis[0].data = obj.classes
      chart.series[0].data = obj.data
      break
    case 5 :
      chart = JSON.parse(JSON.stringify(charts[4]))
      chart.series = []
      chart.xAxis[0].data = obj.legendData
      chart.legend.data = obj.classes
      chart.dataZoom[0].start = obj.zoom[0]
      chart.dataZoom[0].end = obj.zoom[1]
      obj.data.forEach((item, index) => {
        let obj2 = {
          name: item.name,
          type: 'bar',
          barWidth: obj.barWidth,
          label: {
            normal: {
              show: false,
              position: 'top',
              formatter: '{c}'
            }
          },
          data: item.value
        }
        chart.series.push(obj2)
      })
      break
    case 6 :
      chart = JSON.parse(JSON.stringify(charts[5]))
      chart.legend = obj.classes
      obj.classes.forEach((item, index) => {
        let obj2 = {
          name: item,
          type: 'bar',
          barWidth: '20%',
          label: {
            normal: {
              show: false,
              position: 'top',
              formatter: '{c}'
            }
          },
          data: obj.data[index]
        }
        chart.series.push(obj2)
      })
      break
    default :
      break
  }
  console.log(chart)
  chart.title.text = obj.text || '???'
  chart.title.subtext = obj.subtext || '???'
  chart.color = ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59', '#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59']
  // console.log(chart)
  return chart
}
