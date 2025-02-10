"use client"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <html>
      <body
        className="bg-dark-50"
        style={{
          backgroundColor: "#000",
          height: "100vh",
          width: "100vw",
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <button
              style={{
                position: "relative",
                isolation: "isolate",
                display: "inline-flex",
                width: "fit-content",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                borderRadius: "0.375rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                background: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
                color: "#1e293b",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
              onClick={() => reset()}
            >
              Retry
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
