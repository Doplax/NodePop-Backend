// This is a standard class, NOT decorated (no @Injectable) <--
// You instantiate this in your controller: const gptService = new GptService(); <--

import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';

import {
  orthographyCheckUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioUseCase,
  translateUseCase,
  audioToTextUsecase,
  imageVariationUseCase,
  imageGenerationUseCase // <-- added import for consistency
} from './use-cases/index'; // <-- adjust path as needed

// Import your DTOs only if needed for typing/validation
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TranslateDto,
  TextToAudioDto,
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto
} from './dtos'; // <-- adjust path as needed

export class GptService {
  private openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY }); // <-- example: process.env.OPEN_API_KEY = "sk-..." <-- 

  // Calls use cases, just like in NestJS

  async orthographyCheck({ prompt }: OrthographyDto) {
    // prompt: "Check this text"
    return await orthographyCheckUseCase(this.openai, { prompt });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    // prompt: "Should I buy a new car?"
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    // prompt: "Should I move cities?"
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translateText({ prompt, lang }: TranslateDto) {
    // prompt: "Hello"; lang: "es"
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    // prompt: "Hello world"; voice: "en-US"
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    // fileId: "12345"
    const filePath = path.resolve(
      __dirname,
      `../../generated/audios/${fileId}.mp3`
    );
    // filePath example: "/app/generated/audios/12345.mp3"
    const wasFileFound = fs.existsSync(filePath);
    if (!wasFileFound) {
      // throw error if file not found (Nest would throw NotFoundException)
      const error = new Error(`File ${fileId} not found`);
      (error as any).status = 404; // <-- mark status code if you want to use a custom error handler
      throw error; // <-- throw standard JS error
    }
    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, audioToText?: AudioToTextDto) {
    // audioFile: { buffer: <Buffer>, mimetype: "audio/mp3", ... }
    // audioToText: { prompt: "Write out this audio" }
    const { prompt } = audioToText || {};
    return await audioToTextUsecase(this.openai, { audioFile, prompt });
  }

  async imageGeneration(imageGeneration: ImageGenerationDto) {
    // imageGeneration: { prompt: "A cat in a hat", ... }
    return await imageGenerationUseCase(this.openai, { ...imageGeneration });
  }

  async getGeneratedImage(fileName: string) {
    // fileName: "cat-hat.png"
    const filePath = path.resolve('./', './generated/images/', fileName);
    // filePath: "/app/generated/images/cat-hat.png"
    const exist = fs.existsSync(filePath);
    if (!exist) {
      const error = new Error('File not found');
      (error as any).status = 404;
      throw error;
    }
    console.log(filePath);
    return filePath;
  }

  async generateImageVariation({ baseImage }: ImageVariationDto) {
    // baseImage: <Buffer> or file path
    return await imageVariationUseCase(this.openai, { baseImage });
  }
}