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

  'video/mp4; codecs=mp3',
  'video/mp4; codecs=aac',
  'video/mp4; codecs=opus',

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

// Check if MediaSource.isTypeSupported is supported
// or fall back to a function which always returns false.
var isTypeSupported = MediaSource.isTypeSupported || function(type) {
  return false;
}

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
  var type = types[i];
  var audio = new Audio();
  var video = document.createElement('video');
  var row = document.createElement('tr');

  var label = document.createElement('td');
  label.textContent = type;
  row.appendChild(label);

  var mse_result = isTypeSupported(type);
  var mse_td = document.createElement('td');
  mse_td.textContent = mse_result;
  if (mse_result) {
    mse_td.className = 'darkgreen';
  } else {
    mse_td.className = 'gray';
  }
  row.appendChild(mse_td);

  var video_td = document.createElement('td');
  var video_result = video.canPlayType(type);
  video_td.textContent = video_result;
  if (video_result == 'probably') {
    video_td.className = 'darkgreen';
  } else if (video_result == '') {
    video_td.className = 'gray';
  }
  row.append(video_td);

  var audio_td = document.createElement('td');
  var audio_result = audio.canPlayType(type);
  audio_td.textContent = audio_result;
  if (audio_result == 'probably') {
    audio_td.className = 'darkgreen';
  } else if (audio_result == '') {
    audio_td.className = 'gray';
  }
  row.append(audio_td);

  if (mse_result || video_result || audio_result) {
    row.className = 'green';
  }
  table.appendChild(row);
}
