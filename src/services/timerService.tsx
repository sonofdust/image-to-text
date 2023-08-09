class TimerService {
  private startTime: number | null = null;

  start() {
    this.startTime = Date.now();
  }

  end(): number | null {
    if (this.startTime !== null) {
      const endTime = Date.now();
      const durationInSeconds = (endTime - this.startTime) / 1000;
      return durationInSeconds;
    }
    return null;
  }
}

const timerService = new TimerService();

export default timerService;
