import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkDialog } from "./create-link-dialog";
import { LinkCard } from "./link-card";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const links = await getLinksByUserId(userId);

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Links</h1>
        <CreateLinkDialog />
      </div>

      {links.length === 0 ? (
        <p className="text-muted-foreground">You have no shortened links yet.</p>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
