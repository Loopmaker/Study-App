let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === "closed") {
    sharedContext = new AudioContext();
  }
  return sharedContext;
}

let masterSfxGain: GainNode | null = null;

export function getMasterSfxGain(): GainNode {
  const ctx = getAudioContext();
  if (!masterSfxGain) {
    masterSfxGain = ctx.createGain();
    masterSfxGain.gain.value = 1;
    masterSfxGain.connect(ctx.destination);
  }
  return masterSfxGain;
}

export function setMasterSfxVolume(value: number): void {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") ctx.resume();
  getMasterSfxGain().gain.value = value;
}