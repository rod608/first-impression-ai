
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="h-screen flex  flex-col items-center  p-14">
       
      <h2 className="mb-4 text-5xl">First Impression AI</h2>
      <Chatbot/>
    </main>
  );
}
