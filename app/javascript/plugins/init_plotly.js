import Plotly from 'plotly.js-dist';

const initPlotly = () => {

  const chartElement = document.getElementById('plotdata');

  if (chartElement) { // only build a map if there's a div#map to inject into

    const almirantadointData = JSON.parse(chartElement.dataset.almirantadoint);

    const almirantadoextData = JSON.parse(chartElement.dataset.almirantadoext);
    const tideData = JSON.parse(chartElement.dataset.tide);

    const language = chartElement.dataset.language;

    plotTide(almirantadoextData, tideData, language)
    plotWspd(almirantadointData, language);
    plotWdir(almirantadointData, language);
    plotWdirg(almirantadointData, language);
    plotSwvht(almirantadointData, language);
    plotWvdirg(almirantadointData, language);
    plotWvdir(almirantadointData, language);
    plotTp(almirantadointData, language);
    plotSst(almirantadointData, language);

  }
};

const plotTidenew = (almirantadoextData, tideData, language) => {

  const almirantadoextTide1 = {
    x: almirantadoextData.date_time,
    y: almirantadoextData.elev1,
    mode: 'lines+markers',
    name: 'MARÉ MEDIDA 1',
    line: {
      color: '#c22d45',
      width: 2
    }
  };

  const almirantadoextTide2 = {
    x: almirantadoextData.date_time,
    y: almirantadoextData.elev2,
    mode: 'lines+markers',
    name: 'MARÉ MEDIDA 2',
    line: {
      color: '#2f42ad',
      width: 2
    }
  };

  const almirantadoextTide = {
    x: tideData.date_time,
    y: tideData.elev,
    mode: 'lines+markers',
    name: 'MARÉ PREVISTA',
    line: {
      color: '#486641',
      width: 2
    }
  };


  const data = [almirantadoextTide1, almirantadoextTide2, almirantadoextTide];

  let text = 'MARÉS'
  let title = 'Elevação do nível do mar (m)'
  if (language === 'english') {
    text = "TIDES"
    title = 'Sea Level (m)'
  }


  var layout = {
    title: {
      text: text,
      font: {
        family: 'Fira Sans, sans-serif',
        size: 24
      },
    },
    plot_bgcolor:"rgba(0,0,0,0)",
    paper_bgcolor:"rgba(0,0,0,0)",
    xaxis: {
      // title: 'Tempo',
      showgrid: true,
      tickformat: '%d/%m %Hh',
      zeroline: false,
      gridcolor: 'rgba(0,0,0,0.2)'
    },
    yaxis: {
      title: title,
      showgrid: true,
      showline: true,
      gridcolor: 'rgba(0,0,0,0.2)'
    },
    showlegend: true,
    legend:{"orientation": "h",
      x: 0,
      y: -0.2,
      traceorder: 'normal',
      font: {
        family: 'sans-serif',
        size: 10,
        color: '#000'
      }
    }
  };
  var config = {responsive: true, displayModeBar: false }

  Plotly.newPlot('tide-plot', data, layout, config);

};

const plotTide = (almirantadoextData, tideData, language) => {

  const almirantadoextTide = {
    x: tideData.date_time,
    y: tideData.elev,
    mode: 'lines+markers',
    name: 'MARÉ PREVISTA',
    line: {
      color: '#486641',
      width: 2
    }
  };


  const data = [almirantadoextTide];

  let text = 'MARÉS'
  let title = 'Elevação do nível do mar (m)'
  if (language === 'english') {
    text = "TIDES"
    title = 'Sea Level (m)'
  }


  var layout = {
    title: {
      text: text,
      font: {
        family: 'Fira Sans, sans-serif',
        size: 24
      },
    },
    plot_bgcolor:"rgba(0,0,0,0)",
    paper_bgcolor:"rgba(0,0,0,0)",
    xaxis: {
      // title: 'Tempo',
      showgrid: true,
      tickformat: '%d/%m %Hh',
      zeroline: false,
      gridcolor: 'rgba(0,0,0,0.2)'
    },
    yaxis: {
      title: title,
      showgrid: true,
      showline: true,
      gridcolor: 'rgba(0,0,0,0.2)'
    },
    showlegend: true,
    legend:{"orientation": "h",
      x: 0,
      y: -0.2,
      traceorder: 'normal',
      font: {
        family: 'sans-serif',
        size: 10,
        color: '#000'
      }
    }
  };
  var config = {responsive: true, displayModeBar: false }

  Plotly.newPlot('tide-plot', data, layout, config);

};

const plotWvdir = (almirantadointData, language) => {

    const almirantadointWvdir = {
      x: almirantadointData.date_time,
      y: almirantadointData.wvdir,
      mode: 'lines+markers',
      name: 'NORONHA',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    
    const data = [almirantadointWvdir];


    let text = 'DIR. ONDAS'
    let title = 'Dir. ondas (°)'
    if (language === 'english') {
      text = "WAVE DIR."
      title = 'Wave Dir. (°)'
    }

    var layout = {
      title: {
        text: text,
        font: {
          family: 'Fira Sans, sans-serif',
          size: 24
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        // title: 'Tempo',
        showgrid: true,
        zeroline: false,
        tickformat: '%d/%m %Hh',
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: title,
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: false,
      legend:{"orientation": "h",
        x: 0,
        y: -0.2,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 10,
          color: '#000'
        }
      }
    };

    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('wvdir-plot', data, layout, config);


};

const plotWdir = (almirantadointData, language) => {

    const almirantadointWdir = {
      x: almirantadointData.date_time,
      y: almirantadointData.wdir,
      mode: 'lines+markers',
      name: '',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

        

    const data = [almirantadointWdir];

    let text = 'DIR. VENTO'
    let title = 'Direção do Vento (°)'
    if (language === 'english') {
      text = "WIND DIR."
      title = 'Wind Direction (°)'
    }


    var layout = {
      title: {
        text: text,
        font: {
          family: 'Fira Sans, sans-serif',
          size: 24
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        // title: 'Tempo',
        showgrid: true,
        tickformat: '%d/%m %Hh',
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: title,
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: false,
      legend:{"orientation": "h",
        x: 0,
        y: -0.2,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 10,
          color: '#000'
        }
      }
    };
    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('wdir-plot', data, layout, config);
};

const plotWdirg = (almirantadointData, language) => {

    const almirantadointWdir = {
      theta: almirantadointData.wdirg,
      name: 'almirantado_int',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data1 = [almirantadointWdir];

    var layout1 = {
      title: {
        text: '',
        font: {
          family: 'Fira Sans, sans-serif',
          size: 18
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('wdir-plot-almirantadoint', data1, layout1, config); 
    
    
};


const plotWvdirg = (almirantadointData, language) => {

    const almirantadointWvdir = {
      theta: almirantadointData.wvdirg,
      name: 'almirantado_int',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data1 = [almirantadointWvdir];

    var layout1 = {
      title: {
        text: '',
        font: {
          family: 'Fira Sans, sans-serif',
          size: 18
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('wvdir-plot-almirantadoint', data1, layout1, config);

};


const plotWspd = (almirantadointData, language) => {

    const almirantadointWspd = {
      x: almirantadointData.date_time,
      y: almirantadointData.wspd,
      mode: 'lines+markers',
      name: '',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    
    const data = [almirantadointWspd];

    let text = 'VELOCIDADE DO VENTO'
    let title = 'Veloc Vento (m/s)'
    if (language === 'english') {
      text = "WIND VELOCITY"
      title = 'Wind Velocity (m/s)'
    }


    var layout = {
      title: {
        text: text,
        font: {
          family: 'Fira Sans, sans-serif',
          size: 24
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        // title: 'Tempo',
        showgrid: true,
        tickformat: '%d/%m %Hh',
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: title,
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: false,
      legend:{"orientation": "h",
        x: 0,
        y: -0.2,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 10,
          color: '#000'
        }
      }
    };

    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('wspd-plot', data, layout, config);

};

const plotSwvht = (almirantadointData, language) => {

    const almirantadointSwvht = {
      x: almirantadointData.date_time,
      y: almirantadointData.swvht,
      mode: 'lines+markers',
      name: '',
      line: {
        color: '#c22d45',
        width: 2
      }
    };


    const data = [almirantadointSwvht];

    let text = 'ALTURA SIG. ONDA'
    let title = 'Altura de Onda (m)'
    if (language === 'english') {
      text = "SIG. WAVE HEIGHT"
      title = 'Wave Height (m)'
    }

    var layout = {
      title: {
        text: text,
        font: {
          family: 'Fira Sans, sans-serif',
          size: 24
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        // title: 'Tempo',
        showgrid: true,
        tickformat: '%d/%m %Hh',
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: title,
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: false,
      legend:{"orientation": "h",
        x: 0,
        y: -0.2,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 10,
          color: '#000'
        }
      }
    };
    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('swvht-plot', data, layout, config);

};

const plotTp = (almirantadointData, language) => {

  const almirantadointtp = {
    x: almirantadointData.date_time,
    y: almirantadointData.tp,
    mode: 'lines+markers',
    name: '',
    line: {
      color: '#c22d45',
      width: 2
    }
  };

  
  const data = [almirantadointtp];

  let text = 'PERÍODO DE PICO DE ONDA'
  let title = 'Período (s)'
  if (language === 'english') {
    text = "WAVE PEAK PERIOD"
    title = 'Period (s)'
  }


  var layout = {
    title: {
      text: text,
      font: {
        family: 'Fira Sans, sans-serif',
        size: 24
      },
    },
    plot_bgcolor:"rgba(0,0,0,0)",
    paper_bgcolor:"rgba(0,0,0,0)",
    xaxis: {
      // title: 'Tempo',
      showgrid: true,
      tickformat: '%d/%m %Hh',
      zeroline: false,
      gridcolor: 'rgba(0,0,0,0.2)'
    },
    yaxis: {
      title: title,
      showgrid: true,
      showline: true,
      gridcolor: 'rgba(0,0,0,0.2)'
    },
    showlegend: false,
    legend:{"orientation": "h",
      x: 0,
      y: -0.2,
      traceorder: 'normal',
      font: {
        family: 'sans-serif',
        size: 10,
        color: '#000'
      }
    }
  };
  var config = {responsive: true, displayModeBar: false }

  Plotly.newPlot('tp-plot', data, layout, config);

};


const plotSst = (almirantadointData, language) => {

    const almirantadointSst = {
      x: almirantadointData.date_time,
      y: almirantadointData.sst,
      mode: 'lines+markers',
      name: '',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    

    const data = [almirantadointSst];

    let text = 'TEMP. ÁGUA DO MAR'
    let title = 'Temperatura (°C)'
    if (language === 'english') {
      text = "SEA SURFACE TEMPERATURE"
      title = 'Temperature (°C)'
    }

    var layout = {
      title: {
        text: text,
        font: {
          family: 'Fira Sans, sans-serif',
          size: 24
        },
      },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        // title: 'Tempo',
        showgrid: true,
        tickformat: '%d/%m %Hh',
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: title,
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: false,
      legend:{"orientation": "h",
        x: 0,
        y: -0.2,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 10,
          color: '#000'
        }
      }
    };
    var config = {responsive: true, displayModeBar: false }

    Plotly.newPlot('sst-plot', data, layout, config);

};


export { initPlotly };