import { GymSpaceLayout } from '@/features/gym-space/gym-space.layout'

export default function Layout({ children }: LayoutProps<'/'>) {
  return <GymSpaceLayout>{children}</GymSpaceLayout>
}
