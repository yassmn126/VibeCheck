document.addEventListener('DOMContentLoaded', () => {
  const vibeForm = document.getElementById('vibeForm');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = submitBtn.querySelector('.spinner-loader');
  const resultBox = document.getElementById('resultBox');
  
  const vibeColorHex = document.getElementById('vibeColorHex');
  const vibeColorIndicator = document.getElementById('vibeColorIndicator');
  const vibeQuote = document.getElementById('vibeQuote');
  
  const moviePoster = document.getElementById('moviePoster');
  const movieTitle = document.getElementById('movieTitle');
  const movieRating = document.getElementById('movieRating');
  const movieDesc = document.getElementById('movieDesc');
  const movieWatchLink = document.getElementById('movieWatchLink');
  
  const songTrack = document.getElementById('songTrack');
  const songArtist = document.getElementById('songArtist');
  const songSpotifyLink = document.getElementById('songSpotifyLink');
  const playerArt = document.getElementById('playerArt');
  const historyList = document.getElementById('historyList');
  const langSelect = document.getElementById('langSelect');

  // Translation dictionaries
  const translations = {
    ru: {
      subtitle: 'Поделитесь вашим днём, и искусственный интеллект соберёт идеальный пастельный вайб',
      langLabel: '<i class="fa-solid fa-globe"></i> Язык / Language:',
      emotionsTitleHeading: '<i class="fa-solid fa-heart-pulse icon-accent"></i> Ваше настроение',
      dayDescHeading: '<i class="fa-solid fa-signature icon-accent"></i> Заметки о дне',
      dayDescriptionPlaceholder: 'Как проходит ваш день? Что вас порадовало или заставило задуматься? Опишите атмосферу...',
      charMin: 'Минимум 10 символов',
      submitBtnText: 'Проверить Вайб <i class="fa-solid fa-circle-arrow-right arrow-icon"></i>',
      resultTitleHeading: '<i class="fa-solid fa-wand-magic icon-accent"></i> Ваш Вайб дня',
      movieTicketBadge: '<i class="fa-solid fa-film"></i> Фильм дня',
      playlistBadge: '<i class="fa-brands fa-spotify"></i> Рекомендация Spotify',
      btnWatch: '<i class="fa-solid fa-circle-play"></i> Смотреть бесплатно 🍿',
      btnSpotify: '<i class="fa-brands fa-spotify"></i> Открыть в Spotify 🎧',
      historyHeading: '<i class="fa-solid fa-history icon-accent"></i> Карта настроений',
      historyPlaceholder: 'Пока нет записей. Давай создадим твою первую атмосферу!',
      watchLinkText: 'Смотреть',
      spotifyLinkText: 'Spotify',
      footerText: 'VibeCheck — Уютный генератор атмосферы. Работает на ИИ Gemini 2.5 Flash.',
      emotions: {
        emoCozy: '<i class="fa-solid fa-couch"></i> Уют',
        emoChill: '<i class="fa-solid fa-leaf"></i> Спокойствие',
        emoHappy: '<i class="fa-solid fa-sun-cloud"></i> Радость',
        emoCreative: '<i class="fa-solid fa-feather"></i> Творчество',
        emoMelancholy: '<i class="fa-solid fa-cloud-showers-heavy"></i> Меланхолия',
        emoEnergized: '<i class="fa-solid fa-wind-turbine"></i> Энергия',
        emoDreamy: '<i class="fa-solid fa-moon-stars"></i> Мечтательность',
        emoTired: '<i class="fa-solid fa-battery-half"></i> Усталость',
        emoRomantic: '<i class="fa-solid fa-glass-water-droplet"></i> Романтика'
      }
    },
    en: {
      subtitle: 'Share your day, and artificial intelligence will collect the perfect pastel vibe',
      langLabel: '<i class="fa-solid fa-globe"></i> Language / Язык:',
      emotionsTitleHeading: '<i class="fa-solid fa-heart-pulse icon-accent"></i> Your Mood',
      dayDescHeading: '<i class="fa-solid fa-signature icon-accent"></i> Daily Notes',
      dayDescriptionPlaceholder: 'How is your day going? What made you happy or think? Describe the atmosphere...',
      charMin: 'Minimum 10 characters',
      submitBtnText: 'Check Vibe <i class="fa-solid fa-circle-arrow-right arrow-icon"></i>',
      resultTitleHeading: '<i class="fa-solid fa-wand-magic icon-accent"></i> Your Daily Vibe',
      movieTicketBadge: '<i class="fa-solid fa-film"></i> Movie of the Day',
      playlistBadge: '<i class="fa-brands fa-spotify"></i> Spotify Recommendation',
      btnWatch: '<i class="fa-solid fa-circle-play"></i> Watch for Free 🍿',
      btnSpotify: '<i class="fa-brands fa-spotify"></i> Open in Spotify 🎧',
      historyHeading: '<i class="fa-solid fa-history icon-accent"></i> Vibe Map',
      historyPlaceholder: 'No entries yet. Let\'s create your first atmosphere!',
      watchLinkText: 'Watch',
      spotifyLinkText: 'Spotify',
      footerText: 'VibeCheck — Cozy atmosphere generator. Powered by Gemini 2.5 Flash.',
      emotions: {
        emoCozy: '<i class="fa-solid fa-couch"></i> Cozy',
        emoChill: '<i class="fa-solid fa-leaf"></i> Chill',
        emoHappy: '<i class="fa-solid fa-sun-cloud"></i> Happy',
        emoCreative: '<i class="fa-solid fa-feather"></i> Creative',
        emoMelancholy: '<i class="fa-solid fa-cloud-showers-heavy"></i> Melancholy',
        emoEnergized: '<i class="fa-solid fa-wind-turbine"></i> Energized',
        emoDreamy: '<i class="fa-solid fa-moon-stars"></i> Dreamy',
        emoTired: '<i class="fa-solid fa-battery-half"></i> Tired',
        emoRomantic: '<i class="fa-solid fa-glass-water-droplet"></i> Romantic'
      }
    },
    kk: {
      subtitle: 'Күніңізбен бөлісіңіз, жасанды интеллект сізге тамаша пастельді вайб жинайды',
      langLabel: '<i class="fa-solid fa-globe"></i> Тіл / Language:',
      emotionsTitleHeading: '<i class="fa-solid fa-heart-pulse icon-accent"></i> Сіздің көңіл-күйіңіз',
      dayDescHeading: '<i class="fa-solid fa-signature icon-accent"></i> Күнделікті жазбалар',
      dayDescriptionPlaceholder: 'Күніңіз қалай өтуде? Сізді не қуантты немесе ойлантты? Атмосфераны сипаттаңыз...',
      charMin: 'Кем дегенде 10 таңба',
      submitBtnText: 'Вайбты тексеру <i class="fa-solid fa-circle-arrow-right arrow-icon"></i>',
      resultTitleHeading: '<i class="fa-solid fa-wand-magic icon-accent"></i> Күн вайбы',
      movieTicketBadge: '<i class="fa-solid fa-film"></i> Күн фильмі',
      playlistBadge: '<i class="fa-brands fa-spotify"></i> Spotify ұсынысы',
      btnWatch: '<i class="fa-solid fa-circle-play"></i> Тегін көру 🍿',
      btnSpotify: '<i class="fa-brands fa-spotify"></i> Spotify-де ашу 🎧',
      historyHeading: '<i class="fa-solid fa-history icon-accent"></i> Көңіл-күй картасы',
      historyPlaceholder: 'Әлі жазбалар жоқ. Алғашқы атмосфераңызды жасайық!',
      watchLinkText: 'Көру',
      spotifyLinkText: 'Spotify',
      footerText: 'VibeCheck — Ыңғайлы атмосфера генераторы. Gemini 2.5 Flash негізінде жасалған.',
      emotions: {
        emoCozy: '<i class="fa-solid fa-couch"></i> Жайлылық',
        emoChill: '<i class="fa-solid fa-leaf"></i> Тыныштық',
        emoHappy: '<i class="fa-solid fa-sun-cloud"></i> Қуаныш',
        emoCreative: '<i class="fa-solid fa-feather"></i> Шығармашылық',
        emoMelancholy: '<i class="fa-solid fa-cloud-showers-heavy"></i> Меланхолия',
        emoEnergized: '<i class="fa-solid fa-wind-turbine"></i> Энергия',
        emoDreamy: '<i class="fa-solid fa-moon-stars"></i> Қиялшылдық',
        emoTired: '<i class="fa-solid fa-battery-half"></i> Шаршау',
        emoRomantic: '<i class="fa-solid fa-glass-water-droplet"></i> Романтика'
      }
    }
  };

  // Change language event listener
  langSelect.addEventListener('change', () => {
    applyLanguage(langSelect.value);
    fetchHistory(); // Refresh logs to render links in correct language
  });

  // Apply target translation tags to UI elements
  function applyLanguage(lang) {
    const data = translations[lang] || translations.ru;
    
    document.getElementById('appSubtitle').textContent = data.subtitle;
    document.getElementById('langLabel').innerHTML = data.langLabel;
    document.getElementById('emotionsTitleHeading').innerHTML = data.emotionsTitleHeading;
    document.getElementById('dayDescHeading').innerHTML = data.dayDescHeading;
    document.getElementById('dayDescription').placeholder = data.dayDescriptionPlaceholder;
    document.getElementById('charMin').textContent = data.charMin;
    document.getElementById('submitBtn').querySelector('.btn-text').innerHTML = data.submitBtnText;
    
    document.getElementById('resultTitleHeading').innerHTML = data.resultTitleHeading;
    document.getElementById('movieTicketBadge').innerHTML = data.movieTicketBadge;
    document.getElementById('movieWatchLink').innerHTML = data.btnWatch;
    document.getElementById('playlistBadge').innerHTML = data.playlistBadge;
    document.getElementById('songSpotifyLink').innerHTML = data.btnSpotify;
    document.getElementById('historyHeading').innerHTML = data.historyHeading;
    document.getElementById('footerText').textContent = data.footerText;

    // Translate emotion pills labels
    document.querySelectorAll('.feeling-label').forEach(label => {
      const key = label.getAttribute('data-key');
      if (key && data.emotions[key]) {
        label.innerHTML = data.emotions[key];
      }
    });

    // Translate empty history placeholder if it is currently visible
    const placeholder = document.getElementById('historyPlaceholder');
    if (placeholder) {
      placeholder.textContent = data.historyPlaceholder;
    }
  }

  // Load history list on startup
  fetchHistory();

  // Form submit handler
  vibeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const checkedEmotions = Array.from(
      document.querySelectorAll('input[name="emotions"]:checked')
    ).map(el => el.value);

    if (checkedEmotions.length === 0) {
      alert(langSelect.value === 'en' ? 'Please select at least one emotion.' : 
            langSelect.value === 'kk' ? 'Кем дегенде бір көңіл-күйді таңдаңыз.' : 
            'Пожалуйста, выберите хотя бы одну эмоцию.');
      return;
    }

    const description = document.getElementById('dayDescription').value.trim();
    if (description.length < 10) {
      alert(langSelect.value === 'en' ? 'Please describe your day in more detail (at least 10 characters).' :
            langSelect.value === 'kk' ? 'Күніңізді толығырақ сипаттаңыз (кем дегенде 10 таңба).' :
            'Пожалуйста, опишите ваш день более подробно (не менее 10 символов).');
      return;
    }

    setLoadingState(true);

    try {
      const response = await fetch('/api/vibecheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emotions: checkedEmotions,
          description: description,
          lang: langSelect.value
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API Error');
      }

      // Render the result
      await renderVibeResults(data);
      
      // Reset input form
      vibeForm.reset();
      
      // Reload history list
      fetchHistory();

    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      setLoadingState(false);
    }
  });

  // Toggle button loader
  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').style.opacity = '0.5';
      spinner.classList.remove('hidden');
    } else {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').style.opacity = '1';
      spinner.classList.add('hidden');
    }
  }

  // Generates unique HSL pastel gradients using string hashing
  function getPastelGradient(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 130) % 360;
    return `linear-gradient(135deg, hsl(${h1}, 70%, 80%) 0%, hsl(${h2}, 75%, 83%) 100%)`;
  }

  // Display vibe recommendations
  async function renderVibeResults(data) {
    const color = data.color;
    
    // 1. Shift body background to soft pastel tone with ambient center glow
    document.body.style.background = `radial-gradient(circle at 50% 50%, ${color} 0%, #FAF8F5 100%)`;
    const sphere1 = document.querySelector('.bg-sphere-1');
    const sphere2 = document.querySelector('.bg-sphere-2');
    if (sphere1 && sphere2) {
      sphere1.style.backgroundColor = color;
      sphere2.style.backgroundColor = '#FAF8F5';
    }

    // 2. Set general info
    vibeColorHex.textContent = color.toUpperCase();
    vibeColorIndicator.style.backgroundColor = color;
    
    const quoteCategory = document.getElementById('quoteCategory');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    if (quoteCategory && quoteText && quoteAuthor) {
      quoteCategory.textContent = data.quote.category;
      quoteText.textContent = `«${data.quote.text}»`;
      quoteAuthor.textContent = data.quote.author.startsWith('—') ? data.quote.author : `— ${data.quote.author}`;
    }

    // 3. Render Movie Ticket
    movieTitle.textContent = data.movie.title;
    movieRating.innerHTML = `<i class="fa-solid fa-star"></i> ${data.movie.rating}`;
    movieDesc.textContent = data.movie.description;

    // Direct movie watch search link
    const cleanMovieTitle = data.movie.title.replace(/\s*\(\d{4}\)\s*/g, ''); // strip year e.g. "Amelie (2001)" -> "Amelie"
    movieWatchLink.href = `https://yandex.ru/search/?text=${encodeURIComponent(cleanMovieTitle + ' смотреть online бесплатно в хорошем качестве')}`;

    // Fetch Poster from OMDb API with tag fallback
    const unsplashSearchUrl = `https://images.unsplash.com/featured/?cinema,movie,${encodeURIComponent(cleanMovieTitle)}`;
    try {
      let omdbApiKey = '25df3890';
      let omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(cleanMovieTitle)}&apikey=${omdbApiKey}`;
      let omdbRes = await fetch(omdbUrl);
      let omdbData = await omdbRes.json();
      
      // Fallback OMDb key if primary is invalid
      if (omdbData && omdbData.Response === 'False' && (omdbData.Error === 'Invalid API key!' || omdbData.Error === 'Invalid API Key!')) {
        omdbApiKey = 'thewdb';
        omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(cleanMovieTitle)}&apikey=${omdbApiKey}`;
        omdbRes = await fetch(omdbUrl);
        omdbData = await omdbRes.json();
      }
      
      if (omdbData && omdbData.Poster && omdbData.Poster !== 'N/A') {
        moviePoster.style.backgroundImage = `url('${omdbData.Poster}')`;
      } else {
        // Fallback to Unsplash movie cover search if poster is N/A
        moviePoster.style.backgroundImage = `url('${unsplashSearchUrl}'), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400')`;
      }
    } catch (omdbErr) {
      console.error('Error fetching from OMDb API:', omdbErr);
      moviePoster.style.backgroundImage = `url('${unsplashSearchUrl}'), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=400')`;
    }

    // 4. Render Spotify Recommendation Card
    songTrack.textContent = data.song.track_name;
    songArtist.textContent = data.song.artist;

    const playlistNameEl = document.getElementById('playlistName');
    if (playlistNameEl) {
      const plText = langSelect.value === 'en' ? 'Playlist' : langSelect.value === 'kk' ? 'Плейлист' : 'Плейлист';
      playlistNameEl.textContent = `${plText}: ${data.song.playlist_name}`;
    }

    const songDescEl = document.getElementById('songDesc');
    if (songDescEl) {
      songDescEl.textContent = data.song.description;
    }

    // Set Spotify track search link
    songSpotifyLink.href = `https://open.spotify.com/search/${encodeURIComponent(data.song.artist + ' ' + data.song.track_name)}`;

    // Dynamic cover art using Unsplash neon artist + track query
    const searchString = `${data.song.artist} ${data.song.track_name}`;
    const unsplashAlbumUrl = `https://images.unsplash.com/featured/?aesthetic,neon,${encodeURIComponent(searchString)}`;
    if (playerArt) {
      playerArt.src = unsplashAlbumUrl;
    }

    // 5. Show result card on page
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Fetch History list
  async function fetchHistory() {
    try {
      const response = await fetch('/api/history');
      if (!response.ok) {
        throw new Error('Failed to load logs');
      }
      const history = await response.json();
      renderHistory(history);
    } catch (err) {
      console.error(err);
    }
  }

  // Render past history logs
  function renderHistory(logs) {
    const curLang = langSelect.value;
    const trans = translations[curLang] || translations.ru;

    if (!logs || logs.length === 0) {
      historyList.innerHTML = `<div id="historyPlaceholder" class="history-placeholder">${trans.historyPlaceholder}</div>`;
      return;
    }

    historyList.innerHTML = logs.map(log => {
      const formattedDate = new Date(log.created_at).toLocaleString(curLang === 'ru' ? 'ru-RU' : curLang === 'kk' ? 'kk-KZ' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      const emotionsHtml = log.emotions
        .map(emo => {
          // Attempt to translate emotion tags in logs
          const rawTag = emo.split(' ')[0]; // Cozy, Chill, etc.
          // Map raw select pill values to data-keys
          const tagMap = {
            'Уют': 'emoCozy', 'Cozy': 'emoCozy', 'Жайлылық': 'emoCozy',
            'Спокойствие': 'emoChill', 'Chill': 'emoChill', 'Тыныштық': 'emoChill',
            'Радость': 'emoHappy', 'Happy': 'emoHappy', 'Қуаныш': 'emoHappy',
            'Вдохновение': 'emoCreative', 'Творчество': 'emoCreative', 'Creative': 'emoCreative', 'Шығармашылық': 'emoCreative',
            'Меланхолия': 'emoMelancholy', 'Melancholy': 'emoMelancholy',
            'Энергия': 'emoEnergized', 'Energized': 'emoEnergized',
            'Мечтательность': 'emoDreamy', 'Dreamy': 'emoDreamy', 'Қиялшылдық': 'emoDreamy',
            'Усталость': 'emoTired', 'Tired': 'emoTired', 'Шаршау': 'emoTired',
            'Романтика': 'emoRomantic', 'Romantic': 'emoRomantic'
          };
          const key = tagMap[rawTag];
          const text = (key && trans.emotions[key]) ? trans.emotions[key].replace(/<i[^>]*><\/i>\s*/g, '') : emo;
          return `<span class="history-badge">${text}</span>`;
        })
        .join('');

      const cleanMovieTitle = log.movie.title.replace(/\s*\(\d{4}\)\s*/g, '');
      const watchUrl = `https://yandex.ru/search/?text=${encodeURIComponent(cleanMovieTitle + ' смотреть online бесплатно в хорошем качестве')}`;
      const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(log.song.artist + ' ' + log.song.track_name)}`;

      const quoteHtml = log.quote && log.quote.text ? `
        <div style="font-size: 0.8rem; font-style: italic; color: #6c6962; border-left: 2px solid var(--accent-color); padding-left: 0.5rem; margin-bottom: 0.5rem; margin-top: 0.4rem;">
          <strong>[${log.quote.category}]</strong> "${log.quote.text}" — ${log.quote.author}
        </div>
      ` : '';

      const recText = curLang === 'en' ? 'Track recommendation' : curLang === 'kk' ? 'Трек ұсынысы' : 'Рекомендация трека';

      return `
        <div class="history-entry" style="border-left: 4px solid ${log.color}">
          <div class="history-header">
            <span class="history-date">${formattedDate}</span>
            <div class="history-color-indicator" style="background-color: ${log.color}" title="Color: ${log.color}"></div>
          </div>
          <div class="history-emotions">
            ${emotionsHtml}
          </div>
          <p class="history-text" title="${log.description}">${log.description}</p>
          ${quoteHtml}
          <div class="history-recs">
            <div class="history-rec-item">
              <i class="fa-solid fa-ticket"></i> <strong>${trans.movieTicketBadge.replace(/<i[^>]*><\/i>\s*/g, '')}:</strong> ${log.movie.title} (${log.movie.rating})
              <a href="${watchUrl}" target="_blank" style="margin-left: 5px; color: var(--accent-color); text-decoration: underline;" title="${trans.watchLinkText}">
                <i class="fa-solid fa-circle-play" style="font-size:0.75rem; margin-right:2px;"></i>${trans.watchLinkText}
              </a>
            </div>
            <div class="history-rec-item">
              <i class="fa-brands fa-spotify"></i> <strong>${recText}:</strong> ${log.song.artist} — ${log.song.track_name} (Плейлист: ${log.song.playlist_name})
              <a href="${spotifyUrl}" target="_blank" style="margin-left: 5px; color: #1db954; text-decoration: underline;" title="${trans.spotifyLinkText}">
                <i class="fa-brands fa-spotify" style="font-size:0.75rem; margin-right:2px;"></i>${trans.spotifyLinkText}
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
});
