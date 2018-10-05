import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/axisPointer';
import 'echarts/lib/component/markLine';
import { chartApi } from '../../api/chart';

const chartConfig = (time = [], data = []) => {
  return {
    backgroundColor: '#383546',
    title: {
      text: '一天温度',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    grid: [{
      top: '20%',
      bottom: 0,
      left: '10%',
      right: '10%',
      height: '70%'
    }],
    tooltip: {
      trigger: 'axis',
      // formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    axisPointer: {
      link: {
        xAxisIndex: 'all'
      }
    },

    xAxis: [{
      type: 'category',
      gridIndex: 0,
      axisLine: true,
      boundaryGap: false,
      axisLabel: {
        // interval: 0, // 每个都显示出来
        color: 'rgba(255,255,255,.8)',
        fontSize: 12
      },
      data: time
    }],

    yAxis: [{
      type: 'value',
      name: '℃',
      nameLocation: 'end',
      nameGap: 24,
      nameTextStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 14
      },
      min: 20,
      max: 40,
      gridIndex: 0,
      splitLine: {
        lineStyle: {
          color: '#fff',
          opacity: .1,
          // type: 'dashed'
        }
      },
      axisLabel: {
        interval: 0,
        color: 'rgba(255,255,255,.8)',
        fontSize: 12
      },
    }],
    series: [{
      name: '温度',
      type: 'line',
      // smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 4,
      itemStyle: {
        normal: {
          color: '#fff'
        }
      },
      data: data,
      lineStyle: {
        normal: {
          color: '#28f8de',
          width: 1
        }
      },
      markLine: {
        silent: true,
        data: [{
          type: 'average',
          name: '平均值'
        }],
        precision: 0,
        label: {
          normal: {
            formatter: '平均值: \n {c}'
          }
        },
        lineStyle: {
          normal: {
            color: 'rgba(248,211,81,.7)'
          }
        }
      },
    }]
  };
};

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartId: props.id || 'lineChart'
    };
  }

  /**
    * 生成图表，主要做了一个判断，因为如果不去判断dom有没有生成，
    * 在后面如果定期去更新图表，每次生成一个dom节点会导致浏览器
    * 占用的cpu和内存非常高，踩过坑。
    * 这里的config就是引入的配置文件中的config,文件头部会有说明
    */
  initChart(id, time, data) {
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById(id));
    }
    myChart.setOption(chartConfig(time, data));
  }

  componentDidMount() {
    /**
       * 在这里去调用生成图表的方法是因为，在组件加载后生成
       * dom节点，这个时候canvas才能根据id去绘制图表
       * 在这里去写了一个setTimeout修改了其中的一些数据，来
       * 测试图表的刷新，是否刷新了，后期大家可能是定期去某
       * 接口中获取数据，方法同理
       */
    const chartId = this.state.chartId;
    const dataFarmat = (list) => {
      let time = [];
      let data = [];
      list.forEach(item => {
        const ds = item.ds;
        time.push(ds.substr(4, 2) + '-' + ds.substr(6, 2) + ' ' + ds.substr(8, 2)
          + ':' + ds.substr(10, 2));
        data.push(item.temperature);
      });
      return {
        time,
        data,
      };
    };
    const getData = () =>{
      chartApi().then(res => {
        // console.log(res);
        if (res && res.data) {
          const data = dataFarmat(res.data);
          this.initChart(chartId, data.time, data.data);
        }
      });
    };
    getData();
    
    setInterval(() => {
      getData();
    }, 1000 * 5);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate!')
    // this.initChart()
  }

  render() {
    return (
      <div id={this.state.chartId} style={{ width: '100%', height: '400px' }}></div>
    );
  }
}

