/* eslint-disable */
export default {
  id: 'wode',
  fields: [
    // radio
    {
      id: 'liveRADIO',
      label: 'liveRADIO',
      value: '',
      type: 'RADIO',
      values: [
        {label: '是', value: '0'},
        {label: '否', value: '1'}
      ],
      validations: [
        { required: true, message: 'liveRADIO', trigger: 'change' }
      ]
    },
    // INPUT
    {
      id: 'INTnumAdult',
      label: 'INTnumAdult',
      value: '',
      type: 'INT',
      validations: [
        { required: true, message: 'INTnumAdult', trigger: 'change' },
        { pattern: '^(\\w){4,10}$', message: '只能输入4-10个字母、数字、下划线', trigger: 'change' }
      ]
    },
    // INPUT
    {
      id: 'numAdultaINPUT',
      label: '除了自己以外18岁以上成年人有几位11111',
      value: '',
      type: 'INPUT',
      validations: [
        { required: true, message: 'numAdultaINPUT', trigger: 'change' },
        { pattern: '^(\\w){4,10}$', message: '只能输入4-10个字母、数字、下划线', trigger: 'change' }
      ]
    },
    // CHECKBOX
    {
      id: 'heartAttackUnder50',
      label: '我CHECKBOX',
      value: '',
      type: 'CHECKBOX',
      values: [
        {label: 'A', value: '0'},
        {label: 'B', value: '1'},
        {label: 'C', value: '2'},
        {label: 'D', value: '3'}
      ],
      validations: [
        { type: 'array', required: true, message: '我CHECKBOX', trigger: 'change' }
      ]
    },
    // CASCADER
    {
      id: 'aCascader',
      label: '我帅么111',
      value: '',
      type: 'CASCADER',
      children: [{
        value: '0',
        label: 'Basic',
        children: [{
          value: '1',
          label: 'Layout 布局'
        }, {
          value: '2',
          label: 'Color 色彩'
        }, {
          value: '3',
          label: 'Typography 字体'
        }, {
          value: '4',
          label: 'Icon 图标'
        }, {
          value: '5',
          label: 'Button 按钮'
        }]
      }],
      validations: [
        { type: 'array', required: true, message: '请至少选择CASCADER', trigger: 'change' }
      ]
    },
    // SWITCH
    {
      id: 'heartAttackUnder53',
      label: '我帅么',
      value: '',
      type: 'SWITCH'
    },
    // RADIO
    {
      id: 'heartAttackUnder52',
      label: 'RADIORADIO',
      value: '1',
      type: 'RADIO',
      values: [
        {label: '是', value: '0'},
        {label: '否', value: '1'}
      ],
      validations: [
        { required: true, message: '请选择RADIO', trigger: 'change' }
      ]
    },
    // date
    {
      id: 'oncologyHistoryTime1',
      label: 'DATE',
      value: '2018-06-13',
      type: 'DATE',
      validations: [
        { type: 'date', required: true, message: '请选择DATE', trigger: 'change' }
      ]
      // rules: {
      //   id: 'heartAttackUnder52',
      //   rule_type: 'EQUAL',
      //   value: 0
      // }
    },
    // DATETIME
    {
      id: 'oncologyHistoryTime2',
      label: 'DATETIMEDATETIME',
      type: 'DATETIME',
      value: '2018-06-13 16:25:49',
      validations: [
        { type: 'date', required: true, message: '请选择DATETIME', trigger: 'change' }
      ]
      // rules: {
      //   id: 'heartAttackUnder52',
      //   rule_type: 'EQUAL',
      //   value: 0
      // }
    },
    // INPUT
    {
      id: 'paternalDiagnosis',
      label: 'INPUTINPUT',
      type: 'INPUT',
      validations: [
        { required: true, message: '诊断INPUT', trigger: 'change' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符INPUT', trigger: 'change' }
      ]
    },
    // TEXTAREA
    {
      id: 'paternalDiagnosis6',
      label: 'TEXTAREA',
      type: 'TEXTAREA',
      validations: [
        { required: true, message: '诊断TEXTAREA', trigger: 'change' },
        { min: 3, max: 5, message: '长度在TEXTAREA', trigger: 'change' }
      ]
    },
    // SELECT
    {
      id: 'heartAttackUnder51',
      label: '我SELECTSELECT',
      value: '',
      type: 'SELECT',
      values: [
        {label: '是', value: '0'},
        {label: '否', value: '1'}
      ],
      validations: [
        { required: true, message: '请选择SELECTSELECT', trigger: 'change' }
      ]
    },
    // CALCULATE
    {
      id: 'smallCALCULATE',
      label: 'CALCULATECATE',
      values: '(INTnumAdult + numAdultaINPUT)',
      type: 'CALCULATE',
      validations: {}
    },
    {
      id: 'concreteOncology',
      label: 'TABLETABLE',
      values: [{
        TEXTAREA: '111',
        INPUT: '222',
        SELECT: '0',
        DATE: '2018-06-13',
        DATETIME: '2018-06-13 16:25:49',
        CHECKBOX: ['0', '2'],
        SWITCH: true,
        RADIO: '0',
        CASCADER: ['0', '1']
      }, {
        TEXTAREA: '222',
        INPUT: '王小虎',
        CHECKBOX: ['0', '2', '3']
      }],
      type: 'TABLE',
      sub_fields: [
        // TEXTAREA
        {
          id: 'TEXTAREA',
          label: 'TEXTAREA',
          type: 'TEXTAREA',
          validations: [
            { required: true, message: '请输入活动', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ]
        },
        // INPUT
        {
          id: 'INPUT',
          label: 'INPUT',
          type: 'INPUT',
          validations: [
            { required: true, message: '请输入名称', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ]
        },
        // SELECT
        {
          id: 'SELECT',
          label: 'SELECT',
          value: '',
          type: 'SELECT',
          values: [
            {label: '是', value: '0'},
            {label: '否', value: '1'}
          ],
          validations: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        // DATE
        {
          id: 'DATE',
          label: 'DATE',
          type: 'DATE',
          validations: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        // DATETIME
        {
          id: 'DATETIME',
          label: '诊断时间',
          type: 'DATETIME',
          validations: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        // CHECKBOX
        {
          id: 'CHECKBOX',
          label: 'CHECKBOX',
          value: '',
          type: 'CHECKBOX',
          values: [
            {label: 'A', value: '0'},
            {label: 'B', value: '1'},
            {label: 'C', value: '2'},
            {label: 'D', value: '3'}
          ],
          validations: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        },
        // SWITCH
        {
          id: 'SWITCH',
          label: 'SWITCH',
          value: '',
          type: 'SWITCH'
        },
        // RADIO
        {
          id: 'RADIO',
          label: 'RADIO',
          value: '',
          type: 'RADIO',
          values: [
            {label: '是', value: '0'},
            {label: '否', value: '1'}
          ],
          validations: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        // CASCADER
        {
          id: 'CASCADER',
          label: 'CASCADER',
          value: '',
          type: 'CASCADER',
          children: [{
            value: '0',
            label: '指南',
            children: [{
              value: '1',
              label: '设计原则',
              children: [{
                value: '2',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
            }, {
              value: 'zujian',
              label: '组件',
              children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                  value: 'layout',
                  label: 'Layout 布局'
                }, {
                  value: 'color',
                  label: 'Color 色彩'
                }, {
                  value: 'typography',
                  label: 'Typography 字体'
                }, {
                  value: 'icon',
                  label: 'Icon 图标'
                }, {
                  value: 'button',
                  label: 'Button 按钮'
                }]
              }, {
                value: 'form',
                label: 'Form',
                children: [{
                  value: 'radio',
                  label: 'Radio 单选框'
                }, {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                }, {
                  value: 'input',
                  label: 'Input 输入框'
                }, {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                }, {
                  value: 'select',
                  label: 'Select 选择器'
                }, {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                }, {
                  value: 'switch',
                  label: 'Switch 开关'
                }, {
                  value: 'slider',
                  label: 'Slider 滑块'
                }, {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                }, {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                }, {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                }, {
                  value: 'upload',
                  label: 'Upload 上传'
                }, {
                  value: 'rate',
                  label: 'Rate 评分'
                }, {
                  value: 'form',
                  label: 'Form 表单'
                }]
              }, {
                value: 'data',
                label: 'Data',
                children: [{
                  value: 'table',
                  label: 'Table 表格'
                }, {
                  value: 'tag',
                  label: 'Tag 标签'
                }, {
                  value: 'progress',
                  label: 'Progress 进度条'
                }, {
                  value: 'tree',
                  label: 'Tree 树形控件'
                }, {
                  value: 'pagination',
                  label: 'Pagination 分页'
                }, {
                  value: 'badge',
                  label: 'Badge 标记'
                }]
              }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                  value: 'alert',
                  label: 'Alert 警告'
                }, {
                  value: 'loading',
                  label: 'Loading 加载'
                }, {
                  value: 'message',
                  label: 'Message 消息提示'
                }, {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                }, {
                  value: 'notification',
                  label: 'Notification 通知'
                }]
              }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                }, {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                }, {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                }, {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                }, {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }]
              }, {
                value: 'others',
                label: 'Others',
                children: [{
                  value: 'dialog',
                  label: 'Dialog 对话框'
                }, {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                }, {
                  value: 'popover',
                  label: 'Popover 弹出框'
                }, {
                  value: 'card',
                  label: 'Card 卡片'
                }, {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                }, {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }]
              }]
            }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }],
          validations: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        }
      ],
      relation: {
        INPUT: {
          target: 'SELECT',
          rule_type: 'EQUAL',
          value: '111'
        }
      }
    }
  ],
  relation: {
    // INTnumAdult: {
    //   target: 'liveRADIO',
    //   rule_type: 'EQUAL',
    //   value: '1'
    // },
    heartAttackUnder50: {
      target: 'liveRADIO',
      rule_type: 'EQUAL',
      value: '1'
    },
    aCascader: {
      target: 'liveRADIO',
      rule_type: 'EQUAL',
      value: '1'
    },
    numAdultaINPUT: {
      target: 'INTnumAdult',
      rule_type: 'EQUAL',
      value: '666'
    }
  },
  compute: {
    smallCALCULATE: '(INTnumAdult + numAdultaINPUT)'
  }
}