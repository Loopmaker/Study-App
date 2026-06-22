let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === "closed") {
    sharedContext = new AudioContext();
  }
  return sharedContext;
}

export function playChime(): void {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;
  const notes = [660, 880];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = now + i * 0.18;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 1.3);
  });
}

let masterSfxGain: GainNode | null = null;
let masterSfxVolume = 1;

export function getMasterSfxGain(): GainNode {
  const ctx = getAudioContext();
  if (!masterSfxGain) {
    masterSfxGain = ctx.createGain();
    masterSfxGain.gain.value = masterSfxVolume;
    masterSfxGain.connect(ctx.destination);
  }
  return masterSfxGain;
}

export function setMasterSfxVolume(value: number): void {
  masterSfxVolume = value;
  if (masterSfxGain) {
    masterSfxGain.gain.value = value;
  }
}