function nightDay(self) {
  if(self.value==='NightMode') {
    document.querySelector('body').style.backgroundColor='black';
    document.querySelector('body').style.color='white';
    self.value='DayMode';
    self.className = 'daymode';
  }
  else {
    document.querySelector('body').style.backgroundColor='white';
    document.querySelector('body').style.color='black';
    self.value='NightMode';
    self.className = 'nightmode';
  }
}
