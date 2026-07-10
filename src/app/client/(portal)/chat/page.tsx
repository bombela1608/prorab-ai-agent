import { requireCustomerSession } from "@/lib/session";
import { InternalAiChat } from "@/components/internal-ai-chat";

export default async function ClientChatPage() {
  await requireCustomerSession();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Chat with AI</h1>
        <p className="text-sm text-gray-500">Reschedule, cancel, or ask about your bookings — 24/7, no waiting on hold.</p>
      </div>

      <InternalAiChat
        endpoint="/api/client-chat"
        welcomeMessage="Hi! I can check your next appointment, cancel a booking, review your order history, or help you get started on a new service request. What do you need?"
        placeholder="Ask about your appointment, orders, or cancel a booking..."
      />
    </div>
  );
}
