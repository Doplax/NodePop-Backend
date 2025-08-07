import { Request, Response } from "express"; // <-- Use Express types
import { GptService } from "../services/gpt.service"; // <-- Adjust path as needed
import handleHttpError from "@/utils/errorHandler"; // <-- Your error handler
// Import your DTOs here if you validate with them (class-validator or express-validator)
import multer from "multer"; // <-- For file uploads
import path from "path";

// Set up multer for file handling (like NestJS FileInterceptor)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./generated/uploads"); // <-- Same as NestJS
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    cb(null, fileName);
  },
});
export const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) cb(null, true);
    else cb(new Error('File type not allowed'), false);
  }
});

const gptService = new GptService(); // <-- Instantiate service

// Example: GET /gpt/
export const basicResponse = (req: Request, res: Response) => {
  // No input, just return a message
  res.json({ message: "Hello World" });
};

// Example: POST /gpt/orthography-check
export const orthographyCheck = async (req: Request, res: Response) => {
  try {
    // const orthographyDto = req.body; // <-- Example: { text: "..." }
    const result = await gptService.orthographyCheck(req.body); // <-- Call service
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ERROR_ORTHOGRAPHY_CHECK"); // <-- Use your handler
  }
};

// Example: POST /gpt/pros-cons-discusser
export const prosConsDicusser = async (req: Request, res: Response) => {
  try {
    const result = await gptService.prosConsDicusser(req.body);
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ERROR_PROS_CONS");
  }
};

// Example: POST /gpt/pros-cons-discusser-stream
export const prosConsDicusserStream = async (req: Request, res: Response) => {
  try {
    const stream = await gptService.prosConsDicusserStream(req.body);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || "";
      // Example: piece = "some text"
      res.write(piece);
    }
    res.end();
  } catch (error) {
    handleHttpError(res, "ERROR_STREAM");
  }
};

// Example: POST /gpt/translate
export const translateText = async (req: Request, res: Response) => {
  try {
    const result = await gptService.translateText(req.body);
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ERROR_TRANSLATE");
  }
};

// Example: POST /gpt/text-to-audio
export const textToAudio = async (req: Request, res: Response) => {
  try {
    const filePath = await gptService.textToAudio(req.body);
    // filePath: "generated/audio/12345.mp3"
    res.setHeader("Content-Type", "audio/mp3");
    res.status(200).sendFile(path.resolve(filePath));
  } catch (error) {
    handleHttpError(res, "ERROR_TEXT_TO_AUDIO");
  }
};

// Example: GET /gpt/text-to-audio/:fileId
export const getTextToAudio = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params; // fileId: "12345"
    const filePath = await gptService.textToAudioGetter(fileId);
    res.setHeader("Content-Type", "audio/mp3");
    res.status(200).sendFile(path.resolve(filePath));
  } catch (error) {
    handleHttpError(res, "ERROR_GET_AUDIO");
  }
};

// Example: POST /gpt/audio-to-text (with file upload)
export const audioToText = async (req: Request, res: Response) => {
  try {
    const file = req.file; // <-- Uploaded audio file
    const audioToTextDto = req.body; // <-- Other fields
    if (!file) {
      handleHttpError(res, "File not uploaded", 400);
      return;
    }
    const result = await gptService.audioToText(file, audioToTextDto);
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ERROR_AUDIO_TO_TEXT");
  }
};

// Example: POST /gpt/image-generation
export const imageGeneration = async (req: Request, res: Response) => {
  try {
    const result = await gptService.imageGeneration(req.body);
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ERROR_IMAGE_GENERATION");
  }
};

// Example: GET /gpt/image-generation/:filename
export const getGeneration = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = await gptService.getGeneratedImage(filename);
    res.status(200).sendFile(path.resolve(filePath));
  } catch (error) {
    handleHttpError(res, "ERROR_GET_IMAGE");
  }
};

// Example: POST /gpt/image-variation
export const imageVariation = async (req: Request, res: Response) => {
  try {
    const result = await gptService.generateImageVariation(req.body);
    res.json(result);
  } catch (error) {
    handleHttpError(res, "ERROR_IMAGE_VARIATION");
  }
};