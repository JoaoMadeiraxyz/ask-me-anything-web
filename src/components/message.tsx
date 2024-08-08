import { useState } from "react";

import { ArrowUp } from "lucide-react";

interface MessageProps {
  text: string;
  ammountOfReactions: number;
  answered?: boolean;
}

export function Message({
  text,
  ammountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);

  function handleReactToMessage() {
    setHasReacted(true);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 hover:text-orange-500 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({ammountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={handleReactToMessage}
          className="mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({ammountOfReactions})
        </button>
      )}
    </li>
  );
}
