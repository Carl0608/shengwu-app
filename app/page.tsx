import { MobileLayout } from "@/components/mobile-layout"
import { HomeHeader } from "@/components/home/home-header"
import { QuickActions } from "@/components/home/quick-actions"
import { AnnouncementList } from "@/components/home/announcement-list"
import { RecentActivity } from "@/components/home/recent-activity"

export default function HomePage() {
  return (
    <MobileLayout>
      <div className="flex flex-col">
        <HomeHeader />
        <div className="px-4 py-6 space-y-6">
          <QuickActions />
          <AnnouncementList />
          <RecentActivity />
        </div>
      </div>
    </MobileLayout>
  )
}
