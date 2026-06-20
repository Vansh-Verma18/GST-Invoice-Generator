declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf'
  
  interface AutoTableOptions {
    startY?: number
    head?: any[][]
    body?: any[][]
    theme?: string
    headStyles?: any
    styles?: any
    margin?: any
  }

  export interface jsPDFWithAutoTable extends jsPDF {
    lastAutoTable: {
      finalY: number
    }
    autoTable: (options: AutoTableOptions) => void
  }
}
