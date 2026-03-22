"use client";

import { AlertTriangleIcon } from "lucide-react";
import { FallbackProps, getErrorMessage } from "react-error-boundary";
import { Button } from "./ui/button";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-destructive" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
};

export const QueryErrorView = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => (
  <div className="grid place-items-center h-screen">
    <ErrorView onRetry={resetErrorBoundary} message={getErrorMessage(error)} />
  </div>
);
