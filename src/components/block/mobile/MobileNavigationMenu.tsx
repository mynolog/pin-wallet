import { Link } from 'react-router'
import { House, CirclePlus, TicketsPlane, MapPin, User } from 'lucide-react'
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
    route: ROUTES.TRIPS.EXPENSE_NEW(':tripId'),
    icon: <CirclePlus />,
  },
  {
    navId: 'nav-03',
    route: ROUTES.TRIPS.DETAIL(':tripId'),
    icon: <TicketsPlane />,
  },
  {
    navId: 'nav-04',
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
      <ul className="grid w-full grid-cols-5">
        {mobileNavigationList.map((navItem) => (
          <li key={navItem.navId} className="flex w-full items-center justify-center">
            <Link
              to={navItem.route}
              className="text-muted-foreground hover:text-primary flex w-full flex-col items-center justify-center text-sm transition-colors"
            >
              {navItem.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
