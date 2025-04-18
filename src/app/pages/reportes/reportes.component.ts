import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  tipoReporte: string = 'ventas';

  // Mock de movimientos
  movimientos = [
    { tipo: 'venta', producto: 'Celular A', cantidad: 3, fecha: '2025-04-01', descripcion: 'Venta realizada' },
    { tipo: 'compra', producto: 'Celular B', cantidad: 5, fecha: '2025-04-02', descripcion: 'Stock repuesto' },
    { tipo: 'venta', producto: 'Cargador X', cantidad: 7, fecha: '2025-04-03', descripcion: 'Venta por delivery' },
  ];

  get datosFiltrados() {
    if (this.tipoReporte === 'ventas') {
      return this.movimientos.filter(m => m.tipo === 'venta');
    }
    if (this.tipoReporte === 'compras') {
      return this.movimientos.filter(m => m.tipo === 'compra');
    }
    return this.movimientos;
  }

  exportarExcel() {
    const hoja = XLSX.utils.json_to_sheet(this.datosFiltrados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Reporte');
    XLSX.writeFile(libro, `Reporte-${this.tipoReporte}.xlsx`);
  }

  exportarPDF() {
    const doc = new jsPDF();
    const columnas = ['Producto', 'Cantidad', 'Fecha', 'Descripción'];
    const filas = this.datosFiltrados.map(m => [m.producto, m.cantidad, m.fecha, m.descripcion]);

    doc.setFontSize(16);
    doc.text(`Reporte de ${this.tipoReporte.toUpperCase()}`, 14, 20);
    (doc as any).autoTable({ head: [columnas], body: filas, startY: 30 });
    doc.save(`Reporte-${this.tipoReporte}.pdf`);
  }

  volver() {
    history.back();
  }
}
