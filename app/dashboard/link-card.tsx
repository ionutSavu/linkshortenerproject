'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditLinkDialog } from './edit-link-dialog';
import { DeleteLinkDialog } from './delete-link-dialog';
import type { SelectLink } from '@/db/schema';

interface LinkCardProps {
  link: SelectLink;
}

export function LinkCard({ link }: LinkCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Badge variant="secondary">/{link.shortCode}</Badge>
            <span className="truncate text-muted-foreground font-normal text-sm">
              {link.url}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Created {new Date(link.createdAt).toLocaleDateString()}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditLinkDialog link={link} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteLinkDialog
        linkId={link.id}
        shortCode={link.shortCode}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
