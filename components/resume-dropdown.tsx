"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ExternalLink, Download } from "lucide-react"

export function ResumeDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handlePrint = () => {
    setIsOpen(false)
    // Open resume page in new tab for printing with delay to ensure content loads
    const printWindow = window.open('/resume?print=true', '_blank')
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.print()
        }, 500)
      })
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block py-2 text-[15px] font-light transition-colors text-muted-foreground hover:text-foreground"
      >
        Resume
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-card border border-border shadow-lg z-50">
          <Link
            href="/resume"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-[13px] font-light text-secondary hover:text-foreground hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in new tab
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 w-full px-4 py-3 text-[13px] font-light text-secondary hover:text-foreground hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download as PDF
          </button>
        </div>
      )}
    </div>
  )
}

export function ResumeDropdownMobile({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handlePrint = () => {
    setIsOpen(false)
    onClose()
    const printWindow = window.open('/resume?print=true', '_blank')
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.print()
        }, 500)
      })
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block py-3 text-[17px] font-light transition-colors text-muted-foreground hover:text-foreground w-full text-left"
      >
        Resume
      </button>

      {isOpen && (
        <div className="ml-4 border-l border-border pl-4 space-y-1">
          <Link
            href="/resume"
            target="_blank"
            onClick={onClose}
            className="flex items-center gap-2 py-2 text-[15px] font-light text-secondary hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in new tab
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 py-2 text-[15px] font-light text-secondary hover:text-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download as PDF
          </button>
        </div>
      )}
    </div>
  )
}
