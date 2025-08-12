/* eslint-disable @typescript-eslint/no-explicit-any */
import XLSX from 'xlsx';

export const addFormattedRows = (ws: XLSX.WorkSheet, orders: any[]) => {
  let rowIndex = 1;
  ws['!merges'] = ws['!merges'] || [];
  ws['!cols'] = [{ wch: 10 }, { wch: 15 }, { wch: 10 }, { wch: 5 }];
  orders.forEach((order) => {
    ws[`A${rowIndex}`] = {
      v: 'Cliente:',
      s: {
        font: { bold: true, sz: 20 },
      },
    };
    ws[`B${rowIndex}`] = {
      v: order.customer.fantasyName || order.customer.name,
      s: {
        font: { bold: true, sz: 20 },
        alignment: { horizontal: 'center', wrapText: true },
      },
    };
    ws[`C${rowIndex}`] = { v: '', s: { alignment: { horizontal: 'center' } } };
    ws[`D${rowIndex}`] = { v: '', s: { alignment: { horizontal: 'center' } } };
    ws['!merges']?.push({
      s: { r: rowIndex - 1, c: 1 },
      e: { r: rowIndex - 1, c: 3 },
    });

    rowIndex++;

    const deliveryDate = new Date(order.deliveryDate);
    const formattedDate = deliveryDate
      .toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', ' -');
    ws[`A${rowIndex}`] = { v: 'Data:', s: { font: { bold: true } } };
    ws[`B${rowIndex}`] = {
      v: formattedDate,
      s: { alignment: { horizontal: 'center' } },
    };
    ws['!merges']?.push({
      s: { r: rowIndex - 1, c: 1 },
      e: { r: rowIndex - 1, c: 3 },
    });
    rowIndex++;
    rowIndex++;
    order.orderDetails.forEach((detail: any) => {
      ws[`A${rowIndex}`] = {
        v: `${detail.quantity || detail.weight} ${detail.type}`,
        s: { alignment: { horizontal: 'center' } },
      };
      ws[`B${rowIndex}`] = {
        v: detail.product.name,
        s: { alignment: { horizontal: 'center' } },
      };
      ws[`C${rowIndex}`] = {
        v: detail.additionalInformation || '',
        s: { alignment: { horizontal: 'center' } },
      };
      rowIndex++;
    });

    for (let i = 0; i < 2; i++) {
      ws[`A${rowIndex}`] = {
        v: '',
        s: {
          border: {
            top: { style: 'thin', color: { rgb: 'FFFFFF' } },
            bottom: { style: 'thin', color: { rgb: 'FFFFFF' } },
            left: { style: 'thin', color: { rgb: 'FFFFFF' } },
            right: { style: 'thin', color: { rgb: 'FFFFFF' } },
          },
        },
      };
      ws['!merges']?.push({
        s: { r: rowIndex - 1, c: 0 },
        e: { r: rowIndex - 1, c: 4 },
      });
      rowIndex++;
    }
  });

  ws['!ref'] = `A1:D${rowIndex - 1}`;
};
