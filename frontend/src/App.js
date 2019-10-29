import React from 'react';
// import logo from './logo.svg';
// import './app.css';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ctx: null,
      drawing: false,
      mouse: {
        x_prev: 0,
        y_prev: 0,
        x: 0,
        y: 0
      }
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.sendCanvasCapture = this.sendCanvasCapture.bind(this);
  }

  componentDidMount() {
    this.setState({
      ctx: this.refs.canvas.getContext('2d')
    });
  }

  handleMouseDown(e) {
    // if (!this.refs.canvas) return;
    // console.log(e);
    // this.setState({
    //   mouse: {
    //     x_prev: this.state.mouse.x,
    //     y_prev: this.state.mouse.y
    //   }
    // });
    const rect = this.refs.canvas.getBoundingClientRect();
    this.setState({
      drawing: true,
      mouse: {
        x_prev: this.state.mouse.x,
        y_prev: this.state.mouse.y,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
  }

  handleMouseUp(e) {
    // console.log(this.state.mouse);
    this.setState({
      drawing: false
    });
  }

  handleMouseMove(e) {
    const rect = this.refs.canvas.getBoundingClientRect();
    this.setState({
      mouse: {
        x_prev: this.state.mouse.x,
        y_prev: this.state.mouse.y,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
  }

  updateCanvas() {
    const { ctx, mouse } = this.state;
    ctx.save();

    // ctx.strokeStyle = 'green';
    // ctx.fillStyle = 'green';
    // ctx.lineWidth = 8;
    // ctx.scale(4, 4);

    const width = 20;

    ctx.beginPath();
    ctx.moveTo(mouse.x_prev, mouse.y_prev);
    // ctx.lineTo(mouse.x, mouse.y);
    ctx.arc(mouse.x, mouse.y, width, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
    // console.log(mouse);
  }

  sendCanvasCapture(e) {
    const img = this.state.ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    axios.post('/classify', { img })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    // console.log(img);
  }

  render() {
    if (this.state.drawing) this.updateCanvas();
    return (
      <div>
        <p>Hello Bitches this the front end</p>
        <div id='canvas-container'>
          <canvas ref="canvas" id="canvas" width={720} height={720}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={() => this.setState({ drawing: false })}
            style={{ border: '3px solid black' }}
          />
          <button value="Send" onClick={this.sendCanvasCapture}>Send</button>
        </div>
      </div>
    )
  }
}

export default App;