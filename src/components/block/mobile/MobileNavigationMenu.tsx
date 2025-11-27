import { NavLink } from 'react-router'
import { House, MapPin, User } from 'lucide-react'
import { ROUTES } from '@/routes'
import { cn } from '@/lib/utils'

interface MobileNavigationItem {
  navId: string
  route: string
  icon: React.ReactNode
}

const mobileNavigationList: MobileNavigationItem[] = [
  {
    navId: 'nav-00',
    route: ROUTES.HOME,
    icon: <House />,
  },
  {
    navId: 'nav-01',
    route: ROUTES.MAP,
    icon: <MapPin />,
  },
  {
    navId: 'nav-02',
    route: ROUTES.SETTINGS,
    icon: <User />,
  },
]

interface MobileNavigationMenuProps {
  className?: string
}

export default function MobileNavigationMenu({ className }: MobileNavigationMenuProps) {
  return (
    <nav className={cn('bg-background border-t border-gray-200/50 py-4', className)}>
      <ul className="grid w-full grid-cols-3">
        {mobileNavigationList.map((navItem) => (
          <li key={navItem.navId} className="flex w-full items-center justify-center">
            <NavLink
              to={navItem.route}
              end
              className={({ isActive }) =>
                cn(
                  'text-muted-foreground flex w-full flex-col items-center justify-center text-sm transition-colors hover:text-orange-400',
                  isActive && 'text-orange-500',
                  !isActive && 'text-muted-foreground',
                )
              }
            >
              {navItem.icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
