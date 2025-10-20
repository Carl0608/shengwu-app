import { MobileLayout } from "@/components/mobile-layout";
import { UserDetail } from "@/components/admin/user-detail";
import { mockUsers } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // 为静态生成返回所有可能的用户 id
  return mockUsers.map((user) => ({
    id: user.id,
  }));
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const user = mockUsers.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  return (
    <MobileLayout>
      <UserDetail user={user} />
    </MobileLayout>
  );
}