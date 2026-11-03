import { type BottomTabBarProps, Tabs } from 'expo-router/tabs'

import { type TabBarItem, TabBar } from '@/modules/shared/ui/components/TabBar'
import { useTheme } from '@/modules/shared/ui/hooks/use-theme'

const TAB_ITEMS: ReadonlyArray<TabBarItem> = [
  { name: 'home', label: 'Accueil', icon: 'home' },
  { name: 'sessions', label: 'Séances', icon: 'calendar' },
  { name: 'my-duo', label: 'Mon duo', icon: 'users' },
  { name: 'programs', label: 'Programmes', icon: 'bookmark' },
]

const BoraTabBar = ({ state, navigateToTab }: BottomTabBarProps) => (
  <TabBar
    items={TAB_ITEMS}
    activeName={state.routes[state.index]?.name ?? 'home'}
    onSelect={(name) => {
      const route = state.routes.find((candidate) => candidate.name === name)
      if (route) navigateToTab(route.key)
    }}
  />
)

const renderTabBar = (props: BottomTabBarProps) => <BoraTabBar {...props} />

export default function TabsLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.surface100 } }}
      tabBar={renderTabBar}
    >
      {TAB_ITEMS.map((item) => (
        <Tabs.Screen key={item.name} name={item.name} />
      ))}
    </Tabs>
  )
}
