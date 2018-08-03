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
        radius: ['50%', '70%'],
        // 防止标签重叠
        avoidLabelOverlap: false,
        // 显示的文字标签
        label: {
          // 环内则设置inside
          normal: {
            show: true,
            position: 'outside'
          }
          // 强调
          // emphasis: {
          //   show: true,
          //   textStyle: {
          //     fontSize: '30',
          //     fontWeight: 'bold'
          //   }
          // }
        },
        // 标签线
        labelLine: {
          normal: {
            show: true
          }
        },
        // 数据
        data: [
          // 需要传入的具体数据，包含值和名称，对象形式
          {value: 120, name: '具类1'},
          {value: 120, name: '具类2'},
          {value: 120, name: '具类3'},
          {value: 120, name: '具类4'},
          {value: 120, name: '具类5'},
          {value: 120, name: '具类6'}
        ]
      }
    ]
  },
  //  二维饼图统计
  {
    color: ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59'],
    title: {
      text: '二维饼图',
      subtext: '此处加入总计',
      left: 0,
      top: 0
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      type: 'scroll',
      left: 0,
      top: 50,
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
        radius: '75%',
        center: ['50%', '50%'],
        data: [
          {value: 335, name: '类1'},
          {value: 310, name: '类2'}
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
    // 标题: 副标题为总数统计, 自行填入
    title: {
      text: '二维柱状统计',
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
          {name: '具类1', value: 100},
          {name: '具类2', value: 110},
          {name: '具类3', value: 120},
          {name: '具类4', value: 130},
          {name: '具类5', value: 140},
          {name: '具类6', value: 150},
          {name: '具类7', value: 160},
          {name: '具类8', value: 170},
          {name: '具类9', value: 180},
          {name: '具类10', value: 190},
          {name: '具类11', value: 200},
          {name: '具类12', value: 60},
          {name: '具类13', value: 90},
          {name: '具类14', value: 50}
        ]
      }
    ]
  },
  //  二维线状趋势统计
  {
    // 标题: 副标题为总数统计, 自行填入
    title: {
      text: '二维线状图趋势统计',
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
          {name: '具类1', value: 100},
          {name: '具类2', value: 110},
          {name: '具类3', value: 120},
          {name: '具类4', value: 130},
          {name: '具类5', value: 140},
          {name: '具类6', value: 150},
          {name: '具类7', value: 160},
          {name: '具类8', value: 170},
          {name: '具类9', value: 180},
          {name: '具类10', value: 190},
          {name: '具类11', value: 200},
          {name: '具类12', value: 60},
          {name: '具类13', value: 90},
          {name: '具类14', value: 50}
        ]
      }
    ]
  },
  //  区域缩放三维柱状图统计
  {
    color: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    title: {
      text: '区域缩放三维柱状图',
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
      left: '3%',
      right: 0,
      bottom: '18%',
      containLabel: true,
      show: true
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
    // 区域缩放设置
    dataZoom: [
      // {type: 'inside'},
      {
        type: 'slider',
        start: 30,
        end: 80
      }
    ],
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
          {name: '具类1', value: 222},
          {name: '具类2', value: 222},
          {name: '具类3', value: 222},
          {name: '具类4', value: 222},
          {name: '具类5', value: 222},
          {name: '具类6', value: 222},
          {name: '具类7', value: 222},
          {name: '具类8', value: 222},
          {name: '具类9', value: 222},
          {name: '具类10', value: 222},
          {name: '具类11', value: 222},
          {name: '具类12', value: 222}
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
          {name: '具类1', value: 212},
          {name: '具类2', value: 222},
          {name: '具类3', value: 222},
          {name: '具类4', value: 122},
          {name: '具类5', value: 222},
          {name: '具类6', value: 222},
          {name: '具类7', value: 322},
          {name: '具类8', value: 222},
          {name: '具类9', value: 222},
          {name: '具类10', value: 222},
          {name: '具类11', value: 322},
          {name: '具类12', value: 222}
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
          {name: '具类1', value: 232},
          {name: '具类2', value: 222},
          {name: '具类3', value: 222},
          {name: '具类4', value: 242},
          {name: '具类5', value: 222},
          {name: '具类6', value: 252},
          {name: '具类7', value: 222},
          {name: '具类8', value: 262},
          {name: '具类9', value: 272},
          {name: '具类10', value: 212},
          {name: '具类11', value: 222},
          {name: '具类12', value: 222}
        ]
      }
    ]
  },
  //  三维柱状图统计
  {
    color: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    title: {
      text: '三维柱状图统计',
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
          {name: '具类1', value: 222},
          {name: '具类2', value: 222},
          {name: '具类3', value: 222},
          {name: '具类4', value: 222},
          {name: '具类5', value: 222},
          {name: '具类6', value: 222},
          {name: '具类7', value: 222},
          {name: '具类8', value: 222},
          {name: '具类9', value: 222},
          {name: '具类10', value: 222},
          {name: '具类11', value: 222},
          {name: '具类12', value: 222}
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
          {name: '具类1', value: 212},
          {name: '具类2', value: 222},
          {name: '具类3', value: 222},
          {name: '具类4', value: 122},
          {name: '具类5', value: 222},
          {name: '具类6', value: 222},
          {name: '具类7', value: 322},
          {name: '具类8', value: 222},
          {name: '具类9', value: 222},
          {name: '具类10', value: 222},
          {name: '具类11', value: 322},
          {name: '具类12', value: 222}
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
          {name: '具类1', value: 232},
          {name: '具类2', value: 222},
          {name: '具类3', value: 222},
          {name: '具类4', value: 242},
          {name: '具类5', value: 222},
          {name: '具类6', value: 252},
          {name: '具类7', value: 222},
          {name: '具类8', value: 262},
          {name: '具类9', value: 272},
          {name: '具类10', value: 212},
          {name: '具类11', value: 222},
          {name: '具类12', value: 222}
        ]
      }
    ]
  },
  // 任务进度统计
  {
    color: ['#A0A7E6', '#63D2B5', '#3FB1E3', '#FBB46C', '#626C91', '#404A59'],
    title: {
      text: '任务进度统计'
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
            value: 80,
            name: '任务1完成率'
          },
          {
            value: 20,
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
            value: 68,
            name: '任务2完成率'
          },
          {
            value: 32,
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
            value: 68,
            name: '任务3完成率'
          },
          {
            value: 32,
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
