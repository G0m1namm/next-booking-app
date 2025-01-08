'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className="w-full mt-20">
      <div className="relative h-fit dark-border-t py-3 px-4 flex justify-between page-shell-container">
        <a
          className="font-playfair inline-flex items-center"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/jherson-martelo/"
        >
          LinkedIn
          <ExternalLinkIcon className="size-4 ml-1" />
        </a>
        <span>Jherson Martelo &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
