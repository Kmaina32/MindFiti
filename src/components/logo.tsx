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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.9-3.35 2.5 2.5 0 0 1 .36-4.45 2.5 2.5 0 0 1 4.4-1.34 2.5 2.5 0 0 1 1.47-4.42" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.9-3.35 2.5 2.5 0 0 0-.36-4.45 2.5 2.5 0 0 0-4.4-1.34A2.5 2.5 0 0 0 12.5 5.8" />
    </svg>
  );
}
