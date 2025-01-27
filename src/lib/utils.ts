import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMessageTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getLastSeenMessage(lastSeen: Date): string {
  if (!lastSeen) {
    return "Last seen: Never";
  }

  // If the last seen date is today, show the time
  if (isToday(lastSeen)) {
    return `last seen at ${format(lastSeen, "h:mm a")}`; // Example: "last seen at 2:30 PM"
  }

  // If the last seen date is yesterday, show "yesterday" and the time
  if (isYesterday(lastSeen)) {
    return `last seen yesterday at ${format(lastSeen, "h:mm a")}`; // Example: "last seen yesterday at 2:30 PM"
  }

  // If it's older, show the full date
  return `last seen on ${format(lastSeen, "MMMM d")}`; // Example: "last seen on January 2"
}
