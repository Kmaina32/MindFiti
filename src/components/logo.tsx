import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
      <path d="M20 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
      <path d="M12 16a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
      <path d="M20 16a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
      <path d="M12 4v16" />
      <path d="M12 12h8" />
      <path d="M4 12h4" />
    </svg>
  );
}
