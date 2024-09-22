import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // For math equation rendering
import Image from 'next/image';     // For Next.js optimized images

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}  // Use remark-math for math equation support
      rehypePlugins={[rehypeKatex]} // Use rehype-katex for math rendering
      components={{
        img: ({ src, alt, title }) => (
          <Image
            src={src || '/fallback.png'} // Provide fallback if src is empty
            alt={alt || 'Image'}         // Default alt text for better accessibility
            title={title || ''}          // Title (optional)
            width={600}                  // Width of the image
            height={400}                 // Height of the image
            style={{ objectFit: 'contain' }}  // Ensures the image fits properly
            priority={true}              // Load image with higher priority
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
