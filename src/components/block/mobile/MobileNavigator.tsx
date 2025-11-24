import { Link } from 'react-router'
import { House, CirclePlus, TicketsPlane, MapPin, User } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { ROUTES } from '@/routes'

interface MobileNavigatorItem {
  navId: string
  route: string
  icon: React.ReactNode
}

const mobileNavigatorList: MobileNavigatorItem[] = [
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

export default function MobileNavigator() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background z-50 flex justify-around items-center py-3">
      <NavigationMenu>
        <NavigationMenuList className="flex justify-around flex-1">
          {mobileNavigatorList.map((navItem) => (
            <NavigationMenuItem
              key={navItem.navId}
              className="xl:w-48 lg:w-36 md:w-32 sm:w-24 w-20"
            >
              <NavigationMenuLink asChild>
                <Link
                  to={navItem.route}
                  className="flex flex-col items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-6 h-6 mb-1">{navItem.icon}</div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
