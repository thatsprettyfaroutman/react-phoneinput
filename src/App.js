import './App.css';
import React, { Component } from 'react';
import Draggable from 'react-draggable'

class App extends Component {
  constructor() {
    super()
    this.state = { x: 0, y: 0, x2: 0, y2: 0, shift: false}

    this.handleDrag = this.handleDrag.bind(this)
  }

  addLeadingZeros(num, numZeros = 3) {
    let val = `${num}`
    while (val.length < numZeros) {
      val = `0${val}`
    }
    return val
  }

  result(x, y, x2, y2) {
    // const xs = this.addLeadingZeros(x + y2, 5).split('')
    // const ys = this.addLeadingZeros(x2 + y, 5).split('')

    const xs = this.addLeadingZeros(x).split('')
    const ys = this.addLeadingZeros(y, 2).split('')
    const xs2 = this.addLeadingZeros(x2).split('')
    const ys2 = this.addLeadingZeros(y2, 2).split('')


    // return `${xNums.join('')}${yNums.join('')}`

    return `${xs[0]}${xs2[0]}${ys[0]}${ys2[0]}${xs[1]}${xs2[1]}${ys[1]}${ys2[1]}${xs[2]}${xs2[2]}`

    // return xs.reduce((res, _, i) => {
    //   res.push(xs[i])
    //   res.push(ys[i])
    //   return res
    // }, []).join('')
  }

  handleDrag(e) {
    let x = this.boundCoordinates(e.x - this._dragArea.offsetLeft)
    let y = this.boundCoordinates(e.y - this._dragArea.offsetTop, true)

    if (e.shiftKey) {
      this.setState({x2: x, y2: y, shift: true})
      return
    }

    this.setState({x, y, shift: false})
  }

  boundCoordinates(val, isYAxis) {
    const maxValue = (isYAxis ? this._dragArea.clientHeight : this._dragArea.clientWidth)
    if (val < 0) return 0
    else if (val > maxValue) return maxValue
    return val
  }

  render() {
    return (
      <div className="App">
        <div className="Result">{ this.result(this.state.x, this.state.y, this.state.x2, this.state.y2) }</div>
        <div className="DragArea" ref={dom => this._dragArea = dom}>
          { this.state.shift && <div className="DragArea__shiftIndicator">shift</div> }
          <Draggable
            axis="both"
            handle=".Draggable__handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[1, 1]}
            zIndex={100}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
            bounds="parent"
          >
            <div className="Draggable">
              <div className="Draggable__handle" />
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
}

export default App;
