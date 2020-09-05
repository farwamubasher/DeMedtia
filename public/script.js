/* global React, ReactDOM, countdown */
const intervals = [
  10 * 1000,
  1 * 60 * 1000,
  5 * 60 * 1000,
  10 * 60 * 1000,
  30 * 60 * 1000,
  1 * 60 * 60 * 1000,
  2 * 60 * 60 * 1000,
  4 * 60 * 60 * 1000,
  8 * 60 * 60 * 1000
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.interval = 0;
    this.nextReminder = Date.now() + intervals[this.interval];
    this.state = {
      showReminder: false,
      secondsToNextReminder: this.getSecondsToNextReminder()
    };
  }
  getSecondsToNextReminder() {
    return Math.round((this.nextReminder - Date.now()) / 1000);
  }
  doSpacedRep(direction) {
    if (direction === 1) {
      this.interval = this.interval + direction;
    } else {
      this.interval = Math.floor(this.interval / 2);
    }
    this.interval = Math.max(0, Math.min(intervals.length - 1, this.interval));
    this.nextReminder = Date.now() + intervals[this.interval];
    console.log(this.nextReminder);
    this.setState({
      secondsToNextReminder: this.getSecondsToNextReminder(),
      showReminder: false
    });
  }
  componentDidMount() {
    setInterval(() => {
      const secondsToNextReminder = this.getSecondsToNextReminder(
        this.nextReminder
      );
      if (secondsToNextReminder <= 0) {
        this.setState({ showReminder: true });
      } else {
        this.setState({ secondsToNextReminder });
      }
    }, 100);
  }
  formatDuration(totalSeconds) {
    let hours = totalSeconds / 60 / 60;
    let minutes = (hours - Math.floor(hours)) * 60;
    let seconds = (minutes - Math.floor(minutes)) * 60;
    let result = "";
    hours = Math.floor(hours)
      .toString()
      .padStart(2, "0");
    minutes = Math.floor(minutes)
      .toString()
      .padStart(2, "0");
    seconds = Math.floor(seconds)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
  render() {
    if (!this.state.showReminder) {
      return (
        <div className="countdown">
          Next dosage of Zoloft due in{" "}
          {this.formatDuration(this.state.secondsToNextReminder)}
        </div>
      );
      <a href="index.html">Back</a>;
    } else {
      return (
        <div className="done">
          <button onClick={() => this.doSpacedRep(-1)} className="Snooze">
            Snooze
          </button>
          <button
            onClick={() => this.doSpacedRep(+1)}
            className="Medication Taken"
          >
            Medication Taken
          </button>
        </div>
      );
    }
  }
}
ReactDOM.render(<App />, document.body);
