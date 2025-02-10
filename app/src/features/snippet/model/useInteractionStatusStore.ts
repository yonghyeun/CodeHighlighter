import { createStore } from "@/shared/lib/store";

type Status = "loading" | "idle" | "succeed" | "fail";
interface InteractionStatusStore {
  status: Status;
}

export const useInteractionStatusStore = createStore<InteractionStatusStore>({
  status: "idle",
});
