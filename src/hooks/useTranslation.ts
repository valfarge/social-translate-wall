
import { useState } from 'react';
import { toast } from "sonner";

interface TranslationResult {
  translatedText: string;
  language: string;
}

export function useTranslation() {
  const [isTranslating, setIsTranslating] = useState(false);

  // Simple mock translation for demonstration purposes
  // In a real app, you would connect to a translation API like Google Translate or DeepL
  const translateText = async (text: string, targetLanguage: string = 'en'): Promise<TranslationResult> => {
    setIsTranslating(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock translation based on target language
      let translatedText: string;
      let language: string;
      
      if (targetLanguage === 'en') {
        // French to English mock translations
        const translations: Record<string, string> = {
          'Bonjour à tous !': 'Hello everyone!',
          'Je suis très heureux de partager cette journée avec vous.': 'I am very happy to share this day with you.',
          'Je viens de terminer mon nouveau projet et je suis très satisfait du résultat !': 'I just finished my new project and I am very satisfied with the result!',
          'Quelle belle journée pour une promenade dans le parc !': 'What a beautiful day for a walk in the park!',
          'Le soleil brille et les oiseaux chantent.': 'The sun is shining and the birds are singing.',
          'Je viens de découvrir un excellent restaurant près de chez moi.': 'I just discovered an excellent restaurant near my home.',
          'Je vous le recommande vivement !': 'I highly recommend it!',
          "Aujourd'hui, j'ai commencé à apprendre une nouvelle langue.": 'Today, I started learning a new language.',
          "C'est difficile mais passionnant !": "It's difficult but exciting!",
        };
        
        // Try to find a direct match, otherwise return a generic translation
        translatedText = Object.entries(translations).reduce((result, [french, english]) => {
          if (text.includes(french)) {
            return result + ' ' + english;
          }
          return result;
        }, '').trim();
        
        // If no match found, use a simple replacement mechanism
        if (!translatedText) {
          translatedText = text
            .replace(/Bonjour/g, 'Hello')
            .replace(/journée/g, 'day')
            .replace(/heureux/g, 'happy')
            .replace(/nouveau/g, 'new')
            .replace(/belle/g, 'beautiful')
            .replace(/soleil/g, 'sun')
            .replace(/restaurant/g, 'restaurant');
        }
        
        language = 'English';
      } else {
        // Default to English to French for any other language code
        translatedText = "Translation to " + targetLanguage + " is not supported in this demo.";
        language = 'Unsupported';
      }
      
      return { translatedText, language };
    } catch (error) {
      toast.error("Translation failed. Please try again.");
      console.error("Translation error:", error);
      throw error;
    } finally {
      setIsTranslating(false);
    }
  };

  return { translateText, isTranslating };
}
