const ffmpeg = require('ffmpeg-static');
const ffprobe = require('ffprobe-static');
const { execSync } = require('child_process');

console.log("ffmpeg path:", ffmpeg);
console.log("ffprobe path:", ffprobe.path);

try {
  const probeOutput = execSync(`"${ffprobe.path}" -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,bit_rate,pix_fmt -of default=noprint_wrappers=1:nokey=1 "public/building.mp4"`);
  console.log("--- PROBE OUTPUT ---");
  console.log(probeOutput.toString());
} catch(e) {
  console.error("Probe error:", e.toString());
}
