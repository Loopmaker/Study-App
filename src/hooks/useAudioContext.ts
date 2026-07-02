let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === "closed") {
    sharedContext = new AudioContext();
  }
  return sharedContext;
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