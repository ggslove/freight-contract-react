import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { t } from '../../utils/i18n';
import {
  tableContainer,
  tableBase,
  trHeader,
  trStriped,
  thBase,
  tdBase,
  btnBase,
  btnPrimary,
  btnDanger,
  statusTag,
  getZebraStyle
} from '../../styles/tableStyles';

const ContractTable = ({ contracts, onEdit, onDelete, onView }) => {
  return (
    <div style={tableContainer}>
      <table style={tableBase}>
        <thead>
          <tr style={trHeader}>
            <th style={{...thBase, minWidth: '120px'}}>{t('contracts.contractNo')}</th>
            <th style={{...thBase, minWidth: '120px'}}>{t('contracts.salesman')}</th>
            <th style={{...thBase, minWidth: '150px'}}>{t('contracts.customer')}</th>
            <th style={{...thBase, minWidth: '100px'}}>{t('contracts.amount')}</th>
            <th style={{...thBase, minWidth: '100px'}}>{t('contracts.currency')}</th>
            <th style={{...thBase, minWidth: '120px'}}>{t('contracts.startDate')}</th>
            <th style={{...thBase, minWidth: '120px'}}>{t('contracts.endDate')}</th>
            <th style={{...thBase, minWidth: '100px'}}>{t('contracts.status')}</th>
            <th style={{...thBase, minWidth: '120px'}}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={contract.id} style={trStriped(index)}>
              <td style={{...tdBase, fontWeight: '500'}}>{contract.contractNo}</td>
              <td style={tdBase}>{contract.salesman}</td>
              <td style={tdBase}>{contract.customerName}</td>
              <td style={{...tdBase, fontWeight: '500'}}>
                {contract.amount?.toLocaleString()}
              </td>
              <td style={tdBase}>{contract.currency}</td>
              <td style={{...tdBase, color: '#666'}}>
                {new Date(contract.startDate).toLocaleDateString()}
              </td>
              <td style={{...tdBase, color: '#666'}}>
                {new Date(contract.endDate).toLocaleDateString()}
              </td>
              <td style={tdBase}>
                <span style={statusTag(contract.status === 'ACTIVE' ? 'success' : 'warning')}>
                  {contract.status}
                </span>
              </td>
              <td style={tdBase}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onView(contract)}
                    style={{
                      ...btnBase,
                      ...btnPrimary,
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(contract)}
                    style={{
                      ...btnBase,
                      ...btnPrimary,
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(contract.id)}
                    style={{
                      ...btnBase,
                      ...btnDanger,
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;