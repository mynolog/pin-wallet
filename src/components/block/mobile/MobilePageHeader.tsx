interface MobilePageHeaderProps {
  title: string
}

export default function MobilePageHeader({ title }: MobilePageHeaderProps) {
  return (
    <header className="bg-background flex h-16 w-full items-center border-b border-gray-200/50 p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
    </header>
  )
}
