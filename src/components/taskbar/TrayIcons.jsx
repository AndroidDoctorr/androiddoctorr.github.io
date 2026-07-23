export function WifiIcon() {
  return (
    <svg
      className="tray-icon"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Wi-Fi connected"
    >
      <path
        fill="currentColor"
        d="M12 18.5a1.75 1.75 0 1 0 0.001 3.501A1.75 1.75 0 0 0 12 18.5Zm-4.2-2.45a6.25 6.25 0 0 1 8.4 0l1.2 1.2-1.45 1.45-1.2-1.2a3.75 3.75 0 0 0-5.05 0l-1.2 1.2-1.45-1.45 1.2-1.2ZM4.8 9.8a11 11 0 0 1 14.4 0l1.2 1.2-1.45 1.45-1.2-1.2a8.5 8.5 0 0 0-11.3 0l-1.2 1.2L3.6 11l1.2-1.2Z"
      />
    </svg>
  )
}

export function BatteryIcon() {
  return (
    <svg
      className="tray-icon tray-icon--battery"
      viewBox="0 0 28 14"
      role="img"
      aria-label="Battery 87 percent"
    >
      <rect x="1" y="2" width="22" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="24" y="5" width="2.5" height="4" rx="1" fill="currentColor" />
      <rect x="3" y="4" width="16" height="6" rx="1" fill="currentColor" />
    </svg>
  )
}
