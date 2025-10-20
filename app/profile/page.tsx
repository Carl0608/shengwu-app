import { MobileLayout } from "@/components/mobile-layout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileMenu } from "@/components/profile/profile-menu"
import { WechatBinding } from "@/components/profile/wechat-binding"

export default function ProfilePage() {
  return (
    <MobileLayout>
      <div className="flex flex-col">
        <ProfileHeader />
        <div className="px-4 py-6 space-y-6">
          <WechatBinding />
          <ProfileMenu />
        </div>
      </div>
    </MobileLayout>
  )
}
