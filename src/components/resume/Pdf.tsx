'use client'

import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'

interface PdfViewerProps {
  url: string
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className="flex flex-col w-full h-auto items-center relative">
      <Document
        file={url} // PDF 파일 경로 (public 폴더 내)
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          width={800}
          pageNumber={pageNumber}
          scale={0.8}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="flex gap-10 mt-3 text-[0.8rem]">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          style={{ color: 'gray', cursor: 'pointer' }}
        >
          Previous
        </button>
        <p>
          {pageNumber} / {numPages}
        </p>
        <button
          onClick={() =>
            setPageNumber((prev) =>
              numPages ? Math.min(prev + 1, numPages) : prev,
            )
          }
          disabled={pageNumber >= (numPages || 1)}
          style={{ color: 'gray', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
