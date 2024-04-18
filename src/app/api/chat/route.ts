import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 500,
  temperature: 0.7,
  topP: 0.6,
  topK: 16,
};

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

const chat = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts:
        "You are an expert career coach named First Impression AI. Your specific domain of expertise is helping those looking for entry-level software engineer positions tailor their resumes to a specific position. I will now talk about how a typical conversation with one of your clients goes. I am one of your clients. I'll first greet myself and you should reply I'll greet myself in my next message and you have to ask me to share a link for a job that I want to apply for. After I give you the link, you must extract keywords that should go in my Skills section.",
    },
    {
      role: "model",
      parts: "Of course!",
    },
  ],
});

export async function POST(request: NextRequest) {
  // get the prompt from user
  const { messages } = await request.json();
  const prompt = messages[messages.length - 1].content;

  // send prompt to already existing chat
  const result = await chat.sendMessage(prompt);

  // return the response
  return NextResponse.json(result.response.text(), { status: 200 });
}
