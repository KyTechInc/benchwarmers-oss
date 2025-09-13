"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";
import { Avatar as AvatarPrimitive } from "radix-ui";
import type React from "react";
import { cn } from "@/lib/utils";

const avatarStatusVariants = cva(
  "flex size-2 items-center rounded-full border-2 border-background",
  {
    variants: {
      variant: {
        online: "bg-green-600",
        offline: "bg-zinc-600 dark:bg-zinc-300",
        busy: "bg-yellow-600",
        away: "bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "online",
    },
  }
);

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn("relative flex size-10 shrink-0", className)}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <AvatarPrimitive.Image
        className={cn("aspect-square h-full w-full")}
        data-slot="avatar-image"
        {...props}
      />
    </div>
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full border border-border bg-accent text-accent-foreground text-xs",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

function AvatarIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute flex size-6 items-center justify-center",
        className
      )}
      data-slot="avatar-indicator"
      {...props}
    />
  );
}

function AvatarStatus({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarStatusVariants>) {
  return (
    <div
      className={cn(avatarStatusVariants({ variant }), className)}
      data-slot="avatar-status"
      {...props}
    />
  );
}

type TeamLogoProps = {
  teamCode: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function TeamLogo({
  teamCode,
  size = "md",
  className,
  ...props
}: TeamLogoProps) {
  const { theme } = useTheme();
  const themeVariant = theme === "dark" ? "_dark" : "_light";

  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };

  const logoUrl = `https://data.benchwarmers.app/NHL_Logos/${themeVariant}/${teamCode}.svg`;

  return (
    <Avatar className={cn(sizeClasses[size], className)} {...props}>
      <AvatarImage alt={`${teamCode} logo`} src={logoUrl} />
      <AvatarFallback className="font-medium text-xs">
        {teamCode}
      </AvatarFallback>
    </Avatar>
  );
}

export {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarIndicator,
  AvatarStatus,
  TeamLogo,
  avatarStatusVariants,
};
