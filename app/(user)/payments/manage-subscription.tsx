"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ManageSubscription = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    setError(null);
    console.log("Initiating request to /api/stripe/create-portal");
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("API Response data:", data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error || 'Unknown error'}`);
      }

      if (data.url) {
        console.log("Redirecting to:", data.url);
        router.push(data.url);
      } else {
        console.error("Unexpected API response:", data);
        throw new Error("No URL returned from the API");
      }
    } catch (error) {
      console.error("Error in redirectToCustomerPortal:", error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={redirectToCustomerPortal}
        className="bg-indigo-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Modify Your Subscription"
        )}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default ManageSubscription;