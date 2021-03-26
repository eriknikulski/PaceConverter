MILE_IN_KM = 1.609344

window.addEventListener('DOMContentLoaded', main);

function main() {
  document.getElementById('i1').addEventListener('input', () =>
    process('i1', 'i2', MILE_IN_KM));
  document.getElementById('i2').addEventListener('input', () =>
    process('i2', 'i1', 1 / MILE_IN_KM));
}

function process(input, target, factor) {
  let value = document.getElementById(input).value;
  if (!value) return;
  let values = [...value.matchAll(/(\d+)(?::(\d*))?/g)];
  if (!values  || values.length !== 1 || values[0][0] !== value ||
      values[0][1] < 0 || 59 < values[0][1] || values[0][2] < 0 || 59 < values[0][2]) {
    document.getElementById(target).value = '';
    document.getElementById(target).setCustomValidity('Invalid input');
    return;
  }
  document.getElementById(target).setCustomValidity('');
  let secs = 0;
  secs += parseInt(values[0][1], 10) * 60;
  if (values[0][2]) {
    secs += parseInt(values[0][2], 10);
  }

  let min = Math.floor(secs / factor / 60);
  secs = Math.round((secs / factor / 60) % 1 * 60);
  secs = secs < 10 ? `0${secs}` : `${secs}`;

  document.getElementById(target).value = `${min}:${secs}`;
}