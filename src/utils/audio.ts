// Sound Effects Synthesizer using Web Audio API (PRD Section 34)
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Muted by default per PRD rules

  constructor() {
    // AudioContext created lazily on user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initContext();
      this.playPowerPulse();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft metallic click for buttons/cards
  public playMetallicClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore audio errors gracefully
    }
  }

  // Energy power pulse when adding to cart / Securing artifact
  public playPowerPulse() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // Low mechanical hum during search or loading awakening
  public playMechanicalHum() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // Ignore
    }
  }

  // Thermal vision engaging optic sweep
  public playThermalEngage() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  // Thermal vision disengage power down
  public playThermalDisengage() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {
      // Ignore
    }
  }

  // Time Travel Warp hyperspace surge
  public playTimeTravelWarp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Low sub rumble
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(60, this.ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 1.2);
      subGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start();
      subOsc.stop(this.ctx.currentTime + 1.8);

      // Cosmic ascending laser pitch
      const warpOsc = this.ctx.createOscillator();
      const warpGain = this.ctx.createGain();
      warpOsc.type = 'triangle';
      warpOsc.frequency.setValueAtTime(220, this.ctx.currentTime);
      warpOsc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 1.5);
      warpGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      warpGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
      warpGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.0);
      warpOsc.connect(warpGain);
      warpGain.connect(this.ctx.destination);
      warpOsc.start();
      warpOsc.stop(this.ctx.currentTime + 2.0);
    } catch {
      // Ignore
    }
  }

  // Arrival boom at ruined timeline
  public playTimeTravelArrival() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(220, this.ctx.currentTime);
      boomOsc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.8);
      boomGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      boomGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boomOsc.start();
      boomOsc.stop(this.ctx.currentTime + 1.2);
    } catch {
      // Ignore
    }
  }

  // Reverse timeline jump back to 2026
  public playTimeTravelReturn() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();
