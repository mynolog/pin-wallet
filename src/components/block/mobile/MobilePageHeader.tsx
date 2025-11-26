interface MobilePageHeaderProps {
  title: string
  children?: React.ReactNode
}

export default function MobilePageHeader({ title, children }: MobilePageHeaderProps) {
  return (
    <header className="bg-background fixed top-0 z-50 flex h-16 w-full max-w-2xl items-center justify-between border-b border-gray-200/50 p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children && <>{children}</>}
    </header>
  )
}
