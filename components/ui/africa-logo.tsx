interface AfricaLogoProps {
  className?: string
  size?: number
}

export function AfricaLogo({ className = "", size = 24 }: AfricaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified Africa continent silhouette */}
      <path d="M50 10c-2 0-4 1-6 2-3 2-5 4-6 7-1 2-1 4 0 6 1 3 3 5 5 7 1 1 2 3 2 5 0 2-1 4-2 6-2 3-4 6-5 9-1 4-1 8 1 12 1 3 3 6 6 8 2 2 5 3 8 3 2 0 4-1 6-2 3-2 6-4 8-7 2-3 3-7 3-11 0-3-1-6-2-9-1-2-2-4-2-6 0-3 1-6 3-8 2-3 5-5 8-6 3-1 6-1 9 0 2 1 4 2 5 4 1 2 1 4 0 6-1 3-3 5-5 7-1 1-2 3-2 5 0 2 1 4 2 6 2 3 4 6 5 9 1 4 1 8-1 12-1 3-3 6-6 8-2 2-5 3-8 3-3 0-6-1-9-3-4-2-7-5-9-9-2-4-3-8-2-12 1-4 3-7 6-10 2-2 4-4 5-7 1-2 1-5 0-7-1-3-3-5-6-6-2-1-5-1-7 0-3 1-5 3-6 6-1 2-1 5 0 7 1 3 3 5 6 6z" />
    </svg>
  )
}
