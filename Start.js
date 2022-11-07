function passvalues() {
  var name = document.getElementById('playerName').value;
  localStorage.setItem('textvalue', name);
  return false;
}