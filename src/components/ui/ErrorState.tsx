interface ErrorStateProps {
  message: string;
  details?: string;
}

export function ErrorState({ message, details }: ErrorStateProps) {
  return (
    <div className="error-state">
      <h2>{message}</h2>
      {details && <p className="error-details">{details}</p>}
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}
