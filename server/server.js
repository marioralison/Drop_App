const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Configuration axios
axios.defaults.timeout = 8000;

axios.interceptors.request.use(
  (config) => {
    console.log("🔄 Requête axios:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Erreur requête axios:", error.message);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("✅ Réponse axios:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ Erreur réponse axios:",
      error.response?.status,
      error.message
    );
    return Promise.reject(error);
  }
);

// Fonction de traduction optimisée pour MyMemory
async function translateText(text, sourceLang = "fr", targetLang = "en") {
  console.log(`🔤 Traduction: "${text}" (${sourceLang} → ${targetLang})`);

  try {
    console.log("🌐 Utilisation MyMemory API...");
    const response = await axios({
      method: "GET",
      url: `https://api.mymemory.translated.net/get`,
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
        de: "translator@example.com", // Email optionnel pour de meilleures performances
      },
      timeout: 6000,
      headers: {
        "User-Agent": "TranslatorApp/1.0",
      },
    });

    console.log(
      "📤 Réponse MyMemory complète:",
      JSON.stringify(response.data, null, 2)
    );

    if (
      response.data &&
      response.data.responseData &&
      response.data.responseData.translatedText
    ) {
      const translated = response.data.responseData.translatedText;
      const match = response.data.responseData.match || 0;

      console.log(`✅ MyMemory OK: "${translated}" (match: ${match})`);

      // Vérifier la qualité de la traduction
      if (match < 0.3 && translated.toLowerCase() === text.toLowerCase()) {
        console.log("⚠️ Traduction de faible qualité détectée");
        return `${text} [traduction incertaine]`;
      }

      return translated;
    }

    throw new Error("Pas de translatedText dans la réponse MyMemory");
  } catch (error) {
    console.error("❌ MyMemory échoué:", error.message);

    // Fallback simple
    console.log("🔄 Utilisation du fallback...");
    return `[${targetLang.toUpperCase()}] ${text}`;
  }
}

// Amélioration de la détection de langue
function detectLanguage(text) {
  const cleanText = text.toLowerCase();

  // Mots français communs
  const frenchWords = [
    "le",
    "la",
    "les",
    "un",
    "une",
    "des",
    "de",
    "du",
    "et",
    "ou",
    "à",
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "bonjour",
    "salut",
    "comment",
    "ça",
    "va",
    "bien",
    "merci",
    "oui",
    "non",
    "avec",
    "pour",
    "dans",
    "sur",
    "par",
    "ce",
    "cette",
    "ces",
    "mon",
    "ma",
    "mes",
  ];

  // Mots anglais communs
  const englishWords = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "to",
    "of",
    "in",
    "on",
    "at",
    "by",
    "i",
    "you",
    "he",
    "she",
    "we",
    "they",
    "it",
    "hello",
    "hi",
    "how",
    "are",
    "good",
    "thank",
    "yes",
    "no",
    "with",
    "for",
    "this",
    "that",
    "these",
    "my",
    "your",
    "his",
    "her",
  ];

  const words = cleanText.split(/\s+/);
  let frenchScore = 0;
  let englishScore = 0;

  words.forEach((word) => {
    if (frenchWords.includes(word)) frenchScore++;
    if (englishWords.includes(word)) englishScore++;
  });

  // Vérifier les caractères accentués (plus probable en français)
  const accentCount = (text.match(/[àâäéèêëïîôöùûüÿñç]/gi) || []).length;
  if (accentCount > 0) frenchScore += accentCount;

  console.log(
    `🔍 Détection langue: FR=${frenchScore}, EN=${englishScore}, Accents=${accentCount}`
  );

  // Si pas assez d'indices, utiliser une heuristique simple
  if (frenchScore === 0 && englishScore === 0) {
    // Détecter les caractères non-ASCII comme indicateur de français
    return /[àâäéèêëïîôöùûüÿñç]/i.test(text) ? "fr" : "en";
  }

  return frenchScore > englishScore ? "fr" : "en";
}

// Gestion des connexions Socket.IO
io.on("connection", (socket) => {
  console.log("✅ Nouvelle connexion:", socket.id);

  socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`🏠 ${socket.id} → room ${roomId}`);

      // Confirmer la connexion à la room
      socket.emit("room_joined", { roomId, status: "success" });
    });

    socket.on("send_message", async (data) => {
    console.log("\n📨 NOUVEAU MESSAGE:", data);

    try {
      const roomId = [data.sender, data.nom].sort().join("_");
      console.log(`🏠 Room: ${roomId}`);

      // Détecter la langue du message
      const sourceLang = detectLanguage(data.content);
      const targetLang = sourceLang === "fr" ? "en" : "fr";

      console.log(`🔄 Début traduction: ${sourceLang} → ${targetLang}`);

      // Traduire le texte
      const translatedText = await translateText(
        data.content,
        sourceLang,
        targetLang
      );

      // Créer le message final avec toutes les informations
      const finalMessage = {
        ...data,
        translated: translatedText,
        originalLang: sourceLang,
        targetLang: targetLang,
        timestamp: data.timestamp || new Date().toISOString(),
        translationStatus: "success", // ✅ Important: marquer comme réussi
      };

      console.log("📤 Message final avec traduction:", {
        id: finalMessage.id,
        original: finalMessage.content,
        translated: finalMessage.translated,
        langs: `${sourceLang} → ${targetLang}`,
      });

      // ✅ CRITIQUE: Envoyer à TOUTE la room (y compris l'expéditeur)
      // Cela permet de mettre à jour le message "pending" avec la traduction
      io.to(roomId).emit("receive_message", finalMessage);
      
      console.log(`✅ Message envoyé à toute la room ${roomId}\n`);
    } catch (error) {
      console.error("❌ ERREUR GLOBALE:", error);

      // Message d'erreur avec fallback
      const errorMessage = {
        ...data,
        translated: `${data.content} [erreur traduction]`,
        error: error.message,
        timestamp: data.timestamp || new Date().toISOString(),
        translationStatus: "error", // ✅ Marquer comme erreur
      };

      const roomId = [data.sender, data.nom].sort().join("_");
      io.to(roomId).emit("receive_message", errorMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Déconnexion:", socket.id);
  });
});

// Routes de test
app.get("/", (req, res) => {
  res.json({
    status: "Serveur de traduction actif",
    timestamp: new Date().toISOString(),
    primaryAPI: "MyMemory Translation",
    features: [
      "Auto language detection",
      "Real-time translation",
      "Socket.IO chat",
    ],
  });
});

// Route pour tester la traduction
app.post("/translate", async (req, res) => {
  const { text, source, target } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texte requis" });
  }

  try {
    console.log("\n🧪 TEST TRADUCTION VIA API:");

    // Auto-détection si pas de langue source
    const detectedLang = source || detectLanguage(text);
    const targetLang = target || (detectedLang === "fr" ? "en" : "fr");

    const translated = await translateText(text, detectedLang, targetLang);

    res.json({
      success: true,
      original: text,
      translated: translated,
      detectedLang: detectedLang,
      targetLang: targetLang,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erreur test traduction:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      original: text,
    });
  }
});

// Route pour tester la détection de langue
app.post("/detect", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texte requis" });
  }

  const detected = detectLanguage(text);
  res.json({
    text: text,
    detectedLanguage: detected,
    confidence: detected === "fr" ? "French detected" : "English detected",
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log("\n🚀 SERVEUR DE TRADUCTION DÉMARRÉ");
  console.log(`📡 Socket.IO: http://localhost:${PORT}`);
  console.log(`🧪 Test traduction: POST http://localhost:${PORT}/translate`);
  console.log(`🔍 Test détection: POST http://localhost:${PORT}/detect`);
  console.log(`📊 Status: http://localhost:${PORT}`);
  console.log("🌐 API principale: MyMemory Translation");
  console.log("📝 Logs détaillés activés\n");
});

// Gestion globale des erreurs
process.on("uncaughtException", (error) => {
  console.error("💥 ERREUR NON GÉRÉE:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("💥 PROMESSE REJETÉE:", reason);
});
