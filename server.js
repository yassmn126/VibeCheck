import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup: Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_KEY environment variables are missing.');
}

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (supabase) {
  console.log('Successfully initialized Supabase client connected to:', supabaseUrl);
}

// Endpoint: POST /api/vibecheck
app.post('/api/vibecheck', async (req, res) => {
  const { emotions, description, lang = 'ru' } = req.body;

  if (!emotions || !Array.isArray(emotions) || emotions.length === 0) {
    return res.status(400).json({ error: 'Пожалуйста, выберите хотя бы одну эмоцию.' });
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Пожалуйста, опишите ваш день.' });
  }

  // Check if API key is configured
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ 
      error: 'API ключ Gemini не настроен. Пожалуйста, создайте файл .env и укажите в нём GEMINI_API_KEY.' 
    });
  }

  // Map language code to fully qualified name for system instruction
  const langMap = {
    ru: 'Russian',
    en: 'English',
    kk: 'Kazakh (Қазақ тілі)'
  };
  const targetLanguage = langMap[lang] || 'Russian';

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Selected emotions: ${emotions.join(', ')}.\nUser's description of the day: "${description}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are VibeCheck, an empathetic, high-end AI atmosphere generator. Based on the user's selected emotions and description of their day, generate a personalized vibe analysis.
You must return a JSON object with the following fields:
- "color": A beautiful, calming pastel hex color code representing the vibe (e.g. #F3E8EE for soft rose, #E5ECF4 for soft lavender blue, #E8F4EC for soft mint, #FDF5E6 for soft cream, #FDF0E6 for soft peach). Keep it light and soft so it functions well as a pastel background.
- "movie": A JSON object with fields:
  * "title": The title of the movie (e.g., "Amelie (2001)"). Keep the movie title in its recognizable format.
  * "rating": Kinopoisk/IMDb rating (e.g., "8.0/10").
  * "description": An intriguing 1-2 sentence synopsis/reasoning fitting the user's mood.
  * "search_query": A search query for stock photography (e.g., "paris cafe warm light", "cosy rainy window anime", "cinematic forest").
- "song": A JSON object with fields:
  * "track_name": Recommended song name.
  * "artist": Recommended artist name.
  * "playlist_name": The atmospheric name of a Spotify playlist suited to the user's mood (e.g. "Chill Lofi Study Beats", "Melancholy Indie Rain", "Late Night Drive Synthwave").
  * "description": A short 1-2 sentence explanation of why this track and playlist fits their day.
  * "visual_theme": A color/vibe theme description for generating album/track art.
  IMPORTANT: You MUST prioritize Tame Impala and close indie-psychedelic/lo-fi artists like Beach House, MGMT, Kid Cudi, Mac DeMarco, and similar bands/tracks that perfectly fit the mood.
- "quote": A JSON object with fields:
  * "category": A humorous or relatable mood/category (e.g., "Подколы и ирония (чтобы улыбнуться)" or "Поддержка в стиле 'в одной лодке'").
  * "text": An ironical, relatable pop-culture life quote or saying.
  * "author": Reference to a famous character, film, or TV show (e.g., Wednesday Addams, Tony Stark, Sherlock Holmes, Gregory House, etc.).

CRITICAL LANGUAGE COMPLIANCE RULE:
You must translate and write ALL descriptive text fields ("movie.description", "song.playlist_name", "song.description", "song.visual_theme", "quote.category", "quote.text", "quote.author") strictly in the requested target language: ${targetLanguage}.
You must output in this language REGARDLESS of the language used in the user's description.
- If targetLanguage is "Kazakh (Қазақ тілі)", you MUST write these fields in the KAZAKH language (Қазақ тілі). For example, use Kazakh words. Do NOT use Russian or English words in these fields.
- If targetLanguage is "English", you MUST write these fields in the ENGLISH language.
- If targetLanguage is "Russian", you MUST write these fields in the RUSSIAN language.

You must return ONLY the raw JSON object conforming to this schema, without any markdown formatting, backticks, or comments.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            color: { type: 'STRING', description: 'Pastel hex code for background' },
            movie: {
              type: 'OBJECT',
              properties: {
                title: { type: 'STRING' },
                rating: { type: 'STRING' },
                description: { type: 'STRING' },
                search_query: { type: 'STRING' }
              },
              required: ['title', 'rating', 'description', 'search_query']
            },
            song: {
              type: 'OBJECT',
              properties: {
                track_name: { type: 'STRING' },
                artist: { type: 'STRING' },
                playlist_name: { type: 'STRING' },
                description: { type: 'STRING' },
                visual_theme: { type: 'STRING' }
              },
              required: ['track_name', 'artist', 'playlist_name', 'description', 'visual_theme']
            },
            quote: {
              type: 'OBJECT',
              properties: {
                category: { type: 'STRING' },
                text: { type: 'STRING' },
                author: { type: 'STRING' }
              },
              required: ['category', 'text', 'author']
            }
          },
          required: ['color', 'movie', 'song', 'quote']
        }
      }
    });

    const vibeResult = JSON.parse(response.text);

    // Save to database (Supabase)
    if (supabase) {
      const { data: insertData, error: insertError } = await supabase
        .from('mood_logs')
        .insert([
          {
            emotions: JSON.stringify(emotions),
            description,
            color: vibeResult.color,
            movie_title: vibeResult.movie.title,
            movie_rating: vibeResult.movie.rating,
            movie_description: vibeResult.movie.description,
            movie_search_query: vibeResult.movie.search_query,
            song_track_name: vibeResult.song.track_name,
            song_artist: vibeResult.song.artist,
            song_playlist_name: vibeResult.song.playlist_name,
            song_description: vibeResult.song.description,
            song_visual_theme: vibeResult.song.visual_theme,
            quote_category: vibeResult.quote.category,
            quote_text: vibeResult.quote.text,
            quote_author: vibeResult.quote.author
          }
        ]);

      if (insertError) {
        console.error('Error saving log to Supabase database:', insertError.message);
      } else {
        console.log('Mood log saved successfully to Supabase.');
      }
    } else {
      console.warn('Supabase client not initialized, skipping database logging.');
    }

    // Respond to user
    res.json({
      id: Date.now(),
      color: vibeResult.color,
      movie: vibeResult.movie,
      song: vibeResult.song,
      quote: vibeResult.quote
    });

  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Произошла ошибка при анализе атмосферы: ' + error.message });
  }
});

// Endpoint: GET /api/history
app.get('/api/history', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client is not initialized.' });
  }

  try {
    const { data: rows, error: selectError } = await supabase
      .from('mood_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (selectError) {
      console.error('Error fetching history from Supabase:', selectError.message);
      return res.status(500).json({ error: 'Не удалось получить историю атмосфер.' });
    }
    
    // Format flat rows back to nested objects
    const history = (rows || []).map(row => {
      let emotionsParsed = [];
      try {
        emotionsParsed = typeof row.emotions === 'string' ? JSON.parse(row.emotions) : row.emotions;
      } catch (e) {
        emotionsParsed = [];
      }

      return {
        id: row.id,
        emotions: emotionsParsed,
        description: row.description,
        color: row.color,
        created_at: row.created_at,
        movie: {
          title: row.movie_title,
          rating: row.movie_rating,
          description: row.movie_description,
          search_query: row.movie_search_query
        },
        song: {
          track_name: row.song_track_name,
          artist: row.song_artist,
          playlist_name: row.song_playlist_name,
          description: row.song_description,
          visual_theme: row.song_visual_theme
        },
        quote: {
          category: row.quote_category,
          text: row.quote_text,
          author: row.quote_author
        }
      };
    });
    
    res.json(history);
  } catch (err) {
    console.error('Unexpected error fetching history:', err.message);
    res.status(500).json({ error: 'Произошла непредвиденная ошибка.' });
  }
});

app.run = () => {}; // dummy handler

app.listen(PORT, () => {
  console.log(`VibeCheck server running at http://localhost:${PORT}`);
});
