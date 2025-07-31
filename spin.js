    class SpinWheelGame {
        constructor() {
            this.flavors = [
                { name: 'apricotglow', images: [
                    'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                ]},
                { name: 'berrybold', images: [
                    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                ]},
                { name: 'energyrush', images: [
                    'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                ]},
                { name: 'guavacrush', images: [
                    'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                ]},
                { name: 'kiwichill', images: [
                    'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                    'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
                ]}
            ];
    
            this.availableFlavors = [...this.flavors];
            this.isSpinning = false;
    
            this.initElements();
            this.updateWheel();
        }
    
        initElements() {
            this.wheel = document.getElementById('wheel');
            this.spinButton = document.getElementById('spinButton');
            this.wheelContainer = document.getElementById('wheelContainer');
            this.flavorDisplay = document.getElementById('flavorDisplay');
            this.flavorTitle = document.getElementById('flavorTitle');
            this.flavorImages = document.getElementById('flavorImages');
            this.remixButton = document.getElementById('remixButton');
    
            this.spinButton.addEventListener('click', () => this.spin());
            this.remixButton.addEventListener('click', () => this.showWheelAgain());
        }
    
        spin() {
            if (this.isSpinning || this.availableFlavors.length === 0) return;
  this.isSpinning = true;
  
  // Show wheel & hide product before spin
  this.wheelContainer.classList.remove('hidden');
  this.flavorDisplay.classList.add('hidden');
  this.actionbuttons.classList.add('hidden');
  
  const spins = 4 + Math.random() * 2;
  const randomAngle = Math.random() * 360;
  const finalRotation = (spins * 360) + randomAngle;
  
  this.wheel.style.transition = "transform 3s ease-out";
  this.wheel.style.transform = `rotate(-${finalRotation}deg)`;
  
  // Wait until animation ends, then detect flavor
  this.wheel.addEventListener('transitionend', () => {
    this.revealFlavor(finalRotation % 360);
  }, { once: true });
        }
    
        revealFlavor(finalAngle) {
            const sectionAngle = 360 / this.availableFlavors.length;
  const adjustedAngle = (270 - finalAngle + 360) % 360;
  const index = Math.floor(adjustedAngle / sectionAngle);
  
  const selectedFlavor = this.availableFlavors[index];
  
  // Show selected flavor product
  this.wheelContainer.classList.add('hidden');
  this.flavorDisplay.classList.remove('hidden');
  this.actionbuttons.classList.remove('hidden');
  this.flavorTitle.textContent = `${selectedFlavor.name} Flavor`;
  
  const imgs = this.flavorImages.querySelectorAll('.flavor-image img');
  selectedFlavor.images.forEach((src, i) => imgs[i].src = src);
  
  // Remove selected flavor and update wheel
  this.availableFlavors.splice(index, 1);
  this.updateWheel();
  
  if (this.availableFlavors.length === 0) {
    this.spinButton.style.display = 'none';
    this.remixButton.style.display = 'none';
  }
  
  this.isSpinning = false;
        }
    
        showWheelAgain() {
            this.flavorDisplay.classList.add('hidden');
            this.wheelContainer.classList.remove('hidden');
            this.actionbuttons.classList.add('hidden');
        }
    
        updateWheel() {
            const sectionAngle = 360 / this.availableFlavors.length;
            const colors = { apricotglow:'#FFF36D', berrybold:'#FF7474', energyrush:'#FF90C0', guavacrush:'#9AC2FF', kiwichill:'#C5F175' };
            let gradient = this.availableFlavors.map((f, i) => 
                `${colors[f.name.toLowerCase()]} ${i*sectionAngle}deg ${(i+1)*sectionAngle}deg`
            ).join(', ');
            this.wheel.style.background = `conic-gradient(from 270deg, ${gradient})`;
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => new SpinWheelGame());