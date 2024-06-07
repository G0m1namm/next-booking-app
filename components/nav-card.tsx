import React from 'react';

import { Card, CardContent, CardHeader } from './ui/card';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function NavCard({ icon, title, description }: Props) {
  return (
    <Card>
      <CardHeader>{icon}</CardHeader>
      <CardContent>
        <strong>{title}</strong>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
