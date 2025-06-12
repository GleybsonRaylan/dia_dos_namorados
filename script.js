document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startButton = document.getElementById('start-button');
  const container = document.querySelector('.container');
  const musicPlayer = document.getElementById('music-player');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const song = document.getElementById('song');
  const progress = document.getElementById('progress');
  const timerDisplay = document.getElementById('timer');
  const floatingHearts = document.querySelector('.floating-hearts');
  const romanticElements = document.querySelectorAll('.romantic-element');

  // Configurar a música para repetir infinitamente
  song.loop = true;

  // Data de início do namoro (ano, mês-1, dia)
  const startDate = new Date(2023, 11, 18, 0, 0, 0); // Dezembro = 11 (0-indexado)
  
  // Efeito de brilho romântico
  const romanticGlow = document.createElement('div');
  romanticGlow.className = 'romantic-glow';
  document.body.appendChild(romanticGlow);

  // Variáveis do carrossel
  let currentSlide = 0;
  let slideInterval;
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  const slideDuration = 6000; // 6 segundos por slide (mais romântico)

  // Textos românticos para exibir aleatoriamente
  const romanticMessages = [
    "Nosso amor cresce a cada segundo",
    "Cada momento contigo é especial",
    "Te amo mais do que palavras podem dizer",
    "Você é o amor da minha vida",
    "Minha vida é mais bonita com você",
    "Eternamente seu(a)",
    "Nosso amor é lindo como um conto de fadas",
    "Ouvindo nossa música favorita",
    "Eu encontrei uma mulher, mais forte que qualquer pessoa que conheço",
    "Eu encontrei um amor para carregar mais do que apenas meus segredos",
    "Eu vejo meu futuro em seus olhos"
  ];

  // Função para criar corações flutuantes melhorada
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Posição aleatória
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + 'vh';
    
    // Animação personalizada
    const duration = 5 + Math.random() * 4;
    heart.style.animationDuration = `${duration}s`;
    
    // Tamanho aleatório
    const size = 16 + Math.random() * 24;
    heart.style.fontSize = `${size}px`;
    
    // Cores românticas aleatórias
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff82ab', '#ffaeb9'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Formas de coração diferentes
    const heartShapes = ['❤', '♥', '💖', '💗', '💘'];
    heart.textContent = heartShapes[Math.floor(Math.random() * heartShapes.length)];
    
    // Adiciona um pouco de rotação aleatória
    heart.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    
    floatingHearts.appendChild(heart);

    // Remove o coração após a animação terminar
    setTimeout(() => {
      heart.style.opacity = '0';
      setTimeout(() => {
        heart.remove();
      }, 1000);
    }, duration * 1000 - 1000);
  }

  // Função para criar efeito de brilho (sparkle)
  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'romantic-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Tamanho e cor aleatórios
    const size = 3 + Math.random() * 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    const colors = ['#ff69b4', '#ff1493', '#ffffff', '#ffb6c1'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(sparkle);
    
    // Remove após a animação
    setTimeout(() => {
      sparkle.remove();
    }, 2000);
  }

  // Criar corações em intervalo
  let heartsInterval = setInterval(createHeart, 300);

  // Adiciona efeito de brilho ao mover o mouse
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) { // 10% de chance de criar um brilho
      createSparkle(e.clientX, e.clientY);
    }
  });

  // Mostrar mensagem romântica aleatória
  function showRomanticMessage() {
    const messageElement = document.createElement('div');
    messageElement.className = 'romantic-message';
    messageElement.textContent = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    
    // Posiciona aleatoriamente na tela
    messageElement.style.left = `${10 + Math.random() * 80}%`;
    messageElement.style.top = `${10 + Math.random() * 80}%`;
    
    document.body.appendChild(messageElement);
    
    // Animação de fade in/out
    setTimeout(() => {
      messageElement.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.remove();
      }, 1000);
    }, 4000);
  }

  // Mostrar mensagem romântica periodicamente
  setInterval(showRomanticMessage, 20000);

  // Funções do carrossel com efeitos românticos
  function showSlide(index) {
    // Efeito de fade-out mais suave
    slides.forEach(slide => {
      slide.classList.remove('active', 'fade-out');
      void slide.offsetWidth; // Trigger reflow para reiniciar animação
    });
    
    // Adiciona efeito de fade-out no slide atual antes de mudar
    if (slides[currentSlide]) {
      slides[currentSlide].classList.add('fade-out');
      
      // Adiciona corações quando o slide muda
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createHeart();
        }, i * 200);
      }
    }
    
    // Atualiza o slide atual
    currentSlide = (index + totalSlides) % totalSlides;
    
    // Adiciona classe 'active' ao novo slide após pequeno delay
    setTimeout(() => {
      slides[currentSlide].classList.add('active');
      
      // Efeito de brilho ao mostrar novo slide
      const rect = slides[currentSlide].getBoundingClientRect();
      createSparkle(rect.left + rect.width/2, rect.top + rect.height/2);
    }, 300);
    
    // Atualiza indicadores
    updateIndicators();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function goToSlide(index) {
    showSlide(index);
    resetSlideInterval();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
      
      // Efeito de pulso nos indicadores ativos
      if (index === currentSlide) {
        indicator.style.animation = 'pulse 1.5s infinite';
      } else {
        indicator.style.animation = '';
      }
    });
  }

  function startSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      nextSlide();
      
      // Mostra mensagem romântica ocasionalmente
      if (Math.random() > 0.7) {
        showRomanticMessage();
      }
    }, slideDuration);
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  // Mostrar conteúdo após clicar no botão com efeito romântico
  startButton.addEventListener('click', () => {
    // Efeito de fade out mais elaborado
    startScreen.style.opacity = '0';
    startScreen.style.pointerEvents = 'none';
    
    // Explosão de corações ao clicar
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        createHeart();
      }, i * 100);
    }
    
    setTimeout(() => {
      startScreen.style.display = 'none';
      container.style.display = 'block';
      
      // Efeito de fade in no container
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.opacity = '1';
      }, 50);
      
      musicPlayer.classList.add('animate-in');
      
      // Tocar música com fade in
      song.volume = 0;
      song.play().catch(e => console.log("Autoplay bloqueado:", e)); // Trata erro de autoplay
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol += 0.05;
        song.volume = vol;
        if (vol >= 1) clearInterval(fadeIn);
      }, 100);
      
      playPauseBtn.classList.add('playing');

      // Iniciar carrossel
      if (totalSlides > 1) {
        startSlideInterval();
      }

      // Parar de criar corações após sair da tela inicial
      clearInterval(heartsInterval);
      floatingHearts.innerHTML = '';
      
      // Mostrar mensagem de boas-vindas
      setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'romantic-message welcome';
        welcomeMessage.textContent = "Bem-vindo ao nosso amor eterno";
        document.body.appendChild(welcomeMessage);
        
        setTimeout(() => {
          welcomeMessage.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
          welcomeMessage.style.opacity = '0';
          setTimeout(() => {
            welcomeMessage.remove();
          }, 1000);
        }, 3000);
      }, 1000);
    }, 1000);
  });

  // Event listeners para controles do carrossel com efeitos
  document.querySelector('.carousel-control.next')?.addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
    createSparkle(
      document.querySelector('.carousel-control.next').getBoundingClientRect().left + 20,
      document.querySelector('.carousel-control.next').getBoundingClientRect().top + 20
    );
  });

  document.querySelector('.carousel-control.prev')?.addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
    createSparkle(
      document.querySelector('.carousel-control.prev').getBoundingClientRect().left + 20,
      document.querySelector('.carousel-control.prev').getBoundingClientRect().top + 20
    );
  });

  // Função para calcular diferença detalhada entre datas
  function calculateDiff(start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  // Atualiza o timer no HTML com estilo romântico
  function updateTimer() {
    const now = new Date();
    const diff = calculateDiff(startDate, now);

    const formatUnit = (value, unit) => {
      return `<span class="time-unit">${value}</span> <span class="time-label">${unit}${value !== 1 ? 's' : ''}</span>`;
    };

    const timeString = `${formatUnit(diff.years, 'ano')}, ${formatUnit(diff.months, 'mês')}, ${formatUnit(diff.days, 'dia')}, ${formatUnit(diff.hours, 'hora')}, ${formatUnit(diff.minutes, 'minuto')} e ${formatUnit(diff.seconds, 'segundo')}`;

    timerDisplay.innerHTML = timeString;
    
    // Efeito de pulso a cada minuto
    if (diff.seconds === 0) {
      timerDisplay.classList.add('pulse');
      setTimeout(() => {
        timerDisplay.classList.remove('pulse');
      }, 1000);
      
      // Corações a cada minuto
      if (diff.minutes % 5 === 0) {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            createHeart();
          }, i * 300);
        }
      }
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // Controle do play/pause com efeitos
  playPauseBtn.addEventListener('click', () => {
    if (song.paused) {
      song.play().catch(e => console.log("Erro ao reproduzir:", e));
      playPauseBtn.classList.add('playing');
      
      // Efeito visual ao dar play
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      createSparkle(
        playPauseBtn.getBoundingClientRect().left + 20,
        playPauseBtn.getBoundingClientRect().top + 20
      );
    } else {
      song.pause();
      playPauseBtn.classList.remove('playing');
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Atualiza barra de progresso com efeito
  song.addEventListener('timeupdate', () => {
    const progressPercent = (song.currentTime / song.duration) * 100;
    progress.style.width = progressPercent + '%';
    
    // Efeito de brilho quando a música está tocando
    if (Math.random() > 0.95) {
      const progressBar = document.querySelector('.progress-bar');
      const rect = progressBar.getBoundingClientRect();
      const x = rect.left + (progressPercent / 100) * rect.width;
      const y = rect.top + rect.height / 2;
      createSparkle(x, y);
    }
  });

  // Controlar clique na barra para avançar
  document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = song.duration;

    song.currentTime = (clickX / width) * duration;
    
    // Efeito visual ao clicar
    createSparkle(e.clientX, e.clientY);
  });

  // Pausar carrossel quando o mouse está sobre ele
  document.querySelector('.carousel-container')?.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
    
    // Efeito de zoom suave
    document.querySelector('.carousel-slide.active img').style.transform = 'scale(1.03)';
  });

  // Retomar carrossel quando o mouse sai
  document.querySelector('.carousel-container')?.addEventListener('mouseleave', () => {
    startSlideInterval();
    document.querySelector('.carousel-slide.active img').style.transform = 'scale(1)';
  });

  // Efeito de hover romântico em elementos
  romanticElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'scale(1.05)';
      element.style.transition = 'transform 0.3s ease';
      createSparkle(
        element.getBoundingClientRect().left + element.clientWidth/2,
        element.getBoundingClientRect().top + element.clientHeight/2
      );
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });
  });

  // Tratamento para quando a música termina (redundante com loop=true, mas como backup)
  song.addEventListener('ended', () => {
    song.currentTime = 0;
    song.play().catch(e => console.log("Erro ao reiniciar música:", e));
  });
});