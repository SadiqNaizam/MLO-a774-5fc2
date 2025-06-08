import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface ActivityFeedItemProps {
  icon?: LucideIcon; // Optional: Icon representing the activity type
  userAvatarUrl?: string;
  userInitials?: string;
  title: React.ReactNode; // Can be a string or JSX for more complex titles
  timestamp: string; // e.g., "2 minutes ago", "2024-07-28 10:30 AM"
  description?: string;
  className?: string;
  onClick?: () => void; // Optional action when item is clicked
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  icon: Icon,
  userAvatarUrl,
  userInitials = "??",
  title,
  timestamp,
  description,
  className,
  onClick,
}) => {
  console.log("Rendering ActivityFeedItem:", title);

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {Icon && !userAvatarUrl && (
        <div className="bg-muted p-2 rounded-full">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      {userAvatarUrl && (
        <Avatar className="h-9 w-9">
          <AvatarImage src={userAvatarUrl} alt="User avatar" />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{title}</div>
            <div className="text-xs text-muted-foreground">{timestamp}</div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeedItem;