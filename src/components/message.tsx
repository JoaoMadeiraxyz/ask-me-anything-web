import { useState } from "react";

import { ArrowUp } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  ammountOfReactions: number;
  answered?: boolean;
}

export function Message({
  id: messageId,
  text,
  ammountOfReactions,
  answered = false,
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await createMessageReaction({ messageId, roomId });
    } catch {
      toast.error("Fala ao curtir mensagem, tente novamente");
    }
    setHasReacted(true);
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await removeMessageReaction({ messageId, roomId });
    } catch {
      toast.error("Fala ao descurtir mensagem, tente novamente");
    }

    setHasReacted(false);
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
          onClick={removeMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-orange-400 hover:text-orange-500 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({ammountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={createMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({ammountOfReactions})
        </button>
      )}
    </li>
  );
}
