// Various media MIME types to check.

types = [
  'video/webm',
  'video/webm; codecs=vp8',
  'video/webm; codecs=vp9',
  'video/webm; codecs=av1',

  'video/mp4',
  'video/mp4; codecs=avc',
  'video/mp4; codecs=h264',
  'video/mp4; codecs=vp9',
  'video/mp4; codecs=av1',

  'audio/ogg',
  'audio/ogg; codecs=vorbis',
  'audio/ogg; codecs=opus',

  'audio/mp3',
  'audio/mpeg',

  'audio/webm; codecs=vorbis',
  'audio/webm; codecs=opus',

  'audio/flac',
  'audio/wav',
]

var table = document.getElementById('results')

var row = document.createElement('tr');
var h = document.createElement('th');
h.textContent = 'media type';
row.appendChild(h);
h = document.createElement('th');
h.textContent = 'MediaSource';
row.appendChild(h);
h = document.createElement('th');
h.textContent = 'video';
row.appendChild(h);
h = document.createElement('th');
h.textContent = 'audio';
row.appendChild(h);
table.appendChild(row);

for (i in types) {
  let type = types[i];
  let audio = new Audio();
  let video = document.createElement('video');
  let row = document.createElement('tr');

  let label = document.createElement('td');
  label.textContent = type;
  row.appendChild(label);

  let mse_result = MediaSource.isTypeSupported(type);
  let mse_td = document.createElement('td');
  mse_td.textContent = mse_result;
  if (mse_result) {
    row.className = 'green';
  }
  row.appendChild(mse_td);

  let video_result = document.createElement('td');
  video_result.textContent = video.canPlayType(type);
  row.append(video_result);

  let audio_result = document.createElement('td');
  audio_result.textContent = audio.canPlayType(type);
  row.append(audio_result);

  table.appendChild(row);
}
